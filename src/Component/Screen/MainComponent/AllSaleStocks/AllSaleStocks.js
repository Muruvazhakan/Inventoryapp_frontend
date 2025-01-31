import React, { useContext, useEffect } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import { Box, Button } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import "../AllStocks/AllStocks.css";
import { Link } from "react-router-dom";
import StyleHeader from "../../Header/StyleHeader";
import StockChart from "./StockChart";
import AllStocksTable from "../AllStocks/AllStocksTable";

const AllSaleStocks = () => {
  const tabledetails = useContext(Stocks);

  const tableList = tabledetails.allStockSalesList;

  useEffect(() => {
    console.log(" useEffect AllSaleStocks ");
    tabledetails.getAllStocks("AllSaleStocks");
  }, [
    tabledetails.allStockData,
    tabledetails.allstockstotalamt,
    tabledetails.stockHistoryData,
    tabledetails.allStockList,
  ]);

  return (
    <>
      <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}>
        <Card className="listofbuttons">
          <Link
            to={{
              pathname: `salestock`,
            }}
          >
            <Button variant="outlined" color="success" endIcon={<MdAddChart />}>
              Sale Stocks
            </Button>
          </Link>
        </Card>

        <Card className="listofbuttons">
          <Link
            to={{
              pathname: `listofaddedsalestocks`,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<FaRegListAlt />}
            >
              View List of added Sale Stocks
            </Button>
          </Link>
        </Card>

        <Card>
          <StockChart
            data={tabledetails.allStockSalesList}
            title="Sales Count"
            chartlable="Sales per product"
          />
        </Card>

        <Card>
          <StyleHeader>All Sale Stocks</StyleHeader>
          <AllStocksTable data={tableList} />
        </Card>
      </Box>
    </>
  );
};

export default AllSaleStocks;
