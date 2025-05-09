import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";
import AutoScrollUp from "./components/AutoScrollUp";
import PasswordResetForm from "./components/PasswordResetForm";
import PasswordResetConfirmForm from "./components/PasswordResetConfirmForm";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<PasswordResetForm />} />
            <Route path="/reset-password-confirm/:uid/:token" element={<PasswordResetConfirmForm />} />
          </Routes>
        </main>
        <Footer />
        <AutoScrollUp />
      </div>
    </Router>
  );
};

export default App;
