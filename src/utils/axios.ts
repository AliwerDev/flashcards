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
    list: "/user/list",
    role: "/user/role",
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
    list: (categoryId: string) => `/card?categoryId=${categoryId}`,
    create: "/card",
    createList: "/card/list",
    reviews: "card/reviews",
    play: (categoryId: string) => `/card/play/${categoryId}`,
    getActive: (categoryId: string) => `/card/active/${categoryId}`,
    edit: (id: string) => `/card/${id}`,
    delete: (id: string) => `/card/${id}`,
    getOne: (id: string) => `/card/${id}`,
  },
  box: {
    create: `/box`,
    edit: (id: string) => `/box/${id}`,
    delete: (id: string) => `/box/${id}`,
    getOne: (id: string) => `/box/${id}`,
    list: (categoryId: string) => `/box/list/${categoryId}`,
    listWithCardCount: (categoryId: string) => `/box/list/${categoryId}?withCardCount=true`,
  },
  category: {
    list: "/category",
    create: "/category",
    getOne: (id: string) => `/category/${id}`,
    edit: (id: string) => `/category/${id}`,
    delete: (id: string) => `/category/${id}`,
  },
};
