import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../styles/auth.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("session_expired")) {
      setSessionExpired(true);
      localStorage.removeItem("session_expired");
    }
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="auth-form-wrapper auth-card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        {sessionExpired && (
          <div className="alert alert-warning text-center" role="alert">
            Your session has expired. Please log in again.
          </div>
        )}
        {isLogin ? (
          <>
            <LoginForm onSuccess={() => console.log("Logged in")} />
            <p className="mt-3 text-center">
              Don't have an account?{" "}
              <button className="btn btn-link p-0" onClick={() => setIsLogin(false)}>
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <button className="btn btn-link p-0" onClick={() => setIsLogin(true)}>
                Log in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
