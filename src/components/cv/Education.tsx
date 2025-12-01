import { School as SchoolIcon } from "@mui/icons-material";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import type { Education } from "../../services/api";

interface EducationProps {
  education: Education | null;
}

const SECTION_HEADER_STYLES = {
  display: "flex",
  gap: 2,
  mb: 3,
} as const;

export function Education({ education }: EducationProps) {
  if (!education) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={SECTION_HEADER_STYLES}>
          <SchoolIcon color="info" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} component="h2">
            Education
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" fontWeight={600}>
          {education.school}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {education.major} — {education.period}
        </Typography>
      </CardContent>
    </Card>
  );
}
