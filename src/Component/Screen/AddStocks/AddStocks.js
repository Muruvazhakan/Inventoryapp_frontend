import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import AddedStockListTable from "./AddedStockListTable";
import StockForm from "./AddStocksForm/StockForm";
import ClientForm from "./ClientForm";
import collect from "collect.js";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getStockidDB, saveStockBD } from "../../../apis/apis";
import { updateStock } from "../../../redux/productSlice";
const AddStocks = () => {
  const userState = useSelector((state) => state.user.user);
  const stockState = useSelector((state) => state.stock.stock);
  const [tableData, setTableData] = useState([]);
  const stockDispatch = useDispatch();
  let loginuser = userState.userid;
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
    console.log("props");
    setclientDetails({ ...clientDetails, load: true });
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
    if (clientDetails.clientid === undefined) {
      clientidtemp = uuidv4();
      console.log(" clientidtemp " + clientidtemp);
      setclientDetails({ ...clientDetails, clientid: clientidtemp });
    } else {
      clientidtemp = clientDetails.clientid;
    }
    console.log(
      " clientidtemp2 " +
        clientidtemp +
        " clientDetails.clientid " +
        clientDetails.clientid
    );
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
    try {
      await saveStockBD(datas, loginuser)
        .then((res) => {
          console.log("res");
          console.log(res);
        })
        .finally(() => {
          setclientDetails({ ...clientDetails, load: false });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ padding: "10px" }}>
      {clientDetails.load && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          alignItems={"center"}
          className="spinnerstyle"
        >
          <CircularProgress color="success" size={30} />
        </Stack>
      )}
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
            loginuser={loginuser}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default AddStocks;
