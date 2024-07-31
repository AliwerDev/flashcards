"use client";
import { useSettingsContext } from "@/src/settings/hooks";
import { IReview } from "@/src/types/other";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import styled from "@emotion/styled";
import { theme as antTheme } from "antd";
import { alpha, bgBlur } from "@/src/auth/context/utils";

interface LineChartProps {
  data: IReview[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { theme } = useSettingsContext();

  const { token } = antTheme.useToken();

  // Process data
  const dates = Array.from(new Set(data.map((item) => new Date(item.reviewDate).toLocaleDateString())));
  const correctReviews = dates.map((date) => data.filter((item) => item.correct && new Date(item.reviewDate).toLocaleDateString() === date).length);
  const incorrectReviews = dates.map((date) => data.filter((item) => !item.correct && new Date(item.reviewDate).toLocaleDateString() === date).length);

  const chartData = {
    theme: {
      mode: theme,
      palette: "palette1",
      monochrome: {
        enabled: true,
        color: theme === "light" ? "#333" : "#fff",
      },
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

  return <StyledChart token={token} options={chartData.options} series={chartData.series} type="line" height={350} />;
};

const StyledChart = styled(Chart)(({ token }) => {
  return {
    "& .apexcharts-canvas": {
      // Tooltip
      "& .apexcharts-tooltip": {
        ...bgBlur({
          color: token.colorTextDisabled,
        }),
        color: token.colorTextDisabled,
        boxShadow: token.boxShadowSecondary,
        borderRadius: token.borderRadius * 1.25,
        "&.apexcharts-theme-light": {
          borderColor: "transparent",
          ...bgBlur({
            color: token.colorTextDisabled,
          }),
        },
      },
      "& .apexcharts-xaxistooltip": {
        ...bgBlur({
          color: token.colorBgContainer,
        }),
        borderColor: "transparent",
        color: token.colorTextDisabled,
        boxShadow: token.boxShadowSecondary,
        borderRadius: token.borderRadius * 1.25,
        "&:before": {
          borderBottomColor: alpha(token.colorTextDisabled, 0.24),
        },
        "&:after": {
          borderBottomColor: alpha(token.colorTextDisabled, 0.8),
        },
      },
      "& .apexcharts-tooltip-title": {
        textAlign: "center",
        fontWeight: 400,
        backgroundColor: alpha(token.colorTextSecondary, 0.08),
        color: token.colorText,
      },

      // LEGEND
      "& .apexcharts-legend": {
        padding: 0,
      },
      "& .apexcharts-legend-series": {
        display: "inline-flex !important",
        alignItems: "center",
      },
      "& .apexcharts-legend-marker": {
        marginRight: 8,
      },
      "& .apexcharts-legend-text": {
        lineHeight: "18px",
        textTransform: "capitalize",
      },
    },
  };
});

export default LineChart;
