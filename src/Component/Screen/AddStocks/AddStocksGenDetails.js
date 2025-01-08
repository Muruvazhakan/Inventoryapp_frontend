import React, { useContext, useEffect, useState } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';
import { FaRegIdCard } from "react-icons/fa6";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { Stocks } from "../../Context/StocksContex";
// import '../YourDetails.css';
import Card from "../../Style/Card/Card";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
const filter = createFilterOptions();
const AddStocksGenDetails = (props) => {

    const stockdet = useContext(Stocks);
    const [value, setValue] = React.useState(null);

    const [tit, setit] = useState([]);
    let title;

    useEffect(() => {
        console.log('stockdet estimateState');
        console.log(stockdet);
        autocompleTitle();
        // console.log('top100Films');
        // console.log(top100Films);

        // let title = 
    }, [stockdet]);

    const filterProdIdAndGetDesc = (clname) => {

        let filterdata = stockdet.clientList.find(data => {
            return data.clientName == clname
        })
        console.log("filterProdIdAndGetDesc");
        console.log(filterdata); 
        if (filterdata) {
            stockdet.setclientPhno(filterdata.clientPhno);
            stockdet.setclientAdd(filterdata.clientAdd);
            stockdet.setclientid(filterdata.clientid);
        }
    }
    const autocompleTitle = () => {
        if (stockdet.clientList !== null && stockdet.clientList.length > 0) {

            // console.log('autocompleTitle title');
            let clientName = stockdet.clientList.map((row) => {
                return { clientName: row.clientName }
            })
            // console.log(clientName);
            clientName = [].concat.apply([], clientName);
            // console.log(clientName);
            // var distinct = [];
            // const unique = [...new Set(clientName.map((item) => item))];
            // const ti = unique.map((allrows) => { return { clientName: allrows } });

            // stockdet.setproductIdList(clientName);


            // console.log(clientName);
            // console.log('unique');

            setit(clientName);
        }
    }

    const onChangeOnAutoComplete = (event, newValue, type) => {
        // console.log("newValue");
        // console.log(newValue);
        // console.log("event");

        // console.log(event);
        if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
                clientName: newValue.inputValue,
            });
            stockdet.setclientName(newValue.inputValue);
            // filterProdIdAndGetDesc(newValue.inputValue);
        }
        else {
            if (newValue.clientName != null) {
                setValue(newValue.clientName);
                stockdet.setclientName(newValue.clientName);
                filterProdIdAndGetDesc(newValue.clientName);
            }
        }

    }

    const filterOptionOnAutoComplete = (options, params) => {
        // console.log("filterOptionOnAutoComplete");
        // console.log(options);

        // let filtered;
        const filtered = filter(options, params);
        // // let filtered;
        const { inputValue } = params;
        // console.log("inputValue");
        // console.log(inputValue);
        // console.log("params");
        // console.log(params);
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        // console.log(isExisting);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue,
                clientName: `Add "${inputValue}"`,
            });
            stockdet.setclientPhno('');
            stockdet.setclientAdd('');
            stockdet.setclientid(null);
        }

        return filtered;
    }

    const getOptionLabelOnAutoComplete = (option) => {
        // Value selected with enter, right from the input
        if (typeof option == 'string') {
            return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            return option.inputValue;
        }
        // Regular option
        return option.clientName;
    }

    const renderOptionOnAutoComplete = (props, option) => {
        const { key, ...optionProps } = props;
        return (
            <li key={key} {...optionProps}>
                {option.clientName}
            </li>
        );
    }

    return <>
        <FormGroup>
            <FormControl>
                <Card>
                    <h3>Client Details</h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
                        <Autocomplete
                            // value={value}
                            value={stockdet.clientName}
                            onChange={(event, newValue) => onChangeOnAutoComplete(event, newValue)}
                            filterOptions={(options, params) => filterOptionOnAutoComplete(options, params)}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="free-solo-with-text"
                            options={tit}
                            getOptionLabel={(option) => getOptionLabelOnAutoComplete(option)}
                            renderOption={(props, option) => renderOptionOnAutoComplete(props, option)}
                            // sx={{ width: 300 }}
                            freeSolo
                            renderInput={(params) => (
                                // <TextField label="Title" />
                                <TextField required id="outlined-required" label="Client Name"
                                    onChange={(e) => stockdet.setval(e, stockdet.setclientName)}
                                    color={stockdet.setboxColors(stockdet.clientName, 'color')}
                                    error={stockdet.setboxColors(stockdet.clientName, 'error')}  {...params}
                                />
                            )}
                        />

                        {/* <TextField required id="outlined-required" label="Client Name" value={stockdet.clientName}
                            // onChange={(e)=>stockdet.setclientName(e.target.value)}
                            onChange={(e) => stockdet.setval(e, stockdet.setclientName)}
                            color={stockdet.setboxColors(stockdet.clientName, 'color')}
                            error={stockdet.setboxColors(stockdet.clientName, 'error')}

                        // error={stockdet.clientName.length ==0?'true':'false'} 
                        /> */}
                        <TextField id="outlined-required" label="Client Phone Number" value={stockdet.clientPhno} type="number"
                            onChange={(e) => stockdet.setval(e, stockdet.setclientPhno)}
                            color={stockdet.setboxColors(stockdet.clientPhno, 'color')}
                        //  error={stockdet.setboxColors(stockdet.clientPhno,'error')} 
                        />

                        <TextField id="outlined-required" label="Client Address" multiline value={stockdet.clientAdd}
                            onChange={(e) => stockdet.setval(e, stockdet.setclientAdd)}
                            color={stockdet.setboxColors(stockdet.clientAdd, 'color')}
                        //  error={stockdet.setboxColors(stockdet.clientAdd,'error')} 
                        />

                    </Box>

                    <h3>
                    {props.screen === "add" ? "Stocks Details" : "Sale Stocks Details"} 
                    </h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', height: '5ch' } }} >
                        {props.screen == "add" ? <>
                            {stockdet.stockid.length == 0 ?
                                <div>
                                    <Button className="gen-invoice" variant="outlined" endIcon={<FaRegIdCard />} onClick={() => stockdet.dateHandler("stock")}>Generate Stock Id</Button> </div> : <div className="invoicegen"> Stock Id Generated: {stockdet.stockid}
                                </div>}
                            Bought date:
                            <input type="date" className="date-field" onChange={(e) => stockdet.setval(e, stockdet.setstockdate)} title="payement" size={210} id="dateDefault" value={stockdet.stockdate} aria-label="stock" />
                        </>
                            : <>
                                {stockdet.salestockid.length == 0 ?
                                    <div>
                                        <Button className="gen-invoice" variant="outlined" endIcon={<FaRegIdCard />} onClick={() => stockdet.dateHandler("sale")}>Generate Sale Stock Id</Button> </div> : <div className="invoicegen"> Sale Stock Id Generated: {stockdet.salestockid}
                                    </div>}
                                Sale date:
                                <input type="date" className="date-field" onChange={(e) => stockdet.setval(e, stockdet.setsalestockdate)} title="payement" size={210} id="dateDefault" value={stockdet.salestockdate} aria-label="salestock" />
                            </>
                        }

                    </Box>

                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>

                        <div className="button-warn">
                            <Button variant="contained" color="success" size="medium" endIcon={<FaFileInvoice />}
                                onClick={() => stockdet.saveStock(props.screen)}>
                                    {props.screen === "add" ? "Save Stocks" : "Save Sale Stocks"}
                                </Button>
                        </div>

                        <div className="button-warn buttonspace">
                            <Button variant="contained" color="warning" size="medium" endIcon={<GrClearOption />}
                                onClick={() => stockdet.cleartallStock(props.screen)}> Reset Screen</Button>
                        </div>
                    </Box>
                </Card>
            </FormControl>

        </FormGroup>


    </>
}

export default AddStocksGenDetails;