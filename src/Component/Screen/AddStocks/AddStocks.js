import React, { useContext, useEffect } from "react";
import AddStocksForm from "./AddStocksForm/AddStocksForm";
import AddStocksGenDetails from "./AddStocksGenDetails";
import StockTable from "../StockTable/StockTable";
import { Box, Grid } from "@mui/material";
import Card from "../../Style/Card/Card";

const AddStocks = (props) => {

    return <>
        <Box sx={{ flexGrow: 1 }}>
            <Card>
                <Card className="screenHeader"> Add Stocks </Card>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <StockTable screen="add" from="add" type="update" />
                    </Grid>
                    <Grid item xs={5}>
                        <AddStocksForm screen="add" />
                        <AddStocksGenDetails screen="add" />

                    </Grid>
                </Grid>
            </Card>
        </Box>
    </>
}

export default AddStocks;