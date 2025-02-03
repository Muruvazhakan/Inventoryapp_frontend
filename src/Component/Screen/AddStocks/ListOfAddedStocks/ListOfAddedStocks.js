import React, { useContext, useEffect } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";

import "../../GeneralDetails/GeneralDetails.css";
import { Stocks } from "../../../Context/StocksContex";
import Card from "../../../Style/Card/Card";
import NoData from "../../NoData/NoData";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsFiletypeXlsx } from "react-icons/bs";
import StyleHeader from "../../Header/StyleHeader";

const ListOfAddedStocks = () => {
  const stocksdet = useContext(Stocks);
  const companydet = useContext(CompanyDetail);
  const digit2options = { maximumFractionDigits: 2 };

  useEffect(() => {
    console.log("ListOfAddedStocks");

    console.log(stocksdet.stockHistoryData);
  }, []);

  if (!companydet.isloaded) {
    return (
      <Stack
        sx={{ color: "grey.500" }}
        spacing={2}
        alignItems={"center"}
        className="spinnerstyle"
      >
        <CircularProgress color="success" size={30} />
      </Stack>
    );
  }

  return (
    <>
      <StyleHeader>
        {/* <Header name="Current Stocks" /> */}
        List Of Added Stocks
      </StyleHeader>
      {stocksdet.stockHistoryData === null ||
      stocksdet.stockHistoryData.length === 0 ? (
        <>
          <NoData details="Stock Found" />
        </>
      ) : (
        <>
          <div className="listofstickexcelbtn">
            <Button
              variant="contained"
              color="success"
              size="medium"
              endIcon={<BsFiletypeXlsx />}
              onClick={() => stocksdet.handleHistoryExportXlsx("add")}
            >
              Export History Stock to Excel
            </Button>
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "30px" }}
          >
            {stocksdet.stockHistoryData.map((item, index) => {
              return (
                <Box sx={{ width: "300px" }}>
                  <Card key={index}>
                    <ul className="details invoicedetails details ">
                      <li>
                        <div className="companyname">
                          Stock ID: {item.stockid}
                        </div>
                      </li>
                      <li>
                        <div className="companyname">
                          Date: {item.stockdate}
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
                        <h3>Stock Value</h3>
                        <li>Total Cost</li>
                        <div className="nameheigh">
                          {Intl.NumberFormat("en-IN", digit2options).format(
                            item.totalamt
                          )}
                        </div>
                      </div>
                    </ul>
                    <Link
                      to={{
                        pathname: `/addstock`,
                      }}
                    >
                      <Button
                        className="gen-stocks"
                        variant="outlined"
                        onClick={() => stocksdet.allStockHistoryEdit(item)}
                        endIcon={<RiEditCircleFill />}
                      >
                        Edit Stocks
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

export default ListOfAddedStocks;
