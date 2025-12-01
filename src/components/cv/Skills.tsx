import { Code as CodeIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
  alpha,
} from "@mui/material";
import type { Skill } from "../../services/api";

interface SkillsProps {
  skills: Skill[];
}

const SECTION_HEADER_STYLES = {
  display: "flex",
  gap: 2,
  mb: 3,
} as const;

const SKILLS_CONTAINER_STYLES = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1.5,
} as const;

const SKILL_CHIP_STYLES = {
  backgroundColor: alpha("#10b981", 0.1),
  color: "success.main",
  fontWeight: 600,
  px: 1.5,
  height: 30,
} as const;

export function Skills({ skills }: SkillsProps) {
  if (!skills.length) return null;

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={SECTION_HEADER_STYLES}>
          <CodeIcon color="success" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} component="h2">
            Skills
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={SKILLS_CONTAINER_STYLES}>
          {skills.map((skill) => (
            <Chip key={skill.id} label={skill.name} sx={SKILL_CHIP_STYLES} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
