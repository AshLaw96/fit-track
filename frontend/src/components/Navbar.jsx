import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutModal from "./Auth/LogoutModal";
import "../styles/header.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navbarCollapseRef = useRef(null);
  const bsCollapseInstance = useRef(null); // store bootstrap collapse instance here
  const location = useLocation();
  const { isAuthenticated: isLoggedIn } = useAuth();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // Initialize Bootstrap collapse instance once
    if (navbarCollapseRef.current && !bsCollapseInstance.current) {
      bsCollapseInstance.current = new window.bootstrap.Collapse(navbarCollapseRef.current, {
        toggle: false,
      });
    }
  }, []);

  // Collapse navbar on route change
  useEffect(() => {
    if (bsCollapseInstance.current) {
      bsCollapseInstance.current.hide();
    }
  }, [location]);

  // Collapse navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarCollapseRef.current &&
        navbarCollapseRef.current.classList.contains("show") &&
        !navbarCollapseRef.current.contains(event.target) &&
        !event.target.classList.contains("navbar-toggler")
      ) {
        bsCollapseInstance.current.hide();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-md shadow-sm py-3 mb-4">
        <div className="container-fluid px-md-4 px-3">
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
            className="collapse navbar-collapse justify-content-end"
            id="navbarLinks"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link header-link ${isActive("/") ?
                      "active-link" : ""}`} to="/">
                      Dashboard
                      <i className="fa-solid fa-chart-line header-icon"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link header-link ${isActive("/exercises") ? "active-link" : ""}`}
                      to="/exercises"
                    >
                      Exercise Log
                      <i className="fa-solid fa-dumbbell header-icon"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link header-link ${isActive("/meals") ?
                      "active-link" : ""}`} to="/meals">
                      Meal Log
                      <i className="fa-solid fa-utensils header-icon"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link header-link ${isActive("/sleep") ?
                      "active-link" : ""}`} to="/sleep">
                      Sleep Log
                      <i className="fa-solid fa-bed header-icon"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link header-link ${isActive("/profile") ?
                      "active-link" : ""}`} to="/profile">
                      Profile
                      <i className="fa-solid fa-user header-icon"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link header-link ${isActive("/settings") ? 
                      "active-link" : ""}`} to="/settings">
                      Settings
                      <i className="fa-solid fa-cog header-icon"></i>
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
                <li className="nav-item">
                  <Link className={`nav-link header-link ${isActive("/auth") ?
                    "active-link" : ""}`} to="/auth">
                    Login / Register
                    <i className="fa-solid fa-user-plus header-icon"></i>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className={`nav-link header-link ${isActive("/help") ?
                  "active-link" : ""}`} to="/help">
                  Help
                  <i className="fa-solid fa-circle-question header-icon"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <LogoutModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
