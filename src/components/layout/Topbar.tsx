import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Task as TaskIcon,
  Note as NoteIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Typography,
  Divider,
  alpha,
} from "@mui/material";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const userMenuAnchorRef = useRef<HTMLButtonElement>(null);
  const addMenuAnchorRef = useRef<HTMLButtonElement>(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.5)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ gap: 2, px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            flex: 1,
            maxWidth: 600,
            position: "relative",
            transition: "transform 0.3s ease",
            transform: searchFocused ? "scale(1.02)" : "scale(1)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: searchFocused ? "primary.main" : "text.secondary",
              transition: "color 0.2s ease",
              zIndex: 1,
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search tasks, notes, or anything..."
            sx={{
              width: "100%",
              pl: 5,
              pr: 2,
              py: 1.5,
              backgroundColor: "grey.50",
              border: "1px solid",
              borderColor: searchFocused ? "primary.main" : "grey.200",
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "primary.light",
              },
              "&.Mui-focused": {
                borderColor: "primary.main",
                boxShadow: `0 0 0 3px ${alpha("#3b82f6", 0.1)}`,
              },
              "& input::placeholder": {
                color: "text.secondary",
                opacity: 0.7,
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: alpha("#3b82f6", 0.08),
                color: "primary.main",
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Button
            ref={addMenuAnchorRef}
            onClick={() => setOpenAddMenu(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                boxShadow: "0 6px 16px rgba(59, 130, 246, 0.4)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Add
          </Button>
          <Menu
            anchorEl={addMenuAnchorRef.current}
            open={openAddMenu}
            onClose={() => setOpenAddMenu(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 240,
                borderRadius: 2,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem
              component={Link}
              to="/tasks"
              onClick={() => setOpenAddMenu(false)}
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: alpha("#3b82f6", 0.08),
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  backgroundColor: alpha("#3b82f6", 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <TaskIcon sx={{ color: "primary.main", fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  New Task
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Create a new task
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem
              component={Link}
              to="/notes"
              onClick={() => setOpenAddMenu(false)}
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: alpha("#6366f1", 0.08),
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1.5,
                  backgroundColor: alpha("#6366f1", 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <NoteIcon sx={{ color: "secondary.main", fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  New Note
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Write a new note
                </Typography>
              </Box>
            </MenuItem>
          </Menu>

          <IconButton
            ref={userMenuAnchorRef}
            onClick={() => setOpenUserMenu(true)}
            sx={{
              p: 0,
              "&:hover": {
                transform: "scale(1.05)",
              },
              transition: "transform 0.2s ease",
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#10b981",
                  border: "2px solid white",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background:
                    "linear-gradient(135deg, #60a5fa 0%, #6366f1 100%)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                }}
              >
                QN
              </Avatar>
            </Badge>
          </IconButton>
          <Menu
            anchorEl={userMenuAnchorRef.current}
            open={openUserMenu}
            onClose={() => setOpenUserMenu(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 240,
                borderRadius: 2,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                background: "linear-gradient(135deg, #e0e7ff 0%, #dbeafe 100%)",
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                Quang Nguyen
              </Typography>
              <Typography variant="caption" color="text.secondary">
                quang230797@gmail.com
              </Typography>
            </Box>
            <MenuItem
              component={Link}
              to="/cv"
              onClick={() => setOpenUserMenu(false)}
              sx={{
                py: 1.5,
                "&:hover": {
                  backgroundColor: alpha("#3b82f6", 0.08),
                },
              }}
            >
              <PersonIcon
                sx={{ mr: 2, fontSize: 20, color: "text.secondary" }}
              />
              <Typography variant="body2">My Profile</Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                alert("Logout action");
                setOpenUserMenu(false);
              }}
              sx={{
                py: 1.5,
                color: "error.main",
                "&:hover": {
                  backgroundColor: alpha("#ef4444", 0.08),
                },
              }}
            >
              <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
