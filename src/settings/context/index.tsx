"use client";
import { createContext, useEffect, useState } from "react";
import { useMemo } from "react";
import { SettingsContextType, SettingsStateType, Theme, UpdateState } from "../types";
import { config } from "@/src/config";

export const SettingsContext = createContext({} as SettingsContextType);

const initialState: SettingsStateType = {
  sidebar_collapsed: true,
  theme: "dark",
};

type Props = {
  children: React.ReactNode;
};

export function SettingsProvider({ children }: Props) {
  const [state, setState] = useState<SettingsStateType>(initialState);

  useEffect(() => {
    const storedState = localStorage.getItem(config.storageKey.SETTINGS);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState.theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      setState(parsedState);
    }
  }, []);

  // updateData
  const updateData = (data: UpdateState) => {
    const newState = { ...state, ...data };
    localStorage.setItem(config.storageKey.SETTINGS, JSON.stringify(newState));
    setState(newState);
  };

  const changeMode = (theme: Theme) => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    const newState = { ...state, theme };
    localStorage.setItem(config.storageKey.SETTINGS, JSON.stringify(newState));
    setState((s) => ({ ...s, theme }));
  };

  const memoizedValue: SettingsContextType = useMemo(
    () => ({
      theme: state.theme,
      sidebar_collapsed: state.sidebar_collapsed,
      updateData,
      changeMode,
    }),
    [state.theme, updateData, changeMode]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
