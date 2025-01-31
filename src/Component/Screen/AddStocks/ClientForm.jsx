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
import React, { useState } from "react";
import { FaFileInvoice, FaRegIdCard } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { v4 as uuid } from "uuid";

const initialState = {
  clientName: "",
  clientPhno: 0,
  clientAdd: "",
  stockid: "",
  stockdate: "",
};

const ClientForm = () => {
  const [clientData, setClientData] = useState(initialState);

  return (
    <>
      <FormGroup>
        <FormControl>
          <Card sx={{ marginTop: "40px" }}>
            <h3>Client Details</h3>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: "5px",
                marginBottom: "10px",
              }}
            >
              <Autocomplete
                value={clientData.clientName}
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
                    label="Client Name"
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        clientName: e.target.value,
                      })
                    }
                    {...params}
                  />
                )}
              />

              <TextField
                id="outlined-required"
                label="Client Phone Number"
                value={clientData.clientPhno}
                type="number"
                onChange={(e) =>
                  setClientData({ ...clientData, clientPhno: e.target.value })
                }
              />

              <TextField
                id="outlined-required"
                label="Client Address"
                multiline
                value={clientData.clientAdd}
                onChange={(e) =>
                  setClientData({ ...clientData, clientAdd: e.target.value })
                }
              />
            </Box>

            <h3>Stocks Details</h3>
            <Box component="form">
              {clientData.stockid.length == 0 ? (
                <div>
                  <Button
                    className="gen-invoice"
                    variant="outlined"
                    endIcon={<FaRegIdCard />}
                    onClick={() =>
                      setClientData({ ...clientData, stockid: uuid() })
                    }
                  >
                    Generate Stock Id
                  </Button>
                </div>
              ) : (
                <div className="invoicegen">
                  Stock Id Generated: {clientData.stockid}
                </div>
              )}
              Bought date:
              <input
                type="date"
                className="date-field"
                onChange={(e) =>
                  setClientData({ ...clientData, stockdate: e.target.value })
                }
                title="payement"
                size={210}
                id="dateDefault"
                value={clientData.stockdate}
                aria-label="stock"
              />
            </Box>

            <Stack
              component="form"
              direction={"row"}
              justifyContent={"center"}
              gap={"10px"}
              sx={{ marginBottom: "15px" }}
            >
              <Button
                variant="contained"
                color="success"
                size="medium"
                endIcon={<FaFileInvoice />}
                onClick={() => {}}
              >
                Save Stocks
              </Button>

              <Button
                variant="contained"
                color="warning"
                size="medium"
                endIcon={<GrClearOption />}
                onClick={() => setClientData(initialState)}
              >
                Reset Screen
              </Button>
            </Stack>
          </Card>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default ClientForm;
