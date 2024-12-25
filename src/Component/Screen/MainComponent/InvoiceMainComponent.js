import React, { useRef } from "react";
import Card from "../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { BsFileEarmarkPdfFill } from "react-icons/bs";

import InvoiceDetails from "../InvoiceDetails/InvoiceDetails";
import InvoiceDeatilsEdit from "../InvoiceDetails/InvoiceDeatilsEdit";
import Tables from "../Table/InvoiceTable/Table";

const InvoiceMainComponent = (props) => {
    const componentRef = useRef();
    return <>
    <h2>Generate Invoice</h2>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={7}>

                    <Card >
                        <h2>Edit/Preview Section</h2>
                        <Tables screen="update" />
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    < >
                        <InvoiceDeatilsEdit />
                    </>
                </Grid>

            </Grid>
            <Card>
                <ReactToPrint
                    trigger={() => (
                        <Button variant="contained" color="info" endIcon={<BsFileEarmarkPdfFill />} >
                            Download
                        </Button>
                    )}
                    content={() => componentRef.current}
                />
                <div ref={componentRef}>
                    <InvoiceDetails screen="display" />

                </div>
            </Card>
        </Box>
    </>
}

export default InvoiceMainComponent;