import { Outlet } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import "./App.css";

function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default App;
