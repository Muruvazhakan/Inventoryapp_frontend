import React, { useContext, useEffect } from "react";
import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { GrClearOption } from "react-icons/gr";

import { BsSave } from "react-icons/bs";

import "react-toastify/dist/ReactToastify.css";

import Card from "../../../Style/Card/Card";
import { Stocks } from "../../../Context/StocksContex";

import './AddStocksForm.css';
const AddStocksForm = () => {

    // const [singleDesc, setSingleDesc] = useState();
    const tabledet = useContext(Stocks);
    return <>
        <Card >
            <ToastContainer position="top-center" theme="colored" containerId="Invoice" />
            <h3>
                Stocks Data
            </h3>
            <FormGroup>
                <FormControl>
                    <Card>
                        <h3>Add Stocks details below</h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' } }}>
                        <TextField required id="outlined-required" label="Product Id" value={tabledet.productid}
                                onChange={(e) => tabledet.setval(e, tabledet.setproductid)}
                                color={tabledet.setboxColors(tabledet.productid, 'color')}
                                error={tabledet.setboxColors(tabledet.productid, 'error')}
                            />
                            <TextField required id="outlined-required" label="Item description" value={tabledet.desc}
                                onChange={(e) => tabledet.setval(e, tabledet.setdesc)}
                                color={tabledet.setboxColors(tabledet.desc, 'color')}
                                error={tabledet.setboxColors(tabledet.desc, 'error')}
                            />

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

                            <TextField required id="outlined-required" label="Amount" value={tabledet.amount} type="number"
                                onChange={(e) => tabledet.setval(e, tabledet.setamount)}
                                color={tabledet.setboxColors(tabledet.amount, 'color')}
                                error={tabledet.setboxColors(tabledet.amount, 'error')}
                            />

                            <div className="button-warn">
                                <Button variant="contained" color="success" size="medium" endIcon={<BsSave />}
                                    onClick={() => tabledet.addOrUpdateItemHandler('Add')}>Add Item</Button>
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