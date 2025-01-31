import React, { useContext } from "react";
import ReactTable from "../../table/ReactTable";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { Stocks } from "../../Context/StocksContex";

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

const AddedStockListTable = ({ tableData }) => {
  const logindet = useContext(CompanyDetail);
  const tabledetails = useContext(Stocks);
  const tableList = tableData.map((data, i) => {
    return { id: i + 1, ...data };
  });

  return (
    <ReactTable
      loading={tabledetails.isloading && logindet.isloaded}
      columns={basiccolumns}
      data={tableList}
      pageSize={10}
      enableExportAndPrint={true}
    />
  );
};

export default AddedStockListTable;
