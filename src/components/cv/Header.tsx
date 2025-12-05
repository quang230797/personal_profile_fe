import { Person as PersonIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import type { CvProfile } from "../../services/api";

interface HeaderProps {
  profile: CvProfile | null;
}

const HEADER_CARD_STYLES = {
  mb: 4,
  backgroundColor: "#212121",
  color: "white",
} as const;

const AVATAR_STYLES = {
  width: 120,
  height: 120,
  mx: "auto",
  mb: 2,
  border: "4px solid white",
  boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
} as const;

const LINK_STYLES = {
  color: "white",
  textDecoration: "underline",
  fontWeight: 500,
  "&:hover": {
    textDecoration: "underline",
    opacity: 0.9,
  },
} as const;

export function Header({ profile }: HeaderProps) {
  if (!profile) return null;

  const contactInfo = [profile.address, profile.phone, profile.email]
    .filter(Boolean)
    .join(" • ");

  return (
    <Card sx={HEADER_CARD_STYLES}>
      <CardContent sx={{ textAlign: "center", py: 5 }}>
        <Avatar sx={AVATAR_STYLES}>
          <PersonIcon sx={{ fontSize: 64 }} />
        </Avatar>

        <Typography variant="h3" fontWeight={700} component="h1">
          {profile.full_name}
        </Typography>

        {profile.title && (
          <Typography
            variant="h6"
            sx={{ opacity: 0.9, mt: 1, fontWeight: 500 }}
          >
            {profile.title}
          </Typography>
        )}

        {contactInfo && (
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mt: 2, lineHeight: 1.6 }}
          >
            {contactInfo}
          </Typography>
        )}

        {profile.linkedin_url && (
          <Box sx={{ mt: 2 }}>
            <MuiLink
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={LINK_STYLES}
            >
              LinkedIn Profile
            </MuiLink>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
