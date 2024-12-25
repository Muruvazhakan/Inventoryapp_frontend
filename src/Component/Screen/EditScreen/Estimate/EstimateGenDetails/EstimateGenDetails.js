import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';
import { FaRegIdCard } from "react-icons/fa6";
import * as moment from 'moment';
import { estimateState } from "../../../../Context/EstimatestateContext";
// import '../YourDetails.css';
import Card from "../../../../Style/Card/Card";


const EstimateGenDetails = (props) => {

    const estimateDet = useContext(estimateState);

    const setval = (e, fun) => {
        fun(e.target.value);
    }
    const setdateval = (e, fun) => {
        let date2= moment(e.target.value).format('DD/MM/YYYY')
       
        estimateDet.setestimatedate1(e.target.value);
        fun(date2);
       
    }
   
    const setboxColors = (item, field) => {
        if (field === 'color') {
            return item.length === 0 ? 'error' : 'success';
        }

        else {
            return item.length === 0 ? true : false;
        }

    }

   

    return <>
        <FormGroup>
            <FormControl>
                <Card>
                    <h3>Client Details</h3>

                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
                        <TextField required id="outlined-required" label="Client Name" value={estimateDet.clientName}
                            // onChange={(e)=>estimateDet.setclientName(e.target.value)}
                            onChange={(e) => setval(e, estimateDet.setclientName)}
                            color={setboxColors(estimateDet.clientName, 'color')}
                            error={setboxColors(estimateDet.clientName, 'error')}

                        // error={estimateDet.clientName.length ==0?'true':'false'} 
                        />
                        <TextField id="outlined-required" label="Client Phone Number" value={estimateDet.clientPhno} type="number"
                            onChange={(e) => setval(e, estimateDet.setclientPhno)}
                            color={setboxColors(estimateDet.clientPhno, 'color')}
                        //  error={setboxColors(estimateDet.clientPhno,'error')} 
                        />

                        <TextField id="outlined-required" label="Client Address" multiline value={estimateDet.clientAdd}
                            onChange={(e) => setval(e, estimateDet.setclientAdd)}
                            color={setboxColors(estimateDet.clientAdd, 'color')}
                        //  error={setboxColors(estimateDet.clientAdd,'error')} 
                        />

                    </Box>

                    <h3>
                        Estimate Details
                    </h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', height: '5ch' } }} >

                        {estimateDet.estimateid.length === 0 ?
                            <div><Button className="gen-invoice" variant="outlined" 
                            onClick={()=>estimateDet.dateHandler()} endIcon={<FaRegIdCard />}  >
                                Generate Estimate Id</Button> </div> : <div className="invoicegen"> Estimate Id Generated</div>}
                              
                        Estimate date:
                        <input type="date" className="date-field" placeholder="dd-mm-yyyy"
                        min="1997-01-01" max="2030-12-31"
                          onChange={(e) => setdateval(e, estimateDet.setestimatedate)} title="estimatedate" size={210} id="dateDefault" 
                          value={ estimateDet.estimatedate1} 
                        // value={  moment(estimateDet.estimatedate).format('DD/MM/YYYY')} 
                         
                          aria-label="estimate" />

                    </Box>
                </Card>
            </FormControl>
        </FormGroup>
    </>
}

export default EstimateGenDetails;