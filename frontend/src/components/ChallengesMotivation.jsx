import React from "react";

const ChallengesMotivation = ({ data }) => {
  const { current, leaderboard = [], available = [] } = data || {};

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Challenges & Motivation</h4>

      <div className="mb-3">
        <strong>Current Challenge:</strong>
        {current ? (
          <>
            <p>{current.name}</p>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${current.progress}%` }}
              >
                {current.progress}%
              </div>
            </div>
          </>
        ) : (
          <div className="text-muted">No current challenge joined.</div>
        )}
      </div>

      <div className="mb-3">
        <strong>Leaderboard:</strong>
        {leaderboard.length > 0 ? (
          <ul>
            {leaderboard.map((entry, i) => (
              <li key={i}>{entry.user}: {entry.progress}%</li>
            ))}
          </ul>
        ) : (
          <div className="text-muted">Leaderboard not available.</div>
        )}
      </div>

      <div>
        <strong>Available Challenges:</strong>
        {available.length > 0 ? (
          <ul>
            {available.map((c, i) => (
              <li key={i}>{c.name}</li>
            ))}
          </ul>
        ) : (
          <div className="text-muted">No challenges available.</div>
        )}
      </div>
    </div>
  );
};

export default ChallengesMotivation;
