"use client";
import React, { ReactNode } from "react";
import { HomeOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Drawer, Flex, Layout, theme } from "antd";
import { useSettingsContext } from "@/src/settings/hooks";
import { LanguageElements } from "@/app/components/dashboard/language";
import { AuthGuard } from "@/src/auth/guard";
import { useTranslation } from "@/app/i18/client";
import ProfileItem from "@/app/components/dashboard/profile-item";

import { usePathname } from "next/navigation";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import SimpleBar from "simplebar-react";
import SidebarContent from "@/app/components/dashboard/sidebar";
import { TFunction } from "i18next";
import ICategory from "@/src/types/category";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
const { Header, Sider, Content } = Layout;

interface ILayout {
  children: ReactNode;
  params: { lang: string };
}

const App: React.FC<ILayout> = ({ children, params: { lang } }) => {
  const { sidebar_collapsed, theme: apptheme, changeMode, updateData } = useSettingsContext();
  const pathname = usePathname();
  const { t } = useTranslation(lang);

  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: () => axiosInstance.get(endpoints.category.list) });

  const breadcrumbItems = generateBreadcrumbs(pathname, t, get(categories, "data") || []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AuthGuard lang={lang}>
      <Layout className="h-screen">
        <Drawer placement="left" onClose={() => updateData({ sidebar_collapsed: true })} open={!sidebar_collapsed} closable={false} rootClassName="block md:hidden" styles={{ body: { padding: "10px 0", background: colorBgContainer }, header: { paddingBlock: 10 } }} width={200}>
          <SidebarContent closeSidebar={() => ""} {...{ apptheme, borderRadiusLG, colorBgContainer, lang, t }} />
        </Drawer>

        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          theme={apptheme}
          onCollapse={() => updateData({ sidebar_collapsed: !sidebar_collapsed })}
          className="hidden md:block"
          trigger={null}
          zeroWidthTriggerStyle={{ background: colorBgContainer }}
        >
          <SidebarContent closeSidebar={() => ""} {...{ lang, t }} />
        </Sider>
        <Layout>
          <Header className="px-3 flex justify-between items-center" style={{ background: colorBgContainer }}>
            <Flex align="center" gap={5}>
              <Button type="text" className="block md:hidden" onClick={() => updateData({ sidebar_collapsed: !sidebar_collapsed })} icon={sidebar_collapsed ? <GoSidebarCollapse className="text-lg" /> : <GoSidebarExpand className="text-lg" />} />
              <Breadcrumb items={breadcrumbItems} />
            </Flex>
            <Flex gap="15px" align="center">
              <LanguageElements lang={lang} />
              <Button type="text" icon={apptheme == "dark" ? <SunOutlined /> : <MoonOutlined />} onClick={() => changeMode(apptheme == "dark" ? "light" : "dark")} />
              <ProfileItem lang={lang} t={t} />
            </Flex>
          </Header>

          <SimpleBar style={{ maxHeight: "calc(100vh - 64px)" }}>
            <Content className="p-2 sm:p-4 md:p-4">{children}</Content>
          </SimpleBar>
        </Layout>
      </Layout>
    </AuthGuard>
  );
};

const generateBreadcrumbs = (pathname: string, t: TFunction, categories: ICategory[]) => {
  const items: any = [{ title: <HomeOutlined />, href: "/" }];

  if (pathname.includes("users")) {
    items.push({ title: <>{t("Users")}</> });
  } else if (pathname.includes("dashboard/")) {
    const categoryId = pathname.split("/")[3];
    const category = categories.find((c) => c._id === categoryId);

    if (category) {
      items.push({ title: <>{category.title}</> });
    }
  } else if (pathname.endsWith("/dashboard")) {
    items.push({ title: <>{t("Analytics")}</> });
  }

  return items;
};

export default App;
