import { config } from "@/src/config";
import axios from "@/src/utils/axios";

// ----------------------------------------------------------------------

export const setStorage = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem(config.storageKey.TOKEN, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(config.storageKey.TOKEN);
    delete axios.defaults.headers.common.Authorization;
  }
};

type BgBlurProps = {
  blur?: number;
  opacity?: number;
  color?: string;
  imgUrl?: string;
};

export function alpha(color: string, opacity: number) {
  if (color.startsWith("rgb")) {
    return `rgba(${parseInt(color.slice(4, 7), 16)}, ${parseInt(color.slice(7, 9), 16)}, ${parseInt(color.slice(9, 11), 16)}, ${opacity})`;
  }
  return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
}

export function bgBlur(props?: BgBlurProps) {
  const color = props?.color || "#000000";
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: "relative",
      backgroundImage: `url(${imgUrl})`,
      "&:before": {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: "100%",
        height: "100%",
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    } as const;
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}
