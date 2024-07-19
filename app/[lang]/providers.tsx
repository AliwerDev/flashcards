"use client";
import { AuthProvider } from "@/src/auth/context";
import { SettingsProvider } from "@/src/settings/context";
import AntdProvider from "@/src/theme/antd-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: string;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SettingsProvider>
          <AntdProvider lang={lang}>{children}</AntdProvider>
        </SettingsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
