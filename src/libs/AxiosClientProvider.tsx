import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import i18n from "i18next";
import { useLayoutEffect, type ReactElement } from "react";
import { MAX_RETRIES } from "../constants/limit";
import { useErrorMutators } from "../recoil/errorState";
import { isNetworkError } from "../utils/errorUtil";

interface ErrorMessage {
  title: string;
  message: string;
}

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  retryCount?: number;
}

function mapStatusCodeToErrorMessage(statusCode: number): ErrorMessage {
  const title = i18n.t(`error.${statusCode}.title`);
  const message = i18n.t(`error.${statusCode}.message`);

  return { title, message };
}

export const useAxiosInterceptors = (axiosInstance: AxiosInstance): void => {
  const { setErrorState } = useErrorMutators();

  useLayoutEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => res,
      async (error: AxiosError & { config?: AxiosRequestConfigWithRetry }) => {
        const config = error.config;
        if (config != null && isNetworkError(error)) {
          config.retryCount = config.retryCount ?? 0;
          if (config.retryCount < MAX_RETRIES) {
            config.retryCount += 1;
            return await axiosInstance(config);
          }
        }

        const statusCode = error.response?.status ?? 0;
        const errorMsg = (error.response?.data as { error?: string })?.error ?? "";
        const { title, message } = mapStatusCodeToErrorMessage(statusCode);

        setErrorState({
          status: statusCode,
          title,
          message: errorMsg ?? message,
        });

        return await Promise.reject(error);
      },
    );
  }, [axiosInstance, setErrorState]);
};

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export function AxiosClientProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  useAxiosInterceptors(axiosClient);

  return <>{children}</>;
}
