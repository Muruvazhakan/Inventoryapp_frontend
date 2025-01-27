import Chart from "react-apexcharts";
import {
  Container,
  Card,
  CardContent,
  Box,
  Typography,

} from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useEffect, useState } from "react";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";

const TotalEarningScreen = (props) => {
  // chart color
  const [monthdats, setmonthdata] = useState([1, 2, 3]);
  const secondary = "rgb(27, 85, 121)";
  const errorlight = "rgb(253,237,232)";
  const primary = "rgb(27, 85, 121)";
  const primarylight = "rgb(236,242,255)";
  const successlight = "rgb(230,255,250)";
 
  const totalProfitArray = Object.values(props.data.segregatedMonthData).map(item => item.totalProfit);

  
  // const totalMonthArray = Object.values(props.data.segregatedMonthData).map(item => item.month);
  const totalMonthArray = Object.keys(props.data.segregatedMonthData);

  // console.log("Total profits totalMonthArray");
  // console.log(totalMonthArray);
  const optionscolumnchart: any = {
    chart: {
      id: "basic-bar",
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      height: '100%',
      resize: true,
      barColor: "#fff",
      sparkline: {
        enabled: true,
      },
      
    },
    xaxis: {
      categories: totalMonthArray.length ===0?["Jan","Feb","Mar","Apr"]:totalMonthArray,
      labels: {
        show: true,
        style: {
          fontSize: '12px', // Adjust the font size as needed
          colors: ['#000'], // Adjust color of x-axis labels
        },
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,

      },
      
    },
    // annotations: {
    //   xaxis: {
    //     categories: totalMonthArray.length ===0?["Jan","Feb","Mar","Apr"]:totalMonthArray,
    //   }
    // },
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: "flat",
        endingShape: "flat",
        columnWidth: "60%",
        barHeight: "20%",
        borderRadius: 3
      }
    },
    colors: [secondary],

    grid: {
      show: true
    },
    yaxis: {
      // labels: {
      //   show: true
      // },
      labels: {
        show: false,
        showDuplicates: false,
        align: 'right',
        // minWidth: 0,
        // maxWidth: 260,
        style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
        },
      },
      
    },
    title: {
      text: 'Total Earning per month',
      align: 'center',
    },
    axisBorder: {
      show: false
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: true, // Enable data labels
      position: 'bottom', // This ensures the data labels are placed below the bars
      offsetY: 15, // Adjust the vertical position of the label, you can tweak this value
      style: {
        fontSize: '12px', // Adjust the font size as needed
        colors: ['#999900'], // Customize label color
      },
      formatter: function (val) {
        return val; // Customize label format if necessary
      },
    },
    // tooltip: {
    //   theme: "dark",
    // }
  };

  const seriescolumnchart = [
    {
      name: "Total Earning",
      // data: [4000, 5000, 9000, 7000, 9000, 10000, 11000, 8000, 10000],
      data: totalProfitArray,
    }
  ];
  return (
    <Container maxWidth="lg">

      <Card variant="elevation">
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Total Earning
          </Typography>
          <Typography variant="h5">₹ {props.data.allstockssalestotalamt}</Typography>
          <Box mt={2}>

            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height="100px"
            />
          </Box>
        </CardContent>
      </Card>

    </Container>
  );
};

export default TotalEarningScreen;