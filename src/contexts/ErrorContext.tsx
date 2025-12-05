import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export interface ErrorState {
  title: string;
  message: string;
  status?: number;
}

interface ErrorContextType {
  errorState: ErrorState | null;
  setErrorState: (error: ErrorState) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errorState, setErrorStateInternal] = useState<ErrorState | null>(null);

  const setErrorState = useCallback((error: ErrorState) => {
    setErrorStateInternal(error);
  }, []);

  const clearError = useCallback(() => {
    setErrorStateInternal(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ errorState, setErrorState, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useErrorState(): ErrorState | null {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useErrorState must be used within an ErrorProvider");
  }
  return context.errorState;
}

export function useErrorMutators(): {
  setErrorState: (error: ErrorState) => void;
  clearError: () => void;
} {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useErrorMutators must be used within an ErrorProvider");
  }
  return {
    setErrorState: context.setErrorState,
    clearError: context.clearError,
  };
}
