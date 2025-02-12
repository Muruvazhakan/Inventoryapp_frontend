import React, { useContext, useEffect, useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import "../AllStocks/AllStocks.css";
import { Link } from "react-router-dom";
import StyleHeader from "../../Header/StyleHeader";
import StockChart from "./StockChart";
import AllStocksTable from "../AllStocks/AllStocksTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllHistorySalesStockDB, getClientDB } from "../../../../apis/apis";
import { updateStock } from "../../../../redux/productSlice";

const AllSaleStocks = () => {
  const tabledetails = useContext(Stocks);

  const tableList = tabledetails.allStockSalesList;

  const userState = useSelector((state) => state.user.user);
  const stockState = useSelector((state) => state.stock.stock);
  const [user, setUser] = useState({
    load: false,
  });
  const stockDispatch = useDispatch();
  useEffect(() => {
    console.log(" useEffect AllSaleStocks ");
    tabledetails.getAllStocks("AllSaleStocks");
    getAllClientList(userState.userid);
  }, []);

  const getAllClientList = async (loginuserid) => {
    // let allClientData = localstorage.addOrGetAllClientData("", "get");
    let clientList = [];
    console.log("getAllStockData !!!!!");
    if (stockState.clientList.length > 0) {
      clientList = stockState.clientList;
    } else {
      try {
        setUser({ ...user, load: true });
        await getClientDB(loginuserid)
          .then((res) => {
            console.log("getAllStockData !!!!!");
            console.log(res);
            // localStorage.setItem("allStockData", res);
            clientList = res;
            stockDispatch(
              updateStock({
                clientList: res,
              })
            );
          })
          .finally(() => {
            setUser({ ...user, load: false });
          });
      } catch (error) {
        console.log(error);
      }
    }
    getAllHistorySalesStockData(loginuserid, clientList);
  };

  const getAllHistorySalesStockData = async (loginuserid, clientdata) => {
    try {
      await getAllHistorySalesStockDB(loginuserid)
        .then((res) => {
          localStorage.setItem("allSaleStockData", res);
          // let localsum = calculateSum(res);
          let filterres = res.filter((data) => data != undefined);

          let deriveClientDetailValue = deriveClientDetail(
            filterres,
            clientdata
          );

          deriveSaleStockFromHistory(deriveClientDetailValue);
          console.log("after getAllSaleStockData !!!!!");
          console.log(deriveClientDetailValue);
          const resultsegregateDataByMonth = segregateDataByMonth(
            deriveClientDetailValue
          );

          stockDispatch(
            updateStock({
              salesStockHistoryData: deriveClientDetailValue,
              segregatedMonthData: resultsegregateDataByMonth,
            })
          );
        })
        .finally(() => {
          setUser({ ...user, load: false });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const segregateDataByMonth = (data) => {
    console.log("segregateDataByMonth");
    console.log(data);
    let valudata = [];
    data = data.filter((data) => data.salestockdate !== "");
    data.reduce((acc, item) => {
      // Get the month and year from the salestockdate
      console.log("item segra");
      console.log(item);
      if (item.salestockdate && item.salestockdate !== "") {
        const monthYear = new Date(item.salestockdate).toLocaleString(
          "default",
          { month: "short", year: "numeric" }
        );
        console.log("item monthYear");
        console.log(monthYear);

        if (monthYear) {
          console.log(acc[monthYear]);
          // Initialize the month entry if not exists
          if (!acc[monthYear]) {
            acc[monthYear] = {
              totalSalesAmount: 0,
              totalProfit: 0,
            };
          }
          console.log("item acc");
          console.log(acc);
          // Add the totalsalesamt to the respective month
          acc[monthYear].totalSalesAmount += item.totalsalesamt * 1;
          // Assuming profit is the same as totalsalesamt for simplicity; adjust as necessary
          acc[monthYear].totalProfit += item.totalsalesamt * 1;
          console.log("item acc");
          console.log(acc);
          valudata = acc;
          return acc;
        }
      }
    }, {});

    console.log("after resultsegregateDataByMonth");
    console.log(valudata);

    valudata = sortBydate(valudata);
    console.log("sortedDates valudata");
    return valudata;
  };

  const sortBydate = (data) => {
    return Object.fromEntries(
      Object.entries(data).sort((a, b) => {
        const [monthA, yearA] = a[0].split(" ");
        const [monthB, yearB] = b[0].split(" ");

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthAIndex = months.indexOf(monthA);
        const monthBIndex = months.indexOf(monthB);

        if (yearA !== yearB) {
          return yearA - yearB; // Sort by year
        }
        return monthAIndex - monthBIndex; // Sort by month if years are the same
      })
    );
  };

  const deriveClientDetail = (details, clientdata) => {
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
        salestockid: item.salestockid,
        userid: item.userid,
        rows: item.rows,
        totalsalesamt: item.totalsalesamt,
        salestockid: item.salestockid,
        clientid: item.clientid,
        lastupdatedsalestockdate: item.lastupdatedsalestockdate,
        salestockdate: item.salestockdate,
        clientName: clientdetail !== undefined ? clientdetail.clientName : null,
        clientPhno: clientdetail !== undefined ? clientdetail.clientPhno : null,
        clientAdd: clientdetail !== undefined ? clientdetail.clientAdd : null,
      };

      return datas;
    });
    // console.log("%%% newvalues $$%%%%");
    // console.log(newvalues);
    return newvalues;
  };

  const deriveSaleStockFromHistory = (props) => {
    console.log("props");
    // console.log(salesStockHistoryData);
    let accumalatevalue = [];

    let totalsaleamt = 0;
    let propsdata = JSON.parse(JSON.stringify(props));
    let listofsales = propsdata.map((data) => {
      let singllistofsales = data.rows.map((innerrows) => {
        console.log("innerrows deriveSaleStockFromHistory");
        console.log(innerrows);
        // innerrows.status = innerrows.status ? innerrows.status : "Active";
        let found = false;
        totalsaleamt =
          totalsaleamt * 1 + (innerrows.amt ? innerrows.amt : 0) * 1;
        if (accumalatevalue.length > 0) {
          for (let i = 0; i < accumalatevalue.length; i++) {
            if (accumalatevalue[i].productid === innerrows.productid) {
              found = true;
              accumalatevalue[i].quantity =
                (accumalatevalue[i].quantity
                  ? accumalatevalue[i].quantity * 1
                  : 0) +
                innerrows.quantity * 1;
              accumalatevalue[i].amt =
                (accumalatevalue[i].amt ? accumalatevalue[i].amt * 1 : 0) +
                innerrows.amt * 1;
              accumalatevalue[i].rate = (
                (accumalatevalue[i].amt * 1) /
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

    console.log("deriveSaleStockFromHistory");
    console.log(accumalatevalue);
    stockDispatch(
      updateStock({
        allStockSalesList: accumalatevalue,
        allstockssalestotalamt: totalsaleamt.toFixed(2),
      })
    );

    // allstockssalestotalamt
  };

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
      <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}>
        <Card className="listofbuttons">
          <Link
            to={{
              pathname: `salestock`,
            }}
          >
            <Button variant="outlined" color="success" endIcon={<MdAddChart />}>
              Sale Stocks
            </Button>
          </Link>
        </Card>

        <Card className="listofbuttons">
          <Link
            to={{
              pathname: `listofaddedsalestocks`,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<FaRegListAlt />}
            >
              View List of added Sale Stocks
            </Button>
          </Link>
        </Card>

        <Card>
          <StockChart
            data={stockState.allStockSalesList}
            title="Sales Count"
            chartlable="Sales per product"
          />
        </Card>

        <Card>
          <StyleHeader>All Sale Stocks</StyleHeader>
          <AllStocksTable data={stockState.allStockSalesList} screen="sale" />
        </Card>
      </Box>
    </>
  );
};

export default AllSaleStocks;
