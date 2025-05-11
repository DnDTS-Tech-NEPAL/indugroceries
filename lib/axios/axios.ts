import axios from "axios";

import { requestErrorInterceptor, requestFulfiledInterceptor } from "./request";
import {
  responseErrorInterceptor,
  responseSuccessInterceptor,
} from "./response";

const ONE_MINUTE = 1 * 60 * 1000;

const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
const nextBaseURL = process.env.NEXT_SERVER_API_ENDPOINT as string;

const generateHTTPClient = (baseURL: string) => {
  const httpClient = axios.create({
    baseURL,
    timeout: ONE_MINUTE,
  });

  // Request interceptor
  httpClient.interceptors.request.use(
    requestFulfiledInterceptor,
    requestErrorInterceptor
  );

  // Response interceptor
  httpClient.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor
  );

  return httpClient;
};

const httpClient = generateHTTPClient(baseURL);
const httpClientNext = generateHTTPClient(nextBaseURL);

export { httpClient, httpClientNext };
