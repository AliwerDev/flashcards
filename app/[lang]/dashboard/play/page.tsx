"use client";
import { useTranslation } from "@/app/i18/client";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Empty, Flex, Space, theme, Typography } from "antd";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useBoolean } from "@/src/hooks/use-boolean";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { LuMoveLeft, LuPencil } from "react-icons/lu";
import AddEditCardModal from "@/app/components/dashboard/add-edit-card-modal";
import { MdOutlineAdsClick } from "react-icons/md";

const PlayPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang);
  const [activeCard, setActiveCard] = useState<ICard>();
  const showBool = useBoolean();
  const loading = useBoolean();
  const editModalBool = useBoolean();
  const queryClient = useQueryClient();

  const { data: active_cards_data } = useQuery({ queryKey: ["active-cards"], queryFn: () => axiosInstance.get(endpoints.card.getActive) });
  const active_cards: ICard[] = active_cards_data?.data || [];

  const { mutate: playCard } = useMutation({
    mutationKey: ["add-box"],
    mutationFn: (correct: boolean) => axiosInstance.post(endpoints.card.play, { cardId: activeCard?._id, correct }),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["active-cards"], (oldData: any) => {
        const changed_active_cards = [...oldData.data];

        if (variables) {
          changed_active_cards.splice(0, 1);
        } else {
          const playedCard = changed_active_cards.splice(0, 1);
          changed_active_cards.push(playedCard[0]);
        }
        setActiveCard(changed_active_cards[0]);
        showBool.onFalse();
        loading.onFalse();
        return { ...oldData, data: changed_active_cards };
      });
    },
    onError: () => "",
  });

  const clickEditButton = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    editModalBool.onTrue(activeCard);
  };

  const { token } = theme.useToken();
  const style = { background: token.colorBgContainer, borderRadius: token.borderRadius, border: "1 px solid", borderColor: token.colorBorder };
  useEffect(() => {
    if (active_cards.length > 0 && !activeCard) {
      setActiveCard(active_cards[0]);
    }
  }, [active_cards.length]);

  const absoluteActions = (
    <>
      <Space className="message" align="center">
        <MdOutlineAdsClick color={token.colorTextSecondary} />
        <Typography.Text type="secondary">{t("Click to show other side!")}</Typography.Text>
      </Space>
      <Button className="edit-button" onClick={clickEditButton} size="small" type="text" icon={<LuPencil />} />
    </>
  );

  return (
    <FlipCard>
      {active_cards.length <= 0 ? (
        <Empty
          description={
            <div>
              <Typography.Text type="secondary">{t("You have completed all active cards!")}</Typography.Text>
              <Button href="/dashboard" icon={<LuMoveLeft />} type="link">
                {t("Back to home!")}
              </Button>
            </div>
          }
          rootClassName="mt-10"
        />
      ) : (
        <>
          <div className="card cursor-pointer mx-auto">
            <div onClick={showBool.onToggle} style={style} className={`card-content shadow-md ${showBool.value ? "show" : ""}`}>
              <div className="card-front">
                {absoluteActions}
                <Typography.Title level={5}>{activeCard?.front}</Typography.Title>
              </div>
              <div className="card-back">
                {absoluteActions}
                <Typography.Title level={5}>{activeCard?.back}</Typography.Title>
              </div>
            </div>
          </div>

          <Flex gap="15px" className="actions">
            <Button
              onClick={() => {
                loading.onTrue("incorrect");
                playCard(false);
              }}
              danger
              size="large"
              type="dashed"
              loading={loading.data === "incorrect"}
              icon={<GoThumbsdown />}
            ></Button>
            <Button
              onClick={() => {
                loading.onTrue("correct");
                playCard(true);
              }}
              loading={loading.data === "correct"}
              size="large"
              type="dashed"
              icon={<GoThumbsup />}
            ></Button>
          </Flex>
        </>
      )}

      <AddEditCardModal openBool={editModalBool} t={t} />
    </FlipCard>
  );
};

const FlipCard = styled.div`
  .card {
    perspective: 1000px;
    position: relative;
    z-index: 15;

    .card-content {
      max-width: 700px;
      min-height: 300px;
      width: 100%;
      margin: 0 auto;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 1s;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &.show {
        transform: rotateY(180deg);
      }
    }

    .card-front,
    .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .edit-button {
      position: absolute;
      top: 10px;
      right: 10px;
      gap: 10px;
    }

    .message {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .card-back {
      transform: rotateY(180deg);
    }
  }

  .actions {
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
    margin-top: 15px;

    button {
      flex: 1;
      display: block;
      height: 50px;
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

export default PlayPage;
