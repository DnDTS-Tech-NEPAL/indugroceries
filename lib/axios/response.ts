import { AxiosResponse } from "axios";

import { httpClient } from "@/lib";
import { removeTokenFromClient } from "@/service";
import { AxiosErrorResponseType } from "@/types";

export const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

export const responseErrorInterceptor = (error: AxiosErrorResponseType) => {
  const originalRequest = error.config;

  if (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    originalRequest.headers.Authorization
  ) {
    originalRequest._retry = true; // Prevent infinite loop

    removeTokenFromClient(); // Remove expired token
    delete originalRequest.headers.Authorization;

    return httpClient(originalRequest); // Retry the request
  }

  return Promise.reject(error);
};
