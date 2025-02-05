import React, { useContext } from "react";
import { Stocks } from "../../../Context/StocksContex";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import ReactTable from "../../../table/ReactTable";

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

const CurrentStocksTable = () => {
  const logindet = useContext(CompanyDetail);
  const tabledetails = useContext(Stocks);

  let sum1 = 0;
  let tableList = [];
  tableList = tabledetails.allStockList
    .map((item, index) => {
      item.amt = (item.quantity * 1 * item.rate).toFixed(2);
      item.id = index + 1;
      if (
        item.quantity === 0 ||
        item.status === "deleted" ||
        item.status === "Deleted"
      ) {
      } else {
        sum1 = sum1 + item.quantity * 1 * item.rate;
        return item;
      }
    })
    .filter((data) => data !== undefined);
  console.log("tableList ^^ ");
  console.log(tableList);

  // tableList = tableList.map((item, index) => {

  //   return { id: index + 1, ...item, amt: amt };
  // });

  return (
    <>
      <ReactTable
        loading={tabledetails.isloading && logindet.isloaded}
        columns={basiccolumns}
        data={tableList}
        pageSize={10}
        enableExportAndPrint={true}
      />
    </>
  );
};

export default CurrentStocksTable;
