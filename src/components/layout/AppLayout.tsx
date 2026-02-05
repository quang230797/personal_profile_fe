import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAFAFA",
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          width: "calc(100% - 280px)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ maxWidth: "1400px", width: "100%", mx: "auto" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
