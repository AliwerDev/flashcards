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
