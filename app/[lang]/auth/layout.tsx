"use client";
import { ReactNode } from "react";
import { GuestGuard } from "@/src/auth/guard";
import { Layout, theme } from "antd";

const { Content } = Layout;

type AuthLayoutProps = {
  children: ReactNode;
  params: { lang: string };
};

export default function AuthLayout({ children, params: { lang } }: AuthLayoutProps) {
  return (
    <GuestGuard lang={lang}>
      <Layout>
        <Content className="flex min-h-screen items-center justify-center">{children}</Content>
      </Layout>
    </GuestGuard>
  );
}
