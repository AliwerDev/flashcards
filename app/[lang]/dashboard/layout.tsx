"use client";
import React, { ReactNode } from "react";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Drawer, Flex, Layout, Menu, Space, theme } from "antd";
import { useSettingsContext } from "@/src/settings/hooks";
import { useDashboardMenus } from "@/src/hooks/use-dashboard-menus";
import { LanguageElements } from "@/app/components/dashboard/language";
import { AuthGuard } from "@/src/auth/guard";
import { useTranslation } from "@/app/i18/client";
import ProfileItem from "@/app/components/dashboard/profile-item";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GoPlus, GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const { Header, Sider, Content } = Layout;

interface ILayout {
  children: ReactNode;
  params: { lang: string };
}

const App: React.FC<ILayout> = ({ children, params: { lang } }) => {
  const { sidebar_collapsed, theme: apptheme, changeMode, updateData } = useSettingsContext();
  const pathname = usePathname();
  const { t } = useTranslation(lang);
  const menus = useDashboardMenus();

  const breadcrumbItems = generateBreadcrumbs(pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logo = (
    <div className="w-full flex justify-start px-2 my-3 cursor-pointer">
      <Image className="max-h-10 min-h-10" src={sidebar_collapsed ? "/assets/logo/logo-mini.svg" : "/assets/logo/flashcards1.svg"} alt="flashcards" height={40} width={180} />
    </div>
  );

  const addCategoryButton = (
    <Space className="w-full justify-center mt-3">
      <Button size="large" type="dashed" icon={<GoPlus />}>
        {t("Add new category")}
      </Button>
    </Space>
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
          {addCategoryButton}
        </Drawer>

        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          collapsible
          collapsedWidth="0"
          theme={apptheme}
          onCollapse={() => updateData({ sidebar_collapsed: !sidebar_collapsed })}
          className="hidden md:block"
          collapsed={sidebar_collapsed}
          trigger={null}
          zeroWidthTriggerStyle={{ background: colorBgContainer }}
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
          {addCategoryButton}
        </Sider>
        <Layout>
          <Header style={{ paddingRight: "16px", paddingLeft: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Flex align="center" gap={5}>
              <Button type="text" onClick={() => updateData({ sidebar_collapsed: !sidebar_collapsed })} icon={sidebar_collapsed ? <GoSidebarCollapse className="text-lg" /> : <GoSidebarExpand className="text-lg" />} />
              <Breadcrumb items={breadcrumbItems} />
            </Flex>
            <Flex gap="15px" align="center">
              <LanguageElements lang={lang} />
              <Button type="text" icon={apptheme == "dark" ? <SunOutlined /> : <MoonOutlined />} onClick={() => changeMode(apptheme == "dark" ? "light" : "dark")} />
              <ProfileItem lang={lang} t={t} />
            </Flex>
          </Header>
          <Content
            className="m-2 mx-0 md:my-3 md:mx-3 lg:my-5 p-2 sm:p-4 md:p-4"
            style={{
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </AuthGuard>
  );
};

const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname
    .split("/")
    .filter((segment: string) => segment)
    .slice(1);

  return pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { title: segment.charAt(0).toUpperCase() + segment.slice(1), href };
  });
};

export default App;
