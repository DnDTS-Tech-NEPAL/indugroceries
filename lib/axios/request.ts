import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { getTokenFromClient, getTokenFromServer } from "@/service";

export const requestFulfiledInterceptor = async (
  config: InternalAxiosRequestConfig
) => {
  let token = "";

  // get token from client side for client side api calls and server side similarly
  if (typeof window !== "undefined") token = getTokenFromClient();
  else token = await getTokenFromServer();

  if (config && config.headers && token) {
    config.headers.Authorization = token;
  }

  return config;
};

export const requestErrorInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};
