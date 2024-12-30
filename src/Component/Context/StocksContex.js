import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import * as XLSX from "xlsx";

import * as localstorage from '../Context/localStorageData';
import * as invoiceDb from '../DBconnection/invoiceDetailBD';
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
  const [list, setList] = useState([]);
  const [totalamt, settotalamt] = useState(0);
  const [desc, setdesc] = useState('');
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
  const [clientid, setclientid] = useState(null);
  const [cleardetailoption, setcleardetailoption] = useState(true);
  const [gstincluded, setgstincluded] = useState(true);
  const [displayhsntable, setdisplayhsntable] = useState(false);
  const [stockidcount, setstockidcount] = useState(1000);
  const [invoicedate, setinvoicedate] = useState('');
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

  const editListRows = (item, type) => {
    // console.log("item ");
    // console.log(item);
    const removedist = list.filter((alllist) => {
      return alllist.id != item.id;
    });

    if (type === "update") {
      setproductid(item.productid);
      setdesc(item.desc);
      setquantity(item.quantity);
      setrate(item.rate);
      setamount(item.amount);
      toast.info("Item is added in edit section");
    }
    setList(removedist);
    if (type === "delete") {
      toast.warning("Item Deleted");
    }
    // console.log(hsnlist.length + "list.length " +list.length + "otherchargedetail " + otherchargedetail.length );

  };


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


  const addOrUpdateItemHandler = (opt) => {
    if (desc.length !== 0 && quantity > 0 && rate > 0 && amount > 0
      // && ctrate > 0 && strate > 0

    ) {
      if (opt === 'Update') {
        toast.success("Item updated");
      } else {

        let singleitem = {
          id: uuidv4(),
          productid: productid,
          desc: desc,
          quantity: quantity,
          rate: rate,
          amount: amount
        };
        setList([
          ...list,
          singleitem
        ]
        );

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
    sethsn('');
    setproductid('');
    setquantity(0);
    setrateinctax('');
    setrate(0);
    setper('');
    setdisc(15);
    setamount(0);
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

  const saveLocalStock = (singlestock) => {

    if (stockHistoryData !== null) {
      let iscontains = false;
      stockHistoryData.map((item) => {
        if (item.stockid === stockid) {
          item.invoicedate = invoicedate;
          item.paymentmode = paymentmode;
          item.list = list;
          item.totalamt = totalamt;
          item.clientAdd = clientAdd;
          item.clientName = clientName;
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
  }
  const saveStock = async () => {
    console.log('saveStock');
    console.log('loginuserid + loginuserid');
    if (stockid == '' || list.length == 0) {
      toast.warn("Please add the stock or Generate the Stockid");
      return;
    }
    let clientidtemp;
    if (clientid == null) {
      clientidtemp = uuidv4();
      setclientid(clientidtemp);
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
      stockidcount: stockidcount
    }
    console.log(datas);
    saveLocalStock(datas);

    let savedataresponse = await stockDb.saveStockBD(datas, loginuser);
    if (savedataresponse.status !== 200) {
      toast.warn("Issue in saving Stock");
      return;
    }
    console.log('savedataresponse');
    console.log(savedataresponse);

    // localstorage.addOrGetstockid(stockidcount, "save");
    // console.log(stockidcount + ' stockidcount');
    // let savestockidcountdataresponse = await stockDb.savestockid(stockidcount, loginuserid);
    // if (savestockidcountdataresponse.status !== 200) {
    //   toast.warn("Issue in Update");
    //   return;
    // }
    // console.log('savestockidcountdataresponse');
    // console.log(savestockidcountdataresponse);

    toast.success("New Stock saved");

  }

  const selectedStockEdit = (props) => {
    console.log(props);

    let singlestock = props;
    setinvoicedate(singlestock.invoicedate);
    setstockid(singlestock.stockid);
    // setinvoicedate1(singlestock.invoicedate1);
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
        Invoice_date: data.invoicedate,
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
    var invoiceDate =
      date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
    XLSX.writeFile(wb, `MyInvoice_${invoiceDate}.xlsx`);
  }
  const dateHandler = () => {
    const today = new Date();
    let todaydate;

    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();

    todaydate = `ST${year}${month}${date}${stockidcount}`;
    let count = stockidcount * 1;
    setstockid(todaydate);
    setstockidcount(++count);
    // console.log("stockidcount: " + count);
    // console.log("todaydate: " + todaydate);
    // setstockid()
  }

  const cleartallStock = () => {

    setinvoicedate('');
    setstockid('');
    // setinvoicedate1(singleinvoice.invoicedate1);
    setpaymentdate('');
    // setpaymentdate1(singleinvoice.paymentdate1);
    setpaymentmode('');
    setList([]);
    sethsnList([]);
    setOtherchargedetail([]);
    settotalcentaxamt('');
    settotalstatetaxamt('');
    setsubtotalamt('');
    settotalamt('');
    settotalamtwords('');
    settotaltaxvalueamt('');
    settotalhsnamt('');
    settotalhsnamtwords('');
    setclientAdd('');
    setclientName('');
    setclientPhno('');

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
  }, [list])

  const context = {
    list, setList, totalamt, settotalamt, totalamtwords, settotalamtwords, singlehsnitem, setsinglehsnitem, setval, setboxColors, cleardetailoption, setcleardetailoption,
    hsn, sethsn, quantity, setquantity, rateinctax, setrateinctax, rate, setrate, per, setper, disc, setdisc, amount, setamount, otherdesc, setotherdesc, ischargedinhsn, setischargedinhsn, otherdescamt, setotherdescamt,
    totalhsnamt, settotalhsnamt, hsnlist, sethsnList, totalhsnamtwords, settotalhsnamtwords, totalsubamt, saveStock, addOrUpdateItemHandler, clearlistcontent, clearOtherDetails, addOtherItems,
    setsubtotalamt, gstCgstitem, setgstCgstitem, ctrate, setctrate, strate, setstrate, ctatm, setctatm, statm, setstatm, totaltaxvalueamt, settotaltaxvalueamt, dateHandler, gstincluded, setgstincluded,
    totalcentaxamt, settotalcentaxamt, totalstatetaxamt, settotalstatetaxamt, isinstallationcharge, setisinstallationcharge, otherchargedetail, setOtherchargedetail, editListRows, addOrEditOtherItems,
    stockid, setstockid, invoicedate, setinvoicedate, paymentmode, setpaymentmode, paymentdate, setpaymentdate, stockidcount, setstockidcount, clientName, setclientName, clientPhno, setclientPhno, clientAdd, setclientAdd,
    stockHistoryData, setstockHistoryData, invoiceHistroyUpdateFlag, setinvoiceHistroyUpdateFlag, selectedStockEdit, cleartallStock, handleInvoiceExportXlsx, displayhsntable, setdisplayhsntable,


    singlestockitem, setsinglestockitem, desc, setdesc, productid, setproductid, allStockData, setallStockData, productIdList, setproductIdList, clientid, setclientid,clientList, setclientList
  };
  return <Stocks.Provider value={context}>{children}</Stocks.Provider>;
}

export default StocksContext;