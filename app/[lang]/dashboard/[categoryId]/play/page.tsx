"use client";
import { useTranslation } from "@/app/i18/client";
import { ICard } from "@/src/types/card";
import axiosInstance, { endpoints } from "@/src/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Empty, Flex, Space, Spin, theme, Typography } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import FireFlies from "@/app/components/animations/firefly";
import { LiaExchangeAltSolid } from "react-icons/lia";
import Confetti from "react-confetti";
import useConfetti from "@/src/hooks/use-confetti";
import { paths } from "@/src/routes/paths";

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

interface IProps {
  params: { lang: string; categoryId: string };
}

const PlayPage = ({ params: { lang, categoryId } }: IProps) => {
  const { t } = useTranslation(lang);
  const speachButtonRef = useRef<HTMLButtonElement>(null);
  const icBottonRef = useRef<HTMLButtonElement>(null);
  const cBottonRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClientInstance();
  const fullScreenHandle = useFullScreenHandle();
  const { theme: clientTheme } = useSettingsContext();

  const speacher = useChangeableSpeech();

  const [activeCard, setActiveCard] = useState<ICard>();
  const showBool = useBoolean();
  const reverceRenderBool = useBoolean();
  const editModalBool = useBoolean();
  const { startConfetti, isPlaying } = useConfetti();

  const { data: active_cards_data, isLoading } = useQuery({ queryKey: ["active-cards", categoryId], queryFn: () => axiosInstance.get(endpoints.card.getActive(categoryId)) });
  const { data: boxes_data } = useQuery({ queryKey: ["boxes", categoryId], queryFn: () => axiosInstance.get(endpoints.box.list(categoryId)) });
  const active_cards: ICard[] = active_cards_data?.data || [];
  const boxesObject = makeBoxesObject(boxes_data?.data);

  const playCard = useCallback(
    (isCorrect: boolean) => {
      try {
        axiosInstance.post(endpoints.card.play(categoryId), { cardId: activeCard?._id, correct: isCorrect });
      } catch (error) {}

      queryClient.setQueryData(["active-cards", categoryId], (oldData: any) => {
        let changed_active_cards = [...oldData.data];

        if (isCorrect) {
          changed_active_cards.shift();
        } else {
          const playedCard = changed_active_cards.shift();
          changed_active_cards.push(playedCard);
        }

        if (changed_active_cards.length) {
          const newActiveCard = changed_active_cards[0];
          setActiveCard(newActiveCard);
          speacher.setText(removeParentheses(newActiveCard?.front));
        } else {
          startConfetti();
        }

        showBool.onFalse();

        return { ...oldData, data: changed_active_cards };
      });
    },
    [activeCard, queryClient]
  );

  const clickEditButton = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    editModalBool.onTrue(activeCard);
  };

  const toggleFullScreen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    fullScreenHandle.active ? fullScreenHandle.exit() : fullScreenHandle.enter();
  };

  const toggleReverce = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    reverceRenderBool.onToggle();
  };

  const handlePlay = (e: any) => {
    e.stopPropagation();
    speacher.start();
  };

  const { token } = theme.useToken();
  const style = { background: token.colorBgContainer, borderRadius: token.borderRadius, border: "1px solid", borderColor: token.colorBorder };

  useEffect(() => {
    if (active_cards.length > 0) {
      setActiveCard(active_cards[0]);
      speacher.setText(removeParentheses(active_cards[0]?.front));
    }
  }, [active_cards_data]);

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if (editModalBool.value) return;
      if (e.key === "ArrowLeft" && icBottonRef.current) {
        e.preventDefault();
        icBottonRef.current.click();
      } else if (e.key === "ArrowRight" && cBottonRef.current) {
        e.preventDefault();
        cBottonRef.current.click();
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        showBool.onToggle();
      } else if ((e.key === "/" || e.key === "v" || e.key === "s") && speachButtonRef.current) {
        e.preventDefault();
        speachButtonRef.current.click();
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
  }, [editModalBool.value]);

  const absoluteActions = (
    <>
      <Space className="message" align="center">
        <MdOutlineAdsClick color={token.colorTextSecondary} />
        <Typography.Text className="text-xs" type="secondary">
          {t("click-to-show-other-side")}, <span className="desctop-element">{t("or-just-press-keys")}</span>
        </Typography.Text>
      </Space>

      <Space className="edit-button">
        <Typography.Text className="text-sm" type="secondary">
          {t("Level")}: {get(boxesObject, `[${activeCard?.boxId}].level`)}
        </Typography.Text>
        {!fullScreenHandle.active && <Button size="small" onClick={clickEditButton} type="dashed" icon={<LuPencil />} />}
        <Button size="small" onClick={toggleFullScreen} type="dashed" icon={fullScreenHandle.active ? <MdFullscreenExit /> : <MdFullscreen />} />
        <Button size="small" onClick={toggleReverce} type={reverceRenderBool.value ? "primary" : "dashed"} icon={<LiaExchangeAltSolid />} />
      </Space>

      {activeCard && <Button ref={speachButtonRef} className="play-button" onClick={handlePlay} type="dashed" icon={<HiSpeakerWave />} />}
    </>
  );

  return (
    <>
      <FullScreen handle={fullScreenHandle}>
        <FlipCardStyled style={{ background: clientTheme === "dark" ? token.colorBgBase : "#e9ece5" }}>
          {isLoading ? (
            <div className="h-[300px] grid place-items-center">
              <Spin />
            </div>
          ) : active_cards.length <= 0 ? (
            <Empty
              description={
                <div className="flex flex-col items-center">
                  <Typography.Text type="secondary">{t("you-have-completed-all-active-cards")}</Typography.Text>
                  <Button href={paths.dashboard.main(lang, categoryId)} icon={<LuMoveLeft />} type="link">
                    {t("back-to-home")}
                  </Button>
                </div>
              }
              image="/assets/vectors/finished.png"
              imageStyle={{ height: "300px", display: "flex", justifyContent: "center" }}
              rootClassName="mt-2"
            />
          ) : (
            <motion.div initial="hidden" animate="visible" variants={container}>
              <motion.div className="card cursor-pointer mx-auto" variants={item}>
                <div onClick={showBool.onToggle} style={style} className={`card-content shadow-md ${showBool.value ? "show" : ""}`}>
                  <div className="card-front">
                    {absoluteActions}
                    <Typography.Title level={5}>{reverceRenderBool.value ? activeCard?.back : activeCard?.front}</Typography.Title>
                  </div>

                  <div className="card-back">
                    {absoluteActions}
                    <Typography.Title level={5}>{reverceRenderBool.value ? activeCard?.front : activeCard?.back}</Typography.Title>
                  </div>
                </div>
              </motion.div>

              <Flex gap="15px" className="actions" wrap>
                <motion.div className="flex-1" variants={item}>
                  <Button ref={icBottonRef} onClick={() => playCard(false)} danger size="large" type="dashed" icon={<GoThumbsdown />} />
                </motion.div>
                <motion.div className="flex-1" variants={item}>
                  <Button ref={cBottonRef} onClick={() => playCard(true)} size="large" type="dashed" icon={<GoThumbsup />} />
                </motion.div>
                <motion.div variants={item} className="w-full text-center">
                  <Typography.Text type="secondary" className="desctop-element text-xs">
                    {t("or-just-press-keys-0")}
                  </Typography.Text>
                </motion.div>
              </Flex>
            </motion.div>
          )}
          <AddEditCardModal categoryId={categoryId} openBool={editModalBool} t={t} inPlayPage />
          {!fullScreenHandle.active ? <FireFlies /> : null}
        </FlipCardStyled>
      </FullScreen>
      {isPlaying && <Confetti />}
    </>
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
