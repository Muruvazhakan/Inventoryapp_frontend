import React, { useContext, useEffect, useRef, useState } from "react";
import { BsFileEarmarkPdfFill, BsFiletypeXlsx } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import { Box, Button } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import StyleHeader from "../../Header/StyleHeader";
import EarningScreen from "../EarningScreen/EarningScreen";

import AutoStockTable from "../../StockTable/AutoStockTable";
import ProfitTable from "./ProfitTable";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../../../../redux/productSlice";

const AllProfit = (props) => {
  const tabledet = useContext(Stocks);
  const userState = useSelector((state) => state.user.user);
  const stockState = useSelector((state) => state.stock.stock);
  const [allProfitStockList, setallProfitStockList] = useState([]);
  const stockDispatch = useDispatch();

  useEffect(() => {
    deriveProfitStock();
    segregateDataByMonth();
  }, []);
  const deriveProfitStock = () => {
    let allStockSalesList = stockState.allStockSalesList;
    let allStockAddedList = stockState.allStockAddedList;
    // setisloading(true);
    console.log("allStockSalesList");
    console.log(allStockSalesList);
    let profitsum = 0;
    if (allStockSalesList.length > 0 && allStockAddedList.length > 0) {
      const mergedArray = allStockSalesList
        .map((obj1) => {
          // Find the corresponding object in array2 by Productid
          const obj2 = allStockAddedList.find(
            (item) => item.productid === obj1.productid
          );
          // console.log("obj1");
          // console.log(obj1);
          // console.log("obj2");
          // console.log(obj2);
          // console.log("obj1.rate + " + obj1.rate * 1 + " obj2.rate " + obj2.rate);
          if (obj2 !== undefined) {
            let profits =
              obj1.quantity * 1 * (obj1.rate * 1) -
              obj1.quantity * 1 * (obj2.rate * 1);
            profitsum = profitsum + (profits ? profits : 0);
            return {
              productid: obj2.productid,
              desc: obj2.desc,
              quantity: obj2.quantity * 1,
              rate: obj2.rate * 1,
              amount: obj2.rate * 1 * obj2.quantity,
              // If a match is found in array2, merge its properties
              salerate: obj1 ? obj1.rate * 1 : undefined,
              saleamount: obj1 ? obj1.amount * 1 : undefined,
              purchaceamount: obj1 ? obj1.quantity * 1 * obj2.rate : undefined,
              salequantity: obj1 ? obj1.quantity * 1 : undefined,
              profit: profits,
            };
          }
        })
        .filter((x) => x !== undefined);
      console.log("mergedArray");
      console.log(mergedArray);
      console.log("profitsum");
      console.log(profitsum);
      stockDispatch(
        updateStock({
          allProfitStockList: mergedArray,
          totalprofiramt: profitsum.toFixed(2),
        })
      );
      setallProfitStockList(mergedArray);
    }
  };
  // const tableDatas = stockState.allProfitStockList?.map((item, index) => {
  //   return { id: index + 1, ...item };
  // });

  const segregateDataByMonth = () => {
    let valudata = [];
    if (stockState.salesstockHistoryData === undefined) return;
    let data = stockState.salesstockHistoryData;
    console.log("segregateDataByMonth");
    console.log(data);
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
  return (
    <>
      <EarningScreen />

      <Card>
        <StyleHeader>Consolidated Profits!</StyleHeader>
        {allProfitStockList.length > 0 && (
          <ProfitTable allProfitStockList={allProfitStockList} />
        )}
      </Card>
    </>
  );
};

export default AllProfit;
