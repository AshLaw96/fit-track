import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container text-center">
        <p
          className="mb-2"
          style={{
            fontFamily: "Roboto, sans-serif",
            color: "var(--text-color)",
          }}
        >
          &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
        </p>
        <div>
          <a href="#" className="text-dark mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-dark mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-dark mx-2">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
