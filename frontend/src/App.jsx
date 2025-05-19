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
import AuthPage from "./components/AuthPage";
import AutoScrollUp from "./components/AutoScrollUp";
import PasswordResetForm from "./components/PasswordResetForm";
import PasswordResetConfirmForm from "./components/PasswordResetConfirmForm";
import api from "./utils/api";

const App = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchAllData = useCallback(async () => {
    try {
      const res = await api.get("/dashboard/");
      console.log("Fetched dashboard data:", res.data); // inside try block
      setDashboardData(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

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
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<PasswordResetForm />} />
          <Route
            path="/reset-password-confirm/:uid/:token"
            element={<PasswordResetConfirmForm />}
          />
          <Route
            path="*"
            element={<div className="text-center p-4">404 - Page Not Found</div>}
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
