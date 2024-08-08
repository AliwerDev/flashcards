"use client";
import { useTranslation } from "@/app/i18/client";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Empty, Flex, Space, Spin, theme, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useBoolean } from "@/src/hooks/use-boolean";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { LuMoveLeft, LuPencil } from "react-icons/lu";
import AddEditCardModal from "@/app/components/dashboard/add-edit-card-modal";
import { MdFullscreen, MdFullscreenExit, MdOutlineAdsClick } from "react-icons/md";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useQueryClientInstance } from "@/src/context/QueryClient.client";
import { useSettingsContext } from "@/src/settings/hooks";
import { IBox } from "@/src/types/box";
import get from "lodash.get";
import { HiSpeakerWave } from "react-icons/hi2";
import { removeParentheses } from "@/src/auth/context/utils";
import { motion } from "framer-motion";
import useChangeableSpeech from "@/src/hooks/use-speach";
import { FlipCardStyled } from "./styled";
import FireFlies from "@/app/components/dashboard/firefly";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const PlayPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang);
  const icBottonRef = useRef<HTMLButtonElement>(null);
  const cBottonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClientInstance();
  const fullScreenHandle = useFullScreenHandle();
  const { theme: clientTheme } = useSettingsContext();

  const speacher = useChangeableSpeech();

  const [activeCard, setActiveCard] = useState<ICard>();
  const showBool = useBoolean();
  const loading = useBoolean();
  const editModalBool = useBoolean();

  const { data: active_cards_data, isLoading } = useQuery({ queryKey: ["active-cards"], queryFn: () => axiosInstance.get(endpoints.card.getActive) });
  const { data: boxes_data } = useQuery({ queryKey: ["boxes"], queryFn: () => axiosInstance.get(endpoints.box.list) });
  const active_cards: ICard[] = active_cards_data?.data || [];
  const boxesObject = makeBoxesObject(boxes_data?.data);

  const { mutate: playCard, isPending } = useMutation({
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
        speacher.setText(removeParentheses(changed_active_cards[0]?.front));
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

  const handlePlay = (text: string) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    speacher.start();
  };

  const { token } = theme.useToken();
  const style = { background: token.colorBgContainer, borderRadius: token.borderRadius, border: "1 px solid", borderColor: token.colorBorder };

  useEffect(() => {
    if (active_cards.length > 0) {
      setActiveCard(active_cards[0]);
      speacher.setText(removeParentheses(active_cards[0]?.front));
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

      <Space className="edit-button">
        <Typography.Text className="text-sm" type="secondary">
          {t("Level")}: {get(boxesObject, `[${activeCard?.boxId}].level`)}
        </Typography.Text>
        {!fullScreenHandle.active && <Button size="small" onClick={clickEditButton} type="dashed" icon={<LuPencil />} />}
        <Button size="small" onClick={toggleFullScreen} type="dashed" icon={fullScreenHandle.active ? <MdFullscreenExit /> : <MdFullscreen />} />
      </Space>

      {activeCard && <Button className="play-button" onClick={handlePlay(activeCard?.front)} type="dashed" icon={<HiSpeakerWave />} />}
    </>
  );

  return (
    <FullScreen handle={fullScreenHandle}>
      <FlipCardStyled style={{ background: clientTheme === "dark" ? token.colorBgBase : "#e9ece5" }}>
        {isLoading ? (
          <div className="h-[300px] grid place-items-center">
            <Spin />
          </div>
        ) : active_cards.length <= 0 ? (
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
          <motion.div initial="hidden" animate="visible" variants={container}>
            <motion.div variants={item}>
              <motion.div className="card cursor-pointer mx-auto" key={activeCard ? activeCard.front : "empty"} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
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
              </motion.div>
            </motion.div>

            <Flex gap="15px" className="actions" wrap>
              <motion.div className="flex-1" variants={item}>
                <Button
                  ref={icBottonRef}
                  onClick={() => {
                    if (isPending) return;
                    loading.onTrue("incorrect");
                    playCard(false);
                  }}
                  danger
                  size="large"
                  type="dashed"
                  loading={loading.data === "incorrect"}
                  icon={<GoThumbsdown />}
                />
              </motion.div>
              <motion.div className="flex-1" variants={item}>
                <Button
                  ref={cBottonRef}
                  onClick={() => {
                    if (isPending) return;
                    loading.onTrue("correct");
                    playCard(true);
                  }}
                  loading={loading.data === "correct"}
                  size="large"
                  type="dashed"
                  icon={<GoThumbsup />}
                />
              </motion.div>
              <motion.div variants={item} className="w-full text-center">
                <Typography.Text type="secondary" className="desctop-element text-xs">
                  {t("Or just press ⬅ / ➡️ keys!")}
                </Typography.Text>
              </motion.div>
            </Flex>
          </motion.div>
        )}
        <AddEditCardModal openBool={editModalBool} t={t} inPlayPage />

        <FireFlies />
      </FlipCardStyled>
    </FullScreen>
  );
};

const makeBoxesObject = (list: IBox[] = []) => {
  const obj: any = {};
  list.forEach((item, index) => {
    obj[item._id] = { ...item, level: index + 1 };
  });

  return obj;
};

export default PlayPage;
