import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dash/Dashboard";
import ExerciseLogPage from "./components/Exercises/ExerciseLogPage";
import MealLogPage from "./components/Meals/MealLogPage";
import SleepLogPage from "./components/Sleep/SleepLogPage";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./components/Auth/AuthPage";
import AutoScrollUp from "./components/AutoScrollUp";
import PasswordResetForm from "./components/Auth/PasswordResetForm";
import PasswordResetConfirmForm from "./components/Auth/PasswordResetConfirmForm";
import api from "./utils/api";
import { useAuth } from "./contexts/AuthContext";
import NotFound from "./components/NotFound";
import Goodbye from "./components/Profile/Goodbye";
import SettingsPage from "./components/Settings/SettingsPage";
import NotificationBell from "./components/NotificationBell";
import FAQ from "./components/Help/FAQ";
import HelpPage from "./components/Help/HelpPage";
import Troubleshooting from "./components/Help/Troubleshooting";
import ContactSupport from "./components/Help/ContactSupport";
import Tutorials from "./components/Help/Tutorials";
import ChatWidget from "./components/Help/ChatWidget";

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
        <NotificationBell />
        <ChatWidget />
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
          <Route
            path="/help"
            element={<HelpPage />}
          />
          <Route
            path="/help/faq"
            element={<FAQ />}
          />
          <Route
            path="/help/troubleshooting"
            element={<Troubleshooting />}
          />
          <Route
            path="/help/contact"
            element={<ContactSupport />}
          />
          <Route
            path="/help/tutorials"
            element={<Tutorials />}
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
