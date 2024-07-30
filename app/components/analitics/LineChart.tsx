// LineChart.tsx
import { useSettingsContext } from "@/src/settings/hooks";
import { IReview } from "@/src/types/other";
import React from "react";
import Chart from "react-apexcharts";

interface LineChartProps {
  data: IReview[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { theme } = useSettingsContext();

  // Process data
  const dates = Array.from(new Set(data.map((item) => new Date(item.reviewDate).toLocaleDateString())));
  const correctReviews = dates.map((date) => data.filter((item) => item.correct && new Date(item.reviewDate).toLocaleDateString() === date).length);
  const incorrectReviews = dates.map((date) => data.filter((item) => !item.correct && new Date(item.reviewDate).toLocaleDateString() === date).length);

  const chartData = {
    theme: {
      mode: theme,
      palette: "palette1",
    },
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
        type: "line" as "line",
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      xaxis: {
        categories: dates,
      },
      stroke: {
        width: [3, 3],
      },
      markers: {
        size: 5,
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

  return <Chart options={chartData.options} series={chartData.series} type="line" height={350} />;
};

export default LineChart;
