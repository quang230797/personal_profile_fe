import { Email, Lock } from "@mui/icons-material";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Typography,
  InputAdornment,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import { authApi } from "../../services/api";

const SignInButton = styled(Button)(() => ({
  textTransform: "none",
  "&&.MuiButton-contained": {
    backgroundColor: colors.primary,
    background: colors.primary,
    backgroundImage: "none",
    color: colors.textWhite,
    "&:hover": {
      backgroundColor: colors.primaryHover,
      background: colors.primaryHover,
      backgroundImage: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: colors.disabledBg,
      background: colors.disabledBg,
      backgroundImage: "none",
      color: colors.disabledText,
    },
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isDisabled = !email || !password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    try {
      const response = await authApi.signIn({
        email,
        password,
        remember_me: rememberMe,
      });

      if (response.token) {
        localStorage.setItem("auth_token", response.token);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center p-6"
      sx={{
        bgcolor: colors.bgMain,
        backgroundImage:
          "radial-gradient(circle at 20% 50%, rgba(200, 200, 200, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(200, 200, 200, 0.2) 0%, transparent 50%)",
      }}
    >
      <Box className="w-full max-w-md">
        <Box className="mb-8 text-center">
          <Typography
            variant="h4"
            className="mb-2"
            sx={{ fontWeight: 700, color: colors.textPrimary }}
          >
            Welcome back
          </Typography>

          <Typography
            sx={{ color: colors.textSecondary, fontSize: "0.875rem" }}
          >
            Sign in to your account
          </Typography>
        </Box>

        <Box
          component="form"
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
          sx={{
            bgcolor: colors.bgWhite,
            p: 4,
            borderRadius: 2,
            border: `1px solid ${colors.borderDivider}`,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            fullWidth
            type="email"
            label="Email Address"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: colors.textSecondary }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: colors.bgInput,
                color: colors.textPrimary,
                "& fieldset": {
                  borderColor: colors.borderDefault,
                },
                "&:hover fieldset": {
                  borderColor: colors.borderHover,
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.accentFocus,
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.textSecondary,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.accentFocus,
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: colors.textSecondary }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: colors.bgInput,
                color: colors.textPrimary,
                "& fieldset": {
                  borderColor: colors.borderDefault,
                },
                "&:hover fieldset": {
                  borderColor: colors.borderHover,
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.accentFocus,
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.textSecondary,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: colors.accentFocus,
              },
            }}
          />

          <Box className="flex items-center justify-between">
            <Box className="flex items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{
                  color: colors.primary,
                  "&.Mui-checked": {
                    color: colors.primary,
                  },
                }}
              />
              <Typography
                sx={{ color: colors.textSecondary, fontSize: "0.875rem" }}
              >
                Remember me
              </Typography>
            </Box>

            <Button
              type="button"
              sx={{
                textTransform: "none",
                color: colors.primary,
                fontSize: "0.875rem",
                "&:hover": {
                  color: colors.primaryHover,
                  bgcolor: "transparent",
                },
              }}
            >
              Forgot password?
            </Button>
          </Box>

          <SignInButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || isDisabled}
            className="py-3 text-base font-medium"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </SignInButton>
          <Box className="mt-4 text-center">
            <Typography
              sx={{ color: colors.textTertiary, fontSize: "0.875rem" }}
            >
              Don't have an account?{" "}
              <Link
                to="/sign_up"
                style={{
                  color: colors.primary,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
