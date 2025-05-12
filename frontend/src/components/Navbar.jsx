import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import "../styles/header.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navbarCollapseRef = useRef();
  const location = useLocation();
  const { isAuthenticated: isLoggedIn } = useAuth();

  // Collapse on route change
  useEffect(() => {
    collapseNavbar();
  }, [location]);

  // Collapse on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarCollapseRef.current &&
        navbarCollapseRef.current.classList.contains("show") &&
        !navbarCollapseRef.current.contains(event.target) &&
        !event.target.classList.contains("navbar-toggler")
      ) {
        collapseNavbar();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const collapseNavbar = () => {
    const collapseElement = navbarCollapseRef.current;
    if (collapseElement && collapseElement.classList.contains("show")) {
      new window.bootstrap.Collapse(collapseElement, {
        toggle: true,
      });
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm py-3 mb-4">
        <div className="container px-3">
          <Link className="navbar-brand header-title" to="/">
            FitTrack
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarLinks"
            aria-controls="navbarLinks"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarLinks"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link header-link" to="/">
                      Dashboard
                      <i className="fa-solid fa-chart-line header-icon"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link header-link"
                      onClick={() => setShowModal(true)}
                      aria-label="Log out"
                    >
                      Logout
                      <i className="fa-solid fa-right-from-bracket header-icon"></i>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link header-link" to="/auth">
                      Login / Register
                      <i className="fa-solid fa-user-plus header-icon"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link header-link" to="/help">
                      Help
                      <i className="fa-solid fa-circle-question header-icon"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <LogoutModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
