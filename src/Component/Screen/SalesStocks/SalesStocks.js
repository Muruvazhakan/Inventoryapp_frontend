import React, { useContext, useState } from "react";

import { Box, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import AddedStockListTable from "../AddStocks/AddedStockListTable";
import ClientForm from "../AddStocks/ClientForm";
import StockForm from "../AddStocks/AddStocksForm/StockForm";
import { Stocks } from "../../Context/StocksContex";

const SalesStocks = () => {
  const tabledetails = useContext(Stocks);
  const [tableData, setTableData] = useState(tabledetails.saleslist ?? []);

  return (
    <Box sx={{ padding: "10px" }}>
      <StyleHeader>Sales Stocks</StyleHeader>
      <Stack direction={"row"} width={"100%"} flexWrap={"wrap"}>
        <Box
          sx={{
            height: "calc(100vh - 175px)",
            flex: 0.7,
          }}
        >
          <h2>Edit/Preview Section</h2>
          <AddedStockListTable tableData={tableData} />
        </Box>
        <Box
          sx={{
            height: "calc(100vh - 155px)",
            overflow: "auto",
            flex: 0.3,
          }}
        >
          <StockForm
            screen="Sale Stocks"
            getStock={(val) => setTableData([...tableData, val])}
          />
          <ClientForm />
        </Box>
      </Stack>
    </Box>
  );
};

export default SalesStocks;
