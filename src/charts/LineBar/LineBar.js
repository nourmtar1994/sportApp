import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LineBar = ({ bmiData }) => {
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    bmiData?.category && setLabels(bmiData.category);
    bmiData?.category && setLabels(bmiData.category);
  }, [bmiData]);

  let data = {
    labels,
    datasets: [
      {
        data: bmiData?.category ? bmiData?.data : [],

        backgroundColor: [
          "#e52433",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "#97eb11",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "#9dff01",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        ticks: {
          font: {
            size: 19,
            weight: 700,
          },
        },
      },
    },
    responsive: true,
    plugins: {
      backgrounds: {
        hbars: [
          {
            from: 20,
            to: 24,
            color: "rgb(195, 230, 195)",
          },
        ],
      },
      legend: false,
      title: {
        position: "bottom",
        display: false,
        text: "Chart.js Bar Chart",
      },
      scales: {
        xAxis: {
          // The axis for this scale is determined from the first letter of the id as `'x'`
          // It is recommended to specify `position` and / or `axis` explicitly.
          type: "time",
        },
      },
    },
    onClick: function (evt, element) {
      // onClickNot working element null
      console.log(evt, element);
      if (element.length > 0) {
        // console.log(element, element[0]._datasetInde);
        // you can also get dataset of your selected element
        console.log(data.datasets[element[0]._datasetIndex]);
      }
    },
  };
  return (
    <Bar
      plugins={[
        {
          id: "backgrounds",
          beforeDraw: (chart, args, options) => {
            const {
              ctx,
              chartArea,
              scales: { y },
            } = chart;

            options.hbars.forEach((hBar) => {
              ctx.save();
              ctx.fillStyle = hBar.color;
              ctx.fillRect(
                chartArea.left,
                y.getPixelForValue(hBar.from),
                chartArea.right - chartArea.left,
                y.getPixelForValue(hBar.to) - y.getPixelForValue(hBar.from)
              );
              ctx.restore();
            });
          },
        },
      ]}
      options={options}
      data={data}
    />
  );
};
export default LineBar;
