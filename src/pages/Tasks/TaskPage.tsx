import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Task as TaskIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  ListItemText,
  List,
  ListItemButton,
  Stack,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  CircularProgress,
  Avatar,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { tasksApi, type Task } from "../../services/api";

function formatDueDate(dateString: string | null): string {
  if (!dateString) return "No infor";
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

const getPriorityColors = (priority: string) => {
  switch (priority) {
    case "high":
      return {
        backgroundColor: "#FFEBEE",
        color: "#C62828",
        borderColor: "#EF5350",
      };
    case "medium":
      return {
        backgroundColor: "#FFF8E1",
        color: "#F57C00",
        borderColor: "#FFB74D",
      };
    case "low":
      return {
        backgroundColor: "#F5F5F5",
        color: "#212121",
        borderColor: "rgba(0, 0, 0, 0.08)",
      };
    default:
      return {
        backgroundColor: "#F5F5F5",
        color: "#212121",
        borderColor: "rgba(0, 0, 0, 0.08)",
      };
  }
};

const getStatusColors = (status: string) => {
  switch (status) {
    case "backlog":
      return {
        backgroundColor: "#F5F5F5",
        color: "#757575",
        borderColor: "rgba(0, 0, 0, 0.08)",
      };
    case "in_progress":
      return {
        backgroundColor: "#E3F2FD",
        color: "#1976D2",
        borderColor: "#64B5F6",
      };
    case "review":
      return {
        backgroundColor: "#FFF3E0",
        color: "#E65100",
        borderColor: "#FFB74D",
      };
    case "done":
      return {
        backgroundColor: "#E8F5E9",
        color: "#2E7D32",
        borderColor: "#81C784",
      };
    default:
      return {
        backgroundColor: "#F5F5F5",
        color: "#212121",
        borderColor: "rgba(0, 0, 0, 0.08)",
      };
  }
};
export const FILTER_GROUPS = [
  { label: "Urgent", value: "urgent" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low" as "high" | "medium" | "low",
    status: "backlog" as "backlog" | "in_progress" | "review" | "done",
  });
  const [errors, setErrors] = useState({
    title: "",
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await tasksApi.getAll(searchParams);
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [searchParams]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      status: task.status,
    });
    setErrors({ title: "" });
    setOpenCreateModal(true);
  };

  const handleOnclickFilter = (filter: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (filter) {
      newSearchParams.set("priority", filter);
    } else {
      newSearchParams.delete("priority");
    }
    setSearchParams(newSearchParams);
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setOpenCreateModal(true);
    setFormData({
      title: "",
      description: "",
      priority: "low",
      status: "backlog",
    });
    setErrors({ title: "" });
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      priority: "low",
      status: "backlog",
    });
    setErrors({ title: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "title" && errors.title) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { title: "" };
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveTask = async () => {
    if (!validateForm()) return;

    try {
      setCreating(true);
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status,
      };

      if (editingTask) {
        await tasksApi.update(editingTask.id, taskData);
      } else {
        await tasksApi.create(taskData);
      }

      // Refresh tasks list
      const data = await tasksApi.getAll(searchParams);
      setTasks(data);

      handleCloseCreateModal();
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Box sx={{ width: "100%", mx: "auto", maxWidth: 1400 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 5 }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "#212121",
              fontSize: { xs: "1.75rem", sm: "2rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Task Manager
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#757575",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
            }}
          >
            Organize and track your work efficiently
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
          sx={{
            backgroundColor: "#212121",
            color: "#FFFFFF",
            borderRadius: 2.5,
            px: 3.5,
            py: 1.75,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.9375rem",
            boxShadow: "0 2px 8px rgba(33, 33, 33, 0.12)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: "#424242",
              boxShadow: "0 4px 16px rgba(33, 33, 33, 0.18)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          New Task
        </Button>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="flex-start">
        <Box
          sx={{
            width: 260,
            flexShrink: 0,
            backgroundColor: "#FAFAFA",
            borderRadius: 3,
            p: 2.5,
            height: "fit-content",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            position: "sticky",
            top: 20,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              px: 1.5,
              mb: 2.5,
              color: "#212121",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            Filters
          </Typography>

          <List sx={{ py: 0 }}>
            <ListItemButton
              onClick={() => handleOnclickFilter("")}
              sx={{
                borderRadius: 2.5,
                mx: 0.5,
                mb: 0.75,
                px: 1.5,
                py: 1.25,
                backgroundColor: !searchParams.get("priority")
                  ? "#FFFFFF"
                  : "transparent",
                boxShadow: !searchParams.get("priority")
                  ? "0 1px 3px rgba(0, 0, 0, 0.08)"
                  : "none",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: !searchParams.get("priority")
                    ? "#FFFFFF"
                    : "rgba(0, 0, 0, 0.04)",
                  transform: "translateX(2px)",
                },
              }}
            >
              <ListItemText
                primary="All Tasks"
                primaryTypographyProps={{
                  fontWeight: !searchParams.get("priority") ? 600 : 500,
                  color: "#212121",
                  fontSize: "0.9375rem",
                }}
              />
            </ListItemButton>
            {FILTER_GROUPS.map((f) => (
              <ListItemButton
                key={f.value}
                onClick={() => handleOnclickFilter(f.value)}
                sx={{
                  borderRadius: 2.5,
                  mx: 0.5,
                  mb: 0.75,
                  px: 1.5,
                  py: 1.25,
                  backgroundColor:
                    searchParams.get("priority") === f.value
                      ? "#FFFFFF"
                      : "transparent",
                  boxShadow:
                    searchParams.get("priority") === f.value
                      ? "0 1px 3px rgba(0, 0, 0, 0.08)"
                      : "none",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    backgroundColor:
                      searchParams.get("priority") === f.value
                        ? "#FFFFFF"
                        : "rgba(0, 0, 0, 0.04)",
                    transform: "translateX(2px)",
                  },
                }}
              >
                <ListItemText
                  primary={f.label}
                  primaryTypographyProps={{
                    fontWeight:
                      searchParams.get("priority") === f.value ? 600 : 500,
                    color: "#212121",
                    fontSize: "0.9375rem",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 8,
              }}
            >
              <CircularProgress sx={{ color: "#212121" }} size={32} />
            </Box>
          ) : tasks.length === 0 ? (
            <Card
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: 3,
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 8,
                    px: 4,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: "#F5F5F5",
                      mb: 3,
                      border: "2px solid #E0E0E0",
                    }}
                  >
                    <TaskIcon sx={{ fontSize: 40, color: "#9E9E9E" }} />
                  </Avatar>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      color: "#212121",
                      fontSize: "1.25rem",
                      mb: 1,
                    }}
                  >
                    No tasks yet
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#757575",
                      textAlign: "center",
                      maxWidth: 400,
                    }}
                  >
                    Get started by creating your first task
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Stack spacing={2.5}>
              {tasks.map((task, index) => (
                <Card
                  key={task.id}
                  sx={{
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 3,
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    borderLeft: `4px solid ${
                      task.priority === "high"
                        ? "#EF5350"
                        : task.priority === "medium"
                          ? "#FFB74D"
                          : "transparent"
                    }`,
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                      transform: "translateY(-2px)",
                      borderColor: "rgba(0, 0, 0, 0.1)",
                    },
                    animation: `fadeIn 0.3s ease ${index * 0.05}s both`,
                    "@keyframes fadeIn": {
                      from: {
                        opacity: 0,
                        transform: "translateY(8px)",
                      },
                      to: {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2.5,
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{
                            color: "#212121",
                            mb: 0.5,
                            fontSize: "1rem",
                            lineHeight: 1.5,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {task.title}
                        </Typography>
                        {task.description && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#757575",
                              mb: 1,
                              fontSize: "0.875rem",
                              lineHeight: 1.5,
                            }}
                          >
                            {task.description}
                          </Typography>
                        )}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            mt: 2,
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip
                            label={task.priority}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                              backgroundColor: getPriorityColors(task.priority)
                                .backgroundColor,
                              color: getPriorityColors(task.priority).color,
                              fontWeight: 500,
                              borderRadius: 1.5,
                              border: `1px solid ${getPriorityColors(task.priority).borderColor}`,
                              textTransform: "capitalize",
                            }}
                          />
                          <Box
                            sx={{
                              width: "1px",
                              height: "14px",
                              backgroundColor: "#212121",
                              opacity: 0.15,
                            }}
                          />
                          <Chip
                            label={task.status.replace("_", " ")}
                            size="small"
                            sx={{
                              height: 24,
                              fontSize: "0.75rem",
                              backgroundColor: getStatusColors(task.status)
                                .backgroundColor,
                              color: getStatusColors(task.status).color,
                              fontWeight: 500,
                              borderRadius: 1.5,
                              border: `1px solid ${getStatusColors(task.status).borderColor}`,
                              position: "relative",
                              textTransform: "capitalize",
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#9E9E9E",
                              ml: "auto",
                              fontSize: "0.8125rem",
                              fontWeight: 400,
                            }}
                          >
                            {formatDueDate(task.updated_at)}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEditTask(task)}
                        sx={{
                          color: "#757575",
                          mt: 0.5,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.06)",
                            color: "#212121",
                          },
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>

      {/* Create Task Modal */}
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: 3,
            width: "90%",
            maxWidth: 500,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            outline: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 3,
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#212121",
              }}
            >
              {editingTask ? "Edit Task" : "Create New Task"}
            </Typography>
            <IconButton
              onClick={handleCloseCreateModal}
              sx={{
                color: "#757575",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField
                label="Task Title"
                fullWidth
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#212121",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#212121",
                  },
                }}
              />

              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#212121",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#212121",
                  },
                }}
              />

              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#212121",
                    },
                  }}
                >
                  Priority
                </InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                  label="Priority"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#212121",
                    },
                  }}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#212121",
                    },
                  }}
                >
                  Status
                </InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  label="Status"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#BDBDBD",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#212121",
                    },
                  }}
                >
                  <MenuItem value="backlog">Backlog</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="review">Review</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 3,
              borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleCloseCreateModal}
              sx={{
                color: "#757575",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveTask}
              variant="contained"
              disabled={creating || !formData.title.trim()}
              sx={{
                backgroundColor: "#212121",
                color: "#FFFFFF",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  backgroundColor: "#424242",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E0E0E0",
                  color: "#9E9E9E",
                },
              }}
            >
              {creating
                ? editingTask
                  ? "Saving..."
                  : "Creating..."
                : editingTask
                  ? "Save Changes"
                  : "Create Task"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
