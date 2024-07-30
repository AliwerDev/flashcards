"use client";
import { useTranslation } from "@/app/i18/client";
import { IBox } from "@/src/types/box";
import { HiOutlineTrash } from "react-icons/hi2";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Col, Flex, message, Modal, Row, theme, Typography } from "antd";
import { IoReload } from "react-icons/io5";
import { Styled } from "../../components/dashboard/styled";
import { useBoolean } from "@/src/hooks/use-boolean";
import AddBoxModal from "@/app/components/dashboard/add-box-modal";
import { minSeconds } from "@/src/utils/others";
import { LuPlay, LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { ICard } from "@/src/types/card";
import AddEditCardModal from "@/app/components/dashboard/add-edit-card-modal";
import CardList from "@/app/components/dashboard/card-list";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

const Page = ({ params: { lang } }: { params: { lang: string } }) => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const queryClient = useQueryClient();
  const { t } = useTranslation(lang);
  const [activeBoxId, setActiveBoxId] = useState<string>("");

  const createBoxBool = useBoolean();
  const createEditCardBool = useBoolean();

  const { data } = useQuery({ queryKey: ["boxes"], queryFn: () => axiosInstance.get(endpoints.box.list) });
  const { data: active_cards_data } = useQuery({ queryKey: ["active-cards"], queryFn: () => axiosInstance.get(endpoints.card.getActive) });

  const boxes: IBox[] = data?.data || [];
  const active_cards: ICard[] = active_cards_data?.data || [];

  const { token } = theme.useToken();

  const { mutate: removeBox, isPending: isDeletePending } = useMutation({
    mutationKey: ["add-box"],
    mutationFn: (id: string) => axiosInstance.delete(endpoints.box.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      message.success(t("successfully_deleted"));
    },
    onError: () => "",
  });

  const confirmRemove = (id: string) => {
    modal.confirm({
      title: t("Are you sure you want to delete"),
      okText: t("yes"),
      onOk() {
        removeBox(id);
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    if (!activeBoxId && boxes.length) setActiveBoxId(boxes[0]._id);
  }, [boxes]);

  return (
    <Styled>
      {contextHolder}
      <Flex justify="space-between" align="center" className="mb-1">
        <Title level={4}>{t("Boxes")}</Title>
        <Button onClick={createBoxBool.onTrue} type="default" icon={<LuPlus />}>
          {t("Add new")}
        </Button>
      </Flex>

      <Flex className="box-list">
        <div className="flex gap-2 boxes">
          {boxes.map((box, i) => (
            <div onClick={() => setActiveBoxId(box._id)} key={box._id} style={{ borderRadius: token.borderRadius, borderColor: activeBoxId === box._id ? token.colorSuccess : token.colorBorder, backgroundColor: token.colorBgBase }} className={`box p-2 border flex flex-col gap-1 items-center`}>
              {i > 0 && <Button loading={isDeletePending} onClick={() => confirmRemove(box._id)} className="remove-box" size="small" type="text" danger icon={<HiOutlineTrash />} />}
              <Text type="success" className="align-middle">
                {i + 1}-{t("level")}
              </Text>
              <Title level={4} className="!my-0">
                {box.cardCount}
              </Title>
              <Text type="secondary" className="flex gap-1 items-center flex-wrap text-xs justify-center">
                <IoReload />
                {minSeconds(box.reviewInterval * 60, t)}
              </Text>
            </div>
          ))}
        </div>
      </Flex>

      <Row className="justify-center py-10" gutter={[20, 20]}>
        <Col xs={24} md={12} lg={6} xl={4}>
          <Badge classNames={{ root: "w-full" }} count={active_cards.length}>
            <Button onClick={() => router.push(`/${lang}/dashboard/play`)} disabled={active_cards.length <= 0} className="h-14 text-lg w-full" size="large" type="primary" icon={<LuPlay />}>
              {t("Start study")}
            </Button>
          </Badge>
        </Col>
        <Col xs={24} md={12} lg={6} xl={4}>
          <Button onClick={() => createEditCardBool.onTrue()} className="h-14 text-lg w-full" size="large" type="dashed" icon={<LuPlus />}>
            {t("Add card")}
          </Button>
        </Col>
      </Row>

      <CardList boxes={boxes} editCardBool={createEditCardBool} t={t} />

      <AddEditCardModal {...{ boxes, activeBoxId, t }} openBool={createEditCardBool} />
      <AddBoxModal t={t} open={createBoxBool} />
    </Styled>
  );
};

export default Page;
