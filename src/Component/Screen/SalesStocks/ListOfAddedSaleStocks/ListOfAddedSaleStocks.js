import React, { useContext, useEffect } from "react";
import "../../GeneralDetails/GeneralDetails.css";
import { Stocks } from "../../../Context/StocksContex";
import Card from "../../../Style/Card/Card";
import NoData from "../../NoData/NoData";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsFiletypeXlsx } from "react-icons/bs";
import StyleHeader from "../../Header/StyleHeader";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../../../../redux/productSlice";

const ListOfAddedSaleStocks = (props) => {
  const stocksdet = useContext(Stocks);
  const stockState = useSelector((state) => state.stock.stock);
  const digit2options = { maximumFractionDigits: 2 };
  const stockDispatch = useDispatch();
  useEffect(() => {
    console.log("ListOfAddedSaleStocks");

    console.log(stockState.salesStockHistoryData);
  }, [stockState.salesStockHistoryData]);

  // if (stocksdet.isloading) {
  //   return (
  //     <Stack
  //       sx={{ color: "grey.500" }}
  //       spacing={2}
  //       alignItems={"center"}
  //       className="spinnerstyle"
  //     >
  //       <CircularProgress color="success" size={30} />
  //     </Stack>
  //   );
  // }

  const allSaleStockHistoryEdit = (item) => {
    console.log("allSaleStockHistoryEdit ");
    console.log(item);
    // console.log("clientList");
    // console.log(clientList);
    // let salesStockhistorydetail = props;
    stockDispatch(
      updateStock({
        totalamt: item.totalsalesamt,
        clientid: item.clientid,
        stockdate: item.salestockdate,
        saleslist: item.rows,

        clientName: item.clientName,
        clientPhno: item.clientPhno,
        clientAdd: item.clientAdd,
        stockid: item.salestockid,
        isEditStock: true,
        editprodid: true,
      })
    );
  };

  return (
    <>
      <StyleHeader>
        {/* <Header name="Current Stocks" /> */}
        List Of Added Sales Stocks
      </StyleHeader>
      {stockState.salesStockHistoryData === null ||
      stockState.salesStockHistoryData.length === 0 ? (
        <>
          <NoData details="Sales Stock Found" />
        </>
      ) : (
        <>
          <div className="listofstickexcelbtn">
            <Button
              variant="contained"
              color="success"
              size="medium"
              endIcon={<BsFiletypeXlsx />}
              onClick={() => stocksdet.handleHistoryExportXlsx("sale")}
            >
              Export History Sales Stock to Excel
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {stockState.salesStockHistoryData.map((item, index) => {
              return (
                <Box sx={{ width: "340px" }}>
                  <Card className="  allestimatedisplay" key={index}>
                    <ul className="details invoicedetails">
                      <li>
                        <div className="companyname">
                          Sales Stock ID: {item.salestockid}
                        </div>
                      </li>
                      <li>
                        <div className="companyname">
                          Sale Date: {item.salestockdate}
                        </div>
                      </li>
                    </ul>
                    {item.clientName && (
                      <ul className="details marginTop">
                        <div>
                          <h3>Client Details</h3>
                          <li className="marginBottom">Client Name</li>
                          <div className="nameheigh">{item.clientName} </div>
                          <li>Client Phone Number</li>
                          {item.clientPhno}
                          <li>Client Address</li> {item.clientAdd}
                        </div>
                      </ul>
                    )}
                    <ul className="details marginTop">
                      <div className="marginTop">
                        <h3>Sale Stock Value</h3>
                        <li>Total Cost</li>
                        <div className="nameheigh">
                          ₹
                          {Intl.NumberFormat("en-IN", digit2options).format(
                            item.totalsalesamt
                          )}
                        </div>
                      </div>
                    </ul>
                    <Link
                      to={{
                        pathname: `/sales/salestock`,
                      }}
                    >
                      <Button
                        className="gen-stocks"
                        variant="outlined"
                        onClick={() => allSaleStockHistoryEdit(item)}
                        endIcon={<RiEditCircleFill />}
                      >
                        Edit Sales Stocks
                      </Button>
                    </Link>
                  </Card>
                </Box>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ListOfAddedSaleStocks;
