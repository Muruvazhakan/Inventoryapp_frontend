import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormGroup,
  TextField,
  createFilterOptions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GrClearOption } from "react-icons/gr";
import Card from "../../Style/Card/Card";
import { FaRegIdCard } from "react-icons/fa";
import * as localstorage from "../../Context/localStorageData";
import * as stockDb from "../../DBconnection/stockDetailBD";
const filter = createFilterOptions();
const ClientForm = (props) => {
  const [clientData, setClientData] = useState(props.initialClientState);
  const [clientList, setclientList] = useState([]);
  const [value, setValue] = useState(null);

  const [tit, setit] = useState([]);

  useEffect(() => {
    getAllClientList(props.loginuser);
  }, []);
  const getAllClientList = async (loginuserid, type, stockdetail) => {
    // setisloading(true);
    let allClientData = localstorage.addOrGetAllClientData("", "get");
    console.log("loginuserid &&&& " + loginuserid);
    let getallClientDatafromdb = await stockDb.getClientDB(loginuserid);
    console.log("allClientData " + allClientData);
    // setclientList(allClientData);
    console.log("**** getallClientDatafromdb &&&& ");
    console.log(getallClientDatafromdb);
    // setisloading(false);
    if (getallClientDatafromdb.status === 200) {
      // localstorage.addOrGetAllClientData(getallClientDatafromdb.data, 'save');
      setclientList(getallClientDatafromdb.data);
      console.log("getallClientDatafromdb ****");
      console.log(clientList);
      autocompleTitle(getallClientDatafromdb.data);
      // if (type === "add") {
      //   getAllHistoryStockData(loginuserid, getallClientDatafromdb.data);
      // } else {
      //   // getAllHistorySalesStockData(loginuserid, getallClientDatafromdb.data);
      //   getAllHistoryStockData(
      //     loginuserid,
      //     getallClientDatafromdb.data,
      //     stockdetail
      //   );
      // }
    }
  };

  const filterProdIdAndGetDesc = (clname) => {
    let filterdata = clientList.find((data) => {
      return data.clientName == clname;
    });
    console.log("filterProdIdAndGetDesc");
    console.log(filterdata);
    if (filterdata) {
      setClientData({
        clientName: filterdata.clientName,
        clientAdd: filterdata.clientAdd,
        clientPhno: filterdata.clientPhno,
        clientid: filterdata.clientid,
      });
    }
  };
  const autocompleTitle = (clientList) => {
    if (clientList !== null && clientList.length > 0) {
      // console.log('autocompleTitle title');
      let clientName = clientList.map((row) => {
        return { clientName: row.clientName };
      });
      // console.log(clientName);
      clientName = [].concat.apply([], clientName);

      setit(clientName);
    }
  };

  const onChangeOnAutoComplete = (event, newValue, type) => {
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        clientName: newValue.inputValue,
      });
      setClientData({ clientName: newValue.inputValue });
      // filterProdIdAndGetDesc(newValue.inputValue);
    } else {
      if (newValue.clientName != null) {
        setValue(newValue.clientName);
        setClientData({ clientName: newValue.clientName });
        filterProdIdAndGetDesc(newValue.clientName);
      }
    }
  };

  const filterOptionOnAutoComplete = (options, params) => {
    const filtered = filter(options, params);
    // // let filtered;
    const { inputValue } = params;

    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.title);
    // console.log(isExisting);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        clientName: `Add "${inputValue}"`,
      });
      setClientData(props.initialClientState);
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
    return option.clientName;
  };

  const renderOptionOnAutoComplete = (props, option) => {
    const { key, ...optionProps } = props;
    return (
      <li key={key} {...optionProps}>
        {option.clientName}
      </li>
    );
  };

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
                    label="Client Name"
                    // onChange={(e) =>
                    //   setClientData({
                    //     ...clientData,
                    //     clientName: e.target.value,
                    //   })
                    // }
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
              <Button
                variant="contained"
                color="success"
                size="medium"
                endIcon={<FaRegIdCard />}
                onClick={() => props.getclientDetails(clientData)}
              >
                Save Client details
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="medium"
                endIcon={<GrClearOption />}
                onClick={() => setClientData(props.initialClientState)}
              >
                Reset
              </Button>
            </Box>
          </Card>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default ClientForm;
