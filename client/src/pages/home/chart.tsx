import React from "react";
import "./chart.scss";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const chart = (weights: any) => {
  const data = weights.data;
  return (
    <div className="chart-container">
      <div>
        <Line
          data={{
            labels: data.map((weight: any) => weight.datadate),
            datasets: [
              {
                label: "Progression over past 30 days",
                data: data.map((weight: any) => weight.entry),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                borderColor: "rgb(118, 159, 205)",
                backgroundColor: "rgba(118, 159, 205, 0.3)",
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
          className="chart-canvas"
        />
      </div>
    </div>
  );
};

export default chart;
