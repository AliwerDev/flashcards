"use client";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

export type Menus = ({ key: string; icon: React.ReactNode; label: string; path?: undefined; children?: any } | { key: string; icon: React.ReactNode; label: string; path: string; children?: any })[];

export const useDashboardMenus = () => {
  const { t } = useTranslation();

  const menuItems: Menus = useMemo(
    () => [
      {
        key: "1",
        icon: <UserOutlined />,
        label: "nav 1",
      },
      {
        key: "2",
        icon: <VideoCameraOutlined />,
        label: "nav 2",
      },
      {
        key: "3",
        icon: <UploadOutlined />,
        label: "nav 3",
      },
    ],
    [t]
  );

  return menuItems;
};
