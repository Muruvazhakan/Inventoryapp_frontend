import React, { useContext, useEffect } from "react";
import AddStocksForm from "./AddStocksForm/AddStocksForm";
import AddStocksGenDetails from "./AddStocksGenDetails";
import StockTable from "../StockTable/StockTable";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import Card from "../../Style/Card/Card";
import { Stocks } from "../../Context/StocksContex";

const AddStocks = (props) => {
    const statckdet = useContext(Stocks);

    const Gridmenu = (props) => {
        return <>
            {window.innerWidth <= 960 ?
                <>  {props.children} </>
                : <Grid container spacing={2}>
                    {props.children}
                </Grid>
            }
        </>
    }
    return <>
        <Box sx={{ flexGrow: 1 }}>

            {statckdet.isloading &&
                <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                    <CircularProgress color="success" size={30} />
                </Stack>
            }
            <Card>
                <Card className="screenHeader"> Add Stocks </Card>

                <Gridmenu>
                    <Grid item xs={7}>
                        <StockTable screen="add" from="add" type="update" />
                    </Grid>
                    <Grid item xs={5}>
                        <AddStocksForm screen="add" />
                        <AddStocksGenDetails screen="add" />

                    </Grid>
                </Gridmenu>
            </Card>
        </Box>
    </>
}

export default AddStocks;