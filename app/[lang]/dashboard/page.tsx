"use client";
import { paths } from "@/src/routes/paths";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({ params: { lang } }: { params: { lang: string } }) => {
  const router = useRouter();
  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: () => axiosInstance.get(endpoints.category.list) });

  useEffect(() => {
    if (get(categories, "data.length") > 0) {
      router.push(paths.dashboard.main(lang, get(categories, "data[0]._id")));
    }
  }, [categories]);

  return <div></div>;
};

export default Page;
