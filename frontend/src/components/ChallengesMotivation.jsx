import React from "react";

const ChallengesMotivation = ({ data }) => {
  const { current, leaderboard, available } = data || {};

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Challenges & Motivation</h4>
      <div className="mb-3">
        <strong>Current Challenge:</strong>
        <p>{current?.name || "No current challenge"}</p>
        {current && (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${current.progress}%` }}
            >
              {current.progress}%
            </div>
          </div>
        )}
      </div>
      <div className="mb-3">
        <strong>Leaderboard:</strong>
        <ul>
          {leaderboard?.map((entry, i) => (
            <li key={i}>{entry.user}: {entry.progress}%</li>
          )) || <li>No entries</li>}
        </ul>
      </div>
      <div>
        <strong>Available Challenges:</strong>
        <ul>
          {available?.map((c, i) => (
            <li key={i}>{c.name}</li>
          )) || <li>No available challenges</li>}
        </ul>
      </div>
    </div>
  );
};

export default ChallengesMotivation;
