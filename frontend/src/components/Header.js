import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1
          className="m-0"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "var(--primary-color)",
          }}
        >
          FitTrack
        </h1>
        <nav>
          <Link className="mx-2 text-decoration-none text-dark" to="/">
            Login/Register
          </Link>
          <Link className="mx-2 text-decoration-none text-dark" to="/">
            Dashboard
          </Link>
          <Link className="mx-2 text-decoration-none text-dark" to="/">
            Help
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
