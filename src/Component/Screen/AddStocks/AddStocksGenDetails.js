import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';
import { FaRegIdCard } from "react-icons/fa6";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { Stocks } from "../../Context/StocksContex";
// import '../YourDetails.css';
import Card from "../../Style/Card/Card";


const AddStocksGenDetails = () => {

    const stockdet = useContext(Stocks);

    return <>
        <FormGroup>
            <FormControl>
                <Card>
                    <h3>Client Details</h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
                        <TextField required id="outlined-required" label="Client Name" value={stockdet.clientName}
                            // onChange={(e)=>stockdet.setclientName(e.target.value)}
                            onChange={(e) => stockdet.setval(e, stockdet.setclientName)}
                            color={stockdet.setboxColors(stockdet.clientName, 'color')}
                            error={stockdet.setboxColors(stockdet.clientName, 'error')}

                        // error={stockdet.clientName.length ==0?'true':'false'} 
                        />
                        <TextField id="outlined-required" label="Client Phone Number" value={stockdet.clientPhno}
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
                        Stock Added Details
                    </h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', height: '5ch' } }} >

                        {stockdet.invoiceid.length == 0 ?
                            <div><Button className="gen-invoice" variant="outlined" endIcon={<FaRegIdCard />} onClick={stockdet.dateHandler}>Generate Stock Id</Button> </div> : <div className="invoicegen"> Stock Id Generated</div>}
                        Bought date:
                        <input type="date" className="date-field" onChange={(e) => stockdet.setval(e, stockdet.setinvoicedate)} title="payement" size={210} id="dateDefault" value={stockdet.invoicedate} aria-label="invoice" />
                        <TextField id="outlined-required" label="Payment Mode" value={stockdet.paymentmode}
                            onChange={(e) => stockdet.setval(e, stockdet.setpaymentmode)}
                            color={stockdet.setboxColors(stockdet.paymentmode, 'color')}
                        //  error={stockdet.setboxColors(stockdet.paymentmode,'error')} 
                        />

                    </Box>

                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>

                        <div className="button-warn">
                            <Button variant="contained" color="success" size="medium" endIcon={<FaFileInvoice />}
                                onClick={stockdet.saevStock}>Save Stocks</Button>
                        </div>

                        <div className="button-warn buttonspace">
                            <Button variant="contained" color="warning" size="medium" endIcon={<GrClearOption />}
                                onClick={stockdet.cleartallStock}> Reset Stock Screen</Button>
                        </div>
                    </Box>
                </Card>
            </FormControl>

        </FormGroup>


    </>
}

export default AddStocksGenDetails;