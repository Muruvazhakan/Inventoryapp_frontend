import React, { useContext } from "react";

import "./EarningScreen.css";

import { Stocks } from "../../../Context/StocksContex";
import TotalSalesScreen from "./TotalEarningScreen/TotalSalesScreen";
import TotalEarningScreen from "./TotalEarningScreen/TotalEarningScreen";
import MonthlyEarningScreen from "./TotalEarningScreen/MonthlyEarningScreen";
import { Stack } from "@mui/material";
import StockChart from "../AllSaleStocks/StockChart";
import Dashboard from "../Dashboard/Dashboard";

// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';

const EarningScreen = (props) => {
  const stockdet = useContext(Stocks);
  let totaltransaction = 0;
  const paymentModeCount = stockdet.allStockSalesList.reduce(
    (acc, { paymentmode }) => {
      totaltransaction = totaltransaction + 1;
      // If paymentmode is empty, we treat it as 'No Payment Mode'
      const mode = paymentmode || "No Payment Mode";
      acc[mode] = (acc[mode] || 0) + 1;
      return acc;
    },
    {}
  );
  return (
    <>
      {stockdet.allStockSalesList.length > 0 && (
        <Dashboard data={stockdet} totaltransaction={totaltransaction} />
      )}
      <Stack direction="row" mt={1} alignItems="center">
        <TotalEarningScreen data={stockdet} />
        <TotalSalesScreen data={stockdet} />

        {stockdet.allStockSalesList.length > 0 && (
          <StockChart
            data={stockdet.allStockSalesList}
            title="Sold units"
            chartlable="Sold per product"
          />
        )}

        {/* <MonthlyEarningScreen data={stockdet} /> */}
      </Stack>
    </>
  );
};
export default EarningScreen;
