import { Work as WorkIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import type { Project } from "../../services/api";

interface ProjectProps {
  projects: Project[];
}

const SECTION_HEADER_STYLES = {
  display: "flex",
  gap: 2,
  mb: 3,
} as const;

const TEXT_LEFT_STYLES = {
  textAlign: "left",
} as const;

const CHIP_CONTAINER_STYLES = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  justifyContent: "flex-start",
} as const;

const TECHNOLOGY_CHIP_STYLES = {
  backgroundColor: alpha("#6366f1", 0.1),
  color: "secondary.main",
} as const;

const TEAM_SIZE_CHIP_STYLES = {
  backgroundColor: alpha("#3b82f6", 0.1),
  color: "primary.main",
} as const;

const POSITION_CHIP_STYLES = {
  backgroundColor: alpha("#10b981", 0.1),
  color: "success.main",
} as const;

export function Project({ projects }: ProjectProps) {
  if (!projects.length) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={SECTION_HEADER_STYLES}>
          <WorkIcon color="secondary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} component="h2">
            Projects
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={4}>
          {projects.map((project, index) => (
            <Box key={project.id}>
              <Typography variant="h6" fontWeight={700} sx={TEXT_LEFT_STYLES}>
                {project.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={TEXT_LEFT_STYLES}
              >
                {project.period}
                {project.client && ` — Client: ${project.client}`}
              </Typography>

              {project.description && (
                <Typography
                  sx={{ mt: 1.5, mb: 1.5, ...TEXT_LEFT_STYLES }}
                  color="text.secondary"
                >
                  {project.description}
                </Typography>
              )}

              {project.project_roles && project.project_roles.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1, ...TEXT_LEFT_STYLES }}
                  >
                    Role in project
                  </Typography>
                  <Box sx={TEXT_LEFT_STYLES}>
                    {project.project_roles.map((role) => (
                      <Typography
                        key={role.id}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.8, ...TEXT_LEFT_STYLES }}
                      >
                        • {role.description}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              {project.project_technologies &&
                project.project_technologies.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1, ...TEXT_LEFT_STYLES }}
                    >
                      Technology
                    </Typography>
                    <Box sx={CHIP_CONTAINER_STYLES}>
                      {project.project_technologies.map((tech) => (
                        <Chip
                          key={tech.id}
                          label={tech.name}
                          size="small"
                          sx={TECHNOLOGY_CHIP_STYLES}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

              {(project.team_size || project.position) && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mb: 1, ...TEXT_LEFT_STYLES }}
                  >
                    Team Size and Position
                  </Typography>
                  <Box sx={CHIP_CONTAINER_STYLES}>
                    {project.team_size && (
                      <Chip
                        label={`Team size: ${project.team_size}`}
                        size="small"
                        sx={TEAM_SIZE_CHIP_STYLES}
                      />
                    )}
                    {project.position && (
                      <Chip
                        label={`Position: ${project.position}`}
                        size="small"
                        sx={POSITION_CHIP_STYLES}
                      />
                    )}
                  </Box>
                </Box>
              )}

              {index < projects.length - 1 && <Divider sx={{ mt: 3 }} />}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
