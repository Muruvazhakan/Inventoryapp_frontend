import Chart from "react-apexcharts";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Box,
  Typography,
  Avatar,
  Alert,
} from "@mui/material";
import Linechart from "../../../charts/LineChart";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";

const TotalSalesScreen = (props) => {
  // chart color
  const secondary = "rgb(73,190,255)";
  const errorlight = "rgb(253,237,232)";
  const primary = "rgb(93, 135, 255)";
  const primarylight = "rgb(236,242,255)";
  const successlight = "rgb(230,255,250)";

  // chart
  //   const optionscolumnchart: any = {
  //     chart: {
  //       type: "bar",
  //       fontFamily: "'Plus Jakarta Sans', sans-serif;",
  //       foreColor: "#adb0bb",
  //       toolbar: {
  //         show: false
  //       },
  //       height: 55,
  //       resize: true,
  //       barColor: "#fff",
  //       sparkline: {
  //         enabled: true
  //       }
  //     },
  //     colors: [secondary],
  //     grid: {
  //       show: false
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         startingShape: "flat",
  //         endingShape: "flat",
  //         columnWidth: "60%",
  //         barHeight: "20%",
  //         borderRadius: 3
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2.5,
  //       colors: ["rgba(0,0,0,0.01)"]
  //     },
  //     xaxis: {
  //       axisBorder: {
  //         show: false
  //       },
  //       axisTicks: {
  //         show: false
  //       },
  //       labels: {
  //         show: false
  //       }
  //     },
  //     yaxis: {
  //       labels: {
  //         show: false
  //       }
  //     },
  //     axisBorder: {
  //       show: false
  //     },
  //     fill: {
  //       opacity: 1
  //     },
  //     tooltip: {
  //       theme: "dark",
  //       x: {
  //         show: false
  //       }
  //     }
  //   };
  //   const seriescolumnchart = [
  //     {
  //       name: "",
  //       data: [4, 10, 9, 7, 9, 10, 11, 8, 10]
  //     }
  //   ];

  //   // chart
  //   const optionschart: any = {
  //     chart: {
  //       type: "line",
  //       fontFamily: "'Plus Jakarta Sans', sans-serif;",
  //       foreColor: "#adb0bb",
  //       toolbar: {
  //         show: false
  //       },
  //       height: 70,
  //       sparkline: {
  //         enabled: true
  //       },
  //       group: "sparklines"
  //     },
  //     stroke: {
  //       curve: "smooth",
  //       width: 2
  //     },

  //     markers: {
  //       size: 0
  //     },
  //     tooltip: {
  //       theme: "dark"
  //     }
  //   };
  //   const serieschart = [
  //     {
  //       name: "",
  //       color: primary,
  //       data: [25, 66, 20, 40, 12, 58, 20]
  //     }
  //   ];

  const chartDatas = props.data.allProfitStockList.map(
    (stockDetail) => stockDetail.profit
  );
  const chartLabels = props.data.allProfitStockList.map(
    (stockDetail) => stockDetail.productid
  );

  return (
    <Container maxWidth="lg">
      <Card variant="elevation">
        <CardContent>
          {/* <Avatar
                    variant="rounded"
                    sx={{
                      bgcolor: "rgb(253,237,232)",
                      width: 40,
                      height: 40
                    }}
                  >
                    <Avatar
                      src={
                        "https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-office-bag.svg"
                      }
                      alt={"icon1Img"}
                      sx={{ width: 24, height: 24 }}
                    />
                  </Avatar> */}
          <Typography variant="subtitle2" color="textSecondary">
            Sales Profit
          </Typography>
          <Typography variant="h5">₹ {props.data.totalprofiramt}</Typography>
          <Linechart
            chartLabel={"Profit per product"}
            labels={chartLabels}
            datas={chartDatas}
            style={{ height: "300px" }}
          />
          {/* <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Avatar sx={{ bgcolor: errorlight, width: 20, height: 20 }}>
                      <IconArrowDownRight width={16} color="#FA896B" />
                    </Avatar>
                    <Typography variant="subtitle2" color="textSecondary">
                      +9%
                    </Typography>
                  </Stack> */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TotalSalesScreen;
