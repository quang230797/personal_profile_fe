import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import CVPage from "../pages/Cv";
import DailyLogPage from "../pages/DailyLog/DailyLogPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import NotePage from "../pages/Notes/NotePage";
import TaskPage from "../pages/Tasks/TaskPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DashboardPage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="notes" element={<NotePage />} />
          <Route path="daily-log" element={<DailyLogPage />} />
          <Route path="cv" element={<CVPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
