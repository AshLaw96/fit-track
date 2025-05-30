import React, { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import TutorialItem from "./TutorialItem";
import tutorialsData from "./TutorialsData";

const Tutorials = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(tutorialsData, {
        keys: ["title", "content"],
        threshold: 0.35,
        includeMatches: true,
      }),
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const filteredTutorials = useMemo(() => {
    if (!debouncedSearch) return tutorialsData;
    return fuse.search(debouncedSearch).map((res) => ({
      ...res.item,
      matches: res.matches,
    }));
  }, [debouncedSearch, fuse]);

  return (
    <div className="custom-wrap">
      <h3 className="custom-heading mb-3 page-title">Tutorials & Guides</h3>

      <input
        type="text"
        placeholder="Search tutorials..."
        className="form-control form-control-lg mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTutorials.length > 0 ? (
        filteredTutorials.map((tutorial, index) => (
          <TutorialItem
            key={index}
            title={tutorial.title}
            content={tutorial.content}
            matches={tutorial.matches}
          />
        ))
      ) : (
        <div className="card p-3 text-center">
          <p className="mb-0">No matching tutorials found.</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link to="/help" className="btn btn-outline-secondary mt-2">
          ← Back to Help Page
        </Link>
      </div>
    </div>
  );
};

export default Tutorials;
