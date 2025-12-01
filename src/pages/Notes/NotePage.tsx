import {
  Add as AddIcon,
  Note as NoteIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Avatar,
  alpha,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { notesApi, type Note } from "../../services/api";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NotePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await notesApi.getAll();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Notes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capture your thoughts and ideas
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
              boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
            },
          }}
        >
          New Note
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {notes.map((note) => (
          <Box key={note.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent
                sx={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: alpha("#6366f1", 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <NoteIcon sx={{ color: "secondary.main", fontSize: 24 }} />
                  </Box>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {note.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {note.content}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                  {note.note_tags.map((tag) => (
                    <Box
                      key={tag.id}
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: alpha("#6366f1", 0.1),
                        fontSize: "0.75rem",
                        color: "secondary.main",
                        fontWeight: 500,
                      }}
                    >
                      {tag.name}
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(note.created_at)}
                  </Typography>
                  <IconButton size="small" sx={{ color: "text.secondary" }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && notes.length === 0 && (
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 6,
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  backgroundColor: alpha("#6366f1", 0.1),
                  mb: 2,
                }}
              >
                <NoteIcon sx={{ fontSize: 32, color: "secondary.main" }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                No notes yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your first note to capture your ideas
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />}>
                New Note
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
