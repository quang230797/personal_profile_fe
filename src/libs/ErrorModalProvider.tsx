import ModalDialog from "../components/ui/Modal";
import { useErrorState, useErrorMutators } from "../contexts/ErrorContext";

export default function ErrorModalProvider() {
  const errorState = useErrorState();
  const { clearError } = useErrorMutators();

  if (!errorState) {
    return null;
  }

  return (
    <ModalDialog
      open={true}
      title={errorState.title || "Error"}
      message={errorState.message || "An error occurred"}
      onClose={clearError}
    />
  );
}
