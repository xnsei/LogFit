import React from "react";
import "./chart.scss";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const chart = (weights: any) => {
  const data = weights.data;

  const formatDate = (dateInyyyyMMdd: string) => {
    const year = dateInyyyyMMdd.substring(0, 4);
    const month = dateInyyyyMMdd.substring(4, 6);
    const day = dateInyyyyMMdd.substring(6, 8);

    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[parseInt(month) - 1];

    const formattedDate = `${monthName}, ${parseInt(day)}`;
    return formattedDate;
  };

  return (
    <div className="chart-container">
      <div>
        <Line
          data={{
            labels: data.map((weight: any) => formatDate(weight.datadate)),
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
