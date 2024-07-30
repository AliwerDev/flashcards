import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import isArray from "lodash.isarray";
import { config } from "../config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: config.app.HOST_API });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      typeof error.response.data.message === "string" && message.error(error.response.data.message);
      isArray(error.response.data.message) && error.response.data.message.forEach((value: string) => message.error(value));
    }
    return Promise.reject();
  }
);

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  user: {
    me: "/user/me",
    editProfile: "/user/edit-profile",
    changePassword: "/user/change-password",
  },
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    loginByGoogle: "/auth/login-by-google",
    loginByGithub: "/auth/login-by-github",
  },
  card: {
    list: "/card",
    create: "/card",
    createList: "/card/list",
    edit: (id: string) => `/card/${id}`,
    delete: (id: string) => `/card/${id}`,
    getOne: (id: string) => `/card/${id}`,
    play: "/card/play",
    getActive: "/card/active",
  },
  box: {
    list: "/box",
    create: "/box",
    edit: (id: string) => `/box/${id}`,
    delete: (id: string) => `/box/${id}`,
    getOne: (id: string) => `/box/${id}`,
  },
};
