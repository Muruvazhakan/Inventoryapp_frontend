import React, { useContext, useState } from "react";

import { Box, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import AddedStockListTable from "../AddStocks/AddedStockListTable";
import ClientForm from "../AddStocks/ClientForm";
import collect from "collect.js";
import { v4 as uuidv4 } from "uuid";
import StockForm from "../AddStocks/AddStocksForm/StockForm";
import { saveSalesStockBD } from "../../../apis/apis";
import { useSelector } from "react-redux";
const SalesStocks = () => {
  const userState = useSelector((state) => state.user.user);
  const stockState = useSelector((state) => state.stock.stock);
  const [tableData, setTableData] = useState(stockState.saleslist ?? []);

  const initialClientState = {
    clientid: stockState.clientid,
    clientName: stockState.clientName,
    clientPhno: stockState.clientPhno,
    clientAdd: stockState.clientAdd,
    load: false,
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
    console.log("userState.userid + loginuserid");
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
    if (clientDetails.clientid === undefined) {
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
    try {
      await saveSalesStockBD(datas, userState.userid)
        .then((res) => {
          console.log("res");
          console.log(res);
        })
        .finally(() => {
          setclientDetails({ ...clientDetails, load: false });
        });
    } catch (error) {
      // toast.warn("Issue in saving Stock");
      console.log(error);
    }
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
            loginuser={userState.userid}
            defaultValue={stockState}
          />
          <ClientForm
            getclientDetails={(val) => setclientDetails(val)}
            initialClientState={initialClientState}
            loginuser={userState.userid}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default SalesStocks;
