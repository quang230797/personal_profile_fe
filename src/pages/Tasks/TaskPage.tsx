import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Task as TaskIcon,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Checkbox,
  Avatar,
  alpha,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { tasksApi, type Task } from "../../services/api";

function formatDueDate(dateString: string | null): string {
  if (!dateString) return "No due date";
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await tasksApi.getAll();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = await tasksApi.update(task.id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

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
            Tasks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your tasks and stay organized
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
          Add Task
        </Button>
      </Stack>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              transition: "all 0.2s ease",
              borderLeft: `4px solid ${
                task.priority === "high"
                  ? "#ef4444"
                  : task.priority === "medium"
                    ? "#f59e0b"
                    : "#10b981"
              }`,
              ...(task.completed && {
                opacity: 0.7,
                backgroundColor: alpha("#10b981", 0.05),
              }),
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                  sx={{
                    color: task.completed ? "success.main" : "grey.400",
                    "&.Mui-checked": {
                      color: "success.main",
                    },
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "text.secondary" : "text.primary",
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1,
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      label={task.priority}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: "0.7rem",
                        backgroundColor:
                          task.priority === "high"
                            ? alpha("#ef4444", 0.1)
                            : task.priority === "medium"
                              ? alpha("#f59e0b", 0.1)
                              : alpha("#10b981", 0.1),
                        color:
                          task.priority === "high"
                            ? "#ef4444"
                            : task.priority === "medium"
                              ? "#f59e0b"
                              : "#10b981",
                        fontWeight: 600,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Due: {formatDueDate(task.due_date)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && tasks.length === 0 && (
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
                  backgroundColor: alpha("#3b82f6", 0.1),
                  mb: 2,
                }}
              >
                <TaskIcon sx={{ fontSize: 32, color: "primary.main" }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                No tasks yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create your first task to get started
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />}>
                Add Task
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
