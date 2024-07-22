import { BooleanReturnType } from "@/src/hooks/use-boolean";
import { useFilter } from "@/src/hooks/use-filter";
import { IBox } from "@/src/types/box";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Empty, Input, Row, Segmented, Select } from "antd";
import { TFunction } from "i18next";
import debounce from "lodash.debounce";
import React, { useMemo } from "react";
import { LuSearch } from "react-icons/lu";

interface Props {
  boxes: IBox[];
  editCardBool: BooleanReturnType;
  t: TFunction;
}

const CardList = ({ boxes, editCardBool, t }: Props) => {
  const filter = useFilter({ search: "", boxId: "ALL", status: "ALL" });

  const { data: cardData, isLoading: isLoadingCards } = useQuery({ queryKey: ["cards"], queryFn: () => axiosInstance.get(endpoints.card.list) });

  const filteredCards: ICard[] = useMemo(() => {
    return filterFunction(cardData?.data, filter.value as Ifilter);
  }, [filter, cardData]);

  return (
    <Card
      classNames={{ header: "!px-3" }}
      title={
        <Row gutter={[10, 10]} className="py-3">
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
      }
    >
      {filteredCards.map((card) => (
        <Card.Grid onClick={() => editCardBool.onTrue(card)} key={card._id} className="card-item w-1/4 cursor-pointer">
          {card.front}
        </Card.Grid>
      ))}

      {!isLoadingCards && filteredCards.length == 0 && <Empty className="my-10" />}
    </Card>
  );
};

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

export default CardList;
