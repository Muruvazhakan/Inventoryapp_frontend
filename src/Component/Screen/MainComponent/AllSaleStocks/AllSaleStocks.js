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
import Header from "../../Header/Header";
import StyleHeader from "../../Header/StyleHeader";
import StockChart from "./StockChart";
import AutoStockTable from "../../StockTable/AutoStockTable";
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

            <Card>
                <StockChart data = {tabledet.allStockSalesList} title="Sales Count" chartlable ="Sales per product" />
            </Card>

            <Card>
                <div className="exportExcelbttn " >
                    <ReactToPrint
                        trigger={() => (
                            <div>
                                <Button variant="contained" color="info" endIcon={<BsFileEarmarkPdfFill />} >
                                    Download Sale Stocks
                                </Button>
                            </div>
                        )}
                        content={() => componentRef.current}
                    />
                    <div className="excelexport" >
                        <Button variant="contained" color="success" size="medium" endIcon={<BsFiletypeXlsx />}
                            onClick={() => tabledet.handleExportXlsx("allsalestocks")}>Export Sale Stocks to Excel</Button>
                    </div>
                </div>
                <div ref={componentRef}>
                    <StyleHeader>
                        All Sale Stocks
                    </StyleHeader>
                  
                    {/* <StockTable screen="allsalestocks" /> */}
                    <AutoStockTable screen="allsalestocks" />
                </div>
            </Card>
        </Box>
    </>
}

export default AllSaleStocks;