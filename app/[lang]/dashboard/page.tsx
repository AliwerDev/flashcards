"use client";
import { useTranslation } from "@/app/i18/client";
import { IBox } from "@/src/types/box";
import { HiOutlineTrash } from "react-icons/hi2";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Badge, Button, Card, Col, Flex, message, Modal, Popconfirm, Row, Skeleton, theme, Typography } from "antd";
import { IoReload } from "react-icons/io5";
import { Styled } from "../../components/dashboard/styled";
import { useBoolean } from "@/src/hooks/use-boolean";
import AddBoxModal from "@/app/components/dashboard/add-box-modal";
import { minSeconds } from "@/src/utils/others";
import { LuMenu, LuPlay, LuPlus } from "react-icons/lu";
import { ICard } from "@/src/types/card";
import AddEditCardModal from "@/app/components/dashboard/add-edit-card-modal";

import { useRouter } from "next/navigation";
import LineChart from "@/app/components/analitics/LineChart";
import get from "lodash.get";
import { useQueryClientInstance } from "@/src/context/QueryClient.client";
import { useMemo } from "react";

const { Text, Title } = Typography;

const Page = ({ params: { lang } }: { params: { lang: string } }) => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const queryClient = useQueryClientInstance();
  const { t } = useTranslation(lang);

  const createBoxBool = useBoolean();
  const createEditCardBool = useBoolean();

  const { data, isLoading: isFetchingBoxes } = useQuery({ queryKey: ["boxes-with-count"], queryFn: () => axiosInstance.get(endpoints.box.listWithCardCount) });
  const { data: active_cards_data } = useQuery({ queryKey: ["active-cards"], queryFn: () => axiosInstance.get(endpoints.card.getActive) });
  const { data: reviewsData } = useQuery({ queryKey: ["reviews"], queryFn: () => axiosInstance.get(endpoints.card.reviews) });

  const boxes: IBox[] = data?.data || [];
  const active_cards: ICard[] = active_cards_data?.data || [];

  const { token } = theme.useToken();

  const { mutate: removeBox, isPending: isDeletePending } = useMutation({
    mutationKey: ["add-box"],
    mutationFn: (id: string) => axiosInstance.delete(endpoints.box.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes-with-count"] });
      message.success(t("successfully_deleted"));
    },
    onError: () => "",
  });

  const allCardsCount = useMemo(() => boxes.reduce((acc, box) => acc + (box.cardCount || 0), 0), [data]);

  const startButton = (
    <Button onClick={() => router.push(`/${lang}/dashboard/play`)} disabled={active_cards.length <= 0} className="w-full" size="large" type="primary" icon={<LuPlay />}>
      {t("Start learning")}
    </Button>
  );

  const boxStyle = (box: IBox) => ({ borderRadius: token.borderRadius, borderColor: token.colorBorder, backgroundColor: box.cardCount ? token.colorBgContainer : token.colorBgTextHover });

  return (
    <Styled>
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-1">
        <Title level={4}>{t("Boxes")}</Title>
        <Button onClick={createBoxBool.onTrue} type="text" icon={<LuPlus />}>
          {t("Add new box")}
        </Button>
      </Flex>

      <Flex className="box-list">
        <div className="flex gap-2 boxes">
          {isFetchingBoxes
            ? new Array(4).fill("-").map((_, i) => <Skeleton.Node key={i} active />)
            : boxes.map((box, i) => (
                <div key={box._id} className="box">
                  <Text type="success" className="align-middle">
                    {i + 1}
                  </Text>
                  <div style={boxStyle(box)} className={`box-content ${box.cardCount ? "hascard" : ""}`}>
                    {i > 0 && (
                      <Popconfirm title="Are you sure to delete this box?" onConfirm={() => removeBox(box._id)} okText={t("Yes")} cancelText={t("No")}>
                        <HiOutlineTrash className="remove-box" color="#F44336" />
                      </Popconfirm>
                    )}
                    <Title level={5} className="!my-0">
                      {box.cardCount}
                    </Title>
                  </div>
                  <Text type="secondary" className="flex gap-1 items-center flex-wrap text-xs justify-center">
                    <IoReload />
                    {minSeconds(box.reviewInterval * 60, t)}
                  </Text>
                </div>
              ))}
        </div>
      </Flex>

      <Row className="justify-center py-10 px-5" gutter={[20, 20]}>
        {active_cards.length ? (
          <Col className="flex justify-center sm:hidden" xs={24}>
            <Text type="success">You have {active_cards.length} active cards!</Text>
          </Col>
        ) : null}

        <Col xs={24} md={12} lg={6} xl={4}>
          <Button onClick={() => createEditCardBool.onTrue()} className="w-full" size="large" type="dashed" icon={<LuPlus />}>
            {t("Add card")}
          </Button>
        </Col>

        <Col xs={24} md={12} lg={6} xl={4}>
          <Badge className="w-full" count={active_cards.length}>
            {startButton}
          </Badge>
        </Col>

        <Col xs={24} md={12} lg={6} xl={4}>
          <Button onClick={() => router.push(`/${lang}/dashboard/cards`)} className="w-full flex items-center" size="large" type="dashed" icon={<LuMenu />}>
            {t("Cards list")}{" "}
            <Typography.Text className="m-0 p-0 text-sm" type="success">
              ({allCardsCount})
            </Typography.Text>
          </Button>
        </Col>
      </Row>

      <Card className="mt-5" classNames={{ body: "!p-0" }}>
        <LineChart data={get(reviewsData, "data", [])} />
      </Card>

      <AddEditCardModal {...{ boxes, t }} openBool={createEditCardBool} />
      <AddBoxModal t={t} open={createBoxBool} />
    </Styled>
  );
};

export default Page;
