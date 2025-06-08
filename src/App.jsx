import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import TaskList from "./components/TaskList";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AccountPage from "./pages/AccountPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <TaskList />
              </>
            </ProtectedRoute>
          }
        />
      <Route
        path="/conta"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <AccountPage />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  );
}
