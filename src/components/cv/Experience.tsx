import { Work as WorkIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { Experience } from "../../services/api";

interface ExperienceProps {
  experiences: Experience[];
}

const SECTION_HEADER_STYLES = {
  display: "flex",
  gap: 2,
  mb: 3,
} as const;

const EXPERIENCE_ITEM_STYLES = {
  display: "flex",
  justifyContent: "space-between",
  mb: 2,
  alignItems: "center",
  flexWrap: "wrap",
  gap: 2,
} as const;

const PERIOD_CHIP_STYLES = {
  backgroundColor: "#F5F5F5",
  color: "#212121",
  fontWeight: 600,
} as const;

const EXPERIENCE_ITEMS_STYLES = {
  pl: 3,
  m: 0,
} as const;

export function Experience({ experiences }: ExperienceProps) {
  if (!experiences.length) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={SECTION_HEADER_STYLES}>
          <WorkIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} component="h2">
            Work Experience
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={4}>
          {experiences.map((exp, index) => (
            <Box key={exp.id}>
              <Box sx={EXPERIENCE_ITEM_STYLES}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    {exp.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.company}
                  </Typography>
                </Box>

                {exp.period && (
                  <Chip
                    label={exp.period}
                    size="small"
                    sx={PERIOD_CHIP_STYLES}
                  />
                )}
              </Box>

              {exp.experience_items && exp.experience_items.length > 0 && (
                <Box sx={EXPERIENCE_ITEMS_STYLES}>
                  {exp.experience_items.map((item) => (
                    <Typography
                      key={item.id}
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.2, lineHeight: 1.7 }}
                    >
                      • {item.description}
                    </Typography>
                  ))}
                </Box>
              )}

              {index < experiences.length - 1 && <Divider sx={{ mt: 3 }} />}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
