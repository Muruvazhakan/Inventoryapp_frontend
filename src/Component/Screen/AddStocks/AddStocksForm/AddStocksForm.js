import React, { useContext, useEffect, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { GrClearOption } from "react-icons/gr";

import { BsSave } from "react-icons/bs";

import "react-toastify/dist/ReactToastify.css";

import Card from "../../../Style/Card/Card";
import { Stocks } from "../../../Context/StocksContex";

import './AddStocksForm.css';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
const filter = createFilterOptions();

const AddStocksForm = (props) => {

    // const [singleDesc, setSingleDesc] = useState();
    const tabledet = useContext(Stocks);
    const [value, setValue] = React.useState(null);

    const [tit, setit] = useState([]);


    useEffect(() => {
        console.log('tabledet estimateState');
        console.log(tabledet);
        autocompleTitle();
        // console.log('top100Films');
        // console.log(top100Films);

        // let title = 
    }, [tabledet]);

    const filterProdIdAndGetDesc = (prodid) => {

        let filterdata = tabledet.allStockData.find(data => {
            return data.productid == prodid
        })
        console.log("filterProdIdAndGetDesc filterdata");
        console.log(filterdata);
        if (filterdata) {
            tabledet.setdesc(filterdata.desc);
            tabledet.setavailablestock(filterdata.quantity);
            if (filterdata.salerate)
                tabledet.setrate(filterdata.salerate);
        }
    }
    const autocompleTitle = () => {
        if (tabledet.allStockData !== null && tabledet.allStockData.length > 0) {

            // console.log('autocompleTitle title');
            let productid = tabledet.allStockData.map((row) => {
                return { productid: row.productid }
            })
            // console.log(productid);
            productid = [].concat.apply([], productid);
            // console.log(productid);
            // var distinct = [];
            // const unique = [...new Set(productid.map((item) => item))];
            // const ti = unique.map((allrows) => { return { productid: allrows } });

            // tabledet.setproductIdList(productid);


            // console.log(productid);
            // console.log('unique');

            setit(productid);
        }
    }

    // const autocompleTitle = () => {
    //     if (tabledet.allStockData !== null && tabledet.allStockData.length > 0) {
    //         let rows = tabledet.allStockData.map((est) => {
    //             return est.rows

    //         });
    //         console.log('EstimateTableForm title');
    //         title = rows.map((row) => {
    //             return row.map((allrows) => {
    //                 return { title: allrows.title }
    //             });
    //         })
    //         console.log(rows);
    //         title = [].concat.apply([], title);
    //         // console.log(title);
    //         // var distinct = [];
    //         const unique = [...new Set(title.map((item) => item.title))];
    //         const ti = unique.map((allrows) => { return { title: allrows } });

    //         subtitle = rows.map((row) => {
    //             return row.map((allrows) => {
    //                 return allrows.values.map((sub) => {
    //                     return { title: sub.desc }
    //                 });
    //             });
    //         })

    //         subtitle = [].concat.apply([], subtitle);
    //         subtitle = [].concat.apply([], subtitle);
    //         const uniquesub = [...new Set(subtitle.map((item) => item.title))];
    //         const sub = uniquesub.map((allrows) => { return { title: allrows } });
    //         console.log(sub);
    //         setit(ti);
    //         sesubtit(sub);

    //         // console.log(tit);
    //         // console.log('unique');

    //         // console.log(ti);
    //     }
    // }
    const onChangeOnAutoComplete = (event, newValue, type) => {
        // console.log("newValue");
        // console.log(newValue);
        // console.log("event");

        // console.log(event);
        if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
                productid: newValue.inputValue,
            });
            tabledet.setproductid(newValue.inputValue);
            // filterProdIdAndGetDesc(newValue.inputValue);
        }
        else {
            if (newValue.productid != null) {
                setValue(newValue.productid);
                tabledet.setproductid(newValue.productid);
                filterProdIdAndGetDesc(newValue.productid);
            }
        }

    }

    const filterOptionOnAutoComplete = (options, params) => {
        const filtered = filter(options, params);
        // // let filtered;
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        // console.log(isExisting);
        if (inputValue !== '' && !isExisting) {
            filtered.push({
                inputValue,
                productid: `Add "${inputValue}"`,
            });
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
        return option.productid;
    }

    const renderOptionOnAutoComplete = (props, option) => {
        const { key, ...optionProps } = props;
        return (
            <li key={key} {...optionProps}>
                {option.productid}
            </li>
        );
    }

    return <>
        <Card >
            <ToastContainer position="top-center" theme="colored" containerId="Invoice" />
            <h3>
                {props.screen === "add" ? "Stocks Data" : "Sale Stocks Data"}
            </h3>
            <FormGroup>
                <FormControl>
                    <Card>
                        <h3>
                            {props.screen === "add" ? "Add Stocks details below" : "Add Sale Stocks details below"}


                        </h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' } }}>

                            <Autocomplete
                                // value={value}
                                value={tabledet.productid}
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
                                // disabled={tabledet.editprodid}
                                disabled={tabledet.isEditStock && tabledet.stockid !== ''}
                                renderInput={(params) => (
                                    // <TextField label="Title" />
                                    <TextField required id="outlined-required" label="Product Id"
                                        onChange={(e) => tabledet.setval(e, tabledet.setproductid)}
                                        color={tabledet.setboxColors(tabledet.productid, 'color')}
                                        error={tabledet.setboxColors(tabledet.productid, 'error')}  {...params}

                                    />
                                )}
                            />
                            {tabledet.isEditStock && <div > Product Id is disabled </div>}
                            <TextField required id="outlined-required" label="Product description" value={tabledet.desc}
                                onChange={(e) => tabledet.setval(e, tabledet.setdesc)}
                                color={tabledet.setboxColors(tabledet.desc, 'color')}
                                error={tabledet.setboxColors(tabledet.desc, 'error')}
                            />
                            {props.screen == "sale" &&
                                <TextField id="outlined-required" label="Available Quantity" value={tabledet.availablestock} disabled type="number"
                                />}

                            <TextField required id="outlined-required" label="Quantity" value={tabledet.quantity} type="number"
                                onChange={(e) => tabledet.setval(e, tabledet.setquantity)}
                                color={tabledet.setboxColors(tabledet.quantity, 'color')}
                                error={tabledet.setboxColors(tabledet.quantity, 'error')}
                            />

                            <TextField required id="outlined-required" label="Rate" value={tabledet.rate} type="number"
                                onChange={(e) => tabledet.setval(e, tabledet.setrate)}
                                color={tabledet.setboxColors(tabledet.rate, 'color')}
                                error={tabledet.setboxColors(tabledet.rate, 'error')}
                            />
                            {props.screen === "add" &&
                                <TextField required id="outlined-required" label="Selling Rate" value={tabledet.salerate} type="number"
                                    onChange={(e) => tabledet.setval(e, tabledet.setsalerate)}
                                    color={tabledet.setboxColors(tabledet.salerate, 'color')}
                                    error={tabledet.setboxColors(tabledet.salerate, 'error')}
                                />
                            }
                            <TextField required id="outlined-required" label="Amount" value={tabledet.amount} type="number"
                                onChange={(e) => tabledet.setval(e, tabledet.setamount)}
                                color={tabledet.setboxColors(tabledet.amount, 'color')}
                                error={tabledet.setboxColors(tabledet.amount, 'error')}
                            />

                            <div className="button-warn">
                                <Button variant="contained" color="success" size="medium" endIcon={<BsSave />}
                                    onClick={() => tabledet.addOrUpdateItemHandler('Add', props.screen)}>Add Item</Button>
                            </div>
                            <Button variant="contained" color="warning" size="medium" endIcon={<GrClearOption />}
                                onClick={() => tabledet.clearlistcontent()}>Clear Form</Button>
                        </Box>


                    </Card>
                </FormControl>
            </FormGroup>

        </Card>
    </>
}

export default AddStocksForm;