import React, { useContext, useState } from "react";
import { Stocks } from "../../Context/StocksContex";

import './StockTable.css';
import { Box, CircularProgress,Stack } from "@mui/material";
import ReactTable from "../../table/ReactTable";

const AutoStockTable = (props) => {

    const basiccolumns = [
        { field: "id", headerName: "S.NO", width: 90 },
        {
            field: "productid",
            headerName: "Product Id",
            width: 150,
        },
        {
            field: "desc",
            headerName: "Product Description",
            width: 350,
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
        },
        {
            field: "quantity",
            headerName: (props.from === "add" || props.from === "profit" ? "Purchace Rate" : "Sales Rate"),
            width: 150,
        },
        {
            field: "rate",
            headerName: "Rate",
            width: 150,
        },
        {
            field: "amt",
            headerName: "Amount",
            width: 150,
        },
    ];

    const tabledetails = useContext(Stocks);
    // useEffect(() => {
    //     console.log("refresh");
    // }, []);

    const [open, setOpen] = useState(false);

    const [item, setItem] = useState([]);

    const handleClickOpen = (items) => {
        setOpen(true);
        setItem(items);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = (item) => {
        setOpen(false);
        tabledetails.deleteStock(item, props.screen, displaylist, "delete")
    };
    let sum1 = 0;
    let displaylist = (props.screen == "allstocks" ?
        tabledetails.allStockList.map((item, index) => {
            if ((item.quantity === 0 || item.status === 'deleted' || item.status === 'Deleted') && props.screen === "allstocks") { }
            else {
                sum1 = sum1 + (item.quantity * 1 * item.rate)
                return item;

            }
        }).filter(x => x !== undefined)
        :
        (props.screen == "alladdedstocks" ? tabledetails.allStockAddedList
            :
            (props.screen == "allProfit" ? tabledetails.allProfitStockList
                :
                (props.screen == "add" ? tabledetails.list
                    :
                    (props.screen == "sale" ? tabledetails.saleslist
                        : tabledetails.allStockSalesList
                    )
                )))
    );
     displaylist = displaylist?.map((item, index) => {
        item.amt= (item.rate*1*item.quantity).toFixed(2);
        item.status = item.status?item.status:"Active";
        if ((item.quantity === 0 || item.status === 'deleted' || item.status === 'Deleted') && props.screen == "allstocks")
            return null;
        return {...item , id: index + 1
           
             };
      });
    // console.log("displaylist  " + " props.screen ^^^ " + props.screen);
    // console.log(displaylist)
    let localsum = (props.screen === "allstocks" ? sum1
        :
        (props.screen == "alladdedstocks" ? tabledetails.alladdedstockstotalamt
            :
            (props.screen === "allProfit" ? tabledetails.totalprofiramt
                :
                (props.screen == "add" ? tabledetails.totalamt
                    :
                    (props.screen == "sale" ? tabledetails.totalsalesamt
                        : tabledetails.allstockssalestotalamt
                    )
                )
            )
        )
    );


    let localsumqty1 = 0, localsumqty2 = 0, sumpurchaseamt = 0;

    let localsumqty = displaylist.map((item, index) => {
        localsumqty1 = localsumqty1 + (item.quantity * 1);
        if (props.screen === "allProfit")
            localsumqty2 = localsumqty2 + (item.salequantity * 1);
        sumpurchaseamt = sumpurchaseamt + (item.purchaceamount * 1);
    });
    // let localtotal1 = 0;
    // let localtotal = displaylist.map((item, index) => {
    //     localtotal1 = localtotal1 + (item.quantity * 1 * item.rate);
    // });

    console.log(props.screen + " props.screen" + localsum + " localsum  " + displaylist + " displaylist", + " localsumqty ++ " + localsumqty1);


    let from = props.from;
    const digit2options = { maximumFractionDigits: 2 };



    return <>
        {tabledetails.isloading &&
            <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                <CircularProgress color="success" size={30} />
            </Stack>
        }
        <Box
            sx={{
                // marginLeft: "20px",
                // marginRight: "20px",
                // marginTop: "5px",
                // marginBottom: "5px",
                //   borderRadius:"20px",
                //   border:"25px"
            }}
        >
            <ReactTable
                loading = {tabledetails.isloading}
                columns={basiccolumns}
                data={displaylist.length ? displaylist : []}
                pageSize={10}
                enableExportAndPrint={true}
            />
        </Box>

    </>
}

export default AutoStockTable;