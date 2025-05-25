import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import tutorialsData from "./TutorialsData";
import TutorialItem from "./TutorialItem";

const Tutorials = () => {
  const [search, setSearch] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(tutorialsData, {
      keys: ["title", "content"],
      threshold: 0.35,
    });
  }, []);

  const filteredTutorials = search
    ? fuse.search(search).map((result) => result.item)
    : tutorialsData;

  return (
    <div className="custom-wrap">
      <h3 className="custom-heading">Tutorials & Guides</h3>

      <input
        type="text"
        placeholder="Search tutorials..."
        className="form-control mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTutorials.length > 0 ? (
        filteredTutorials.map((tutorial, index) => (
          <TutorialItem key={index} title={tutorial.title} content={tutorial.content} />
        ))
      ) : (
        <div className="card text-center">
          <p className="mb-0">No matching tutorials found.</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link to="/help" className="btn btn-outline-secondary mb-4">
          ← Back to Help page
        </Link>
      </div>
    </div>
  );
};

export default Tutorials;
