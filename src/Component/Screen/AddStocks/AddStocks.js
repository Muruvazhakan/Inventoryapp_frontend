import React, { useContext, useEffect } from "react";
import AddStocksForm from "./AddStocksForm/AddStocksForm";
import AddStocksGenDetails from "./AddStocksGenDetails";
import StockTable from "../StockTable/StockTable";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import Card from "../../Style/Card/Card";
import { Stocks } from "../../Context/StocksContex";
import StyleHeader from "../Header/StyleHeader";

const AddStocks = (props) => {
    const statckdet = useContext(Stocks);
   
    return <>
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <StyleHeader>
                Add Stocks
            </StyleHeader>
            {statckdet.isloading &&
                <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                    <CircularProgress color="success" size={30} />
                </Stack>
            }

            {/* <Card className="screenHeader"> Add Stocks </Card> */}

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                useFlexGap
                spacing={{ xs: 1, sm: 1, md: 0 }}>
                <Stack item width={window.innerWidth <= 960 ? "100%" : "70%"}>
                    <Card>
                        <h2>Edit/Preview Section</h2>
                        <StockTable screen="add" from="add" type="update"  />
                    </Card>
                </Stack>
                <Stack item width={window.innerWidth <= 960 ? "100%" : "30%"}>
                    <AddStocksForm screen="add" />
                    <AddStocksGenDetails screen="add" />

                </Stack>
            </Stack>

        </Box>
    </>
}

export default AddStocks;