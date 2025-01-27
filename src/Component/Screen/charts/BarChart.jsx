import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Barchart = ({ labels, datas, chartLabel, style }) => {
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
        borderRadius: 3,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    animation: {
      duration: 1,
      onProgress: function ({ chart }) {
        const ctx = chart.ctx;
        chart.config.data.datasets.forEach(function (dataset, i) {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
            const data = dataset.data[index];
            ctx.fillText(data, bar.x - 20, bar.y - 6);
          });
        });
      },
    },
  };
  return (
    <div
      className="chart-container"
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default Barchart;
