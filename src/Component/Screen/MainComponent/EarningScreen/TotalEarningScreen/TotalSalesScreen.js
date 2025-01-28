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
import PieChart from "../../../charts/PieChart";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";

const TotalSalesScreen = (props) => {
  // chart color
  const secondary = "rgb(73,190,255)";
  const errorlight = "rgb(253,237,232)";
  const primary = "rgb(93, 135, 255)";
  const primarylight = "rgb(236,242,255)";
  const successlight = "rgb(230,255,250)";

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
          {/* <Linechart
            chartLabel={"Profit per product"}
            labels={chartLabels}
            datas={chartDatas}
            style={{ height: "300px" }}
          /> */}

          <PieChart
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
