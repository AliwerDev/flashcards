import { Spin } from "antd";
import React from "react";

export const SplashScreen = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spin size="large" />
    </div>
  );
};
