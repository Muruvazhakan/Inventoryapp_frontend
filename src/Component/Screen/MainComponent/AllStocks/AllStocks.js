import React, { useContext, useEffect, useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { RiTableView } from "react-icons/ri";
import { Stocks } from "../../../Context/StocksContex";
import "./AllStocks.css";
import { Link } from "react-router-dom";
import StyleHeader from "../../Header/StyleHeader";
import StockChart from "../AllSaleStocks/StockChart";

import CurrentStocksTable from "./CurrentStocksTable";
import AllStocksTable from "./AllStocksTable";
import {
  getAllHistoryStockDB,
  getAllStocksDB,
  getClientDB,
  getStockidDB,
} from "../../../../apis/apis";
import { updateStock } from "../../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const AllStocks = () => {
  const userState = useSelector((state) => state.user.user);
  const stockState = useSelector((state) => state.stock.stock);
  const stockDispatch = useDispatch();
  const [user, setUser] = useState({
    load: false,
  });

  const tabledet = useContext(Stocks);
  const [viewAllAddedStock, setviewAllAddedStock] = useState(false);
  const paths = [`addstock`, `listofaddedstocks`];
  const buttonNames = [" Add Stocks", "View List of added Stocks"];
  const icons = [<MdAddChart />, <FaRegListAlt />];
  const colors = ["success", "secondary"];

  useEffect(() => {
    console.log(" useEffect AllStocks ");
    getAllStockData();
    // tabledet.getAllStocks("allstocks");
  }, []);

  //chart data

  const getAllStockData = async () => {
    // let allStockData = localstorage.addOrGetAllStockData("", "get");

    try {
      setUser({ ...user, load: true });
      await getAllStocksDB(userState.userid)
        .then((res) => {
          localStorage.setItem("allStockData", res);
          let localsum = calculateSum(res);
          let filterres = res.filter((data) => data != undefined);
          console.log("getAllStockData !!!!!");
          console.log(res);
          filterres = filterres.map((item, index) => {
            item.amt = (item.quantity * 1 * item.rate).toFixed(2);
            item.id = index + 1;
            item.status = item.status ? item.status : "Active";
            return item;
          });
          console.log("after getAllStockData !!!!!");
          console.log(filterres);
          stockDispatch(
            updateStock({
              allStockData: filterres,
              allStockList: filterres,
              allstockstotalamt: localsum,
            })
          );
          getAllClientList(userState.userid, filterres);
          // getAllHistoryStockData(userState.userid, filterres);
        })
        .finally(() => {
          setUser({ ...user, load: false });
        });
      console.log(stockState + "stockState");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllClientList = async (loginuserid, stockdetail) => {
    // let allClientData = localstorage.addOrGetAllClientData("", "get");
    try {
      setUser({ ...user, load: true });
      await getClientDB(loginuserid)
        .then((res) => {
          console.log("getAllStockData !!!!!");
          console.log(res);
          // localStorage.setItem("allStockData", res);
          stockDispatch(
            updateStock({
              clientList: res,
            })
          );
          getAllHistoryStockData(loginuserid, res, stockdetail);
        })
        .finally(() => {
          setUser({ ...user, load: false });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllHistoryStockData = async (
    loginuserid,
    clientdata,
    stockdetail
  ) => {
    // setisloading(true);
    // let allHistoryStockData = localstorage.addOrGetAllHistoryStockData(
    //   "",
    //   "get"
    // );
    await getAllHistoryStockDB(loginuserid)
      .then((res) => {
        console.log("getAllHistoryStockDB !!!!!");
        console.log(res);
        // localStorage.setItem("allStockData", res);
        let localsum = calculateSum(res);
        let deriveClientDetailValue = deriveClientDetail(
          res,
          clientdata,
          "add"
        );
        stockDispatch(
          updateStock({
            stockHistoryData: deriveClientDetailValue,
          })
        );

        deriveStockAddedFromHistory(deriveClientDetailValue, stockdetail);
      })
      .finally(() => {
        setUser({ ...user, load: false });
      });
  };
  const deriveClientDetail = (details, clientdata, type) => {
    let salestocks = details;
    let newvalues = salestocks.map((item, index) => {
      let clientdetail = clientdata.find((data) => {
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

      datas = {
        stockid: item.stockid,
        userid: item.userid,
        rows: item.rows,
        totalamt: item.totalamt,
        stockid: item.stockid,
        clientid: item.clientid,
        lastupdatedstockdate: item.lastupdatedstockdate,
        stockdate: item.stockdate,
        clientName: clientdetail !== undefined ? clientdetail.clientName : null,
        clientPhno: clientdetail !== undefined ? clientdetail.clientPhno : null,
        clientAdd: clientdetail !== undefined ? clientdetail.clientAdd : null,
      };

      //   console.log("%%% salestocks datas $$%%%%");
      // console.log(datas);
      return datas;
    });
    // console.log("%%% newvalues $$%%%%");
    // console.log(newvalues);
    return newvalues;
  };

  const deriveStockAddedFromHistory = (prop, stockdetail) => {
    let accumalatevalue = [];
    let totalamt = 0;
    let propsdata = JSON.parse(JSON.stringify(prop));
    console.log("props propsdata");
    console.log(propsdata);
    let filstockdetail = stockdetail.filter((data) => data != undefined);
    let listofsales = propsdata.map((data) => {
      let singllistofsales = data.rows.map((innerrows) => {
        let found = false;
        let obj2;
        console.log("innerrows obj2");
        console.log(innerrows);

        if (filstockdetail !== undefined) {
          console.log("item.productid obj2");

          obj2 = filstockdetail.find(
            (item) => item.productid === innerrows.productid
          );
        }
        console.log(obj2);
        if (obj2 !== undefined) {
          innerrows.status = obj2.status ? obj2.status : "Active";
          if (obj2.quantity === 0) innerrows.status = "Sold";
        }
        console.log(" deriveStockAddedFromHistory innerrows");
        console.log(innerrows);
        totalamt = totalamt * 1 + innerrows.amount * 1;
        if (accumalatevalue.length > 0) {
          for (let i = 0; i < accumalatevalue.length; i++) {
            if (accumalatevalue[i].productid === innerrows.productid) {
              found = true;
              // console.log("innerrows ^ accumalatevalue ");
              // console.log(accumalatevalue[i]);
              // console.log(innerrows);
              accumalatevalue[i].quantity =
                accumalatevalue[i].quantity * 1 + innerrows.quantity * 1;
              accumalatevalue[i].amount =
                accumalatevalue[i].amount * 1 + innerrows.amount * 1;
              accumalatevalue[i].rate = (
                (accumalatevalue[i].amount * 1) /
                (accumalatevalue[i].quantity * 1)
              ).toFixed(2);
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

    let localsum = calculateSum(accumalatevalue);

    stockDispatch(
      updateStock({
        allStockAddedList: accumalatevalue,
        addedallstockstotalamt: localsum,
      })
    );
    // setallstockssalestotalamt(totalsaleamt);
  };

  // getAllHistorySalesStockData(loginuserid, getallClientDatafromdb.data);
  const calculateSum = (alllistdata) => {
    let localsum = 0,
      sum = 0;
    let val;
    let singleval = alllistdata;
    if (singleval.length > 0) {
      for (let i = 0; i < singleval.length; i++) {
        val = singleval[i].rate * singleval[i].quantity * 1;
        localsum = localsum + val;
      }

      return localsum;
    }
  };

  let displaylist =
    stockState.allStockList.length > 1 &&
    stockState.allStockList.filter(
      (item) =>
        !(
          item === undefined ||
          item.quantity === 0 ||
          item.status === "deleted" ||
          item.status === "Deleted"
        )
    );

  console.log("displaylist &&&");
  console.log(displaylist);
  return (
    <>
      {user.load && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          alignItems={"center"}
          className="spinnerstyle"
        >
          <CircularProgress color="success" size={30} />
        </Stack>
      )}
      <Box className="allstocksdisplaytable">
        {paths.map((item, index) => (
          <CustomCard
            key={index}
            path={item}
            buttonName={buttonNames[index]}
            icon={icons[index]}
            color={colors[index]}
          />
        ))}

        <Card className="listofbuttons">
          <Button
            variant="text"
            color={viewAllAddedStock ? "primary" : "warning"}
            onClick={() => setviewAllAddedStock(!viewAllAddedStock)}
            endIcon={<RiTableView />}
          >
            {viewAllAddedStock
              ? "Click to hide All Added Stocks"
              : "Click to Expand All Added Stocks"}
          </Button>
        </Card>

        <StockChart
          data={displaylist}
          title="Available Stock Count"
          chartlable="Stock Available per product"
        />

        <Card>
          {viewAllAddedStock ? (
            <>
              <StyleHeader>All Stocks</StyleHeader>
              <AllStocksTable
                data={stockState.allStockAddedList}
                isloading={user.load}
              />
            </>
          ) : (
            <>
              {displaylist.length > 0 && (
                <>
                  <StyleHeader>Current Stocks</StyleHeader>
                  <CurrentStocksTable
                    displaylist={displaylist}
                    isloading={user.load}
                  />
                </>
              )}{" "}
            </>
          )}
        </Card>
      </Box>
    </>
  );
};

const CustomCard = ({ path, buttonName, icon, color }) => {
  return (
    <Card className="listofbuttons">
      <Link to={path}>
        <Button variant="outlined" color={color} endIcon={icon}>
          {buttonName}
        </Button>
      </Link>
    </Card>
  );
};

export default AllStocks;
