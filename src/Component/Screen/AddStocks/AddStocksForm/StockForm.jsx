import {
  Autocomplete,
  Box,
  Button,
  Card,
  FormControl,
  FormGroup,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Stocks } from "../../../Context/StocksContex";
import { GrClearOption } from "react-icons/gr";
import { BsSave } from "react-icons/bs";

const initialState = {
  productid: "",
  desc: "",
  quantity: 0,
  rate: 0,
  sellingRate: 0,
  amt: 0,
};

const StockForm = ({ getStock }) => {
  const tabledet = useContext(Stocks);
  const [stock, setStock] = useState(initialState);
  console.log(stock, tabledet);

  return (
    <FormGroup>
      <Card>
        <ToastContainer
          position="top-center"
          theme="colored"
          containerId="Invoice"
        />
        <h3> Stocks Data</h3>
        <FormGroup>
          <FormControl>
            <Card>
              <h3>Add Stocks details below</h3>
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

                  <Button
                    variant="contained"
                    color="warning"
                    size="medium"
                    endIcon={<GrClearOption />}
                    onClick={() => setStock(initialState)}
                  >
                    Clear Form
                  </Button>
                </Stack>
              </Box>
            </Card>
          </FormControl>
        </FormGroup>
      </Card>
    </FormGroup>
  );
};

export default StockForm;
