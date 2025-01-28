import React, { useContext, useEffect, useRef } from "react";
import { BsFileEarmarkPdfFill, BsFiletypeXlsx } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Box, Button } from "@mui/material";
import { Stocks } from "../../../Context/StocksContex";
import StockTable from "../../StockTable/StockTable";
// import '../AllStocks/AllStocks.css';
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import YourProfits from "../YourProfits/YourProfits";
import StyleHeader from "../../Header/StyleHeader";
import EarningScreen from "../EarningScreen/EarningScreen";
import ReactTable from "../../../table/ReactTable";

const columns = [
  { field: "id", headerName: "S.NO", width: 90 },
  {
    field: "productid",
    headerName: "Product Id",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Product Description",
    width: 150,
  },
  {
    field: "rate",
    headerName: "Purchace Rate",
    width: 150,
  },
  {
    field: "purchaceamount",
    headerName: "Purchace Amount (₹)",
    width: 180,
  },
  {
    field: "salequantity",
    headerName: "Sold Quantity",
    width: 150,
  },
  {
    field: "salerate",
    headerName: "Sold Rate",
    width: 150,
  },
  {
    field: "saleamount",
    headerName: "Sold Amount (₹)",
    width: 150,
  },
  {
    field: "profit",
    headerName: "Profit Amount (₹)",
    width: 150,
  },
];

const AllProfit = (props) => {
  const tabledet = useContext(Stocks);
  const tableDatas = tabledet.allProfitStockList?.map((item, index) => {
    return { id: index + 1, ...item };
  });
  //   useEffect(() => {
  //     console.log(" useEffect AllProfit ", tabledet.allProfitStockList, "test");
  //     tabledet.getAllStocks("AllProfit");
  //   }, [
  //     tabledet.allStockData,
  //     tabledet.allstockstotalamt,
  //     tabledet.stockHistoryData,
  //     tabledet.allStockList,
  //   ]);
  //   const componentRef = useRef();
  return (
    <>
      {/* <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}> */}
      {/* <YourProfits /> */}
      <EarningScreen />
      {/* <StockTable screen="AllProfit" /> */}
      {/* <Card>
          <div className="exportExcelbttn ">
            <ReactToPrint
              trigger={() => (
                <div>
                  <Button
                    variant="contained"
                    color="info"
                    endIcon={<BsFileEarmarkPdfFill />}
                  >
                    Download Profits Stocks
                  </Button>
                </div>
              )}
              content={() => componentRef.current}
            />
            <div className="excelexport">
              <Button
                variant="contained"
                color="success"
                size="medium"
                endIcon={<BsFiletypeXlsx />}
                onClick={() => tabledet.handleExportXlsx("allProfit")}
              >
                Export Profits to Excel
              </Button>
            </div>
          </div>
          <div ref={componentRef}>
            <StyleHeader>Consolidated Profits!</StyleHeader>

            <StockTable screen="allProfit" from="profit" /> */}
      <Box
        sx={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "20px",
          marginBottom: "5px",
        }}
      >
        <ReactTable
          columns={columns}
          data={tableDatas.length ? tableDatas : []}
        />
      </Box>
      {/* </div>
        </Card> */}
      {/* </Box> */}
    </>
  );
};

export default AllProfit;
