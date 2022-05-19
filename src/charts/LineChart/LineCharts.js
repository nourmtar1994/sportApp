import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, Result, Row, Statistic } from "antd";
import { UserOutlined } from "@ant-design/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineCharts = ({ chartData }) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "مؤشر الكتلة البدنية",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "معدل الإختبارات الرياضية",
        data: chartData.moyenTest,
        fill: false,
        borderColor: "#742774",
      },
    ],
  });
  const options = {
    elements: {
      line: {
        tension: 0.3, // disables bezier curves
      },
    },
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
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };
  useEffect(() => {
    setChartData();
  }, [chartData]);

  useEffect(() => {
    setChartData();
  }, []);

  useEffect(() => {
    setChartData();
  }, [chartData]);

  useEffect(() => {
    setChartData();
  }, []);

  const setChartData = () => {
    setData({
      ...data,
      labels: chartData.year,
      datasets: [
        {
          label: "مؤشر الكتلة البدنية",
          data: chartData.bmi,
          borderColor: "#742774",
        },
        {
          label: "معدل الإختبارات الرياضية",
          data: chartData.moyenTest,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    });
  };

  const [totalMoyen, settotalMoyen] = useState(0);

  useEffect(() => {
    settotalMoyen(chartData?.bmi?.reduce((partialSum, a) => partialSum + a, 0));
  }, [chartData]);

  return (
    <>
      {chartData?.length !== 0 ? (
        <>
          <Row style={{ padding: "20px" }}>
            <Col span={4}>
              <Statistic
                title="العدد الجملي"
                value={chartData.nbrPersonnel}
                prefix={<UserOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                precision={2}
                title="المعدل العام للأختبارات الرياضية"
                value={
                  chartData?.moyenTest?.reduce(
                    (partialSum, a) => partialSum + a,
                    0
                  ) / chartData?.moyenTest?.length
                }
                prefix={<UserOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                precision={2}
                title="المعدل العام لمؤشر الكتلة الحجمية"
                value={
                  chartData?.bmi?.reduce((partialSum, a) => partialSum + a, 0) /
                  chartData?.bmi?.length
                }
                prefix={<UserOutlined />}
              />
            </Col>
          </Row>
          <Line data={data} options={options} />
        </>
      ) : (
        <Result status="warning" title="إختر القاعدة " />
      )}
    </>
  );
};

export default LineCharts;
