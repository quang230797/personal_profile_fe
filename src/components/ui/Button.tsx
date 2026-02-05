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
          backgroundColor: "#212121",
          color: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(33, 33, 33, 0.15)",
          "&:hover": {
            backgroundColor: "#424242",
            boxShadow: "0 4px 12px rgba(33, 33, 33, 0.2)",
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
