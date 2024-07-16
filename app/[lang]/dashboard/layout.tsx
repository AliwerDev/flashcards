"use client";

import React, { ReactNode } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { BsLayoutSidebar, BsLayoutSidebarReverse } from "react-icons/bs";
import { Button, Drawer, Flex, Layout, Menu, theme } from "antd";
import { useSettingsContext } from "@/src/settings/hooks";
import { useDashboardMenus } from "@/src/hooks/use-dashboard-menus";
import { LanguageElements } from "@/app/components/dashboard/language";
import { AuthGuard } from "@/src/auth/guard";
import { useTranslation } from "@/app/i18/client";
import StyledMenu from "@/app/components/shared/menu";
import ProfileItem from "@/app/components/dashboard/profile-item";

const { Header, Sider, Content } = Layout;

interface ILayout {
  children: ReactNode;
  params: { lang: string };
}

const App: React.FC<ILayout> = ({ children, params: { lang } }) => {
  const { sidebar_collapsed, theme: apptheme, changeMode, updateData } = useSettingsContext();
  const menus = useDashboardMenus();
  const { t } = useTranslation(lang);

  const isDarkMode = apptheme === "dark";

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AuthGuard lang={lang}>
      <Layout className="h-screen">
        <Drawer placement="left" onClose={() => updateData({ sidebar_collapsed: true })} open={!sidebar_collapsed} closable={false} rootClassName="block md:hidden" styles={{ body: { padding: "10px 0" }, header: { paddingBlock: 10, paddingInline: 12 } }} width={280}>
          <StyledMenu
            $isDarkMode={isDarkMode}
            mode="inline"
            items={menus}
            onSelect={(obj) => {
              updateData({ sidebar_collapsed: true });
            }}
          />
        </Drawer>

        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          trigger={null}
          collapsible
          className="hidden md:block"
          collapsed={sidebar_collapsed}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            theme={apptheme}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menus}
          />
        </Sider>
        <Layout>
          <Header style={{ paddingInline: "16px", background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button type="text" icon={!sidebar_collapsed ? <BsLayoutSidebar /> : <BsLayoutSidebarReverse />} onClick={() => updateData({ sidebar_collapsed: !sidebar_collapsed })} />

            <Flex gap="15px" align="center">
              <LanguageElements lang={lang} />
              <Button type="text" icon={apptheme == "dark" ? <SunOutlined /> : <MoonOutlined />} onClick={() => changeMode(apptheme == "dark" ? "light" : "dark")} />
              <ProfileItem lang={lang} t={t} />
            </Flex>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthGuard>
  );
};

export default App;
