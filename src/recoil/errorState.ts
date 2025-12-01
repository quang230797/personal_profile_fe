import React from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export interface ErrorState {
  title: string;
  message: string;
  status?: number;
}

const errorState = atom<ErrorState | null>({
  key: "errorState",
  default: null,
});

export const useErrorState = (): ErrorState | null => {
  return useRecoilValue(errorState);
};

export const useErrorMutators = (): {
  setErrorState: (error: ErrorState) => void;
  clearError: () => void;
} => {
  const setState = useSetRecoilState(errorState);

  const setErrorState = React.useCallback(
    (error: ErrorState) => {
      setState(error);
    },
    [setState],
  );

  const clearError = React.useCallback(() => {
    setState(null);
  }, [setState]);

  return { setErrorState, clearError };
};
