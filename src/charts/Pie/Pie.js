import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const [chartData, setchartData] = useState({
    labels: [],
    datasets: null,
  });
  useEffect(() => {
    setchartData({
      labels: data.category,
      datasets: [
        {
          label: "# of Votes",
          data: data.data,
          backgroundColor: [
            "#FF6B6B",
            "#FFD93D",
            "#6BCB77",
            "#4D96FF",
            "#143F6B",
          ],
          borderColor: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#143F6B"],
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  const options = {
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 18,
            weight: 700,
          },
        },
        position: "bottom",
      },
    },
  };

  return (
    <div>
      {chartData?.datasets !== null && (
        <Pie options={options} width={100} height={100} data={chartData} />
      )}
    </div>
  );
};
export default PieChart;
