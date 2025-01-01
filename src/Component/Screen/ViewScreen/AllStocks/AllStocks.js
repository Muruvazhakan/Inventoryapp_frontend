import React, { useContext, useEffect } from "react";


import { Box } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import StockTable from "../../StockTable/StockTable";
import './AllStocks.css';
const AllStocks = () => {
 const tabledet = useContext(Stocks);
    useEffect(()=>{
        tabledet.getAllStocks("allstocks");
    },[tabledet.getAllStockData,tabledet.totalamt,tabledet.stockHistoryData]);

    return <>
        <Box className = "allstocksdisplaytable" sx={{ flexGrow: 1 }}>
            <h2>Current Stocks</h2>
        <StockTable screen="allstocks" />
        </Box>
    </>
}

export default AllStocks;