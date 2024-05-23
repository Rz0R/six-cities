import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';

type UnauthorizedCallback = () => void;

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

const TIMEOUT_DURATION = 5000;

export const createAPI = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT_DURATION,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status == StatusCodes.UNAUTHORIZED) {
        return onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    const token = getToken();

    if (token && config.headers) {
      newConfig.headers['x-token'] = token;
    }

    return newConfig;
  });

  return api;
};
