import React, { useContext, useEffect } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";

import '../../GeneralDetails/GeneralDetails.css';
import { Stocks } from "../../../Context/StocksContex";
import Card from "../../../Style/Card/Card";
import NoData from "../../NoData/NoData";
import { Button, CircularProgress, Stack } from "@mui/material";
import { RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsFiletypeXlsx } from "react-icons/bs";
// import img  from '.'

const ListOfAddedSaleStocks = (props) => {

    const stocksdet = useContext(Stocks);
    const companydet = useContext(CompanyDetail);
    const digit2options = { maximumFractionDigits: 2 }
    useEffect(()=>{
        console.log('ListOfAddedSaleStocks');

        console.log(stocksdet.salesStockHistoryData);
        
    },[stocksdet.salesStockHistoryData])

    if (!companydet.isloaded) {

        return (
            <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                <CircularProgress color="success" size={30} />
            </Stack>
        )
    }
    return (

        <>
            {stocksdet.salesStockHistoryData === null || stocksdet.salesStockHistoryData.length ===0 ?
                <>
                    <NoData details="Sales Stock Found" />
                </>
                :
                < >
                    <div className="listofstickexcelbtn" >
                        <Button variant="contained" color="success" size="medium" endIcon={<BsFiletypeXlsx />}
                            onClick={() => stocksdet.handleHistoryExportXlsx("sale")}>Export History Sales Stock to Excel</Button>
                    </div>
                    <div className="displayelements">
                        {stocksdet.salesStockHistoryData.map((item, index) => {
                            // console.log('item');
                            // console.log(item);
                            // let clientdetail = null;
                            //  clientdetail = stocksdet.clientList.find(data => {
                            //     // console.log("data.clientid");
                            //     // console.log(data.clientid + " //// "+ item.clientid);
                            //        if(data.clientid == item.clientid){
                            //         // console.log("^^^found data.clientid&&&&");
                            //         // console.log(data);
                            //         return data;
                            //     }
                            // });
                           
                            return <>

                                <Card className="  allestimatedisplay" key={index}>
                                    {/* <div className="generaldetails "> */}
                                   
                                    <ul className="details invoicedetails details ">
                                        <li >
                                            <div className="companyname"> Sales Stock ID: {item.salestockid}</div>
                                        </li>
                                        <li>
                                            <div className="companyname"> Sale Date: {item.salestockdate}</div>

                                        </li>
                                    </ul>
                                    {item.clientName && 
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
                                    </ul>}
                                    <ul className="details  ">
                                        <div className="">
                                            <h3>Sale Stock Value</h3>
                                            <li>
                                                Total Cost
                                            </li> <div className="nameheigh"> ₹ {Intl.NumberFormat("en-IN", digit2options).format(item.totalsalesamt)} </div> 
                                        </div>
                                    </ul>
                                    <Link to={{
                                        pathname: `/salestock`
                                    }}
                                    >
                                        <Button className="gen-stocks" variant="outlined"
                                            onClick={() => stocksdet.allSaleStockHistoryEdit(item)}  
                                            endIcon={<RiEditCircleFill />} 
                                             >

                                            Edit Sales Stocks</Button>
                                    </Link>
                                    {/* </div> */}

                                </Card>

                            </>
                           
                        })}
                    </div>
                </>
            }
        </>)
}

export default ListOfAddedSaleStocks;