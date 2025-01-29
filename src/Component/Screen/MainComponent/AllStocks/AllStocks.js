import React, { useContext, useEffect, useRef, useState } from "react";
import { BsFileEarmarkPdfFill, BsFiletypeXlsx } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Box, Button } from "@mui/material";
import { RiTableView } from "react-icons/ri";
import { Stocks } from "../../../Context/StocksContex";
import StockTable from "../../StockTable/StockTable";
import "./AllStocks.css";
import { Link, Outlet } from "react-router-dom";
import Header from "../../Header/Header";
import StyleHeader from "../../Header/StyleHeader";
import { FiEdit } from "react-icons/fi";
import StockChart from "../AllSaleStocks/StockChart";
import AutoStockTable from "../../StockTable/AutoStockTable";
import { PopupModel } from "../../../PopupModel/PopupModel";
import AddStocks from "../../AddStocks/AddStocks";
const AllStocks = (props) => {
  const tabledet = useContext(Stocks);
  const [viewAllAddedStock, setviewAllAddedStock] = useState(false);
  const [iseditable, setiseditable] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(" useEffect AllStocks ");
    tabledet.getAllStocks("allstocks");
  }, [
    tabledet.allStockData,
    tabledet.allstockstotalamt,
    tabledet.stockHistoryData,
    tabledet.allStockList,
  ]);

  let displaylist = tabledet.allStockList
    .map((item, index) => {
      if (
        item.quantity === 0 ||
        item.status === "deleted" ||
        item.status === "Deleted"
      ) {
      } else {
        // sum1 = sum1 + (item.quantity * 1 * item.rate)
        return item;
      }
    })
    .filter((x) => x !== undefined);
  const handleClose = () => setOpen(false);
  const componentRef = useRef();
  return (
    <>
      <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}>
        <Card className="listofbuttons">
          <Link
            to={{
              pathname: `/addstock`,
            }}
          >
            <Button variant="outlined" color="success" endIcon={<MdAddChart />}>
              Add Stocks
            </Button>
          </Link>
        </Card>
        <Card className="listofbuttons">
          <Link
            to={{
              pathname: `/listofaddedstocks`,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<FaRegListAlt />}
            >
              View List of added Stocks
            </Button>
          </Link>
        </Card>
        <Card className="listofbuttons">
          <Button
            variant="text"
            color={viewAllAddedStock ? "primary" : "warning"}
            onClick={() => setviewAllAddedStock(!viewAllAddedStock)}
            endIcon={<RiTableView />}
          >
            {viewAllAddedStock
              ? "Click to hide All Added Stocks"
              : "Click to Expand All Added Stocks"}
          </Button>
        </Card>

        <Card>
          <StockChart
            data={displaylist}
            title="Available Stock Count"
            chartlable="Stock Available per product"
          />
        </Card>

        {viewAllAddedStock && (
          <Card>
            <StyleHeader>All Stocks</StyleHeader>
            <AutoStockTable screen="alladdedstocks" from="add" />
          </Card>
        )}
        <Card>
          <StyleHeader>
            {/* <Header name="Current Stocks" /> */}
            Current Stocks
          </StyleHeader>
          {/* <StockTable screen="allstocks" from="add" iseditable={iseditable} /> */}
          <AutoStockTable
            screen="allstocks"
            from="add"
            iseditable={iseditable}
          />
        </Card>
      </Box>
      <PopupModel open={open} handleClose={handleClose} title="Add Stocks">
        <AddStocks />
      </PopupModel>
    </>
  );
};

export default AllStocks;
