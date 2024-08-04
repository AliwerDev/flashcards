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
        token: isDarkMode
          ? {
              colorSuccess: "#53c61b",
              colorPrimary: "#52c41a",
              colorInfo: "#13c2c2",
              colorBgBase: "#000000",
              borderRadius: 4,
              wireframe: false,
            }
          : {
              colorSuccess: "#53c61b",
              colorPrimary: "#52c41a",
              colorInfo: "#13c2c2",
              colorBgBase: "#f3f5f1",
              borderRadius: 4,
              wireframe: false,
            },
        algorithm: isDarkMode ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],

        components: {
          Menu: {
            colorInfoActive: "#ffffff",
            itemActiveBg: "#52c41a",
            colorBgTextActive: "#52c41a",
          },
        },
      }}
    >
      <StyleProvider>{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default React.memo(AntdProvider);
