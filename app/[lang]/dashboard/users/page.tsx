"use client";

import { useTranslation } from "@/app/i18/client";
import { useFilter } from "@/src/hooks/use-filter";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, Flex, Input, Space, Table, theme, Typography } from "antd";
import { TableProps } from "antd/lib";
import debounce from "lodash.debounce";
import React, { useMemo } from "react";
import { LuSearch } from "react-icons/lu";
import styled from "@emotion/styled";
import { IUser } from "@/src/types/user";
import { TbDots, TbPencil, TbTrash } from "react-icons/tb";

const UsersPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang);
  const filter = useFilter({ search: "", boxId: "ALL", status: "ALL" });
  const {
    token: { colorBgContainer, borderRadius, colorWarning, colorError },
  } = theme.useToken();

  // TODO edit delete actions

  const columns: TableProps<IUser>["columns"] = [
    {
      title: t("N"),
      dataIndex: "count",
      key: "_id",
      width: 50,
      render: (_: any, _1: any, index: number) => index + 1,
    },
    {
      title: t("Full name"),
      dataIndex: "firstName",
      key: "firstName",
      render: (value: string, row: IUser) => `${value || ""} ${row.lastName || ""}`,
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("Role"),
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (value: string) => value || "user",
    },
    {
      title: t("Cards count"),
      dataIndex: "cardCount",
      key: "cardCount",
      width: 150,
      sorter: (a, b) => a.cardCount - b.cardCount,
    },
    {
      title: t("Actions"),
      dataIndex: "actions",
      key: "_id",
      width: 50,
      render: () => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                onClick: () => {},
                label: (
                  <Space>
                    <TbPencil color={colorWarning} />
                    <Typography.Text type="warning">{t("edit")}</Typography.Text>
                  </Space>
                ),
              },
              {
                key: "2",
                onClick: () => {},
                label: (
                  <Space>
                    <TbTrash color={colorError} />
                    <Typography.Text type="danger">{t("delete")}</Typography.Text>,{" "}
                  </Space>
                ),
              },
            ],
          }}
          placement="bottomRight"
          arrow
        >
          <Button type="text" icon={<TbDots />} />
        </Dropdown>
      ),
    },
  ];

  const { data: userData, isLoading: isLoadingUsers } = useQuery({ queryKey: ["users"], queryFn: () => axiosInstance.get(endpoints.user.list) });

  const filteredUsers: IUser[] = useMemo(() => {
    return filterFunction(userData?.data, filter.value as Ifilter);
  }, [filter, userData]);

  return (
    <Styled>
      <div className="card-list-header p-1 pl-2" style={{ backgroundColor: colorBgContainer, borderRadius }}>
        <Flex gap={"10px"} align="center" justify="space-between">
          <Input className="w-full md:max-w-64" onChange={debounce((e) => filter.changeFilter("search", e.target.value), 300)} prefix={<LuSearch />} placeholder={t("Search")} size="large" />
        </Flex>
      </div>
      <Table columns={columns} dataSource={filteredUsers} pagination={false} />
    </Styled>
  );
};

const Styled = styled.div`
  .card-list-header {
    margin-bottom: 10px;
    position: sticky;
    top: 0;
  }

  .ant-empty {
    margin-top: 100px;
  }
`;

type Ifilter = {
  search: string;
};

const filterFunction = (users: IUser[] = [], filter: Ifilter): IUser[] => {
  users = users.filter((user) => {
    const isMatchSearch = filter.search ? user.firstName?.toLowerCase().includes(filter.search.toLowerCase()) || user.lastName?.toLowerCase().includes(filter.search.toLowerCase()) : true;
    return isMatchSearch;
  });

  return users;
};

export default UsersPage;
