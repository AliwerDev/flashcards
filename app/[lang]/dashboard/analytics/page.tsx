"use client";
import LineChart from "@/app/components/analitics/LineChart";
import ReviewsPieChart from "@/app/components/analitics/ReviewsPieChart";
import { useTranslation } from "@/app/i18/client";
import { ICard } from "@/src/types/card";
import { IReview } from "@/src/types/other";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";

import { Col, Row } from "antd";
import React from "react";

interface IProps {
  params: { lang: string; categoryId: string };
}

const AnaliticsPage = ({ params: { lang } }: IProps) => {
  const { t } = useTranslation(lang);
  const { data } = useQuery({ queryKey: ["reviews"], queryFn: () => axiosInstance.get(endpoints.card.reviews) });
  const { data: cardsList } = useQuery({ queryKey: ["cards"], queryFn: () => axiosInstance.get(endpoints.card.list) });

  const reviews: IReview[] = data?.data || [];
  const cards: ICard[] = cardsList?.data || [];

  return (
    <div>
      <Row gutter={[15, 15]}>
        <Col xs={24} lg={16}>
          <LineChart title={t("Analitics")} t={t} data={reviews} cards={cards} />
        </Col>
        <Col xs={24} lg={8}>
          <ReviewsPieChart title={t("all-reviews")} t={t} reviews={reviews} />
        </Col>
      </Row>
    </div>
  );
};

export default AnaliticsPage;
