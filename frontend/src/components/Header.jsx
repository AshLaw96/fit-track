import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const navRef = useRef();

  useEffect(() => {
    const collapseNavbar = () => {
      const collapseElement = document.getElementById("navbarLinks");
      if (collapseElement && collapseElement.classList.contains("show")) {
        new window.bootstrap.Collapse(collapseElement, {
          toggle: true,
        });
      }
    };

    const handleOutsideClick = (event) => {
      if (
        navRef.current &&
        navRef.current.classList.contains("show") &&
        !navRef.current.contains(event.target) &&
        !event.target.classList.contains("navbar-toggler")
      ) {
        collapseNavbar();
      }
    };

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => link.addEventListener("click", collapseNavbar));
    document.addEventListener("click", handleOutsideClick);

    return () => {
      navLinks.forEach((link) =>
        link.removeEventListener("click", collapseNavbar)
      );
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
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

        <div className="collapse navbar-collapse" id="navbarLinks" ref={navRef}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link header-link" to="/auth">
                Login / Register
                <i className="fa-solid fa-user-plus header-icon"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link header-link" to="/">
                Dashboard
                <i className="fa-solid fa-chart-line header-icon"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link header-link" to="/">
                Help
                <i className="fa-solid fa-circle-question header-icon"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
