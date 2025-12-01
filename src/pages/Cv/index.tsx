import { Box, Typography, CircularProgress } from "@mui/material";
import { Education } from "../../components/cv/Education";
import { Experience } from "../../components/cv/Experience";
import { Header } from "../../components/cv/Header";
import { Project } from "../../components/cv/Project";
import { Skills } from "../../components/cv/Skills";
import { Summary } from "../../components/cv/Summary";
import { useCvData } from "../../hooks/useCvData";

const CV_CONTAINER_STYLES = {
  maxWidth: 900,
  mx: "auto",
  width: "100%",
  pb: 6,
} as const;

const LOADING_STYLES = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "60vh",
} as const;

const ERROR_STYLES = {
  textAlign: "center",
  py: 8,
} as const;

export default function CVPage() {
  const { data: cvData, loading, error } = useCvData(1);

  if (loading) {
    return (
      <Box sx={LOADING_STYLES}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !cvData) {
    return (
      <Box sx={ERROR_STYLES}>
        <Typography variant="h6" color="error">
          {error?.message || "Failed to load CV data"}
        </Typography>
      </Box>
    );
  }

  const { profile, skills, experiences, projects, education } = cvData;

  return (
    <Box sx={CV_CONTAINER_STYLES}>
      <Header profile={profile} />
      <Summary summary={profile?.summary} />
      <Experience experiences={experiences} />
      <Project projects={projects} />
      <Education education={education} />
      <Skills skills={skills} />
    </Box>
  );
}
