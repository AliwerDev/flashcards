"use client";
import React, { ReactNode } from "react";
import { Breadcrumb, Button, Drawer, Flex, Layout, theme } from "antd";
import { LanguageElements } from "@/app/components/dashboard/language";
import { AuthGuard } from "@/src/auth/guard";
import { useTranslation } from "@/app/i18/client";
import ProfileItem from "@/app/components/dashboard/profile-item";

import { usePathname } from "next/navigation";
import { GoSidebarCollapse } from "react-icons/go";
import SimpleBar from "simplebar-react";
import SidebarContent from "@/app/components/dashboard/sidebar";
import { TFunction } from "i18next";
import ICategory from "@/src/types/category";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import { useBoolean } from "@/src/hooks/use-boolean";
const { Header, Sider, Content } = Layout;

interface ILayout {
  children: ReactNode;
  params: { lang: string };
}

const App: React.FC<ILayout> = ({ children, params: { lang } }) => {
  const pathname = usePathname();
  const { t } = useTranslation(lang);
  const sidebarBool = useBoolean();

  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: () => axiosInstance.get(endpoints.category.list) });
  const breadcrumbItems = generateBreadcrumbs(pathname, t, lang, get(categories, "data") || []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AuthGuard lang={lang}>
      <Layout className="h-screen">
        <Drawer placement="left" onClose={sidebarBool.onFalse} open={sidebarBool.value} closable={false} rootClassName="block md:hidden" styles={{ body: { padding: "10px 0", background: colorBgContainer }, header: { paddingBlock: 10 } }} width="100vw">
          <SidebarContent closable closeSidebar={() => sidebarBool.value && sidebarBool.onFalse()} {...{ borderRadiusLG, colorBgContainer, lang, t }} />
        </Drawer>

        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          width={250}
          onCollapse={sidebarBool.onToggle}
          className="hidden md:block"
          trigger={null}
          zeroWidthTriggerStyle={{ background: colorBgContainer }}
        >
          <SidebarContent closeSidebar={() => ""} {...{ lang, t }} />
        </Sider>
        <Layout>
          <Header className="px-3 flex justify-between items-center" style={{ background: colorBgContainer }}>
            <Flex align="center" gap={5}>
              <Button type="text" className="flex md:hidden" onClick={sidebarBool.onToggle} icon={<GoSidebarCollapse className="text-lg" />} />
              <Breadcrumb items={breadcrumbItems} />
            </Flex>
            <Flex gap="15px" align="center">
              <LanguageElements lang={lang} />
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

const generateBreadcrumbs = (pathname: string, t: TFunction, lang: string, categories: ICategory[]) => {
  const items: any = [];

  if (pathname.includes("users")) {
    items.push({ title: <>{t("Users")}</> });
  } else if (pathname.includes("analytics")) {
    items.push({ title: <>{t("Analytics")}</> });
  } else if (pathname.includes("profile")) {
    items.push({ title: <>{t("Profile")}</> });
  } else if (pathname.includes("dashboard/")) {
    const categoryId = pathname.split("/")[3];
    const category = categories.find((c) => c._id === categoryId);

    if (category) {
      items.push({ title: <>{category.title}</> });
    }
  }

  return items;
};

export default App;
