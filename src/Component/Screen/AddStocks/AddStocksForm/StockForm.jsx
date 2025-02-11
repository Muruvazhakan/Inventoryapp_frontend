import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  Stack,
  TextField,
  createFilterOptions,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { Stocks } from "../../../Context/StocksContex";
import { BsSave } from "react-icons/bs";
import { FaFileInvoice, FaRegIdCard } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import Card from "../../../Style/Card/Card";
import { getSalesStockidDB, getStockidDB } from "../../../../apis/apis";
import { updateStock } from "../../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

const filter = createFilterOptions();
const initialState = {
  productid: "",
  desc: "",
  quantity: 0,
  rate: 0,
  sellingRate: 0,
  amt: 0,
  availablequantity: 0,
};

const StockForm = ({ getStock, screen, onSubmit, loginuser }) => {
  const stockState = useSelector((state) => state.stock.stock);
  const stockDispatch = useDispatch();
  const [stock, setStock] = useState(initialState);
  const [stockid, setstockid] = useState("");
  const [stockdate, setstockstockdate] = useState("");
  const [stockidcount, setstockidcount] = useState(1000);
  const [salestockidcount, setsalestockidcount] = useState(1000);
  const [value, setValue] = useState(null);
  const [tit, setit] = useState([]);
  // console.log(stock, tabledet);

  useEffect(() => {
    if (screen === "Stocks") getStockIdCounter(loginuser);
    else getSalesStockIdCounter(loginuser);

    autocompleTitle();
  }, []);

  const getStockIdCounter = async (loginuserid) => {
    console.log(loginuserid + " :loginuserid");
    // let stockidcounter = localstorage.addOrGetStockid("", "get");
    // console.log(stockidcounter + " addOrGetStockid");
    try {
      await getStockidDB(loginuserid).then((res) => {
        localStorage.setItem("stockid", res);
        stockDispatch(
          updateStock({
            stockid: res,
          })
        );
        setstockidcount(res * 1);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesStockIdCounter = async (loginuserid) => {
    try {
      await getSalesStockidDB(loginuserid).then((res) => {
        // console.log(stockidcounter + " addOrGetStockid");
        localStorage.setItem("salestockid", res);
        stockDispatch(
          updateStock({
            salestockid: res,
          })
        );
        setsalestockidcount(res * 1);
      });
    } catch (error) {
      console.log(error);
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

  const filterProdIdAndGetDesc = (prodid) => {
    let filterdata = stockState.allStockData.find((data) => {
      return data.productid == prodid;
    });
    console.log(filterdata);
    console.log(prodid);
    if (filterdata) {
      if (screen === "Stocks") {
        setStock({
          ...stock,
          desc: filterdata.desc,
          productid: filterdata.productid,
        });
      } else {
        setStock({
          ...stock,
          desc: filterdata.desc,
          productid: filterdata.productid,
          availablequantity: filterdata.quantity,
          rate: filterdata.rate,
        });
      }
    }
  };

  const autocompleTitle = () => {
    if (
      stockState.allStockData !== null &&
      stockState.allStockData.length > 0
    ) {
      console.log("autocompleTitle title");
      console.log(stockState.allStockData);
      let allStockData = stockState.allStockData.filter(
        (data) => data != undefined
      );
      let productid = allStockData.map((row) => {
        return { productid: row.productid };
      });
      console.log(productid);
      productid = [].concat.apply([], productid);
      setit(productid);
    }
  };
  const onChangeOnAutoComplete = (event, newValue, type) => {
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        productid: newValue.inputValue,
      });
      stockDispatch(
        updateStock({
          prodid: newValue.inputValue,
        })
      );
    } else {
      if (newValue.productid != null) {
        setValue(newValue.productid);
        stockDispatch(
          updateStock({
            prodid: newValue.productid,
          })
        );

        filterProdIdAndGetDesc(newValue.productid);
      }
    }
  };

  const filterOptionOnAutoComplete = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.title);
    // console.log(isExisting);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        productid: `Add "${inputValue}"`,
      });
    }

    return filtered;
  };

  const getOptionLabelOnAutoComplete = (option) => {
    // Value selected with enter, right from the input
    if (typeof option == "string") {
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }
    // Regular option
    return option.productid;
  };
  const renderOptionOnAutoComplete = (props, option) => {
    const { key, ...optionProps } = props;
    return (
      <li key={key} {...optionProps}>
        {option.productid}
      </li>
    );
  };

  useEffect(() => {
    let amout = (stock.rate * stock.quantity * 1).toFixed(2);
    if (amout > 0) {
      setStock({
        ...stock,
        amt: amout,
      });
    }
  }, [stock.rate, stock.quantity]);
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
                onChange={(event, newValue) =>
                  onChangeOnAutoComplete(event, newValue)
                }
                filterOptions={(options, params) =>
                  filterOptionOnAutoComplete(options, params)
                }
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text"
                options={tit}
                getOptionLabel={(option) =>
                  getOptionLabelOnAutoComplete(option)
                }
                renderOption={(props, option) =>
                  renderOptionOnAutoComplete(props, option)
                }
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
              {screen !== "Stocks" && (
                <TextField
                  required
                  id="outlined-required"
                  label="Available Quantity"
                  value={stock.availablequantity}
                  type="number"
                  disabled
                />
              )}
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
              {screen === "Stocks" && (
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
              )}

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
