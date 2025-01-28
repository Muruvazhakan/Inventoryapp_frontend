import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = ({ labels, datas, chartLabel, style }) => {
  const data = {
    labels: labels ?? [],
    datasets: [
      {
        label: chartLabel ?? "",
        data: datas ?? [],
        backgroundColor: [
          "rgb(255, 159, 64)",
          "rgba(157, 155, 152)",
          
          "rgba(255, 159, 64)",
          "rgb(153, 102, 255)",
          "rgb(33, 120, 157)",
          "rgba(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgba(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgb(157, 155, 152)",
          "rgba(201, 203, 207)",
          
        ],
        borderColor: [
          // "rgb(255, 255, 255)",
          "rgb(60, 60, 60)",
          
          // "rgb(255, 159, 64)",
          // "rgb(255, 205, 86)",
          // "rgb(75, 192, 192)",
          // "rgb(54, 162, 235)",
          // "rgb(153, 102, 255)",
          // "rgb(33, 120, 157)",
          // "rgba(157, 155, 152)",
          // "rgba(255, 159, 64)",
          // "rgba(255, 205, 86)",
          // "rgba(75, 192, 192)",
          // "rgba(54, 162, 235)",
          // "rgba(153, 102, 255)",
          // "rgba(201, 203, 207)",
        ],
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 10,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  return (
    <>
      {datas.length > 0 &&

        <div
          className="chart-container"
          style={{ position: "relative", width: "100%", height: "100%", ...style }}
        >
          <Pie data={data} options={options} />
        </div>
      }
    </>
  );
};

export default PieChart;
