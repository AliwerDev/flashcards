"use client";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

export type Menus = ({ key: string; icon: React.ReactNode; label: string; path?: undefined; children?: any } | { key: string; icon: React.ReactNode; label: string; path: string; children?: any })[];

export const useDashboardMenus = () => {
  const { t } = useTranslation();

  const menuItems: Menus = useMemo(
    () => [
      {
        key: "default",
        icon: null,
        label: "Default category",
      },
    ],
    [t]
  );

  return menuItems;
};
