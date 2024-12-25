import React, { useContext, useEffect } from "react";

import '../../GeneralDetails/GeneralDetails.css';
import { AllState } from "../../../Context/allStateContext";
import Card from "../../../Style/Card/Card";
import NoData from "../../NoData/NoData";
import { Button, CircularProgress, Stack } from "@mui/material";
import { RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import { BsFiletypeXlsx } from "react-icons/bs";
// import img  from '.'

const AllInvoiceDetails = () => {

    const invoiceDet = useContext(AllState);
    const companydet = useContext(CompanyDetail);

    useEffect(() => {
        console.log('invoiceHistoryData');
        console.log(invoiceDet.invoiceHistoryData);
        console.log(process.env.REACT_APP_NODE_ENV + 'process.env.REACT_APP_NODE_ENV');
    }, [])

    if (!companydet.isloaded) {

        return (
            <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                <CircularProgress color="success" size={30} />
            </Stack>
        )
    }

    return (

        <>

            {invoiceDet.invoiceHistoryData.length === 0 ?
                <>

                    <NoData details="Invoice Found" />

                </>
                :
                < >
                    <div className="exportExcelbttn" >
                        <Button variant="contained" color="success" size="medium" endIcon={<BsFiletypeXlsx />}
                            onClick={() => invoiceDet.handleInvoiceExportXlsx()}>Export Invoice to Excel</Button>
                    </div>
                    <div className="displayelements">
                        {invoiceDet.invoiceHistoryData.map((item, index) => {
                            // console.log('item');
                            // console.log(item);
                            // console.log(item.estimateid + ' estimateid ' + item.clientName + ' companydet.loginuserid ' +companydet.loginuserid + 'item.userid ' + item.userid );
                            return <>

                                <Card className="  allestimatedisplay" key={index}>
                                    {/* <div className="generaldetails "> */}

                                    <ul className="details invoicedetails details ">

                                        <li >
                                            <div className="companyname"> Invoice ID: {item.invoiceid}</div>
                                        </li>
                                        <li>
                                            <div className="companyname"> Invoice Date: {item.invoicedate}</div>

                                        </li>
                                        {item.paymentdate &&
                                            <li>
                                                <div className="companyname"> Payment Date: {item.paymentdate}</div>

                                            </li>}
                                        {item.paymentmode &&
                                            <li>
                                                <div className="companyname"> Payment Mode: {item.paymentmode}</div>

                                            </li>}
                                    </ul>
                                    <ul className="details">
                                        <div className=" ">
                                            <h3>Client Details</h3>
                                            <li>
                                                Client Name
                                            </li> <div className="nameheigh">{item.clientName} </div>
                                            <li>
                                                Client Phone Number
                                            </li>{item.clientPhno}
                                            <li>
                                                Client Address
                                            </li> {item.clientAdd}
                                        </div>
                                    </ul>
                                    <ul className="details  ">
                                        <div className="">
                                            <h3>Invoice Details</h3>
                                            <li className="">
                                                Total Amount
                                            </li>
                                            <div className="nameheigh">{item.totalamt} </div>
                                            <li>
                                                Total Tax Amount
                                            </li> {item.totaltaxvalueamt}
                                        </div>
                                    </ul>
                                    <ul>
                                        <Link to={{
                                            pathname: `/geninvoice`
                                        }}
                                        >
                                            <Button className="gen-invoice" variant="outlined"
                                                onClick={() => invoiceDet.selectedInvoiceEdit(item)} endIcon={<RiEditCircleFill />}  >

                                                Edit Invoice</Button>
                                        </Link>
                                        {/* </div> */}
                                    </ul>
                                </Card>

                            </>
                        })}

                    </div>
                </>
            }
        </>)
}

export default AllInvoiceDetails;

// totalsubamt=singleinvoice.totalsubamt;        
// totalamt=singleinvoice.totalamt;
// totaltaxvalueamt=singleinvoice.totaltaxvalueamt;

// list=singleinvoice.list;
// hsnlist=singleinvoice.hsnlist;
// otherchargedetail=singleinvoice.otherchargedetail;
// totalcentaxamt=singleinvoice.totalcentaxamt;
// totalstatetaxamt=singleinvoice.totalstatetaxamt;

// totalamtwords=singleinvoice.totalamtwords;

// totalhsnamt=singleinvoice.totalhsnamt;
// totalhsnamtwords=singleinvoice.totalhsnamtwords;
// clientAdd=singleinvoice.clientAdd;
// clientName=singleinvoice.clientName;
// clientPhno=singleinvoice.clientPhno;