"use client";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LuPlay } from "react-icons/lu";
import { TbDeviceDesktopAnalytics, TbHome2, TbList, TbUsers } from "react-icons/tb";
import { useAuthContext } from "../auth/hooks";
import get from "lodash.get";

export type Menus = ({ key: string; icon: React.ReactNode; label: string; path?: undefined; children?: any } | { key: string; icon: React.ReactNode; label: string; path: string; children?: any })[];

export const useDashboardMenus = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();

  const menuItems: Menus = useMemo(
    () => [
      {
        key: "",
        icon: <TbHome2 />,
        label: t("Main page"),
      },
      {
        key: "play",
        icon: <LuPlay />,
        label: t("Start Learning"),
      },
      {
        key: "analitics",
        icon: <TbDeviceDesktopAnalytics />,
        label: t("Analitics"),
      },
      {
        key: "cards",
        icon: <TbList />,
        label: t("Cards list"),
      },

      ...(get(user, "role") === "admin"
        ? [
            {
              key: "users",
              icon: <TbUsers />,
              label: t("Users"),
            },
          ]
        : []),
    ],
    [t, user]
  );

  return menuItems;
};
