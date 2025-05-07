import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4 text-primary fw-bold">FitTrack</h1>
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        {isLogin ? (
          <>
            <LoginForm onSuccess={() => console.log("Logged in")} />
            <p className="mt-3 text-center">
              Don’t have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setIsLogin(true)}
              >
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
