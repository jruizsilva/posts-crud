import axios from "axios";

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
      throw new Error("Token invalid");
    }

    config.headers.Authorization = "Bearer " + AUTH_TOKEN;

    return config;
  },
  async function (error) {
    return await Promise.reject(error);
  }
);

export { protectedInstance, publicInstance };
