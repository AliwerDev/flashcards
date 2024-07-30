"use client";

import { Spin, theme } from "antd";
import React from "react";

export const SplashScreen = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div style={{ backgroundColor: colorBgContainer }} className="h-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};
