import { Card as MuiCard, CardProps, CardContent } from "@mui/material";

export default function Card({ children, ...props }: CardProps) {
  return (
    <MuiCard
      {...props}
      sx={{
        borderRadius: 2,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transform: "translateY(-2px)",
        },
        ...props.sx,
      }}
    >
      {children}
    </MuiCard>
  );
}

export { CardContent };
