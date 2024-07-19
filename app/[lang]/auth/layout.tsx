"use client";
import { ReactNode } from "react";
import { GuestGuard } from "@/src/auth/guard";
import { Layout } from "antd";
import { GoogleOAuthProvider } from "@react-oauth/google";

const { Content } = Layout;

type AuthLayoutProps = {
  children: ReactNode;
  params: { lang: string };
};

export default function AuthLayout({ children, params: { lang } }: AuthLayoutProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
      <GuestGuard lang={lang}>
        <Layout>
          <Content className="flex min-h-screen items-center justify-center">{children}</Content>
        </Layout>
      </GuestGuard>{" "}
    </GoogleOAuthProvider>
  );
}
