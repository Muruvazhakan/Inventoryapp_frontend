import React, { useContext, useEffect } from "react";
import AddStocksForm from "./AddStocksForm/AddStocksForm";
import AddStocksGenDetails from "./AddStocksGenDetails";
import StockTable from "../StockTable/StockTable";
import { Box, Grid } from "@mui/material";

const AddStocks = () => {

    return <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                <StockTable screen="update" />
                </Grid>
                <Grid item xs={5}>
                <AddStocksForm />
                <AddStocksGenDetails />

                </Grid>
            </Grid>
        </Box>
    </>
}

export default AddStocks;