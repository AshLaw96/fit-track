import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Trophy, PlusCircle, Users, Flame, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";

const ChallengesMotivation = ({ data, refreshData }) => {
  const [challengeData, setChallengeData] = useState({
    active: null,
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
      const [activeRes, availableRes, joinedRes] = await Promise.all([
        api.get("/user_challenges/active/"),
        api.get("/challenges/public/"),
        api.get("/user_challenges/"),
      ]);

      const active = Array.isArray(activeRes.data) ? activeRes.data : [];
      const available = availableRes.data || [];
      const joined = Array.isArray(joinedRes.data) ? joinedRes.data : [];
      const joinedIds = joined.map((uc) => uc.challenge);

      let leaderboard = [];
      if (active?.challenge) {
        const res = await api.get(
          `/user_challenges/leaderboard/${active.challenge}/`
        );
        leaderboard = res.data || [];
      }

      setChallengeData({ active, available, leaderboard });
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
      const challengePayload = {
        ...newChallenge,
        target_value: parseFloat(newChallenge.target_value),
      };

      await api.post("/challenges/", challengePayload);

      toast.success("🎉 Challenge created and joined!");
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
      toast.error("❌ Failed to create challenge.");
      console.error("Challenge creation error:", error.response?.data || error.message);
      const errMsg =
        error.response?.data?.[Object.keys(error.response.data)[0]]?.[0] ||
        "Failed to create challenge. Check your inputs.";
      alert(errMsg);
    }
  };

  const handleJoin = async (challengeId) => {
    try {
      const res = await api.post("/challenges/public/", { challenge_id: challengeId });
      toast.success("🎉 Joined challenge!");
      if (typeof refreshData === "function") refreshData();
      fetchChallengeData();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.detail ||
        "Error joining challenge.";
      toast.error(`❌ ${msg}`);
    }
  };

  const { active, available, leaderboard } = challengeData;

  console.log("Available challenges:", available);

  return (
    <div className="card p-4 shadow">
      <h4 className="mb-4 flex items-center gap-2">
        <Trophy className="text-warning" size={20} /> Challenges & Motivation
      </h4>

      {loading ? (
        <div className="text-muted">Loading challenge data...</div>
      ) : (
        <>
          {/* Active Challenge */}
          <div className="mb-4">
            <strong className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={18} /> Active Challenge:
            </strong>
            {active.length > 0 ? (
              active.map((c, i) => (
                <div key={i} className="mb-3">
                  <p className="fw-semibold">{c.challenge?.title}</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${(c.progress / c.target) * 100}%` }}
                    >
                      {((c.progress / c.target) * 100).toFixed(1)}%
                    </div>
                  </div>
                  {c.progress >= c.target && (
                    <div className="text-success mt-2">✅ Challenge Completed! +1 point</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-muted">No active challenge joined.</div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="mb-4">
            <strong className="flex items-center gap-2">
              <Users className="text-success" size={18} /> Leaderboard:
            </strong>
            {leaderboard.length > 0 ? (
              <ul className="mt-2">
                {leaderboard.map((entry, i) => (
                  <li key={i}>
                    {i + 1}. {entry.user} - {((entry.progress / entry.target) * 100).toFixed(1)}%
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-muted">Leaderboard not available.</div>
            )}
          </div>

          {/* Available Challenges */}
          <div className="mb-4">
            <strong className="flex items-center gap-2">
              <Flame className="text-danger" size={18} /> Available Challenges:
            </strong>
            {available.length > 0 ? (
              <ul className="mt-2">
                {available.map((c, i) => (
                  <li key={i} className="mb-1">
                    {c.title}
                    <button
                      className="btn btn-sm btn-outline-primary ms-2"
                      onClick={() => handleJoin(c.id)}
                      disabled={joinedChallengeIds.includes(c.id) || active.length > 0}
                    >
                      {joinedChallengeIds.includes(c.id)
                        ? "Already Joined"
                        : active.length > 0
                          ? "Only 1 Active Allowed"
                          : "Join"}
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
            <strong className="flex items-center gap-2 mb-2">
              <PlusCircle className="text-info" size={18} /> Create a New Challenge:
            </strong>
            <form onSubmit={handleCreateChallenge}>
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
