import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer py-4 mt-auto">
      <div className="container text-center">
        <p className="footer-text mb-2">
          &copy; {new Date().getFullYear()} FitTrack. All rights reserved.
        </p>
        <div className="footer-icons">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-square-facebook"></i>
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="X (Twitter)"
          >
            <i className="fa-brands fa-square-x-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-square-instagram"></i>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-square-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
