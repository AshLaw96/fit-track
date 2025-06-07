import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../../styles/auth.css";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("session_expired")) {
      toast.warn("Your session has expired. Please log in again.");
      localStorage.removeItem("session_expired");
    }
  }, []);

  return (
    <main role="main" className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="auth-form-wrapper auth-card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
       
        {isLogin ? (
          <>
            <LoginForm />
            <p className="mt-3 text-center">
              Don't have an account?{" "}
              <button className="btn btn-link p-0 fw-bold" onClick={() => setIsLogin(false)}>
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <button className="btn btn-link p-0 fw-bold" onClick={() => setIsLogin(true)}>
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default AuthPage;
