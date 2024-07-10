"use client";
import { AuthProvider } from "@/src/auth/context";
import theme from "@/src/theme/themeConfig";
import { ConfigProvider } from "antd";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </AuthProvider>
  );
}
