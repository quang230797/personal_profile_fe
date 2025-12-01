import {
  Dashboard as DashboardIcon,
  Assignment as TaskIcon,
  Note as NoteIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Bolt as BoltIcon,
} from "@mui/icons-material";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/", icon: DashboardIcon },
  { label: "Tasks", path: "/tasks", icon: TaskIcon },
  { label: "Notes", path: "/notes", icon: NoteIcon },
  { label: "Daily Log", path: "/daily-log", icon: CalendarIcon },
  { label: "CV", path: "/cv", icon: PersonIcon },
];

const drawerWidth = 280;

export default function Sidebar() {
  const { pathname } = useLocation();
  const currentPath = pathname;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: "relative",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(226, 232, 240, 0.5)",
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.05)",
          position: "relative",
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: "1px solid rgba(226, 232, 240, 0.5)" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            }}
          >
            <BoltIcon sx={{ color: "white", fontSize: 28 }} />
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Quang's Personal
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        <List>
          {menu.map(({ label, path, icon: Icon }) => {
            const isActive = currentPath === path;

            return (
              <ListItem key={path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    position: "relative",
                    transition: "all 0.2s",
                    ...(isActive
                      ? {
                          background:
                            "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                          },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 4,
                            height: 32,
                            backgroundColor: "white",
                            borderRadius: "0 4px 4px 0",
                          },
                        }
                      : {
                          color: "text.primary",
                          "&:hover": {
                            backgroundColor: alpha("#3b82f6", 0.08),
                            color: "primary.main",
                            transform: "translateX(4px)",
                          },
                        }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "white" : "inherit",
                      transition: "0.2s",
                      ...(isActive && { transform: "scale(1.1)" }),
                    }}
                  >
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.875rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
