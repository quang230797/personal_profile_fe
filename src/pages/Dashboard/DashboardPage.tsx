import {
  Task as TaskIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { Box, Typography, Card, CardContent, Chip } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here's what's happening today.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <DashboardCard
          title="Tasks Today"
          value="12"
          icon={<TaskIcon />}
          color="primary"
          trend="+2 from yesterday"
        />
        <DashboardCard
          title="Overdue Tasks"
          value="3"
          icon={<WarningIcon />}
          color="error"
          trend="2 urgent"
        />
        <DashboardCard
          title="Completed This Week"
          value="28"
          icon={<CheckCircleIcon />}
          color="success"
          trend="+15% from last week"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
          gap: 3,
        }}
      >
        <ChartCard
          title="Mood Trend"
          subtitle="Your mood over the past 7 days"
          icon={<TrendingUpIcon />}
        />
        <ChartCard
          title="Task Priority Distribution"
          subtitle="Breakdown by priority level"
          icon={<TaskIcon />}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Recent Activity
        </Typography>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                {
                  action: "Completed task",
                  item: "Finish UI design",
                  time: "2 hours ago",
                },
                {
                  action: "Created note",
                  item: "Project ideas",
                  time: "5 hours ago",
                },
                {
                  action: "Updated task",
                  item: "Write documentation",
                  time: "1 day ago",
                },
              ].map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: 1,
                    borderBottom: index < 2 ? "1px solid" : "none",
                    borderColor: "divider",
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1.5,
                      backgroundColor: "#F5F5F5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TaskIcon sx={{ color: "#212121", fontSize: 20 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {activity.action}: {activity.item}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

function DashboardCard({
  title,
  value,
  icon,
  color = "primary",
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: "primary" | "error" | "success" | "warning";
  trend?: string;
}) {
  const colorMap = {
    primary: "#212121",
    error: "#C62828",
    success: "#2E7D32",
    warning: "#F57C00",
  };

  return (
    <Card
      sx={{
        height: "100%",
        position: "relative",
        overflow: "visible",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${colorMap[color]} 0%, ${colorMap[color]}80 100%)`,
          borderRadius: "16px 16px 0 0",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: `${colorMap[color]}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Box sx={{ color: colorMap[color] }}>{icon}</Box>
          </Box>
        </Box>
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        {trend && (
          <Chip
            label={trend}
            size="small"
            sx={{
              height: 20,
              fontSize: "0.7rem",
              backgroundColor: `${colorMap[color]}10`,
              color: colorMap[color],
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

function ChartCard({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: "#F5F5F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ color: "#212121" }}>{icon}</Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey.50",
            borderRadius: 2,
            border: "2px dashed",
            borderColor: "grey.300",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Chart visualization will be here
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
