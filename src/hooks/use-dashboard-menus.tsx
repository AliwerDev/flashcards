"use client";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuPlay } from "react-icons/lu";
import { TbDeviceDesktopAnalytics, TbHome2, TbList, TbUsers } from "react-icons/tb";
import { useAuthContext } from "../auth/hooks";
import { MenuProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../utils/axios";
import get from "lodash.get";
import ICategory from "../types/category";

type MenuItem = Required<MenuProps>["items"][number];

export type Menus = MenuItem[];

export const useDashboardMenus = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();

  const { data: categories, isLoading } = useQuery({ queryKey: ["categories"], queryFn: () => axiosInstance.get(endpoints.category.list) });

  const menuItems: Menus[] = useMemo(
    () => [
      [
        {
          key: "analytics",
          icon: <TbDeviceDesktopAnalytics />,
          label: t("Analitics"),
        },
        ...(user && user.role === "admin"
          ? [
              {
                key: "users",
                icon: <TbUsers />,
                label: t("Users"),
              },
            ]
          : []),
      ],
      !isLoading
        ? get(categories, "data", []).map((category: ICategory) => ({
            key: category._id,
            label: category.title,
            children: [
              {
                key: `${category._id}/main`,
                icon: <TbHome2 />,
                label: t("main"),
              },
              {
                key: `${category._id}/play`,
                icon: <LuPlay />,
                label: t("start-learning"),
              },
              {
                key: `${category._id}/cards`,
                icon: <TbList />,
                label: t("cards"),
              },
            ],
          }))
        : [],
    ],
    [t, user, categories]
  );

  return menuItems;
};
