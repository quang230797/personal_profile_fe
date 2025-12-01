import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "outlined" | "text";
}

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const getVariant = () => {
    switch (variant) {
      case "primary":
        return "contained";
      case "secondary":
        return "contained";
      case "outlined":
        return "outlined";
      case "text":
        return "text";
      default:
        return "contained";
    }
  };

  const getColor = () => {
    if (variant === "secondary") return "secondary";
    return "primary";
  };

  return (
    <MuiButton
      variant={getVariant()}
      color={getColor()}
      {...props}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        px: 3,
        py: 1.5,
        ...(variant === "primary" && {
          background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
            boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
            transform: "translateY(-1px)",
          },
        }),
        ...props.sx,
      }}
    >
      {children}
    </MuiButton>
  );
}
