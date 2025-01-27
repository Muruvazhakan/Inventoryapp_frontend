import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const Linechart = ({ labels, datas, chartLabel, style }) => {
  const data = {
    labels: labels ?? [],
    datasets: [
      {
        label: chartLabel ?? "",
        data: datas ?? [],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
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
    <div
      className="chart-container"
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default Linechart;
