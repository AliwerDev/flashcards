"use client";

import AddEditCardModal from "@/app/components/dashboard/add-edit-card-modal";
import { useTranslation } from "@/app/i18/client";
import { useBoolean } from "@/src/hooks/use-boolean";
import { useFilter } from "@/src/hooks/use-filter";
import { IBox } from "@/src/types/box";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Input, List, Row, Segmented, Select, theme } from "antd";
import debounce from "lodash.debounce";
import React, { useMemo } from "react";
import { LuPencil, LuSearch } from "react-icons/lu";
import styled from "@emotion/styled";

interface IProps {
  params: { lang: string; categoryId: string };
}

const CardsPage = ({ params: { lang, categoryId } }: IProps) => {
  const { t } = useTranslation(lang);
  const editCardBool = useBoolean();
  const filter = useFilter({ search: "", boxId: "ALL", status: "ALL" });
  const {
    token: { colorBgContainer, borderRadius },
  } = theme.useToken();

  const { data } = useQuery({ queryKey: ["boxes", categoryId], queryFn: () => axiosInstance.get(endpoints.box.list(categoryId)) });
  const boxes: IBox[] = data?.data || [];

  const { data: cardData, isLoading: isLoadingCards } = useQuery({ queryKey: ["cards", categoryId], queryFn: () => axiosInstance.get(endpoints.card.list(categoryId)) });

  const filteredCards: ICard[] = useMemo(() => {
    return filterFunction(cardData?.data, filter.value as Ifilter);
  }, [filter, cardData]);

  return (
    <Styled>
      <div className="card-list-header p-1 xl:p-3" style={{ backgroundColor: colorBgContainer, borderRadius }}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={8}>
            <Input className="md:max-w-60" onChange={debounce((e) => filter.changeFilter("search", e.target.value), 300)} prefix={<LuSearch />} placeholder={t("Search")} size="large" />
          </Col>
          <Col xs={24} md={8}>
            <Segmented
              block
              onChange={(value) => filter.changeFilter("status", value)}
              size="large"
              options={[
                { label: t("All"), value: "ALL" },
                { label: t("Learned"), value: "LEARNED" },
              ]}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select className="md:max-w-60 ml-auto block" onChange={(value) => filter.changeFilter("boxId", value)} defaultValue="ALL" size="large">
              <Select.Option value={"ALL"}>{t("All")}</Select.Option>
              {boxes.map((box, index) => (
                <Select.Option key={box._id} value={box._id}>
                  {index + 1} - {t("level")}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      <List
        style={{ backgroundColor: colorBgContainer }}
        bordered
        loading={isLoadingCards}
        dataSource={filteredCards}
        renderItem={(item, i) => (
          <List.Item actions={[<Button onClick={() => editCardBool.onTrue(item)} type="text" icon={<LuPencil />} />]}>
            {i + 1}. {item.front}
          </List.Item>
        )}
      />

      <AddEditCardModal categoryId={categoryId} {...{ boxes, t }} openBool={editCardBool} />
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
  boxId: string;
  status: string;
};

const filterFunction = (cards: ICard[] = [], filter: Ifilter): ICard[] => {
  cards = cards.filter((card) => {
    const isMatchBoxId = filter.boxId === "ALL" ? true : card.boxId === filter.boxId;
    const isMatchStatus = filter.status === "ALL" ? true : false;
    const isMatchSearch = filter.search ? card.front.includes(filter.search) : true;

    return isMatchBoxId && isMatchSearch && isMatchStatus;
  });

  return cards;
};

export default CardsPage;
