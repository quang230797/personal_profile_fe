import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import AuthLayout from "../components/layout/authLayout";
import SignIn from "../pages/auth/signIn";
import SignUp from "../pages/auth/signUp";
import CVPage from "../pages/Cv";
import DailyLogPage from "../pages/DailyLog/DailyLogPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import NotePage from "../pages/Notes/NotePage";
import TaskPage from "../pages/Tasks/TaskPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="notes" element={<NotePage />} />
          <Route path="daily-log" element={<DailyLogPage />} />
          <Route path="cv" element={<CVPage />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="sign_in" element={<SignIn />} />
          <Route path="sign_up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
