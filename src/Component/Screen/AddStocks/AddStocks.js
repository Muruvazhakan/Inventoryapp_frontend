import React, { useState } from "react";

import { Box, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import AddedStockListTable from "./AddedStockListTable";
import StockForm from "./AddStocksForm/StockForm";
import ClientForm from "./ClientForm";

const AddStocks = () => {
  const [tableData, setTableData] = useState([]);

  return (
    <Box sx={{ padding: "10px" }}>
      <StyleHeader>Add Stocks</StyleHeader>
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
          <StockForm getStock={(val) => setTableData([...tableData, val])} />
          <ClientForm />
        </Box>
      </Stack>
    </Box>
  );
};

export default AddStocks;
