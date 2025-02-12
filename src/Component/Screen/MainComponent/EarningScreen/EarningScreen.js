import React, { useContext } from "react";

import "./EarningScreen.css";

import { Stocks } from "../../../Context/StocksContex";
import TotalSalesScreen from "./TotalEarningScreen/TotalSalesScreen";
import TotalEarningScreen from "./TotalEarningScreen/TotalEarningScreen";
import MonthlyEarningScreen from "./TotalEarningScreen/MonthlyEarningScreen";
import { Stack } from "@mui/material";
import StockChart from "../AllSaleStocks/StockChart";
import Dashboard from "../Dashboard/Dashboard";
import { useSelector } from "react-redux";

// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';

const EarningScreen = (props) => {
  const stockdet = useContext(Stocks);

  const userState = useSelector((state) => state.user.user);
  const stockState = useSelector((state) => state.stock.stock);

  let totaltransaction = 0;
  const paymentModeCount = stockState.allStockSalesList.reduce(
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
      {stockState.allStockSalesList.length > 0 && (
        <Dashboard data={stockState} totaltransaction={totaltransaction} />
      )}
      <Stack direction="row" mt={1} alignItems="center">
        <TotalEarningScreen data={stockState} />
        <TotalSalesScreen data={stockState} />

        {stockState.allStockSalesList.length > 0 && (
          <StockChart
            data={stockState.allStockSalesList}
            title="Sold units"
            chartlable="Sold per product"
          />
        )}

        {/* <MonthlyEarningScreen data={stockState} /> */}
      </Stack>
    </>
  );
};
export default EarningScreen;
