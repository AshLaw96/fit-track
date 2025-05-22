import React from "react";
import { Link } from "react-router-dom";
import "../styles/ErrorPages.css";

const NotFound = () => (
  <div className="container error-container">
    <h1 className="error-heading error-404-heading">
      <i class="fa-solid fa-magnifying-glass"></i> 404 - Page Not Found
    </h1>
    <p className="error-message">
      Sorry, we can't find the page you're looking for. Maybe check your URL or head back home to track your fitness journey!
    </p>
    <Link to="/" className="btn btn-secondary btn-return-home">
      Return Home
    </Link>
  </div>
);

export default NotFound;
