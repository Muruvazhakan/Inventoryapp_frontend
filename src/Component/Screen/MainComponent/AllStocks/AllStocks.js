import React, { useContext, useEffect, useRef } from "react";
import { BsFileEarmarkPdfFill, BsFiletypeXlsx } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Box, Button } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import StockTable from "../../StockTable/StockTable";
import './AllStocks.css';
import { Link } from "react-router-dom";
const AllStocks = () => {
    const tabledet = useContext(Stocks);
    useEffect(() => {
        console.log(" useEffect AllStocks ");
        tabledet.getAllStocks("allstocks");
    }, [tabledet.allStockData, tabledet.allstockstotalamt, tabledet.stockHistoryData, tabledet.allStockList]);
    const componentRef = useRef();
    return <>
        <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}>

            {/* <StockTable screen="allstocks" /> */}
            <Card className="listofbuttons">
                <Link to={{
                    pathname: `/addstock`
                }}
                >
                    <Button variant="outlined" color="success" endIcon={<MdAddChart />}
                    >
                        Add Stocks</Button>
                </Link>

            </Card> 
            
            <Card className="listofbuttons">
                <Link to={{
                    pathname: `/listofaddedstocks`
                }}
                >
                    <Button variant="outlined" color="secondary" endIcon={<FaRegListAlt />} >
                    View List of added Stocks
                </Button>
                </Link>

            </Card> 
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
                    <div className="exportExcelbttn" >
                        <Button variant="contained" color="success" size="medium" endIcon={<BsFiletypeXlsx />}
                            onClick={() => tabledet.handleExportXlsx()}>Export Stocks to Excel</Button>
                    </div>
                    <StockTable screen="allstocks" />

                </div>
            </Card>
        </Box>
    </>
}

export default AllStocks;