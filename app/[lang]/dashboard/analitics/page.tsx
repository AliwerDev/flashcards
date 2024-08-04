"use client";
import LineChart from "@/app/components/analitics/LineChart";
import { useTranslation } from "@/app/i18/client";
import { ICard } from "@/src/types/card";
import { IReview } from "@/src/types/other";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";

import { Col, Row } from "antd";
import React from "react";

const AnaliticsPage = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang);
  const { data } = useQuery({ queryKey: ["reviews"], queryFn: () => axiosInstance.get(endpoints.card.reviews) });
  const { data: cardsList } = useQuery({ queryKey: ["cards"], queryFn: () => axiosInstance.get(endpoints.card.list) });

  const reviews: IReview[] = data?.data || [];
  const cards: ICard[] = cardsList?.data || [];

  return (
    <div>
      <Row>
        <Col xs={12}></Col>
      </Row>

      <LineChart title={t("Analitics")} t={t} data={reviews} cards={cards} />

      <LineChart title={t("Analitics")} t={t} data={reviews} cards={cards} />
    </div>
  );
};

export default AnaliticsPage;
