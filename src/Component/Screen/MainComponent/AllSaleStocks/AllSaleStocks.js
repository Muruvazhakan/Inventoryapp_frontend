import React, { useContext, useEffect, useRef } from "react";
import { BsFileEarmarkPdfFill, BsFiletypeXlsx } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Box, Button } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import StockTable from "../../StockTable/StockTable";
import '../AllStocks/AllStocks.css';
import { Link } from "react-router-dom";
const AllSaleStocks = (props) => {
    const tabledet = useContext(Stocks);
    useEffect(() => {
        console.log(" useEffect AllSaleStocks ");
        tabledet.getAllStocks("AllSaleStocks");
    }, [tabledet.allStockData, tabledet.allstockstotalamt, tabledet.stockHistoryData, tabledet.allStockList]);
    const componentRef = useRef();
    return <>
        <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}>

            {/* <StockTable screen="AllSaleStocks" /> */}
            <Card className="listofbuttons">
                <Link to={{
                    pathname: `/salestock`
                }}
                >
                    <Button variant="outlined" color="success" endIcon={<MdAddChart />}
                    >
                        Sale Stocks</Button>
                </Link>

            </Card> 
            
            <Card className="listofbuttons">
                <Link to={{
                    pathname: `/listofaddedsalestocks`
                }}
                >
                    <Button variant="outlined" color="secondary" endIcon={<FaRegListAlt />} >
                    View List of added Sale Stocks
                </Button>
                </Link>

            </Card> 
            {/* <Card>

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
                            onClick={() => tabledet.handleExportXlsx("sale")}>Export Stocks to Excel</Button>
                    </div>
                    <StockTable screen="allsalestocks" />

                </div>
            </Card> */}
        </Box>
    </>
}

export default AllSaleStocks;