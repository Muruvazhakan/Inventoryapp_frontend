import React from "react";
import ReactTable from "../../../table/ReactTable";

const AllStocksTable = ({ data, isloading, screen }) => {
  const basiccolumns = [
    // { field: "id", headerName: "S.NO", width: 90 },
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
    ...(screen !== "sale"
      ? [
          {
            field: "status",
            headerName: "Status",
            width: 150,
          },
        ]
      : []),
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
  data = data.map((data, index) => {
    return {
      amt: (data.quantity * 1 * data.rate).toFixed(2),
      id: index,
      sno: index + 1,
      ...data,
    };
  });
  console.log(" AllStocksTable data");
  console.log(data);
  const tableList = data ?? [];

  return (
    <>
      <ReactTable
        loading={isloading}
        columns={basiccolumns}
        data={tableList}
        pageSize={10}
        enableExportAndPrint={true}
      />
    </>
  );
};

export default AllStocksTable;
