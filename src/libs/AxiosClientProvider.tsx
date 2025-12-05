import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import i18n from "i18next";
import { useLayoutEffect, type ReactNode } from "react";
import { MAX_RETRIES } from "../constants/limit";
import { useErrorMutators } from "../contexts/ErrorContext";
import { isNetworkError } from "../utils/errorUtil";

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  retryCount?: number;
}

const ERROR_TITLES: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
};

const ERROR_MESSAGES: Record<number, string> = {
  400: "The request was invalid. Please check your input.",
  401: "You are not authorized to access this resource.",
  403: "You don't have permission to access this resource.",
  404: "The requested resource was not found.",
  500: "An internal server error occurred. Please try again later.",
  502: "The server is temporarily unavailable.",
  503: "The service is currently unavailable. Please try again later.",
};

function getErrorTitle(statusCode: number): string {
  const i18nTitle = i18n.t(`error.${statusCode}.title`);
  return i18nTitle &&
    i18nTitle !== `error.${statusCode}.title` &&
    i18nTitle.trim()
    ? i18nTitle
    : ERROR_TITLES[statusCode] || "Error";
}

function getErrorMessage(statusCode: number): string {
  const i18nMessage = i18n.t(`error.${statusCode}.message`);
  if (
    i18nMessage &&
    i18nMessage !== `error.${statusCode}.message` &&
    i18nMessage.trim()
  ) {
    return i18nMessage;
  }

  return (
    ERROR_MESSAGES[statusCode] || "An error occurred. Please try again later."
  );
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
        const errorMsg = (error.response?.data as { error?: string })?.error;

        setErrorState({
          status: statusCode,
          title: getErrorTitle(statusCode),
          message: errorMsg || getErrorMessage(statusCode),
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

export function AxiosClientProvider({ children }: { children: ReactNode }) {
  useAxiosInterceptors(axiosClient);

  return children;
}
