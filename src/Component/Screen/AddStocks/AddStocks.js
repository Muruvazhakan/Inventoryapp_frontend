import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import AddedStockListTable from "./AddedStockListTable";
import StockForm from "./AddStocksForm/StockForm";
import ClientForm from "./ClientForm";
import collect from "collect.js";
import { v4 as uuidv4 } from "uuid";
import * as localstorage from "../../Context/localStorageData";
import * as stockDb from "../../DBconnection/stockDetailBD";
const AddStocks = () => {
  const [tableData, setTableData] = useState([]);
  let loginuser = localstorage.addOrGetUserdetail("", "userid", "get");
  const initialClientState = {
    clientid: null,
    clientName: "",
    clientPhno: 0,
    clientAdd: "",
  };
  const [header, setheader] = useState("stockrequest");
  const [clientDetails, setclientDetails] = useState(initialClientState);

  const handelSaveStock = (props) => {
    console.log("handelSaveStock");
    console.log(props);
    saveStock(props);
  };

  const saveStock = async (props) => {
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
      stockid: props.id,
      stocklist: tableData,
      clientid: clientidtemp,
      totalamt: totalamount,
      clientAdd: clientDetails.clientAdd,
      clientName: clientDetails.clientName,
      clientPhno: clientDetails.clientPhno,
      stockidcount: props.count,
      stockdate: props.date,
    };
    console.log(datas);

    // saveLocalStock(datas, "add");

    let savedataresponse = await stockDb.saveStockBD(datas, loginuser);
    if (savedataresponse.status !== 200) {
      // toast.warn("Issue in saving Stock");
      return;
    }
    console.log("savedataresponse");
    console.log(savedataresponse);
    // getAllClientList(loginuser, "add");

    // getAllHistoryStockData(loginuser);
    // toast.success("New Stock saved");

    // else {
    //   if (salestockid == "" || saleslist.length == 0) {
    //     // toast.warn("Please add the sale stock or Generate the Sale Stockid");
    //     return;
    //   }
    //   let clientidtemp;
    //   if (clientid == null) {
    //     clientidtemp = uuidv4();
    //     setclientid(clientidtemp);
    //   } else {
    //     clientidtemp = clientid;
    //   }
    //   let datas = {
    //     authorization: header,
    //     salestockid: salestockid,
    //     salestocklist: saleslist,
    //     clientid: clientidtemp,
    //     totalsalesamt: totalsalesamt,
    //     clientAdd: clientAdd,
    //     clientName: clientName,
    //     clientPhno: clientPhno,
    //     salestockidcount: salestockidcount,
    //     salestockdate: salestockdate,
    //   };
    //   console.log("sales datas");
    //   console.log(datas);

    //   saveLocalStock(datas, "sale");

    //   let savedataresponse = await stockDb.saveSalesStockBD(datas, loginuser);
    //   if (savedataresponse.status !== 200) {
    //     // toast.warn("Issue in saving Stock");
    //     return;
    //   }
    //   console.log("savedataresponse");
    //   console.log(savedataresponse);
    //   // getAllClientList(loginuser, "sale");
    //   // getAllStockData(loginuser);
    //   // getAllHistorySalesStockData(loginuser);

    //   // toast.success("New Sale Stock saved");
    // }
    // getAllStockData(loginuser, screen);
    // setisloading(false);
  };

  return (
    <Box sx={{ padding: "10px" }}>
      <StyleHeader>Add Stocks</StyleHeader>
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
            screen="Stocks"
            getStock={(val) => setTableData([...tableData, val])}
            onSubmit={handelSaveStock}
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

export default AddStocks;
