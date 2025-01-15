import React, { useContext, useEffect } from "react";

import StockTable from "../StockTable/StockTable";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import AddStocksForm from "../AddStocks/AddStocksForm/AddStocksForm";
import Card from "../../Style/Card/Card";
import Header from "../Header/Header";
import AddStocksGenDetails from "../AddStocks/AddStocksGenDetails";
import { Stocks } from "../../Context/StocksContex";
import StyleHeader from "../Header/StyleHeader";

const SalesStocks = () => {

    const tabledet = useContext(Stocks);
    return <>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <StyleHeader>
                Sales Stocks
            </StyleHeader>
            {tabledet.isloading &&
                <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                    <CircularProgress color="success" size={30} />
                </Stack>
            }

            {/* <Card className="screenHeader"> Sales Stocks </Card> */}
            <Stack direction={{ xs: 'column', sm: 'row' }}
                useFlexGap
                spacing={{ xs: 1, sm: 1, md: 0 }}>
                <Stack width={window.innerWidth <= 960 ? "100%" : "70%"}
                >
                    <Card>
                        <h2>Edit/Preview Section</h2>
                        <StockTable screen="sale" from="sale" type="update" />
                    </Card>
                </Stack>
                <Stack item width={window.innerWidth <= 960 ? "100%" : "30%"}>
                    <AddStocksForm screen="sale" />
                    <AddStocksGenDetails screen="sale" />

                </Stack>
            </Stack>

        </Box>
    </>
}

export default SalesStocks;