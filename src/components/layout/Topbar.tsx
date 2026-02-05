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
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
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
              backgroundColor: "#FAFAFA",
              border: "1px solid",
              borderColor: searchFocused ? "#212121" : "#E0E0E0",
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: "#BDBDBD",
              },
              "&.Mui-focused": {
                borderColor: "#212121",
                boxShadow: "0 0 0 3px rgba(33, 33, 33, 0.1)",
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
              color: "#757575",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                color: "#212121",
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
              backgroundColor: "#212121",
              color: "#FFFFFF",
              boxShadow: "0 2px 8px rgba(33, 33, 33, 0.15)",
              "&:hover": {
                backgroundColor: "#424242",
                boxShadow: "0 4px 12px rgba(33, 33, 33, 0.2)",
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
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
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
                  mr: 2,
                }}
              >
                <TaskIcon sx={{ color: "#212121", fontSize: 20 }} />
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
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
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
                  mr: 2,
                }}
              >
                <NoteIcon sx={{ color: "#212121", fontSize: 20 }} />
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
                  backgroundColor: "#212121",
                  border: "2px solid white",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#212121",
                  boxShadow: "0 2px 8px rgba(33, 33, 33, 0.15)",
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
                backgroundColor: "#FAFAFA",
                borderBottom: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.06)",
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
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <PersonIcon sx={{ mr: 2, fontSize: 20, color: "#757575" }} />
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
                color: "#C62828",
                "&:hover": {
                  backgroundColor: "rgba(198, 40, 40, 0.08)",
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
