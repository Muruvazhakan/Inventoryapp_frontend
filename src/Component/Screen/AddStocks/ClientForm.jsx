import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { GrClearOption } from "react-icons/gr";
import Card from "../../Style/Card/Card";

const initialState = {
  clientName: "",
  clientPhno: 0,
  clientAdd: "",
  
};

const ClientForm = (props) => {

  const [clientData, setClientData] = useState(initialState);

  return (
    <>
      <FormGroup>
        <FormControl>
          <Card sx={{ marginTop: "40px" }}>
          <Card>
          <h3>Client Details</h3>
      </Card>
            
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

            <Button
                variant="contained"
                color="warning"
                size="medium"
                endIcon={<GrClearOption />}
                onClick={() => setClientData(initialState)}
              >
                Reset Screen
              </Button>
          </Card>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default ClientForm;
