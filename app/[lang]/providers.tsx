"use client";
import { AuthProvider } from "@/src/auth/context";
import { QueryClientInstanceProvider, useQueryClientInstance } from "@/src/context/QueryClient.client";
import { SettingsProvider } from "@/src/settings/context";
import AntdProvider from "@/src/theme/antd-provider";
import { QueryClientProvider } from "@tanstack/react-query";

const AppQueryClientInstanceWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClientInstance();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export function Providers({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: string;
}>) {
  return (
    <QueryClientInstanceProvider>
      <AppQueryClientInstanceWrapper>
        <AuthProvider>
          <SettingsProvider>
            <AntdProvider lang={lang}>{children}</AntdProvider>
          </SettingsProvider>
        </AuthProvider>
      </AppQueryClientInstanceWrapper>
    </QueryClientInstanceProvider>
  );
}
