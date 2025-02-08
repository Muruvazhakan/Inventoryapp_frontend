import { Container, Card, CardContent, Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useEffect, useState } from "react";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";
import Barchart from "../../../charts/BarChart";

const TotalEarningScreen = (props) => {
  // chart color
  const [monthdats, setmonthdata] = useState([1, 2, 3]);
  const secondary = "rgb(27, 85, 121)";

  const totalProfitArray = Object.values(props.data.segregatedMonthData).map(
    (item) => item.totalProfit
  );

  // const totalMonthArray = Object.values(props.data.segregatedMonthData).map(item => item.month);
  const totalMonthArray = Object.keys(props.data.segregatedMonthData);

  return (
    <Container maxWidth="lg">
      <Card variant="elevation">
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Total Revenue
          </Typography>
          <Typography variant="h5">
            ₹ {props.data.allstockssalestotalamt}
          </Typography>
          <Box mt={1}>
            {/* {totalMonthArray.length > 0 && (
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                // height="100px"
              />
            )} */}

            <Barchart
              labels={totalMonthArray}
              datas={totalProfitArray}
              chartLabel={"Bar Chart"}
              chartTitle={"Total Revenue per month"}
              style={{ height: "300px" }}
              enableLineChart={true}
              lineChartLabel={"Line Chart"}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TotalEarningScreen;
