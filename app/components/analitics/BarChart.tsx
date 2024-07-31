// BarChart.tsx
import { IReview } from "@/src/types/other";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartProps {
  data: IReview[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // Process data
  const dates = Array.from(new Set(data.map((item) => new Date(item.reviewDate).toLocaleDateString())));
  const correctReviews = dates.map((date) => data.filter((item) => item.correct && new Date(item.reviewDate).toLocaleDateString() === date).length);
  const incorrectReviews = dates.map((date) => data.filter((item) => !item.correct && new Date(item.reviewDate).toLocaleDateString() === date).length);

  const chartData = {
    series: [
      {
        name: "Correct Reviews",
        data: correctReviews,
        color: "#0eb132",
      },
      {
        name: "Incorrect Reviews",
        data: incorrectReviews,
        color: "#F44336",
      },
    ],
    options: {
      chart: {
        type: "bar" as "bar",
        height: 350,
        windth: 10,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: dates,
      },
      legend: {
        position: "top" as "top",
      },
      fill: {
        opacity: 1,
        colors: ["#0eb132", "#F44336"],
      },
    },
  };

  return <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />;
};

export default BarChart;
