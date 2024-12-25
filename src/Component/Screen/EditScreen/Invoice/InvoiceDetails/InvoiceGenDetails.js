import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';
import { FaRegIdCard } from "react-icons/fa6";
import { AllState } from "../../../../Context/allStateContext";
// import '../YourDetails.css';
import Card from "../../../../Style/Card/Card";


const InvoiceGenDetails = () => {

  const invoicedet = useContext(AllState);
 
  return <>
    <FormGroup>
      <FormControl>
        <Card>
          <h3>Client Details</h3>

          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
            <TextField required id="outlined-required" label="Client Name" value={invoicedet.clientName}
              // onChange={(e)=>invoicedet.setclientName(e.target.value)}
              onChange={(e) => invoicedet.setval(e, invoicedet.setclientName)}
              color={invoicedet.setboxColors(invoicedet.clientName, 'color')}
              error={invoicedet.setboxColors(invoicedet.clientName, 'error')}

            // error={invoicedet.clientName.length ==0?'true':'false'} 
            />
            <TextField id="outlined-required" label="Client Phone Number" value={invoicedet.clientPhno}
              onChange={(e) => invoicedet.setval(e, invoicedet.setclientPhno)}
              color={invoicedet.setboxColors(invoicedet.clientPhno, 'color')}
            //  error={invoicedet.setboxColors(invoicedet.clientPhno,'error')} 
            />

            <TextField id="outlined-required" label="Client Address" multiline value={invoicedet.clientAdd}
              onChange={(e) => invoicedet.setval(e, invoicedet.setclientAdd)}
              color={invoicedet.setboxColors(invoicedet.clientAdd, 'color')}
            //  error={invoicedet.setboxColors(invoicedet.clientAdd,'error')} 
            />

          </Box>

          <h3>
            Invoice Details
          </h3>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', height: '5ch' } }} >

            {invoicedet.invoiceid.length == 0 ?
              <div><Button className="gen-invoice" variant="outlined" endIcon={<FaRegIdCard />}  onClick={invoicedet.dateHandler}>Generate Invoice Id</Button> </div> : <div className="invoicegen"> Invoice Id Generated</div>}
            Invoice date:
            <input type="date" className="date-field" onChange={(e) => invoicedet.setval(e, invoicedet.setinvoicedate)} title="payement" size={210} id="dateDefault" value={invoicedet.invoicedate} aria-label="invoice" />
            Payment date:
            <input type="date" className="date-field" onChange={(e) => invoicedet.setval(e, invoicedet.setpaymentdate)} value={invoicedet.paymentdate} title="payement" size={210} />

            <TextField id="outlined-required" label="Payment Mode" value={invoicedet.paymentmode}
              onChange={(e) => invoicedet.setval(e, invoicedet.setpaymentmode)}
              color={invoicedet.setboxColors(invoicedet.paymentmode, 'color')}
            //  error={invoicedet.setboxColors(invoicedet.paymentmode,'error')} 
            />

          </Box>
        </Card>
      </FormControl>

    </FormGroup>


  </>
}

export default InvoiceGenDetails;