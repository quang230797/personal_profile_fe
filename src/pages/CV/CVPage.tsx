import {
  Person as PersonIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  Avatar,
  alpha,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { cvApi, type CvData } from "../../services/api";

export default function CVPage() {
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCvData = async () => {
      try {
        const data = await cvApi.getComplete(1);
        setCvData(data);
      } catch (error) {
        console.error("Failed to fetch CV data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCvData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!cvData) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6">Failed to load CV data</Typography>
      </Box>
    );
  }

  const { profile, skills, experiences, projects, education } = cvData;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", width: "100%", pb: 6 }}>
      <Card
        sx={{
          mb: 4,
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          color: "white",
        }}
      >
        <CardContent sx={{ textAlign: "center", py: 5 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              border: "4px solid white",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
            }}
          >
            <PersonIcon sx={{ fontSize: 64 }} />
          </Avatar>

          <Typography variant="h3" fontWeight={700}>
            {profile?.full_name}
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mt: 2, lineHeight: 1.6 }}
          >
            {profile?.address && `${profile.address} • `}
            {profile?.phone && `${profile.phone} • `}
            {profile?.email}
            {profile?.linkedin_url && (
              <>
            <br />
            <a
                  href={profile.linkedin_url}
              target="_blank"
                  rel="noopener noreferrer"
              style={{
                color: "white",
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              LinkedIn Profile
            </a>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
          >
            {profile?.summary}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <WorkIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={700}>
              Work Experience
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={4}>
            {experiences.map((exp, i) => (
              <Box key={exp.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {exp.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.company}
                    </Typography>
                  </Box>

                  <Chip
                    label={exp.period}
                    size="small"
                    sx={{
                      backgroundColor: alpha("#6366f1", 0.1),
                      color: "secondary.main",
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Box component="ul" sx={{ pl: 3, m: 0 }}>
                  {exp.experience_items?.map((item) => (
                    <Typography
                      key={item.id}
                      component="li"
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.2, lineHeight: 1.7 }}
                    >
                      {item.description}
                    </Typography>
                  ))}
                </Box>

                {i < experiences.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <WorkIcon color="secondary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={700}>
              Projects
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={4}>
            {projects.map((prj, idx) => (
              <Box key={prj.id}>
                <Typography variant="h6" fontWeight={700}>
                  {prj.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {prj.period} {prj.client && `— Client: ${prj.client}`}
                </Typography>

                {prj.description && (
                <Typography sx={{ mt: 1.5, mb: 1.5 }} color="text.secondary">
                  {prj.description}
                </Typography>
                )}

                {(prj.team_size || prj.position) && (
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    {prj.team_size && (
                  <Chip
                        label={`Team size: ${prj.team_size}`}
                    sx={{
                      backgroundColor: alpha("#3b82f6", 0.1),
                      color: "primary.main",
                    }}
                  />
                    )}
                    {prj.position && (
                  <Chip
                    label={`Position: ${prj.position}`}
                    sx={{
                      backgroundColor: alpha("#10b981", 0.1),
                      color: "success.main",
                    }}
                  />
                    )}
                </Stack>
                )}

                {prj.project_roles && prj.project_roles.length > 0 && (
                  <>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      sx={{ mb: 1 }}
                    >
                  Role in project
                </Typography>
                <Box component="ul" sx={{ pl: 3 }}>
                      {prj.project_roles.map((role) => (
                    <Typography
                          key={role.id}
                      component="li"
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.8 }}
                    >
                          {role.description}
                    </Typography>
                  ))}
                </Box>
                  </>
                )}

                {prj.project_technologies &&
                  prj.project_technologies.length > 0 && (
                    <>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ mt: 2, mb: 1 }}
                >
                  Technology
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {prj.project_technologies.map((tech) => (
                    <Chip
                            key={tech.id}
                            label={tech.name}
                      size="small"
                      sx={{
                        backgroundColor: alpha("#6366f1", 0.1),
                        color: "secondary.main",
                      }}
                    />
                  ))}
                </Box>
                    </>
                  )}

                {idx < projects.length - 1 && <Divider sx={{ mt: 3 }} />}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <SchoolIcon color="info" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={700}>
              Education
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {education && (
            <>
          <Typography variant="h6" fontWeight={600}>
            {education.school}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {education.major} — {education.period}
          </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <CodeIcon color="success" sx={{ fontSize: 32 }} />
            <Typography variant="h5" fontWeight={700}>
              Skills
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {skills.map((skill) => (
              <Chip
                key={skill.id}
                label={skill.name}
                sx={{
                  backgroundColor: alpha("#10b981", 0.1),
                  color: "success.main",
                  fontWeight: 600,
                  px: 1.5,
                  height: 30,
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
