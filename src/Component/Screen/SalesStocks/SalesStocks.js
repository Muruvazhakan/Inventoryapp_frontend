import React, { useContext, useEffect } from "react";

import StockTable from "../StockTable/StockTable";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import AddStocksForm from "../AddStocks/AddStocksForm/AddStocksForm";
import Card from "../../Style/Card/Card";
import Header from "../Header/Header";
import AddStocksGenDetails from "../AddStocks/AddStocksGenDetails";
import { Stocks } from "../../Context/StocksContex";

const SalesStocks = () => {

    const tabledet = useContext(Stocks);
    return <>
        <Box sx={{ flexGrow: 1 }}>
            {tabledet.isloading &&
                <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                    <CircularProgress color="success" size={30} />
                </Stack>
            }
            <Card>
                <Card className="screenHeader"> Sales Stocks </Card>
                <Stack direction={{ xs: 'column', sm: 'row' }}
                    useFlexGap
                    spacing={{ xs: 2, sm: 1, md: 0 }}>
                    <Stack
                    >
                        <StockTable screen="sale" from="sale" type="update" />
                    </Stack>
                    <Stack item xs={5}>
                        <AddStocksForm screen="sale" />
                        <AddStocksGenDetails screen="sale" />

                    </Stack>
                </Stack>
            </Card>
        </Box>
    </>
}

export default SalesStocks;