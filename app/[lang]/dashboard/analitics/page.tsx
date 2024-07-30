"use client";
import BarChart from "@/app/components/analitics/BarChart";
import LineChart from "@/app/components/analitics/LineChart";
import { IReview } from "@/src/types/other";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import React from "react";

const AnaliticsPage = () => {
  const { data } = useQuery({ queryKey: ["reviews"], queryFn: () => axiosInstance.get(endpoints.card.reviews) });
  const reviews: IReview[] = data?.data || [];

  return (
    <div className="p-5">
      <BarChart data={reviews} />

      <Divider className="w-full" />

      <LineChart data={reviews} />
    </div>
  );
};

export default AnaliticsPage;
