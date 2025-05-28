import React, { useState, useEffect } from "react";
import "../styles/autoScrollUp.css";

const AutoScrollUp = () => {
  const [visible, setVisible] = useState(false);

  // Show button after scrolling down 50px
  const toggleVisibility = () => {
    if (window.scrollY > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const autoUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button className="auto-up" onClick={autoUp} aria-label="Scroll to top" title="Back to top">
        <i className="fas fa-chevron-up"></i>
      </button>
    )
  );
};

export default AutoScrollUp;
