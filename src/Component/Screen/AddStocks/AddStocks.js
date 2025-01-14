import React, { useContext, useEffect } from "react";
import AddStocksForm from "./AddStocksForm/AddStocksForm";
import AddStocksGenDetails from "./AddStocksGenDetails";
import StockTable from "../StockTable/StockTable";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import Card from "../../Style/Card/Card";
import { Stocks } from "../../Context/StocksContex";

const AddStocks = (props) => {
    const statckdet = useContext(Stocks);

    return <>
        <Box sx={{ flexGrow: 1 }}>

            {statckdet.isloading &&
                <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                    <CircularProgress color="success" size={30} />
                </Stack>
            }
            <Card>
                <Card className="screenHeader"> Add Stocks </Card>

                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    useFlexGap
                    spacing={{ xs: 2, sm: 1, md: 0 }}>
                    <Stack item >
                        <StockTable screen="add" from="add" type="update" />
                    </Stack>
                    <Stack item >
                        <AddStocksForm screen="add" />
                        <AddStocksGenDetails screen="add" />

                    </Stack>
                </Stack>
            </Card>
        </Box>
    </>
}

export default AddStocks;