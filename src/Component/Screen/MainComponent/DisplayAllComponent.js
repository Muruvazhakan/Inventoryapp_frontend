import React, { useContext, useEffect } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import * as Datas from "../../Context/Datas";
import Card from "../../Style/Card/Card";
import { Link } from "react-router-dom";

import "./DisplayAllComponent.css";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { Stocks } from "../../Context/StocksContex";
import Dashboard from "./Dashboard/Dashboard";

const DisplayAllComponent = () => {
  const logindet = useContext(CompanyDetail);
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
    <div style={{ width: "calc(100vw - 20px)" }}>
      {!logindet.isloaded && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          alignItems={"center"}
          className="spinnerstyle"
        >
          <CircularProgress color="success" size={30} />
        </Stack>
      )}
      {stockdet.allStockSalesList.length > 0 && (
        <Dashboard data={stockdet} totaltransaction={totaltransaction} />
      )}
      <Box
        className=" displayelements"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "0px 20px",
        }}
      >
        {Datas.navigationbarcontent.map((items, index) => {
          if (items.screenname !== "Home") {
            return (
              <div>
                <Card className="displayscreenname" key={index}>
                  <Link
                    className="displayelements linkdecor"
                    to={{ pathname: items.altname }}
                    key={index}
                  >
                    <img
                      src={items.image}
                      style={{
                        maxHeight: "400px",
                        maxWidth: "400px",
                      }}
                      alt={items.altname}
                    />
                  </Link>
                </Card>
              </div>
            );
          } else return null;
        })}
      </Box>
    </div>
  );
};

export default DisplayAllComponent;
