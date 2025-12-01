import { type AxiosError } from "axios";
import { MAX_RETRIES } from "../constants/limit";

export const isNetworkError = (error: AxiosError): boolean => {
  const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
  return (
    isOffline ||
    error.code === "ERR_CONNECTION_CLOSED" ||
    error.code === "ECONNABORTED" ||
    error.code === "ENOTFOUND" ||
    error.message?.includes?.("Network Error") ||
    (error.isAxiosError && error.response === null)
  );
};

export async function fetchWithRetry(
  fn: () => Promise<unknown>,
  maxRetries = MAX_RETRIES,
): Promise<unknown> {
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      if (!isNetworkError(error as AxiosError) || retries === maxRetries) {
        throw error;
      }

      retries += 1;
    }
  }

  throw new Error();
}
