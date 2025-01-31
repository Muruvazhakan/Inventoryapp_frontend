import React, { useContext, useEffect, useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import { Box, Button } from "@mui/material";
import { RiTableView } from "react-icons/ri";
import { Stocks } from "../../../Context/StocksContex";
import "./AllStocks.css";
import { Link } from "react-router-dom";
import StyleHeader from "../../Header/StyleHeader";
import StockChart from "../AllSaleStocks/StockChart";

import CurrentStocksTable from "./CurrentStocksTable";
import AllStocksTable from "./AllStocksTable";

const AllStocks = () => {
  const tabledet = useContext(Stocks);
  const [viewAllAddedStock, setviewAllAddedStock] = useState(false);
  const paths = [`addstock`, `listofaddedstocks`];
  const buttonNames = [" Add Stocks", "View List of added Stocks"];
  const icons = [<MdAddChart />, <FaRegListAlt />];
  const colors = ["success", "secondary"];

  useEffect(() => {
    console.log(" useEffect AllStocks ");
    tabledet.getAllStocks("allstocks");
  }, [
    tabledet.allStockData,
    tabledet.allstockstotalamt,
    tabledet.stockHistoryData,
    tabledet.allStockList,
  ]);

  //chart data
  let displaylist = tabledet.allStockList.filter(
    (item) =>
      !(
        item.quantity === 0 ||
        item.status === "deleted" ||
        item.status === "Deleted"
      )
  );

  return (
    <>
      <Box className="allstocksdisplaytable">
        {paths.map((item, index) => (
          <CustomCard
            key={index}
            path={item}
            buttonName={buttonNames[index]}
            icon={icons[index]}
            color={colors[index]}
          />
        ))}

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

        <Card>
          {viewAllAddedStock ? (
            <>
              <StyleHeader>All Stocks</StyleHeader>
              <AllStocksTable data={tabledet.allStockAddedList} />
            </>
          ) : (
            <>
              <StyleHeader>Current Stocks</StyleHeader>
              <CurrentStocksTable />
            </>
          )}
        </Card>
      </Box>
    </>
  );
};

const CustomCard = ({ path, buttonName, icon, color }) => {
  return (
    <Card className="listofbuttons">
      <Link to={path}>
        <Button variant="outlined" color={color} endIcon={icon}>
          {buttonName}
        </Button>
      </Link>
    </Card>
  );
};

export default AllStocks;
