import { Modal, Box, Typography, Button } from "@mui/material";
import { colors } from "../../constants/colors";

interface ModalDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function ModalDialog({
  open,
  title = "Error",
  message,
  onClose,
}: ModalDialogProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 4,
          bgcolor: "white",
          borderRadius: 2,
          width: 350,
          boxShadow: 24,
          outline: "none",
        }}
      >
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <Typography mb={3}>{message}</Typography>

        <Button
          onClick={onClose}
          sx={{
            width: "100%",
            color: colors.textWhite,
            bgcolor: colors.primary,
            "&:hover": {
              bgcolor: colors.primaryHover,
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}
