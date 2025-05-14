import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import ExerciseLogPage from "./components/ExerciseLogPage";
import AuthPage from "./components/AuthPage";
import AutoScrollUp from "./components/AutoScrollUp";
import PasswordResetForm from "./components/PasswordResetForm";
import PasswordResetConfirmForm from "./components/PasswordResetConfirmForm";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<ExerciseLogPage />} />
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
