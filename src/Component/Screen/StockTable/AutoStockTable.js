import React, { useContext } from "react";
import { Stocks } from "../../Context/StocksContex";
import { CompanyDetail } from "../../Context/companyDetailContext";
import "./StockTable.css";
import ReactTable from "../../table/ReactTable";

const basiccolumns = [
  { field: "id", headerName: "S.NO", width: 90 },
  {
    field: "productid",
    headerName: "Product Id",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Product Description",
    width: 350,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "quantity",
    // headerName: (props.from === "add" || props.from === "profit" ? "Purchace Rate (₹)" : "Sales Rate (₹)"),
    headerName: "Quantity",
    width: 150,
  },
  {
    field: "rate",
    headerName: "Rate",
    width: 150,
  },
  {
    field: "amt",
    headerName: "Amount (₹)",
    width: 150,
  },
];

const profitcolumns = [
  { field: "id", headerName: "S.NO2", width: 90 },
  {
    field: "productid",
    headerName: "Product Id",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Product Description",
    width: 350,
  },
  {
    field: "rate",
    headerName: "Purchace Rate (₹)",
    width: 150,
  },
  {
    field: "purchaceamount",
    headerName: "Purchace Amount (₹)",
    width: 180,
  },
  {
    field: "salequantity",
    headerName: "Sold Quantity",
    width: 150,
  },
  {
    field: "salerate",
    headerName: "Sold Rate (₹)",
    width: 150,
  },
  {
    field: "saleamount",
    headerName: "Sold Amount (₹)",
    width: 150,
  },
  {
    field: "profit",
    headerName: "Profit Amount (₹)",
    width: 150,
  },
];

const AutoStockTable = (props) => {
  const logindet = useContext(CompanyDetail);
  const tabledetails = useContext(Stocks);

  let sum1 = 0;
  let tableList = [];
  if (props.screen === "allstocks") {
    tableList = tabledetails.allStockList.map((item) => {
      if (
        item.quantity === 0 ||
        item.status === "deleted" ||
        item.status === "Deleted"
      ) {
      } else {
        sum1 = sum1 + item.quantity * 1 * item.rate;
        return item;
      }
    });
  } else if (props.screen === "alladdedstocks") {
    tableList = tabledetails.allStockAddedList;
  } else if (props.screen === "allProfit") {
    tableList = tabledetails.allProfitStockList;
  } else if (props.screen === "add") {
    tableList = tabledetails.list;
  } else if (props.screen === "sale") {
    tableList = tabledetails.saleslist;
  } else {
    tableList = tabledetails.allStockSalesList;
  }

  tableList = tableList.map((item, index) => {
    return { id: index + 1, ...item };
  });

  //   displaylist = displaylist?.map((item, index) => {
  //     item.amt = (item.rate * 1 * item.quantity).toFixed(2);

  //     item.status = item.status ? item.status : "Active";
  //     if (
  //       (item.quantity === 0 ||
  //         item.status === "deleted" ||
  //         item.status === "Deleted") &&
  //       props.screen == "allstocks"
  //     )
  //       return null;
  //     if (props.screen === "allProfit")
  //       item.profit = (item.profit * 1).toFixed(2);
  //     return { ...item, id: index + 1 };
  //   });
  //   // console.log("displaylist  " + " props.screen ^^^ " + props.screen);
  //   // console.log(displaylist)
  //   let localsum =
  //     props.screen === "allstocks"
  //       ? sum1
  //       : props.screen == "alladdedstocks"
  //       ? tabledetails.alladdedstockstotalamt
  //       : props.screen === "allProfit"
  //       ? tabledetails.totalprofiramt
  //       : props.screen == "add"
  //       ? tabledetails.totalamt
  //       : props.screen == "sale"
  //       ? tabledetails.totalsalesamt
  //       : tabledetails.allstockssalestotalamt;

  //   let localsumqty1 = 0,
  //     localsumqty2 = 0,
  //     sumpurchaseamt = 0;

  //   let localsumqty = displaylist.map((item, index) => {
  //     localsumqty1 = localsumqty1 + item.quantity * 1;
  //     if (props.screen === "allProfit")
  //       localsumqty2 = localsumqty2 + item.salequantity * 1;
  //     sumpurchaseamt = sumpurchaseamt + item.purchaceamount * 1;
  //   });
  //   // let localtotal1 = 0;
  //   // let localtotal = displaylist.map((item, index) => {
  //   //     localtotal1 = localtotal1 + (item.quantity * 1 * item.rate);
  //   // });

  //   console.log(
  //     props.screen +
  //       " props.screen" +
  //       localsum +
  //       " localsum  " +
  //       displaylist +
  //       " displaylist",
  //     +" localsumqty ++ " + localsumqty1
  //   );

  //   let from = props.from;
  //   const digit2options = { maximumFractionDigits: 2 };

  return (
    <>
      <ReactTable
        loading={tabledetails.isloading && logindet.isloaded}
        columns={props.screen !== "allProfit" ? basiccolumns : profitcolumns}
        data={tableList}
        pageSize={10}
        enableExportAndPrint={true}
        // totalQuantity={localsumqty1}
        // totalPrice={localsum}
      />
    </>
  );
};

export default AutoStockTable;
