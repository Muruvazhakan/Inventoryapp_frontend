import React, { useContext } from "react";
import { Stocks } from "../../../Context/StocksContex";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import ReactTable from "../../../table/ReactTable";

const basiccolumns = [
  { field: "sno", headerName: "S.NO", width: 90 },
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

const AllStocksTable = ({ data }) => {
  const logindet = useContext(CompanyDetail);
  const tabledetails = useContext(Stocks);
  data = data.map((data,index)=>{
    return {
      sno : index+1,
      ...data
    }
  })
  const tableList = data ?? [];

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

export default AllStocksTable;
