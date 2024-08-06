"use client";
import { IReview } from "@/src/types/other";
import { LineChart as ReLineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

import React, { useEffect, useRef, useState } from "react";
import { theme as antTheme, Card, Typography } from "antd";
import { TFunction } from "i18next";
import { ICard } from "@/src/types/card";
import { t } from "i18next";

interface LineChartProps {
  data: IReview[];
  cards: ICard[];
  t: TFunction;
  title?: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, cards, title }) => {
  const { token } = antTheme.useToken();
  const datesMap = new Map();
  const cardRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);

  // Process data
  data.forEach((item) => {
    const date = new Date(item.reviewDate).toLocaleDateString();
    if (!datesMap.has(date)) {
      datesMap.set(date, { cr: 0, icr: 0, new: 0 });
    }
    const counts = datesMap.get(date);
    if (item.correct) {
      counts.cr += 1;
    } else {
      counts.icr += 1;
    }
  });

  cards.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!datesMap.has(date)) {
      datesMap.set(date, { cr: 0, icr: 0, new: 1 });
    } else {
      const dateData = datesMap.get(date);
      dateData.new += 1;
    }
  });

  const values = Array.from(datesMap, ([date, data]) => ({
    name: date,
    cr: data.cr,
    icr: data.icr,
    new: data.new,
  }));

  const tooltipStyle = { background: token.colorBgBase, boxShadow: token.boxShadow, borderRadius: token.borderRadius, borderColor: token.colorBorder };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={tooltipStyle} className="p-1 flex flex-col">
          <Typography.Text className="text-sm text-[#1db8f0]">{`New cards: ${payload[0].value}`}</Typography.Text>
          <Typography.Text className="text-sm" type="success" color="success">{`Correct reviews: ${payload[1].value}`}</Typography.Text>
          <Typography.Text className="text-sm" type="danger">{`Incorrect reviews: ${payload[2].value}`}</Typography.Text>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      setWidth(cardWidth);
    }
  }, [cardRef]);

  return (
    <Card className="my-5" classNames={{ body: "!p-2" }}>
      <Typography.Title level={5} className="text-center mt-0 my-3">
        {title ? title : t("Your statistics")}
      </Typography.Title>
      <div className="max-w-full overflow-hidden" ref={cardRef}>
        <ReLineChart
          width={width}
          height={300}
          data={values}
          margin={{
            left: -20,
            bottom: -10,
          }}
        >
          <CartesianGrid stroke={token.colorTextDisabled} strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={CustomTooltip} contentStyle={tooltipStyle} />
          <Line type="linear" dataKey="new" stroke="#1db8f0" activeDot={{ r: 4 }} />
          <Line type="linear" dataKey="cr" stroke="#49aa19" activeDot={{ r: 4 }} />
          <Line type="linear" dataKey="icr" stroke="#dc4446" activeDot={{ r: 4 }} />
        </ReLineChart>
      </div>
    </Card>
  );
};

export default LineChart;
