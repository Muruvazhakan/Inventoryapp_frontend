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
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";

const MonthlyEarningScreen = (props) => {
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

  return (
    <Container maxWidth="lg">
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader
            title="Monthly Earnings"
            action={
              <Avatar
                variant="rounded"
                sx={{
                  bgcolor: "rgb(236,242,255)",
                  width: 40,
                  height: 40,
                }}
              >
                <Avatar
                  src={
                    "https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-master-card.svg"
                  }
                  alt={"icon1Img"}
                  sx={{ width: 24, height: 24 }}
                />
              </Avatar>
            }
          />
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" mb={5}>
              <Typography variant="h5" fontWeight="600">
                $6,820
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                mt={1}
                mb={2}
                alignItems="center"
              >
                <Avatar sx={{ bgcolor: successlight, width: 20, height: 20 }}>
                  {/* <IconArrowUpLeft width={18} color="#13DEB9" /> */}
                </Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  +9%
                </Typography>
              </Stack>
            </Stack>
            {/* <Chart
                    options={optionschart}
                    series={serieschart}
                    type="line"
                    height="70px"
                  /> */}
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default MonthlyEarningScreen;
