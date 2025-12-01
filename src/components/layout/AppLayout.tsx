import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e8f0f8 50%, #e0e7ff 100%)",
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
        <Topbar />
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
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
