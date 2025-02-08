import { Container, Card, CardContent, Typography } from "@mui/material";
import Linechart from "../../charts/LineChart";

const StockChart = (props, title, chartlable) => {
  // chart color
  let localsumqty1 = 0;
  const chartDatas = props.data.map((stockDetail) => {
    localsumqty1 = localsumqty1 + stockDetail.quantity * 1;
    return stockDetail.quantity;
  });
  const chartLabels = props.data.map((stockDetail) => stockDetail.productid);

  return (
    <>
      <Container>
        <Card variant="elevation">
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">
              {props.title}
            </Typography>
            <Typography variant="h5">{localsumqty1}</Typography>
            <Linechart
              chartLabel={props.chartlable}
              labels={chartLabels}
              datas={chartDatas}
              style={{ height: "300px" }}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default StockChart;
