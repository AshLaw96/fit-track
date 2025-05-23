import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import ExerciseLogPage from "./components/ExerciseLogPage";
import MealLogPage from "./components/MealLogPage";
import SleepLogPage from "./components/SleepLogPage";
import UserProfile from "./components/UserProfile";
import AuthPage from "./components/AuthPage";
import AutoScrollUp from "./components/AutoScrollUp";
import PasswordResetForm from "./components/PasswordResetForm";
import PasswordResetConfirmForm from "./components/PasswordResetConfirmForm";
import api from "./utils/api";
import { useAuth } from "./contexts/AuthContext";
import NotFound from "./components/NotFound";
import Goodbye from "./components/Goodbye";
import SettingsPage from "./components/SettingsPage";


const App = () => {
  const { isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  const fetchAllData = useCallback(async () => {
    try {
      const res = await api.get("/dashboard/");
      setDashboardData(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated, fetchAllData]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard dashboardData={dashboardData} fetchAllData={fetchAllData} />
            }
          />
          <Route
            path="/exercises"
            element={<ExerciseLogPage onDataChanged={fetchAllData} />}
          />
          <Route
            path="/meals"
            element={<MealLogPage onDataChanged={fetchAllData} />}
          />
          <Route
            path="/sleep"
            element={<SleepLogPage onDataChanged={fetchAllData} />}
          />
          <Route
            path="/profile"
            element={<UserProfile onDataChanged={fetchAllData} />}
          />
          <Route
            path="/settings"
            element={<SettingsPage />}
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<PasswordResetForm />} />
          <Route
            path="/reset-password-confirm/:uid/:token"
            element={<PasswordResetConfirmForm />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
          <Route
            path="/goodbye"
            element={<Goodbye />}
          />
        </Routes>
      </main>
      <Footer />
      <AutoScrollUp />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
