import React, { useContext, useEffect, useRef } from "react";
import { BsFileEarmarkPdfFill, BsFiletypeXlsx } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Box, Button } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";

// import '../AllStocks/AllStocks.css';

import StyleHeader from "../../Header/StyleHeader";
import EarningScreen from "../EarningScreen/EarningScreen";

import AutoStockTable from "../../StockTable/AutoStockTable";

const AllProfit = (props) => {
  const tabledet = useContext(Stocks);
  const tableDatas = tabledet.allProfitStockList?.map((item, index) => {
    return { id: index + 1, ...item };
  });

  const componentRef = useRef();
  return (
    <>
      <EarningScreen />

      <Card>
        <div ref={componentRef}>
          <StyleHeader>Consolidated Profits!</StyleHeader>

          {/* <StockTable screen="allProfit" from="profit" /> */}
          <AutoStockTable screen="allProfit" from="profit" />
        </div>
      </Card>
    </>
  );
};

export default AllProfit;
