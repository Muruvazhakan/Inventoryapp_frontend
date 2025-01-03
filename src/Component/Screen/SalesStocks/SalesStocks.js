import React, { useContext, useEffect } from "react";

import AddStocksGenDetails from "./AddStocksGenDetails";
import StockTable from "../StockTable/StockTable";
import { Box, Grid } from "@mui/material";
import AddStocksForm from "../AddStocks/AddStocksForm/AddStocksForm";
import Card from "../../Style/Card/Card";
import Header from "../Header/Header";

const SalesStocks = () => {

    return <>
        <Box sx={{ flexGrow: 1 }}>
            <Card>
                <Card className="screenHeader"> Sales Stocks </Card>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <StockTable screen="sales" from="sale" type="update"/>
                    </Grid>
                    <Grid item xs={5}>
                        <AddStocksForm screen="sale" />
                        <AddStocksGenDetails screen="sale" />

                    </Grid>
                </Grid>
            </Card>
        </Box>
    </>
}

export default SalesStocks;