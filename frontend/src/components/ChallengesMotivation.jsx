import React, { useState, useEffect } from "react";
import api from "../utils/api";

const ChallengesMotivation = ({ data, refreshData }) => {
  const [challengeData, setChallengeData] = useState({
    current: null,
    available: [],
    leaderboard: [],
  });

  const [joinedChallengeIds, setJoinedChallengeIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    metric: "steps",
    target_value: "",
    start_date: "",
    end_date: "",
    is_public: false,
  });

  const fetchChallengeData = async () => {
    try {
      setLoading(true);

      const [currentRes, availableRes, joinedRes] = await Promise.all([
        api.get("/user_challenges/current/"),
        api.get("/challenges/public/"),
        api.get("/user_challenges/"),
      ]);

      const current = currentRes.data || null;
      const available = availableRes.data || [];
      const joined = Array.isArray(joinedRes.data) ? joinedRes.data : [];

      const joinedIds = joined.map((uc) => uc.challenge);

      let leaderboard = [];
      if (current?.challenge) {
        const res = await api.get(
          `/user_challenges/leaderboard/${current.challenge}/`
        );
        leaderboard = res.data || [];
      }

      setChallengeData({ current, available, leaderboard });
      setJoinedChallengeIds(joinedIds);
    } catch (err) {
      console.error("Error fetching challenges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallengeData();
  }, []);

  const handleChange = (e) => {
    setNewChallenge({ ...newChallenge, [e.target.name]: e.target.value });
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/challenges/", newChallenge);
      const challengeId = res.data.id;

      await api.post("/user_challenges/", { challenge: challengeId });

      alert("Challenge created and joined!");
      setNewChallenge({
        title: "",
        description: "",
        metric: "steps",
        target_value: "",
        start_date: "",
        end_date: "",
        is_public: false,
      });

      if (typeof refreshData === "function") refreshData();
      fetchChallengeData();
    } catch (error) {
      console.error(error);
      alert("Failed to create challenge.");
    }
  };

  const handleJoin = async (challengeId) => {
    try {
      await api.post("/user_challenges/", { challenge: challengeId });
      alert("Joined challenge!");
      if (typeof refreshData === "function") refreshData();
      fetchChallengeData();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.non_field_errors?.[0] ||
        "Already joined or unknown error.";
      alert(msg);
    }
  };

  const { current, available, leaderboard } = challengeData;

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Challenges & Motivation</h4>

      {loading ? (
        <div className="text-muted">Loading challenge data...</div>
      ) : (
        <>
          {/* Current Challenge */}
          <div className="mb-3">
            <strong>Current Challenge:</strong>
            {current ? (
              <>
                <p>{current.challenge?.title || "Unknown"}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(current.progress / current.target) * 100}%` }}
                  >
                    {((current.progress / current.target) * 100).toFixed(1)}%
                  </div>
                </div>
              </>
            ) : (
              <div className="text-muted">No current challenge joined.</div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="mb-3">
            <strong>Leaderboard:</strong>
            {leaderboard.length > 0 ? (
              <ul>
                {leaderboard.map((entry, i) => (
                  <li key={i}>
                    {entry.user}:{" "}
                    {entry.target > 0
                      ? `${((entry.progress / entry.target) * 100).toFixed(1)}%`
                      : "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">Leaderboard not available.</div>
            )}
          </div>

          {/* Available Challenges */}
          <div className="mb-3">
            <strong>Available Challenges:</strong>
            {available.length > 0 ? (
              <ul>
                {available.map((c, i) => (
                  <li key={i}>
                    {c.title}{" "}
                    <button
                      className="btn btn-sm btn-outline-primary ms-2"
                      onClick={() => handleJoin(c.id)}
                      disabled={joinedChallengeIds.includes(c.id)}
                    >
                      {joinedChallengeIds.includes(c.id) ? "Already Joined" : "Join"}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">No challenges available to join.</div>
            )}
          </div>

          <hr />

          {/* Create Challenge */}
          <div>
            <strong>Create a New Challenge:</strong>
            <form onSubmit={handleCreateChallenge} className="mt-2">
              <input
                type="text"
                name="title"
                value={newChallenge.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="form-control mb-2"
              />
              <textarea
                name="description"
                value={newChallenge.description}
                onChange={handleChange}
                placeholder="Description"
                className="form-control mb-2"
              />
              <input
                type="text"
                name="metric"
                value={newChallenge.metric}
                onChange={handleChange}
                placeholder="Metric (e.g., steps)"
                className="form-control mb-2"
              />
              <input
                type="number"
                name="target_value"
                value={newChallenge.target_value}
                onChange={handleChange}
                placeholder="Target Value"
                className="form-control mb-2"
                required
              />
              <input
                type="date"
                name="start_date"
                value={newChallenge.start_date}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <input
                type="date"
                name="end_date"
                value={newChallenge.end_date}
                onChange={handleChange}
                className="form-control mb-2"
                required
              />
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="is_public"
                  checked={newChallenge.is_public}
                  onChange={(e) =>
                    setNewChallenge({
                      ...newChallenge,
                      is_public: e.target.checked,
                    })
                  }
                  id="publicChallenge"
                />
                <label className="form-check-label" htmlFor="publicChallenge">
                  Make challenge available to others
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Challenge
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChallengesMotivation;
