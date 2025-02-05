import React, { useContext } from "react";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import ReactTable from "../../../table/ReactTable";
import { Stocks } from "../../../Context/StocksContex";

const profitcolumns = [
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

const ProfitTable = () => {
  const logindet = useContext(CompanyDetail);
  const tabledetails = useContext(Stocks);

  let tableList = tabledetails.allProfitStockList;
  tableList = tableList.map((item, index) => {
    item.profit = (item.profit * 1).toFixed(2);
    // item.amt = (item.quantity * 1 * item.rate).toFixed(2);
    return { id: index + 1, ...item };
  });

  return (
    <div>
      <ReactTable
        loading={tabledetails.isloading && logindet.isloaded}
        columns={profitcolumns}
        data={tableList}
        pageSize={10}
        enableExportAndPrint={true}
      />
    </div>
  );
};

export default ProfitTable;
