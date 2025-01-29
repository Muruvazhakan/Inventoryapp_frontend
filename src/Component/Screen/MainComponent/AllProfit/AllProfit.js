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
        // item.profit= (item.profit).toFixed(2);
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
      const componentRef = useRef();
    return (
        <>
            {/* <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}> */}
            {/* <YourProfits /> */}
            <EarningScreen />
            {/* <StockTable screen="AllProfit" /> */}
            <Card>
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

            {/* <StockTable screen="allProfit" from="profit" /> */}

            <AutoStockTable screen="allProfit" from="profit" />

            {/* <Box
        sx={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "20px",
          marginBottom: "5px",
        //   borderRadius:"20px",
        //   border:"25px"
        }}
      >
        <ReactTable
          columns={columns}
          data={tableDatas.length ? tableDatas : []}
          pageSize={5}
          enableExportAndPrint={true}
        />
      </Box> */}

          

            </div>
        </Card>
            {/* </Box> */}
        </>
    );
};

export default AllProfit;
