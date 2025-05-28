import React from "react";

// Highlight helper
const highlightMatch = (text, matches, key) => {
  const match = matches?.find((m) => m.key === key);
  if (!match || !match.indices.length) return text;

  const segments = [];
  let lastIndex = 0;

  match.indices.forEach(([start, end], i) => {
    segments.push(text.slice(lastIndex, start));
    segments.push(
      <mark key={i} className="bg-warning px-1">
        {text.slice(start, end + 1)}
      </mark>
    );
    lastIndex = end + 1;
  });

  segments.push(text.slice(lastIndex));
  return segments;
};

const TutorialItem = ({ title, content, matches }) => {
  return (
    <details className="card p-3 mb-3">
      <summary className="fw-semibold d-flex justify-content-between align-items-center">
        <span>{highlightMatch(title, matches, "title")}</span>
        <i className="fas fa-chevron-down ms-2"></i>
      </summary>
      <p className="mt-3 mb-0">{highlightMatch(content, matches, "content")}</p>
    </details>
  );
};

export default TutorialItem;
