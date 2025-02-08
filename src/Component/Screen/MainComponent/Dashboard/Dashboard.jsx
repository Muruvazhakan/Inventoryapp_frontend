import { Box, Card, Stack } from "@mui/material";
import React from "react";
import salesdashboard from "../../../../Image/Dashboard/salesdashboard-rm.png";
import profitsymbbol from "../../../../Image/Dashboard/profitsymbbol-rm.png";
import soldunit2 from "../../../../Image/Dashboard/soldunit2.png";
import cashsymbbol from "../../../../Image/Dashboard/cashsymbbol.png";
import profiticonchat from "../../../../Image/Dashboard/profiticonchat.png";
import totaltranscations from "../../../../Image/Dashboard/totaltranscations.png";
import toprated from "../../../../Image/Dashboard/toprated-rm.png";

import DashboardTemp from "./DashboardTemp";

const Dashboard = (props) => {
  const netprofitmargin = (
    (props.data.totalprofiramt / props.data.allstockssalestotalamt) *
    100
  ).toFixed(2);
  let topprod, maxProductId, maxcount;
  if (props.data.allStockSalesList.length > 0) {
    topprod = props.data.allStockSalesList.reduce(
      (max, item) => (item.quantity > max.quantity ? item : max),
      props.data.allStockSalesList[0]
    );
    maxProductId = topprod.productid;
    maxcount = topprod.quantity;
  }
  let soldunits = 0;
  props.data.allStockSalesList.map((stockDetail) => {
    soldunits = soldunits + stockDetail.quantity * 1;
  });
  console.log("props.data.allStockSalesList");
  console.log(props.data.allStockSalesList);
  console.log("topprod");
  console.log(topprod);
  if (props.data.allStockSalesList.length === 0) return <></>;
  return (
    <>
      <Stack
        direction="row"
        mt={2}
        gap={2}
        alignItems="center"
        justifyContent={"space-evenly"}
      >
        <Card>
          <Stack
            direction="row"
            // mt={3}
            alignItems="center"
            padding={5}
            // paddingRight={15}
            gap={2}
            justifyContent={"space-evenly"}
          >
            <img
              src={salesdashboard}
              height={200}
              width={200}
              alt="sales dashbboard"
            />

            <h2>Profit Dashboard</h2>
          </Stack>
        </Card>
        <Box>
          <Stack direction="column" gap={1}>
            <DashboardTemp
              img={profitsymbbol}
              title="Total Revenue"
              value={`₹${props.data.allstockssalestotalamt}`}
            />
            <DashboardTemp
              img={totaltranscations}
              title="Total Transaction"
              value={props.totaltransaction}
            />
          </Stack>
        </Box>
        <Box>
          <Stack direction="column" gap={1}>
            <DashboardTemp
              img={cashsymbbol}
              title="Net Profit"
              value={`₹${props.data.totalprofiramt}`}
            />

            <DashboardTemp
              img={soldunit2}
              title="Sold Units"
              value={`${soldunits}`}
            />
          </Stack>
        </Box>
        <Box>
          <Stack direction="column" gap={1}>
            <DashboardTemp
              img={profiticonchat}
              title="Net Profit Margin %"
              value={`${netprofitmargin} %`}
            />
            <DashboardTemp
              img={toprated}
              title="Top Product"
              value={`${maxProductId} - (${maxcount} Units)`}
            />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Dashboard;
