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

const ListOfAddedStocks = () => {

    const stocksdet = useContext(Stocks);
    const companydet = useContext(CompanyDetail);
    const digit2options = { maximumFractionDigits: 2 }
    useEffect(()=>{
        console.log('ListOfAddedStocks');

        console.log(stocksdet.stockHistoryData);
        
    },[])

    if (!companydet.isloaded) {

        return (
            <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                <CircularProgress color="success" size={30} />
            </Stack>
        )
    }
    return (

        <>
            {stocksdet.stockHistoryData === null || stocksdet.stockHistoryData.length ===0 ?
                <>
                    <NoData details="Stock Found" />
                </>
                :
                < >
                    <div className="exportExcelbttn" >
                        <Button variant="contained" color="success" size="medium" endIcon={<BsFiletypeXlsx />}
                            onClick={() => stocksdet.handleHistoryExportXlsx("add")}>Export History Stock to Excel</Button>
                    </div>
                    <div className="displayelements">
                        {stocksdet.stockHistoryData.map((item, index) => {
                            // console.log('item');
                            let clientdetail = null;
                             clientdetail = stocksdet.clientList.find(data => {
                                // console.log("data.clientid");
                                // console.log(data.clientid + " //// "+ item.clientid);
                                   if(data.clientid == item.clientid){
                                    // console.log("^^^found data.clientid&&&&");
                                    // console.log(data);
                                    return data;
                                }
                            })
                            // console.log("clientdetail &&&&");
                            // console.log(clientdetail);
                            // console.log("item");
                            // console.log(item);
                            // console.log("stocksdet.clientList");
                            // console.log(stocksdet.clientList);
                            // console.log(item.estimateid + ' estimateid ' + item.clientName + ' companydet.loginuserid ' +companydet.loginuserid + 'item.userid ' + item.userid );
                            return <>

                                <Card className="  allestimatedisplay" key={index}>
                                    {/* <div className="generaldetails "> */}
                                   
                                    <ul className="details invoicedetails details ">
                                        <li >
                                            <div className="companyname"> Stock ID: {item.stockid}</div>
                                        </li>
                                        <li>
                                            <div className="companyname"> Date: {item.stockdate}</div>

                                        </li>
                                    </ul>
                                    {item.clientid && clientdetail && 
                                    <ul className="details">
                                        <div className=" "> 
                                            <h3>Client Details</h3>
                                            {/* <h3> {item.clientid}</h3>
                                            <h3> {clientdetail.clientid}</h3> */}
                                            <li>
                                                Client Name
                                            </li> <div className="nameheigh">{clientdetail.clientName} </div>
                                            <li>
                                                Client Phone Number
                                            </li>{clientdetail.clientPhno}
                                            <li>
                                                Client Address
                                            </li> {clientdetail.clientAdd}
                                        </div>
                                    </ul>}
                                   
                                    <ul className="details  ">
                                        <div className="">
                                            <h3>Stock Value</h3>
                                            <li>
                                                Total Cost
                                            </li> <div className="nameheigh"> ₹ {Intl.NumberFormat("en-IN", digit2options).format(item.totalamt)} </div> 
                                        </div>
                                    </ul>
                                    <Link to={{
                                        pathname: `/addstock`
                                    }}
                                    >
                                        <Button className="gen-stocks" variant="outlined"
                                            onClick={() => stocksdet.allStockHistoryEdit(item)}  
                                            endIcon={<RiEditCircleFill />} 
                                             >

                                            Edit Stocks</Button>
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

export default ListOfAddedStocks;