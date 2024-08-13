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

const colors = {
  dark: {
    colorSuccess: "#53c61b",
    colorPrimary: "#52c41a",
    colorInfo: "#13c2c2",
    colorBgBase: "#000000",
    borderRadius: 4,
    wireframe: false,
  },
  light: {
    colorSuccess: "#53c61b",
    colorPrimary: "#52c41a",
    colorInfo: "#13c2c2",
    colorBgBase: "#f3f5f1",
    borderRadius: 4,
    wireframe: false,
  },
};

const AntdProvider = ({ children, lang }: Props) => {
  const { theme: apptheme } = useSettingsContext();
  const isDarkMode = apptheme === "dark";

  return (
    <ConfigProvider
      // @ts-ignore
      locale={lang === "en" ? en_US : ru_RU}
      theme={{
        token: isDarkMode ? colors.dark : colors.light,
        algorithm: isDarkMode ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],

        components: {
          Menu: {
            darkItemBg: isDarkMode ? colors.dark.colorBgBase : colors.light.colorBgBase,
            itemSelectedBg: isDarkMode ? colors.dark.colorPrimary : colors.light.colorPrimary,
            itemSelectedColor: "#fff",
          },
        },
      }}
    >
      <StyleProvider>{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default React.memo(AntdProvider);
