import {
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { dailyLogsApi, type DailyLog } from "../../services/api";

function formatDate(dateString: string | null): string {
  if (!dateString) return "Other";
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

export default function DailyLogPage() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await dailyLogsApi.getAll();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch daily logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const groupedLogs = logs.reduce(
    (acc, log) => {
      const date = formatDate(log.log_date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(log);
      return acc;
    },
    {} as Record<string, DailyLog[]>,
  );

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
            Daily Log
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track your daily activities and progress
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#212121",
            color: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(33, 33, 33, 0.15)",
            "&:hover": {
              backgroundColor: "#424242",
              boxShadow: "0 4px 12px rgba(33, 33, 33, 0.2)",
            },
          }}
        >
          Add Log
        </Button>
      </Stack>

      <Stack spacing={4}>
        {Object.entries(groupedLogs).map(([date, dateLogs]) => (
          <Box key={date}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CalendarIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              <Typography variant="h6" fontWeight={600} color="text.secondary">
                {date}
              </Typography>
            </Box>
            <Stack spacing={2}>
              {dateLogs.map((log) => (
                <Card
                  key={log.id}
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <AccessTimeIcon sx={{ color: "#212121" }} />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 1,
                          }}
                        >
                          <Chip
                            label={log.time}
                            size="small"
                            sx={{
                              backgroundColor: "#F5F5F5",
                              color: "#212121",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        <Typography variant="body1" color="text.primary">
                          {log.content}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && logs.length === 0 && (
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
                  backgroundColor: "#F5F5F5",
                  mb: 2,
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 32, color: "#212121" }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                No logs yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Start tracking your daily activities
              </Typography>
              <Button variant="contained" startIcon={<AddIcon />}>
                Add Log
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
