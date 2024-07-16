"use client";
import { AuthProvider } from "@/src/auth/context";
import { SettingsProvider } from "@/src/settings/context";
import AntdProvider from "@/src/theme/antd-provider";

export function Providers({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: string;
}>) {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AntdProvider lang={lang}>{children}</AntdProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
