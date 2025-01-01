import React, { useContext, useEffect, useRef } from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import Card from "../../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Box,Button } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import StockTable from "../../StockTable/StockTable";
import './AllStocks.css';
const AllStocks = () => {
 const tabledet = useContext(Stocks);
    useEffect(()=>{
        console.log(" useEffect AllStocks ");
        tabledet.getAllStocks("allstocks");
    },[tabledet.allStockData,tabledet.allstockstotalamt,tabledet.stockHistoryData,tabledet.allStockList ]);
const componentRef = useRef();
    return <>
        <Box className = "allstocksdisplaytable" sx={{ flexGrow: 1 }}>
          
        {/* <StockTable screen="allstocks" /> */}
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
                <StockTable screen="allstocks" />

                </div>
            </Card>
        </Box>
    </>
}

export default AllStocks;