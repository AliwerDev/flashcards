"use client";

import React, { ReactNode } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { BsLayoutSidebar, BsLayoutSidebarReverse } from "react-icons/bs";
import { Breadcrumb, Button, Drawer, Flex, Layout, Menu, theme } from "antd";
import { useSettingsContext } from "@/src/settings/hooks";
import { useDashboardMenus } from "@/src/hooks/use-dashboard-menus";
import { LanguageElements } from "@/app/components/dashboard/language";
import { AuthGuard } from "@/src/auth/guard";
import { useTranslation } from "@/app/i18/client";
import ProfileItem from "@/app/components/dashboard/profile-item";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

interface ILayout {
  children: ReactNode;
  params: { lang: string };
}

const App: React.FC<ILayout> = ({ children, params: { lang } }) => {
  const { sidebar_collapsed, theme: apptheme, changeMode, updateData } = useSettingsContext();
  const menus = useDashboardMenus();
  const { t } = useTranslation(lang);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logo = (
    <div className="w-full flex justify-start px-2 my-3 cursor-pointer">
      <Image className="max-h-10 min-h-10" src={sidebar_collapsed ? "/assets/logo/logo-mini.svg" : "/assets/logo/logo.svg"} alt="flashcards" height={40} width={180} />
    </div>
  );

  return (
    <AuthGuard lang={lang}>
      <Layout className="h-screen">
        <Drawer placement="left" onClose={() => updateData({ sidebar_collapsed: true })} open={!sidebar_collapsed} closable={false} rootClassName="block md:hidden" styles={{ body: { padding: "10px 0" }, header: { paddingBlock: 10 } }} width={200}>
          {logo}
          <Menu
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            theme={apptheme}
            defaultSelectedKeys={["1"]}
            items={menus}
          />
        </Drawer>

        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          collapsible
          theme={apptheme}
          onCollapse={() => updateData({ sidebar_collapsed: !sidebar_collapsed })}
          className="hidden md:block"
          collapsed={sidebar_collapsed}
          zeroWidthTriggerStyle={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          {logo}
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
            <Breadcrumb items={[{ title: "Dashboard", href: "/" }]} />
            <Flex gap="15px" align="center">
              <LanguageElements lang={lang} />
              <Button type="text" icon={apptheme == "dark" ? <SunOutlined /> : <MoonOutlined />} onClick={() => changeMode(apptheme == "dark" ? "light" : "dark")} />
              <ProfileItem lang={lang} t={t} />
            </Flex>
          </Header>
          <Content
            className="m-2 mx-0 md:my-4 md:mx-4 lg:my-5"
            style={{
              padding: 24,
              minHeight: 280,
              // background: colorBgContainer,
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
