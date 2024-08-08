"use client";

import { Button, Result, theme } from "antd";
import React from "react";

const NotFoundPage = () => {
  const { token } = theme.useToken();

  return (
    <div style={{ backgroundColor: token.colorBgContainer }} className="w-full h-screen grid place-items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button href="/en/dashboard" type="link">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
