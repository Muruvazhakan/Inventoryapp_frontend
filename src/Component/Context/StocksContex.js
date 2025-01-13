import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import * as XLSX from "xlsx";

import * as localstorage from '../Context/localStorageData';
import * as stockDb from '../DBconnection/stockDetailBD';

export const Stocks = createContext();

const StocksContext = ({ children }) => {

  const [width] = useState(641);

  const [singlestockitem, setsinglestockitem] = useState({
    id: 1,
    productid: '',
    desc: '',
    quantity: 0,
    rate: 0,
    amount: 0
  });
  const [productid, setproductid] = useState('');
  const [isloading, setisloading] = useState(false);
  const [list, setList] = useState([]);
  const [saleslist, setSalesList] = useState([]);
  const [allStockList, setallStockList] = useState([]);
  const [allProfitStockList, setAllProfitStockList] = useState([]);
  const [allStockAddedList, setallStockAddedList] = useState([]);
  const [allStockSalesList, setallStockSalesList] = useState([]);
  const [totalamt, settotalamt] = useState(0);
  const [totalsalesamt, settotalsalesamt] = useState(0);
  const [totalprofiramt, settotalprofiramt] = useState(0);
  const [allstockstotalamt, setallstockstotalamt] = useState(0);
  const [alladdedstockstotalamt, setaddedallstockstotalamt] = useState(0);
  const [allstockssalestotalamt, setallstockssalestotalamt] = useState(0);
  const [desc, setdesc] = useState('');
  const [availablestock, setavailablestock] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [rate, setrate] = useState(0);
  const [amount, setamount] = useState(0);
  const [productIdList, setproductIdList] = useState([]);
  const [clientList, setclientList] = useState([]);
  const [totalsubamt, setsubtotalamt] = useState(0);

  const [totaltaxvalueamt, settotaltaxvalueamt] = useState(0);
  const [totalamtwords, settotalamtwords] = useState('');

  const [hsn, sethsn] = useState(0);

  const [rateinctax, setrateinctax] = useState(0);

  const [per, setper] = useState('');
  const [disc, setdisc] = useState(15);

  const [header, setheader] = useState('stockrequest');
  const [clientName, setclientName] = useState('');
  const [clientPhno, setclientPhno] = useState('');
  const [clientAdd, setclientAdd] = useState('');

  const [stockid, setstockid] = useState('');
  const [salestockid, setsalestockid] = useState('');
  const [clientid, setclientid] = useState(null);
  const [cleardetailoption, setcleardetailoption] = useState(true);
  const [gstincluded, setgstincluded] = useState(true);
  const [displayhsntable, setdisplayhsntable] = useState(false);
  const [stockidcount, setstockidcount] = useState(1000);
  const [salestockidcount, setsalestockidcount] = useState(1000);
  const [stockdate, setstockdate] = useState('');
  const [salestockdate, setsalestockdate] = useState('');
  const [paymentmode, setpaymentmode] = useState('');
  const [paymentdate, setpaymentdate] = useState('');
  const [loginuser, setloginuser] = useState(localstorage.addOrGetUserdetail('', 'userid', 'get'));
  const [gstCgstitem, setgstCgstitem] = useState([{
    desc: 'OUTPUTCGST9%',
    name: 'cgst',
    amount: 0
  }, {
    desc: 'OUTPUTSGST9%',
    name: 'sgst',
    amount: 0
  }]);
  const [singlehsnitem, setsinglehsnitem] = useState({
    id: 1,
    hsndesc: '',
    taxvalue: 0,
    ctrate: 0,
    ctamount: 0,
    strate: 0,
    stamount: 0,
    amount: 0
  });
  const [ctrate, setctrate] = useState(0);
  const [ctatm, setctatm] = useState(0);
  const [strate, setstrate] = useState(0);
  const [statm, setstatm] = useState(0);

  const [totalhsnamt, settotalhsnamt] = useState(0);

  const [totalcentaxamt, settotalcentaxamt] = useState(0);
  const [totalstatetaxamt, settotalstatetaxamt] = useState(0);
  const [hsnlist, sethsnList] = useState([]);
  const [totalhsnamtwords, settotalhsnamtwords] = useState('');
  const [isinstallationcharge, setisinstallationcharge] = useState(false);
  const [otherchargedetail, setOtherchargedetail] = useState([]);
  const [otherdesc, setotherdesc] = useState('');
  const [ischargedinhsn, setischargedinhsn] = useState(true);
  const [otherdescamt, setotherdescamt] = useState(0);
  const [allStockData, setallStockData] = useState([]);
  const [stockHistoryData, setstockHistoryData] = useState([]);
  const [salesStockHistoryData, setSalesstockHistoryData] = useState([]);
  const [invoiceHistroyUpdateFlag, setinvoiceHistroyUpdateFlag] = useState(false);

  const setval = (e, fun) => {
    fun(e.target.value);
  }

  const setboxColors = (item, field) => {
    if (field === 'color') {
      return item.length === 0 || item === 0 ? 'error' : 'success';
    }

    else {
      return item.length === 0 || item === 0 ? true : false;
    }

  }

  const calculateTotal = () => {
    if (list.length > 0) {
      const allItems = list.map((item) => item.amount);

      // setsinglehsnitem({
      //   ...singlehsnitem,

      // })
      setsubtotalamt(collect(allItems).sum().toFixed(2));
      //   setgstCgstitem({
      //     amount:collect(allItems).sum()});
    }

  };

  const editListRows = (item, screen, displaylist, type) => {
    // console.log("item ");
    // console.log(item);
    const removedist = displaylist.filter((alllist) => {
      return alllist.id != item.id;
    });

    if (type === "update") {
      setproductid(item.productid);
      setdesc(item.desc);
      setquantity(item.quantity);
      setrate(item.rate);
      setamount(item.amount);
      let filterdata = allStockData.find(data => {
        return data.productid == item.productid
      })
      console.log("filterdata^^^&&");
      console.log(filterdata);
      if (filterdata) {
        setavailablestock(((filterdata.quantity * 1) + (item.quantity * 1)));
      }
      toast.info("Item is added in edit section");
    }
    if (screen == "allstocks" || (screen == "add")) {
      setList(removedist);
    }
    else {
      setSalesList(removedist)
    }

    if (type === "delete") {
      toast.warning("Item Deleted");
    }
    // console.log(hsnlist.length + "list.length " +list.length + "otherchargedetail " + otherchargedetail.length );

  };

  const getAllStocks = (props) => {
    console.log("allStockData");
    console.log(allStockData);
    console.log(props);

    if (props === "allstocks") {
      if (allStockData && allStockData.length > 0) {
        // setList(allStockData);
        setallStockList(allStockData);
        let localsum = calculateSum(allStockData);
        setallstockstotalamt(localsum);
      }

    }
  };

  const calculateSum = (alllistdata) => {
    let localsum = 0, sum = 0;
    let val;
    let singleval = alllistdata;
    if (singleval.length > 0) {
      // console.log("****calculateSum****");
      // console.log(singleval[0].rate);
      for (let i = 0; i < singleval.length; i++) {
        // console.log("singleval*****");
        // console.log(singleval[i]);
        // if(singleval[i].rate){
        val = ((singleval[i].rate * singleval[i].quantity * 1));
        localsum = localsum + val;
        // }

      }
      // console.log("localsum****");
      // console.log(localsum);
      // settotalamt(localsum);
      return localsum

    }
  }

  const addOrEditOtherItems = (item, type) => {

    const removedist = otherchargedetail.filter((alllist) => {
      return alllist.id != item.id;
    });

    if (type === 'update') {
      // console.log("addOrEditOtherItems ");

      // console.log("removalitem ");

      // console.log(item);
      // setotherdesc()
      setotherdesc(item.otheritemdesc);
      setotherdescamt(item.otherdesctaxamt);
      setischargedinhsn(item.ischargedinhsn);
      setOtherchargedetail(removedist);
      toast.info("Other Item added to edit section");
    } else if (type === 'delete') {
      setOtherchargedetail(removedist);
      toast.success("Other Item Deleted");

    }
    else if (type === 'add') {

      if (otherdesc.length > 0 && otherdescamt > 0 && ctrate > 0 && strate > 0) {
        let singleOtherItem = {
          id: uuidv4(),
          otheritemdesc: otherdesc,
          otherdescamt: otherdescamt,
          otherdesctaxamt: otherdescamt,
          ischargedinhsn: ischargedinhsn
        };

        setOtherchargedetail([
          ...otherchargedetail,
          singleOtherItem
        ]);


        toast.success("Other Item added");
      }
      else if (ctrate <= 0 && strate <= 0) {
        toast.error("Please fill HSN Tax rate");
      }
      else {
        toast.error("Please fill in all inputs in Other details");
      }
    }
  }

  useEffect(() => {
    calculateTotal();
  });


  useEffect(() => {
    if (list.length == 0) {
      settotalamt(0);
    }
  }, [list]);


  const addOrUpdateItemHandler = (opt, screen) => {
    if (desc.length !== 0 && quantity > 0 && rate > 0 && amount > 0
      // && ctrate > 0 && strate > 0

    ) {
      if (opt === 'Update') {
        toast.success("Item updated");
      } else {


        console.log("screen");
        console.log(screen);
        // console.log(singleitem);
        if (screen !== "sale") {
          let singleitem = {
            id: uuidv4(),
            productid: productid,
            desc: desc,
            quantity: quantity,
            rate: rate,
            amount: amount
          };

          let found = false;
          let prev = list.map(data => {
            let avgrate = rate * 1;
            let avgquantity = quantity * 1;
            let avgamt = amount * 1;

            if (data.productid == productid) {
              avgrate = (((data.rate * 1 * data.quantity * 1) + (rate * 1 * quantity * 1)) / ((quantity * 1) + (data.quantity * 1))).toFixed(2);
              avgquantity = data.quantity * 1 + quantity * 1;
              found = true;
              avgamt = avgrate * 1 * avgquantity;
              data.rate = avgrate;
              data.quantity = avgquantity;
              data.amount = avgamt;
            }
            return data
          });

          if (found) {
            setList([
              ...prev
            ]
            );
          } else {
            setList([
              ...list,
              singleitem
            ]
            );
          }
        } else {
          let singleitem = {
            id: uuidv4(),
            productid: productid,
            desc: desc,
            quantity: quantity,
            rate: rate,
            amount: amount
          };
          let found = false;
          let highquantity = false;
          if (availablestock < ((quantity * 1))) {
            toast.error("Entered Quantity is more than available quantity!");
            return false;
          }
          let prev = saleslist.map(data => {
            let avgrate = rate * 1;
            let avgquantity = quantity * 1;
            let avgamt = amount * 1;

            if (data.productid == productid) {

              avgrate = (((data.rate * 1 * data.quantity * 1) + (rate * 1 * quantity * 1)) / ((quantity * 1) + (data.quantity * 1))).toFixed(2);
              avgquantity = data.quantity * 1 + quantity * 1;
              found = true;
              avgamt = avgrate * 1 * avgquantity;
              if (availablestock < ((avgquantity * 1))) {
                highquantity = true;
                return data;
              }
              data.rate = avgrate;
              data.quantity = avgquantity;
              data.amount = avgamt;
            }
            return data
          });

          if (found || highquantity) {
            setSalesList([
              ...prev
            ]
            );
            if (highquantity) {
              toast.error("Entered Quantity is more than available quantity!");
              return false;
            }


          } else {
            setSalesList([
              ...saleslist,
              singleitem
            ]
            );
          }


        }

        toast.success("Item added");

        if (cleardetailoption) {
          clearlistcontent();
        }
      }

    }
    else {
      toast.error("Please fill in all inputs in HSN and Add Goods tab");
    }
  }

  const clearlistcontent = () => {
    setdesc('');
    setproductid('');
    setquantity(0);
    setrate(0);
    setamount(0);
    setavailablestock(0);
  }

  const addOtherItems = () => {
    addOrEditOtherItems("", 'add');
    if (cleardetailoption) {
      clearOtherDetails();
    }
  }


  const clearOtherDetails = () => {
    setotherdesc('');
    setotherdescamt(0);
    setischargedinhsn(true);
  }

  const saveLocalStock = (singlestock, screen) => {

    if (screen === "add") {
      if (stockHistoryData !== null) {
        let iscontains = false;
        stockHistoryData.map((item) => {
          if (item.stockid === stockid) {
            item.stockdate = stockdate;
            item.paymentmode = paymentmode;
            item.list = list;
            item.totalamt = totalamt;
            item.clientAdd = clientAdd;
            item.clientName = clientName;
            item.clientid = clientid;
            item.clientPhno = clientPhno;
            item.userid = loginuser;
            iscontains = true;
          }
          return item;
        });
        if (iscontains === false) {
          setstockHistoryData([
            ...stockHistoryData, singlestock
          ]);
          toast.success('Stock Details are added');
        }
        else {
          toast.success('Stock Details are updated');
        }
        // console.log('estimateHistoryData');
        // console.log(estimateHistoryData);

      } else {
        // console.log('inside else');
        setstockHistoryData([
          singlestock
        ]);
      }
      localstorage.addOrGetstockHistoryData(stockHistoryData, "save");
    } else {
      if (salesStockHistoryData !== null) {
        let iscontains = false;
        salesStockHistoryData.map((item) => {
          if (item.salestockid === salestockid) {
            item.salestockdate = salestockdate;
            item.saleslist = saleslist;
            item.totalsalesamt = totalsalesamt;
            item.clientAdd = clientAdd;
            item.clientName = clientName;
            item.clientid = clientid;
            item.clientPhno = clientPhno;
            item.userid = loginuser;
            iscontains = true;
          }
          return item;
        });
        if (iscontains === false) {
          setSalesstockHistoryData([
            ...salesStockHistoryData, singlestock
          ]);
          toast.success('Stock Details are added');
        }
        else {
          toast.success('Stock Sales Details are updated');
        }
        // console.log('estimateHistoryData');
        // console.log(estimateHistoryData);

      } else {
        // console.log('inside else');
        setSalesstockHistoryData([
          singlestock
        ]);
      }
      localstorage.addOrGetSaleStockHistoryData(salesStockHistoryData, "save");
    }
    // if (item.salestockid === salestockid) {
    //   item.salestockdate = salestockdate;

    //   item.saleslist = saleslist;

  }
  const saveStock = async (screen) => {
    setisloading(true);
    console.log('saveStock');
    console.log('loginuserid + loginuserid');
    // if(screen ==="add"){

    // }
    if (screen === "add") {
      if (stockid == '' || list.length == 0) {
        toast.warn("Please add the stock or Generate the Stockid");
        return;
      }
      let clientidtemp;
      if (clientid == null) {
        clientidtemp = uuidv4();
        setclientid(clientidtemp);
      } else {
        clientidtemp = clientid;
      }
      let datas = {
        authorization: header,
        stockid: stockid,
        stocklist: list,
        clientid: clientidtemp,
        totalamt: totalamt,
        clientAdd: clientAdd,
        clientName: clientName,
        clientPhno: clientPhno,
        stockidcount: stockidcount,
        stockdate: stockdate,
      }
      console.log(datas);
      saveLocalStock(datas, "add");

      let savedataresponse = await stockDb.saveStockBD(datas, loginuser);
      if (savedataresponse.status !== 200) {
        toast.warn("Issue in saving Stock");
        return;
      }
      console.log('savedataresponse');
      console.log(savedataresponse);
      getAllClientList(loginuser, "add");

      // getAllHistoryStockData(loginuser);
      // toast.success("New Stock saved");
    } else {
      if (salestockid == '' || saleslist.length == 0) {
        toast.warn("Please add the sale stock or Generate the Sale Stockid");
        return;
      }
      let clientidtemp;
      if (clientid == null) {
        clientidtemp = uuidv4();
        setclientid(clientidtemp);
      } else {
        clientidtemp = clientid;
      }
      let datas = {
        authorization: header,
        salestockid: salestockid,
        salestocklist: saleslist,
        clientid: clientidtemp,
        totalsalesamt: totalsalesamt,
        clientAdd: clientAdd,
        clientName: clientName,
        clientPhno: clientPhno,
        salestockidcount: salestockidcount,
        salestockdate: salestockdate,
      }
      console.log("sales datas");
      console.log(datas);

      saveLocalStock(datas, "sale");

      let savedataresponse = await stockDb.saveSalesStockBD(datas, loginuser);
      if (savedataresponse.status !== 200) {
        toast.warn("Issue in saving Stock");
        return;
      }
      console.log('savedataresponse');
      console.log(savedataresponse);
      getAllClientList(loginuser, "sale");
      // getAllStockData(loginuser);
      // getAllHistorySalesStockData(loginuser);

      // toast.success("New Sale Stock saved");
    }
    getAllStockData(loginuser);
    setisloading(false);
  };

  const allStockHistoryEdit = (props) => {
    console.log(props);

    let stockhistorydetail = props;

    let clientdetail = clientList.find(data => {
      console.log("data.clientid");
      console.log(data.clientid + " //// " + props.clientid);
      if (data.clientid === props.clientid)
        return data;
    })
    console.log("clientList");
    console.log(clientList);

    console.log("clientdetail");
    console.log(clientdetail);
    settotalamt(stockhistorydetail.totalamt);
    setclientid(stockhistorydetail.clientid);
    setstockdate(stockhistorydetail.stockdate);
    setList(stockhistorydetail.rows);
    if (clientdetail) {
      setclientName(clientdetail.clientName);
      setclientPhno(clientdetail.clientPhno);
      setclientAdd(clientdetail.clientAdd);
    }
    else {
      setclientName('');
      setclientPhno('');
      setclientAdd('');
    }
    setstockid(stockhistorydetail.stockid);


  }

  const allSaleStockHistoryEdit = (props) => {
    console.log("allSaleStockHistoryEdit ");
    console.log(props);
    console.log("clientList");
    console.log(clientList);
    let salesStockhistorydetail = props;
    let clientdetail = clientList.find(data => {
      console.log("data.clientid");
      console.log(data.clientid + " //// " + props.clientid);
      if (data.clientid === props.clientid)
        return data;
    })
    settotalsalesamt(salesStockhistorydetail.totalsalesamt);
    setclientid(salesStockhistorydetail.clientid);
    setsalestockdate(salesStockhistorydetail.salestockdate);
    setsalestockid(salesStockhistorydetail.salestockid);
    setSalesList(salesStockhistorydetail.rows);
    if (clientdetail) {
      setclientName(clientdetail.clientName);
      setclientPhno(clientdetail.clientPhno);
      setclientAdd(clientdetail.clientAdd);
    }
    else {
      setclientName('');
      setclientPhno('');
      setclientAdd('');
    }
  }

  const getAllClientList = async (loginuserid, type) => {
    let allClientData = localstorage.addOrGetAllClientData('', 'get');
    console.log('loginuserid &&&& ' + loginuserid);
    if (loginuserid != '' || loginuserid != null)
      setloginuser(loginuserid);
    let getallClientDatafromdb = await stockDb.getClientDB(loginuserid);
    console.log('allClientData ' + allClientData);
    // setclientList(allClientData);
    console.log('**** getallClientDatafromdb &&&& ');
    console.log(getallClientDatafromdb);
    if (getallClientDatafromdb.status === 200) {
      // localstorage.addOrGetAllClientData(getallClientDatafromdb.data, 'save');
      setclientList(getallClientDatafromdb.data);
      console.log('getallClientDatafromdb ****');
      console.log(clientList);
      if (type === "add") {
        getAllHistoryStockData(loginuserid, getallClientDatafromdb.data);
      } else {
        getAllHistorySalesStockData(loginuserid, getallClientDatafromdb.data);
        getAllHistoryStockData(loginuserid, getallClientDatafromdb.data);

      }

      return true;
    }
    return false;
  }

  const handleExportXlsx = (screen) => {
    let filtercolumn = [];
    let localsumqty1 = 0, localsumqty2 = 0, sumpurchaseamt = 0;

    let displaylist = (screen === "allstocks" ? allStockList
      :
      (screen === "alladdedstocks" ? allStockAddedList
        :
        (screen === "allProfit" ? allProfitStockList
          :
          (screen === "add" ? list
            :
            (screen === "sale" ? saleslist
              : allStockSalesList
            )
          )))
    );
    let localsum = (screen === "allstocks" ? allstockstotalamt
      :
      (screen === "alladdedstocks" ? alladdedstockstotalamt
        :
        (screen === "allProfit" ? totalprofiramt
          :
          (screen === "add" ? totalamt
            :
            (screen === "sale" ? totalsalesamt
              : allstockssalestotalamt
            )
          )
        )
      )
    );
    let localsumqty = displaylist.map((item, index) => {
      localsumqty1 = localsumqty1 + (item.quantity * 1);
      if (screen === "allProfit")
        localsumqty2 = localsumqty2 + (item.salequantity * 1);
      sumpurchaseamt = sumpurchaseamt + (item.purchaceamount * 1);
    });

    if (screen === "allstocks") {
      filtercolumn = allStockList.map((data, index) => {
        return {
          Sno: index + 1,
          Productid: data.productid,
          ProductDescription: data.desc,
          Quantity: data.quantity,
          Rate: data.rate,
          Amount: data.quantity * data.rate * 1
        }
      })
      let lastcolumn = {
        Sno: "Total Amount",
        Productid: '',
        ProductDescription: '',
        Quantity: localsumqty1,
        Rate: '',
        Amount: localsum
      }
      filtercolumn.push(lastcolumn);
      console.log("filtercolumn");
      console.log(filtercolumn);
    } else if (screen === "allsalestocks") {
      let filtercolumn = allStockSalesList.map((data, index) => {
        return {
          Sno: index + 1,
          Productid: data.productid,
          ProductDescription: data.desc,
          Quantity: data.quantity,
          Sale_Rate: data.rate,
          Sale_Amount: data.quantity * data.rate * 1
        }
      })
      let lastcolumn = {
        Sno: "Total Sale Amount",
        Productid: '',
        ProductDescription: '',
        Quantity: localsumqty1,
        Sale_Rate: '',
        Sale_Amount: localsum
      }
      filtercolumn.push(lastcolumn);
      console.log("filtercolumn");
      console.log(filtercolumn);

    } else if (screen === "alladdedstocks") {
      let filtercolumn = allStockAddedList.map((data, index) => {
        return {
          Sno: index + 1,
          Productid: data.productid,
          ProductDescription: data.desc,
          Quantity: data.quantity,
          Rate: data.rate,
          Amount: data.quantity * data.rate * 1
        }
      })
      let lastcolumn = {
        Sno: "Total Amount",
        Productid: '',
        ProductDescription: '',
        Quantity: localsumqty1,
        Rate: '',
        Amount: localsum
      }
      filtercolumn.push(lastcolumn);
      console.log("filtercolumn");
      console.log(filtercolumn);

    } else if (screen === "allProfit") {

      let filtercolumn = allProfitStockList.map((data, index) => {
        return {
          Sno: index + 1,
          Productid: data.productid,
          ProductDescription: data.desc,
          TotalQuantity: data.quantity,
          PurchaceRate: data.rate,
          TotalPurchaceAmount: data.amount,
          SaleRate: data.salerate,
          SaleQuantity: data.salequantity,
          SaleAmount: data.saleamount,
          PurchaceAmount: data.purchaceamount,
          Profit: data.profit,
        }
      })
      let lastcolumn = {
        Sno: "Total Amount",
        TotalQuantity: localsumqty1,
        PurchaceRate: '',
        TotalPurchaceAmount: alladdedstockstotalamt,
        SaleRate: '',
        SaleQuantity: localsumqty2,
        SaleAmount: allstockssalestotalamt,
        PurchaceAmount: sumpurchaseamt,
        Profit: localsum,
      }
      filtercolumn.push(lastcolumn);
      console.log("filtercolumn");
      console.log(filtercolumn);

    }

    // console.log(estimateHistoryData);
    // console.log(estimateHistoryData.length);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filtercolumn);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    let date = (new Date());
    console.log(date);
    var stockDate =
      date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
    XLSX.writeFile(wb, `MyCurrrentStocks_${stockDate}.xlsx`);
  }

  const handleHistoryExportXlsx = (props) => {
    let filtercolumn, filename = (props === "sale" ? "SalesStock" : "Stocks");
    let lastcolumn, totaladdedamt = 0;
    // deriveClientDetail(salesStockHistoryData);
    console.log(props)
    if (props === "sale") {
      filtercolumn = salesStockHistoryData.map((data, index) => {
        totaladdedamt += data.totalsalesamt * 1;
        return {
          Sno: index + 1,
          Sale_Stock_Id: data.salestockid,
          Sale_Stock_Date: data.salestockdate,
          Client_Name: data.clientName,
          Client_Phone_No: data.clientPhno,
          Client_Address: data.clientAdd,
          Total_Sales_Amount: data.totalsalesamt * 1
        }
      });
      console.log("filtercolumn")
      console.log(filtercolumn)
      lastcolumn = {
        Sno: "Total Amount",
        Sale_Stock_Id: '',
        Sale_Stock_Date: '',
        Client_Name: '',
        Client_Phone_No: '',
        Client_Address: '',
        Total_Sales_Amount: totaladdedamt
      }
    } else {
      filtercolumn = stockHistoryData.map((data, index) => {
        totaladdedamt += data.totalamt * 1;
        return {
          Sno: index + 1,
          Stock_Id: data.stockid,
          Stock_Date: data.stockdate,
          Client_Name: data.clientName,
          Client_Phone_No: data.clientPhno,
          Client_Address: data.clientAdd,
          Total_Amount: data.totalamt * 1
        }
      });
      lastcolumn = {
        Sno: "Total Amount",
        Stock_Id: '',
        Stock_Date: '',
        Client_Name: '',
        Client_Phone_No: '',
        Client_Address: '',
        Total_Amount: totaladdedamt
      }
    }
    filtercolumn.push(lastcolumn);
    console.log("filtercolumn");
    console.log(filtercolumn);
    // console.log(estimateHistoryData);
    // console.log(estimateHistoryData.length);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filtercolumn);

    XLSX.utils.book_append_sheet(wb, ws, filename);
    let date = (new Date());
    console.log(date);
    var stockDate =
      date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
    XLSX.writeFile(wb, `My${filename}_${stockDate}.xlsx`); // use to generate files
  }

  const getAllStockData = async (loginuserid) => {
    let allStockData = localstorage.addOrGetAllStockData('', 'get');
    if (loginuserid != '' || loginuserid != null)
      setloginuser(loginuserid);
    let getstockfromdb = await stockDb.getStockDB(loginuserid);
    console.log('getAllStockData !!!!!');
    console.log(allStockData);
    console.log(getstockfromdb);
    if (getstockfromdb.status === 200) {

      // if (allStockData === null || (allStockData.length <= getstockfromdb.data.length)) {
      //console.log(getstockfromdb.data);
      //console.log('inside setallStockData');
      localstorage.addOrGetAllStockData(getstockfromdb.data, 'save');
      setallStockData(getstockfromdb.data);
      setallStockList(getstockfromdb.data);
      let localsum = calculateSum(getstockfromdb.data);
      setallstockstotalamt(localsum);
      // }
      // else {
      //     estdetail.setstockHistoryData(getstockfromdb.data);
      // }

      // let invoicedetailscontext = localstorage.addOrGetstockHistoryData('', 'get');
      console.log('getstockfromdb ****');
      console.log(allStockData);
      return true;

    }
    return false;
  }


  const getAllHistoryStockData = async (loginuserid, clientdata) => {
    let allHistoryStockData = localstorage.addOrGetAllHistoryStockData('', 'get');
    if (loginuserid != '' || loginuserid != null)
      setloginuser(loginuserid);
    let getstockfromdb = await stockDb.getAllHistoryStockDB(loginuserid);
    console.log('getAllHistoryStockDB !!!!!');
    console.log(allHistoryStockData);
    console.log(getstockfromdb);
    if (getstockfromdb.status === 200) {
      console.log(getstockfromdb.data);
      console.log('inside allHistoryStockData');
      let deriveClientDetailValue = deriveClientDetail(getstockfromdb.data, clientdata, "add");
      localstorage.addOrGetAllHistoryStockData(deriveClientDetailValue, 'save');
      setstockHistoryData(deriveClientDetailValue);
      deriveStockAddedFromHistory(deriveClientDetailValue);
      return true;
    }
    return false;
  }

  const selectedStockEdit = (props) => {
    console.log(props);

    let singlestock = props;
    setstockdate(singlestock.stockdate);
    setstockid(singlestock.stockid);
    // setstockdate1(singlestock.stockdate1);
    // setpaymentdate1(singlestock.paymentdate1);
    setpaymentmode(singlestock.paymentmode);
    setList(singlestock.list);
    settotalamt(singlestock.totalamt);
    setclientAdd(singlestock.clientAdd);
    setclientName(singlestock.clientName);
    setclientPhno(singlestock.clientPhno);
    console.log('inside ctrate ');

    // setcolumns(singleinvoice.columns);  


  }

  const handleInvoiceExportXlsx = () => {

    let filtercolumn = stockHistoryData.map(data => {
      return {

        Invoice_id: data.stockid,
        Invoice_date: data.stockdate,
        Payment_date: data.paymentdate,
        Payment_mode: data.paymentmode,
        Client_Name: data.clientName,
        Client_PhoneNo: data.clientPhno,
        Client_Address: data.clientAdd,
        Central_taxrate: data.ctrate,
        State_taxrate: data.strate,
        Total_centralaxamt: data.totalcentaxamt,
        Total_statetaxamt: data.totalstatetaxamt,
        Total_amount: data.totalamt,
        Total_amountwords: data.totalamtwords,
        Total_taxvalueamount: data.totaltaxvalueamt,
        Total_hsnamount: data.totalhsnamt,
        Total_hsnamountwords: data.totalhsnamtwords,
      }
    })
    console.log(filtercolumn);
    // console.log(estimateHistoryData);
    // console.log(estimateHistoryData.length);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filtercolumn);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    let date = (new Date());
    console.log(date);
    var stockdate =
      date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
    XLSX.writeFile(wb, `MyInvoice_${stockdate}.xlsx`);
  }
  const dateHandler = (type) => {
    const today = new Date();
    let todaydate;

    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    let idcounttype = (type === "stock" ? stockidcount : salestockidcount);

    let count = idcounttype * 1;
    console.log("idcounttype " + count + " type " + type + " salestockidcount " + salestockidcount);
    if (type === "stock") {
      todaydate = `ST${year}${month}${date}${idcounttype}`;
      setstockid(todaydate);
      setstockidcount(++count);

    } else {

      todaydate = `SA${year}${month}${date}${idcounttype}`;
      setsalestockid(todaydate);
      setsalestockidcount(++count);

    }

    // console.log("stockidcount: " + count);
    // console.log("todaydate: " + todaydate);
    // setstockid()
  }

  const cleartallStock = (screen) => {

    if (screen === "add") {
      setstockdate('');
      setstockid('');
      setList([]);
      settotalamt('');
    } else {
      setsalestockid('');
      setSalesList([]);
      settotalsalesamt('');
      setsalestockdate('');
    }
    setclientAdd('');
    setclientName('');
    setclientPhno('');
  };

  const deriveClientDetail = (details, clientdata, type) => {
    let salestocks = details;
    let newvalues = salestocks.map((item, index) => {

      let clientdetail = clientdata.find(data => {
        // console.log("data.clientid");
        // console.log(data.clientid + " //// "+ item.clientid);
        if (data.clientid == item.clientid) {
          // console.log("^^^found data.clientid&&&&");
          // console.log(data);
          return data;
        }

      });
      // console.log("%%% client datas $$%%%%");
      // console.log(clientdetail);
      let datas;
      if (type === "sale") {
        datas = {
          salestockid: item.salestockid,
          userid: item.userid,
          rows: item.rows,
          totalsalesamt: item.totalsalesamt,
          salestockid: item.salestockid,
          clientid: item.clientid,
          lastupdatedsalestockdate: item.lastupdatedsalestockdate,
          salestockdate: item.salestockdate,
          clientName: (clientdetail !== undefined ? clientdetail.clientName : null),
          clientPhno: (clientdetail !== undefined ? clientdetail.clientPhno : null),
          clientAdd: (clientdetail !== undefined ? clientdetail.clientAdd : null),
        }
      } else {
        datas = {
          stockid: item.stockid,
          userid: item.userid,
          rows: item.rows,
          totalamt: item.totalamt,
          stockid: item.stockid,
          clientid: item.clientid,
          lastupdatedstockdate: item.lastupdatedstockdate,
          stockdate: item.stockdate,
          clientName: (clientdetail !== undefined ? clientdetail.clientName : null),
          clientPhno: (clientdetail !== undefined ? clientdetail.clientPhno : null),
          clientAdd: (clientdetail !== undefined ? clientdetail.clientAdd : null),
        }
      }

      //   console.log("%%% salestocks datas $$%%%%");
      // console.log(datas);
      return datas;
    });
    // console.log("%%% newvalues $$%%%%");
    // console.log(newvalues);
    return newvalues;
  }
  const getAllHistorySalesStockData = async (loginuserid, clientdata) => {
    let allHistorySalesStockData = localstorage.addOrGetAllHistorySalesStockData('', 'get');
    if (loginuserid != '' || loginuserid != null)
      setloginuser(loginuserid);
    let getSalesStockfromdb = await stockDb.getAllHistorySalesStockDB(loginuserid);
    console.log('getAllHistorySalesStockDB !!!!!');
    console.log(allHistorySalesStockData);
    console.log(getSalesStockfromdb);
    if (getSalesStockfromdb.status === 200) {
      console.log(getSalesStockfromdb.data);
      console.log('inside allHistorySalesStockData');
      let deriveClientDetailValue = deriveClientDetail(getSalesStockfromdb.data, clientdata, "sale");
      localstorage.addOrGetAllHistorySalesStockData(deriveClientDetailValue, 'save');
      setSalesstockHistoryData(deriveClientDetailValue);
      deriveSaleStockFromHistory(deriveClientDetailValue);
      return true;
    }
    return false;
  }

  const deriveSaleStockFromHistory = (props) => {
    console.log("props");
    console.log(salesStockHistoryData);
    let accumalatevalue = [];
    let totalsaleamt = 0;
    let listofsales = props.map(data => {
      let singllistofsales = data.rows.map(innerrows => {
        console.log("innerrows");
        console.log(innerrows);
        let found = false;
        totalsaleamt = (totalsaleamt * 1) + (innerrows.amount * 1);
        if (accumalatevalue.length > 0) {
          for (let i = 0; i < accumalatevalue.length; i++) {
            if (accumalatevalue[i].productid === innerrows.productid) {
              found = true;
              accumalatevalue[i].quantity = (accumalatevalue[i].quantity * 1) + (innerrows.quantity * 1);
              accumalatevalue[i].amount = (accumalatevalue[i].amount * 1) + (innerrows.amount * 1);
              accumalatevalue[i].rate = ((accumalatevalue[i].amount * 1) / (accumalatevalue[i].quantity * 1)).toFixed(2);
              console.log(" found &&&");
              console.log(accumalatevalue);
            }
          }
          if (!found) {
            accumalatevalue = [...accumalatevalue, innerrows];

            console.log("nt found &&&");
          }
        } else {
          accumalatevalue = [innerrows];
          console.log("else &&&");
        }
        console.log("accumalatevalue &&&");
        console.log(accumalatevalue);
        // return accumalatevalue;
      });

    });

    console.log("deriveSaleStockFromHistory");
    console.log(accumalatevalue);
    setallStockSalesList(accumalatevalue);
    setallstockssalestotalamt(totalsaleamt);
    // allstockssalestotalamt
  }

  const deriveProfitStock = () => {
    console.log("allStockList");
    console.log(allStockList);
    console.log("allStockSalesList");
    console.log(allStockSalesList);
    let profitsum = 0;
    if (allStockSalesList.length > 0 && allStockAddedList.length > 0) {
      const mergedArray = allStockSalesList.map((obj1) => {
        // Find the corresponding object in array2 by Productid
        const obj2 = allStockAddedList.find((item) => item.productid === obj1.productid);

        // userid: userid,
        // productid: singlestock.productid,
        // quantity: singlestock.quantity,
        // desc: singlestock.desc,
        // rate: singlestock.rate,
        // Merge the two objects
        let profits = ((obj1.quantity * 1 * (obj1.rate)) - ((obj1.quantity * 1 * (obj2.rate))));
        profitsum = profitsum + profits;
        return {
          productid: obj2.productid,
          desc: obj2.desc,
          quantity: obj2.quantity * 1,
          rate: obj2.rate * 1,
          amount: (obj2.rate * 1 * obj2.quantity),
          // If a match is found in array2, merge its properties
          salerate: obj1 ? obj1.rate * 1 : undefined,
          saleamount: obj1 ? obj1.amount * 1 : undefined,
          purchaceamount: obj1 ? obj1.quantity * 1 * obj2.rate : undefined,
          salequantity: obj1 ? obj1.quantity * 1 : undefined,
          profit: profits,
        };
      });
      console.log("mergedArray");
      console.log(mergedArray);
      console.log("profitsum");
      console.log(profitsum);
      setAllProfitStockList(mergedArray);
      // profitsum = (Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(profitsum));
      settotalprofiramt(profitsum.toFixed(2));
    }
  }

  const deriveStockAddedFromHistory = (prop) => {
    console.log("props");
    let accumalatevalue = [];
    let totalamt = 0;
    let listofsales = prop.map(data => {
      let singllistofsales = data.rows.map(innerrows => {
        console.log("innerrows");
        console.log(innerrows);
        let found = false;
        totalamt = (totalamt * 1) + (innerrows.amount * 1);
        if (accumalatevalue.length > 0) {
          for (let i = 0; i < accumalatevalue.length; i++) {
            if (accumalatevalue[i].productid === innerrows.productid) {
              found = true;
              accumalatevalue[i].quantity = (accumalatevalue[i].quantity * 1) + (innerrows.quantity * 1);
              accumalatevalue[i].amount = (accumalatevalue[i].amount * 1) + (innerrows.amount * 1);
              accumalatevalue[i].rate = ((accumalatevalue[i].amount * 1) / (accumalatevalue[i].quantity * 1)).toFixed(2);
              console.log(" found &&&");
              console.log(accumalatevalue);
            }
          }
          if (!found) {
            accumalatevalue = [...accumalatevalue, innerrows];

            console.log("nt found &&&");
          }
        } else {
          accumalatevalue = [innerrows];
          console.log("else &&&");
        }
        console.log("accumalatevalue &&&");
        console.log(accumalatevalue);
        // return accumalatevalue;
      });

    });

    console.log("deriveSaleStockFromHistory");
    console.log(accumalatevalue);
    setallStockAddedList(accumalatevalue);
    let localsum = calculateSum(accumalatevalue);
    setaddedallstockstotalamt(localsum);
    // setallstockssalestotalamt(totalsaleamt);  
  }
  const getAllSalesCount = async (loginuserid) => {
    let salesstockidcounter = localstorage.addOrGetSaleStockid('', "get");
    console.log(salesstockidcounter + ' addOrGetStockid');
    let getSalesStockfromDb = await stockDb.getSalesStockidDB(loginuserid);
    console.log('getSalesStockfromDb.data');
    console.log(getSalesStockfromDb);
    if (getSalesStockfromDb.status === 200) {
      localstorage.addOrGetSaleStockid(getSalesStockfromDb.data, "save");
      setsalestockidcount(getSalesStockfromDb.data);
      console.log('saving setinvoiceidount ' + getSalesStockfromDb.data);
    }
  }
  useEffect(() => {
    // //console.log('local invoice history');
    let count = localstorage.addOrGetStockid('', 'get');
    if (count !== null) {
      setstockidcount(count);
    }
    // console.log(count + 'invoice count');
  }, []);
  useEffect(() => {
    console.log('amount');

    let val;
    val = (rate * quantity);
    setamount(val.toFixed(2));
    console.log(rate + " rate " + val);
  }, [rate, quantity])

  useEffect(() => {
    settotalamt(((collect(list.map((item) => item.amount)).sum())).toFixed(2));
  }, [list]);

  useEffect(() => {
    settotalsalesamt(((collect(saleslist.map((item) => item.amount)).sum())).toFixed(2));
  }, [saleslist])
  // 

  useEffect(() => {
    setTimeout(() => {
      deriveProfitStock();
    }, 1000)
  }, [allStockSalesList,allStockAddedList]);

  const context = {
    list, setList, totalamt, settotalamt, totalamtwords, settotalamtwords, singlehsnitem, setsinglehsnitem, setval, setboxColors, cleardetailoption, setcleardetailoption,
    hsn, sethsn, quantity, setquantity, rateinctax, setrateinctax, rate, setrate, per, setper, disc, setdisc, amount, setamount, otherdesc, setotherdesc, ischargedinhsn, setischargedinhsn, otherdescamt, setotherdescamt,
    totalhsnamt, settotalhsnamt, hsnlist, sethsnList, totalhsnamtwords, settotalhsnamtwords, totalsubamt, saveStock, addOrUpdateItemHandler, clearlistcontent, clearOtherDetails, addOtherItems,
    setsubtotalamt, gstCgstitem, setgstCgstitem, ctrate, setctrate, strate, setstrate, ctatm, setctatm, statm, setstatm, totaltaxvalueamt, settotaltaxvalueamt, dateHandler, gstincluded, setgstincluded,
    totalcentaxamt, settotalcentaxamt, totalstatetaxamt, settotalstatetaxamt, isinstallationcharge, setisinstallationcharge, otherchargedetail, setOtherchargedetail, editListRows, addOrEditOtherItems,
    stockid, setstockid, stockdate, setstockdate, paymentmode, setpaymentmode, paymentdate, setpaymentdate, stockidcount, setstockidcount, clientName, setclientName, clientPhno, setclientPhno, clientAdd, setclientAdd,
    stockHistoryData, setstockHistoryData, invoiceHistroyUpdateFlag, setinvoiceHistroyUpdateFlag, selectedStockEdit, cleartallStock, handleInvoiceExportXlsx, displayhsntable, setdisplayhsntable,


    singlestockitem, setsinglestockitem, desc, setdesc, productid, setproductid, allStockData, setallStockData, productIdList, setproductIdList, clientid, setclientid, clientList, setclientList,
    getAllStocks, allStockList, setallStockList, allstockstotalamt, setallstockstotalamt, calculateSum, getAllStockData, handleExportXlsx, getAllHistoryStockData, allStockHistoryEdit, saleslist, setSalesList,
    allStockSalesList, setallStockSalesList, allstockssalestotalamt, setallstockssalestotalamt, totalsalesamt, settotalsalesamt, salestockidcount, setsalestockidcount, salestockid, setsalestockid, getAllClientList,
    availablestock, setavailablestock, salestockdate, setsalestockdate, getAllSalesCount, salesStockHistoryData, setSalesstockHistoryData, getAllHistorySalesStockData, allSaleStockHistoryEdit, handleHistoryExportXlsx,
    allStockAddedList, setallStockAddedList, alladdedstockstotalamt, setaddedallstockstotalamt, isloading, setisloading, allProfitStockList, setAllProfitStockList, totalprofiramt, settotalprofiramt
  };
  return <Stocks.Provider value={context}>{children}</Stocks.Provider>;
}

export default StocksContext;