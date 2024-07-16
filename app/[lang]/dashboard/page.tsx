"use client";
import { useTranslation } from "@/app/i18/client";
import React from "react";

const Page = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang);

  return <p>{t("hello")}</p>;
};

export default Page;
