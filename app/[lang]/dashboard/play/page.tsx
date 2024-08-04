"use client";
import { useTranslation } from "@/app/i18/client";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Empty, Flex, Space, theme, Typography } from "antd";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useBoolean } from "@/src/hooks/use-boolean";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { LuMoveLeft, LuPencil } from "react-icons/lu";
import AddEditCardModal from "@/app/components/dashboard/add-edit-card-modal";
import { MdFullscreen, MdFullscreenExit, MdOutlineAdsClick } from "react-icons/md";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useQueryClientInstance } from "@/src/context/QueryClient.client";
import { useSettingsContext } from "@/src/settings/hooks";

const PlayPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang);
  const icBottonRef = useRef<HTMLButtonElement>(null);
  const cBottonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClientInstance();
  const fullScreenHandle = useFullScreenHandle();
  const { theme: clientTheme } = useSettingsContext();

  const [activeCard, setActiveCard] = useState<ICard>();
  const showBool = useBoolean();
  const loading = useBoolean();
  const editModalBool = useBoolean();

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

  const toggleFullScreen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    fullScreenHandle.active ? fullScreenHandle.exit() : fullScreenHandle.enter();
  };

  const { token } = theme.useToken();
  const style = { background: token.colorBgContainer, borderRadius: token.borderRadius, border: "1 px solid", borderColor: token.colorBorder };

  useEffect(() => {
    if (active_cards.length > 0) {
      setActiveCard(active_cards[0]);
    }
  }, [active_cards_data]);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && icBottonRef.current) {
        e.preventDefault();
        icBottonRef.current.click();
      } else if (e.key === "ArrowRight" && cBottonRef.current) {
        e.preventDefault();
        cBottonRef.current.click();
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        showBool.onToggle();
      }
    };

    if (window) {
      window.addEventListener("keydown", keydown);
    }
    return () => {
      if (window) {
        window.removeEventListener("keydown", keydown);
      }
    };
  }, []);

  const absoluteActions = (
    <>
      <Space className="message" align="center">
        <MdOutlineAdsClick color={token.colorTextSecondary} />
        <Typography.Text className="text-xs" type="secondary">
          {t("Click to show other side")}
          <span className="desctop-element">{t(" or just press ⬆ / ⬇ keys")}</span>!
        </Typography.Text>
      </Space>
      {!fullScreenHandle.active && <Button className="edit-button" onClick={clickEditButton} size="small" type="text" icon={<LuPencil />} />}
      <Button size="small" className="full-screen-changer" onClick={toggleFullScreen} type="text" icon={fullScreenHandle.active ? <MdFullscreenExit /> : <MdFullscreen />} />
    </>
  );

  return (
    <FullScreen handle={fullScreenHandle}>
      <FlipCard style={{ background: clientTheme === "dark" ? token.colorBgBase : "#e9ece5" }}>
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

            <Flex gap="15px" className="actions" wrap>
              <Button
                ref={icBottonRef}
                onClick={() => {
                  loading.onTrue("incorrect");
                  playCard(false);
                }}
                danger
                size="large"
                type="dashed"
                loading={loading.data === "incorrect"}
                icon={<GoThumbsdown />}
              />

              <Button
                ref={cBottonRef}
                onClick={() => {
                  loading.onTrue("correct");
                  playCard(true);
                }}
                loading={loading.data === "correct"}
                size="large"
                type="dashed"
                icon={<GoThumbsup />}
              />
              <Typography.Text type="secondary" className="w-full text-center desctop-element text-xs">
                {t("Or just press ⬅ / ➡️ keys!")}
              </Typography.Text>
            </Flex>
          </>
        )}
        <AddEditCardModal openBool={editModalBool} t={t} inPlayPage />
      </FlipCard>
    </FullScreen>
  );
};

const FlipCard = styled.div`
  height: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .card {
    margin-top: -64px;
    perspective: 1000px;
    position: relative;
    z-index: 15;
    width: 100%;

    .card-content {
      max-width: 700px;
      min-height: 300px;
      width: 100%;
      margin: 0 auto;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 1s;

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

      h5 {
        text-align: center;
        padding-inline: 10px;
      }
    }

    .edit-button {
      position: absolute;
      top: 10px;
      right: 10px;
      gap: 10px;
    }

    .full-screen-changer {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }

    .message {
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      bottom: 10px;
      left: 0;
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
      display: flex;
      height: 50px;
      flex-direction: column;
      align-items: center;
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (max-width: 768px) {
    .desctop-element {
      display: none !important;
    }
  }
`;

export default PlayPage;
