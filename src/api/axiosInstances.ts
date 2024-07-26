import axios, { AxiosError } from "axios";

import { baseURL } from "../utils/baseURL";

const publicInstance = axios.create({
  baseURL,
});
const protectedInstance = axios.create({
  baseURL,
});

protectedInstance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");

    if (AUTH_TOKEN === null) {
      throw new AxiosError("Token not found");
    }

    config.headers.Authorization = "Bearer " + AUTH_TOKEN;

    return config;
  },
  async function (error: AxiosError<{ message: string }>) {
    return await Promise.reject(error);
  }
);

export { protectedInstance, publicInstance };
