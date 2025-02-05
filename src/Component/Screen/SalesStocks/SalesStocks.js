import React, { useContext, useState } from "react";

import { Box, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import AddedStockListTable from "../AddStocks/AddedStockListTable";
import ClientForm from "../AddStocks/ClientForm";
import collect from "collect.js";
import { v4 as uuidv4 } from "uuid";
import * as localstorage from "../../Context/localStorageData";
import StockForm from "../AddStocks/AddStocksForm/StockForm";
import { Stocks } from "../../Context/StocksContex";
import * as stockDb from "../../DBconnection/stockDetailBD";
const SalesStocks = () => {
  const tabledetails = useContext(Stocks);
  const [tableData, setTableData] = useState(tabledetails.saleslist ?? []);
  let loginuser = localstorage.addOrGetUserdetail("", "userid", "get");
  const initialClientState = {
    clientid: null,
    clientName: "",
    clientPhno: 0,
    clientAdd: "",
  };
  const [header, setheader] = useState("stockrequest");
  const [clientDetails, setclientDetails] = useState(initialClientState);

  const handelSaveSalesStock = (props) => {
    console.log("handelSaveStock");
    console.log(props);
    console.log(clientDetails);
    saveSalesStock(props);
  };

  const saveSalesStock = async (props) => {
    // setisloading(true);
    console.log("saveStock");
    console.log("loginuserid + loginuserid");
    console.log(tableData);
    // if(screen ==="add"){

    // }

    if (props.id == "" || tableData.length == 0) {
      // toast.warn("Please add the stock or Generate the Stockid");
      return;
    }
    let totalamount = 0;
    totalamount = collect(tableData.map((item) => item.amt * 1))
      .sum()
      .toFixed(2);
    console.log("totalamount" + totalamount);
    let clientidtemp;
    if (clientDetails.clientid === null) {
      clientidtemp = uuidv4();
      setclientDetails({ ...clientDetails, clientid: clientidtemp });
    } else {
      clientidtemp = clientDetails.clientid;
    }
    let datas = {
      authorization: header,
      salestockid: props.id,
      salestocklist: tableData,
      clientid: clientidtemp,
      totalsalesamt: totalamount,
      clientAdd: clientDetails.clientAdd,
      clientName: clientDetails.clientName,
      clientPhno: clientDetails.clientPhno,
      salestockidcount: props.count,
      salestockdate: props.date,
    };
    console.log("sales datas");
    console.log(datas);

    //   saveLocalStock(datas, "sale");

    let savedataresponse = await stockDb.saveSalesStockBD(datas, loginuser);
    if (savedataresponse.status !== 200) {
      // toast.warn("Issue in saving Stock");
      return;
    }
    console.log("savedataresponse");
    console.log(savedataresponse);
    // getAllClientList(loginuser, "add");
    // getAllHistoryStockData(loginuser);
    // getAllStockData(loginuser, screen);
    // setisloading(false);
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <StyleHeader>Sales Stocks</StyleHeader>
      <Stack direction={"row"} width={"100%"} flexWrap={"wrap"}>
        <Box
          sx={{
            height: "calc(100vh - 175px)",
            flex: 0.7,
          }}
        >
          <h2>Edit/Preview Section</h2>
          <AddedStockListTable tableData={tableData} />
        </Box>
        <Box
          sx={{
            height: "calc(100vh - 155px)",
            overflow: "auto",
            flex: 0.3,
          }}
        >
          <StockForm
            screen="Sale Stocks"
            getStock={(val) => setTableData([...tableData, val])}
            onSubmit={handelSaveSalesStock}
            loginuser={loginuser}
          />
          <ClientForm
            getclientDetails={(val) => setclientDetails(val)}
            initialClientState={initialClientState}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default SalesStocks;
