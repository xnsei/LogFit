import React from "react";
import "./chart.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const chart = (weights: any) => {
  const data = weights.data;
  return (
    <div className="chart-container">
      <h2 className="chart-title">Weights</h2>
      <div>
        <Line
          data={{
            labels: data.map((weight: any) => weight.datadate),
            datasets: [
              {
                label: "Progression over past 30 days",
                data: data.map((weight: any) => weight.entry),
                borderWidth: 1,
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default chart;
