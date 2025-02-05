import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { Stocks } from "../../../Context/StocksContex";
import { BsSave } from "react-icons/bs";
import { FaFileInvoice, FaRegIdCard } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import Card from "../../../Style/Card/Card";
import * as localstorage from "../../../Context/localStorageData";
import * as stockDb from "../../../DBconnection/stockDetailBD";

const initialState = {
  productid: "",
  desc: "",
  quantity: 0,
  rate: 0,
  sellingRate: 0,
  amt: 0,
};

const StockForm = ({ getStock, screen, onSubmit, loginuser }) => {
  const tabledet = useContext(Stocks);
  const [stock, setStock] = useState(initialState);
  const [stockid, setstockid] = useState("");
  const [stockdate, setstockstockdate] = useState("");
  const [stockidcount, setstockidcount] = useState(1000);
  const [salestockid, setsalestockid] = useState("");
  const [salestockidcount, setsalestockidcount] = useState(1000);
  // console.log(stock, tabledet);

  useEffect(() => {
    if (screen === "Stocks") getStockIdCounter(loginuser);
    else getSalesStockIdCounter(loginuser);
  }, [tabledet.loginuser]);

  const getStockIdCounter = async (loginuserid) => {
    console.log(loginuserid + " :loginuserid");
    let stockidcounter = localstorage.addOrGetStockid("", "get");
    console.log(stockidcounter + " addOrGetStockid");
    let getStockfromDb = await stockDb.getStockidDB(loginuserid);
    console.log("getStockfromDb.data");
    console.log(getStockfromDb);
    if (getStockfromDb.status === 200) {
      localstorage.addOrGetStockid(getStockfromDb.data, "save");
      setstockidcount(getStockfromDb.data * 1);
      console.log("saving setinvoiceidount " + getStockfromDb.data);
    }
  };

  const getSalesStockIdCounter = async (loginuserid) => {
    let salesstockidcounter = localstorage.addOrGetSaleStockid("", "get");
    console.log(salesstockidcounter + " addOrGetStockid");
    let getSalesStockfromDb = await stockDb.getSalesStockidDB(loginuserid);
    console.log("getSalesStockfromDb.data");
    console.log(getSalesStockfromDb);
    if (getSalesStockfromDb.status === 200) {
      localstorage.addOrGetSaleStockid(getSalesStockfromDb.data, "save");
      setsalestockidcount(getSalesStockfromDb.data);
      console.log("saving setinvoiceidount " + getSalesStockfromDb.data);
    }
  };

  const saveForm = (props) => {
    let datas = {
      id: stockid,
      count: stockidcount,
      date: stockdate,
    };
    onSubmit(datas);
  };

  const stockIdgenerator = (type) => {
    const today = new Date();
    let todaydate;

    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();

    let idcounttype = type === "Stocks" ? stockidcount : salestockidcount;

    let count = idcounttype * 1;
    console.log(
      "idcounttype " +
        count +
        " type " +
        type +
        " salestockidcount " +
        salestockidcount
    );
    if (type === "Stocks") {
      todaydate = `ST${year}${month}${date}${idcounttype}`;
    } else {
      todaydate = `SA${year}${month}${date}${idcounttype}`;
      // setsalestockid(todaydate);
      // setsalestockidcount(++count);
    }
    setstockid(todaydate);
    setstockidcount(++count);
    console.log("todaydate " + todaydate);
  };

  const resetScreen = () => {
    setStock(initialState);
    setstockid("");
    setstockstockdate("");
  };
  return (
    <FormGroup>
      {/* <Card> */}

      <FormGroup>
        <FormControl>
          <Card>
            <Card>
              <h3> {screen} Data</h3>
            </Card>
            <h3>Add {screen} details below</h3>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: "5px",
              }}
            >
              <Autocomplete
                value={stock.productid}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text"
                options={[]}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    required
                    id="outlined-required"
                    label="Product Id"
                    onChange={(e) =>
                      setStock({ ...stock, productid: e.target.value })
                    }
                    {...params}
                  />
                )}
              />
              <TextField
                required
                id="outlined-required"
                label="Product description"
                value={stock.desc}
                onChange={(e) => setStock({ ...stock, desc: e.target.value })}
              />

              <TextField
                required
                id="outlined-required"
                label="Quantity"
                value={stock.quantity}
                type="number"
                onChange={(e) =>
                  setStock({ ...stock, quantity: e.target.value })
                }
              />

              <TextField
                required
                id="outlined-required"
                label="Rate"
                value={stock.rate}
                type="number"
                onChange={(e) => setStock({ ...stock, rate: e.target.value })}
              />
              <TextField
                required
                id="outlined-required"
                label="Selling Rate"
                value={stock.sellingRate}
                type="number"
                onChange={(e) =>
                  setStock({ ...stock, sellingRate: e.target.value })
                }
              />

              <TextField
                required
                id="outlined-required"
                label="Amount"
                value={stock.amt}
                type="number"
                onChange={(e) => setStock({ ...stock, amt: e.target.value })}
              />

              <Stack direction={"row"} justifyContent={"center"} gap={"10px"}>
                <Button
                  variant="contained"
                  color="success"
                  size="medium"
                  endIcon={<BsSave />}
                  onClick={() => getStock(stock)}
                >
                  Add Item
                </Button>
              </Stack>
            </Box>
          </Card>

          <Card>
            <Stack
              component="form"
              justifyContent={"center"}
              gap={"10px"}
              sx={{ marginBottom: "15px" }}
            >
              <Card>
                <h3> {screen} Details</h3>
              </Card>

              <Box component="form">
                <>
                  {stockid.length === 0 ? (
                    <div>
                      <Button
                        className="gen-invoice"
                        variant="outlined"
                        endIcon={<FaRegIdCard />}
                        onClick={() => stockIdgenerator(screen)}
                      >
                        Generate {screen} Id
                      </Button>
                    </div>
                  ) : (
                    <div className="invoicegen">
                      {screen} Id Generated: {stockid}
                    </div>
                  )}
                </>
                Bought date:
                <input
                  type="date"
                  className="date-field"
                  onChange={(e) => setstockstockdate(e.target.value)}
                  title="payement"
                  size={210}
                  id="dateDefault"
                  value={stockdate}
                  aria-label="stock"
                />
              </Box>

              <Button
                variant="contained"
                color="success"
                size="medium"
                endIcon={<FaFileInvoice />}
                onClick={saveForm}
              >
                Save {screen}
              </Button>

              <Button
                variant="contained"
                color="warning"
                size="medium"
                endIcon={<GrClearOption />}
                onClick={() => resetScreen()}
              >
                Clear Form
              </Button>
            </Stack>
          </Card>
        </FormControl>
      </FormGroup>
      {/* </Card> */}
    </FormGroup>
  );
};

export default StockForm;
