import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import { useSettingsContext } from "../settings/hooks";

import en_US from "antd/locale/en_US";
import ru_RU from "antd/locale/ru_RU";

type Props = {
  children: React.ReactNode;
  lang: string;
};

const AntdProvider = ({ children, lang }: Props) => {
  const { theme: apptheme } = useSettingsContext();
  const isDarkMode = apptheme === "dark";

  return (
    <ConfigProvider
      // @ts-ignore
      locale={lang === "en" ? en_US : ru_RU}
      theme={{
        token: {
          colorPrimary: isDarkMode ? "#73C0FF" : "#1A79C6",
          colorBorder: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#00000010",
          colorPrimaryBg: isDarkMode ? "#121212" : "#FFFFFF",
          colorText: isDarkMode ? "#E0E0E0" : "#333333",
        },
        algorithm: isDarkMode ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
        components: {
          Menu: {
            itemPaddingInline: "12px",
          },
          Table: {
            rowSelectedBg: "transparent",
            rowSelectedHoverBg: "transparent",
            headerColor: isDarkMode ? "#ffffff40" : "#1C1C1C40",
            headerSplitColor: "transparent",
          },
          Modal: {
            motion: false,
          },
        },
      }}
    >
      <StyleProvider hashPriority="low">{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default React.memo(AntdProvider);
