"use client";
import { useEffect, useState } from "react";
import { Breakpoint, Grid } from "antd";

// ----------------------------------------------------------------------

type ReturnType = boolean;

export type Query = "up" | "down" | "between" | "only";
export type Value = Breakpoint | number;
const { useBreakpoint } = Grid;

export function useResponsive(query: Query, start?: Value, end?: Value): ReturnType {
  const screens = useBreakpoint();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const checkMatch = () => {
      if (query === "up") {
        setMatches(start ? (screens[start as Breakpoint] as boolean) : false);
      } else if (query === "down") {
        setMatches(start ? !screens[start as Breakpoint] : false);
      } else if (query === "between" && start && end) {
        setMatches((screens[start as Breakpoint] as boolean) && !screens[end as Breakpoint]);
      } else if (query === "only" && start) {
        setMatches(screens[start as Breakpoint] as boolean);
      }
    };

    checkMatch();
  }, [query, start, end, screens]);

  return matches;
}

// ----------------------------------------------------------------------

type BreakpointOrNull = Breakpoint | null;

export function useWidth(): BreakpointOrNull {
  const screens = useBreakpoint();
  const [width, setWidth] = useState<BreakpointOrNull>(null);

  useEffect(() => {
    const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "xxl"];
    for (let i = breakpoints.length - 1; i >= 0; i--) {
      if (screens[breakpoints[i]]) {
        setWidth(breakpoints[i]);
        break;
      }
    }
  }, [screens]);

  return width;
}
