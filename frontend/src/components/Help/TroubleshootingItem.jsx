import React, { useState } from "react";

const TroubleshootingItem = ({ issue, solution }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card p-3 mb-3">
      <button
        className="d-flex justify-content-between align-items-center w-100 text-start"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        <span className="me-3 fw-semibold">{issue}</span>
        <i className={`fas fa-chevron-${isOpen ? "up" : "down"} ms-2`}></i>
      </button>
      {isOpen && <p className="mt-3 mb-0">{solution}</p>}
    </div>
  );
};

export default TroubleshootingItem;
