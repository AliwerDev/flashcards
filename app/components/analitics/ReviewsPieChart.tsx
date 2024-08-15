import { IReview } from "@/src/types/other";
import React from "react";
import { theme as antTheme, Card, Typography } from "antd";
import { Tooltip, Pie, PieChart, Cell } from "recharts";
import { TFunction } from "i18next";

interface IProps {
  reviews: IReview[];
  title?: string;
  t: TFunction;
}

export default function ReviewsPieChart({ reviews, title, t }: IProps) {
  const { token } = antTheme.useToken();

  const correctReviews = reviews.filter((review) => review.correct).length;
  const incorrectReviews = reviews.length - correctReviews;

  const data = [
    { name: t("correct-reviews"), value: correctReviews },
    { name: t("incorrect-reviews"), value: incorrectReviews },
  ];

  return (
    <Card className="my-5" classNames={{ body: "!p-2" }}>
      <Typography.Title level={5} className="text-center mt-0 my-3">
        {title ? title : t("your-statistics")}
      </Typography.Title>
      <div className="flex justify-center">
        <PieChart width={300} height={300}>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={100} label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? token.colorSuccess : token.colorError} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </Card>
  );
}
