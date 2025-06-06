import React from "react";
import { Link } from "react-router-dom";

const Goodbye = () => (
  <main className="text-center mt-5 custom-wrap" role="main">
    <h2>Your FitTrack journey has been removed 💔</h2>
    <p>We're sorry to see you go. Take care, and stay healthy!</p>
    <Link to="/" className="btn btn-primary mt-3">
      Return to dashboard
    </Link>
  </main>
);

export default Goodbye;
