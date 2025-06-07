import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Trophy, PlusCircle, Users, Flame, TrendingUp } from "lucide-react";
import { toast } from "react-toastify";

const ChallengesMotivation = ({ data, refreshData }) => {
  const [challengeData, setChallengeData] = useState({
    active: [],
    available: [],
    leaderboard: [],
  });
  const [joinedChallengeIds, setJoinedChallengeIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedChallengeId, setExpandedChallengeId] = useState(null);
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
      setChallengeData({ active: [], available: [], leaderboard: [] });

      const [activeRes, availableRes, joinedRes] = await Promise.all([
        api.get("/user_challenges/active/"),
        api.get("/challenges/public/"),
        api.get("/user_challenges/"),
      ]);

      const today = new Date();
      const active = activeRes.data.results
        .map((uc) => {
          const endDate = uc.end_date ? new Date(uc.end_date) : null;
          const completed = uc.completed || uc.progress >= (uc.target_value || 1);
          const failed =
            !completed && endDate && today > endDate;

          return {
            id: uc.id,
            challengeId: uc.challenge_id || uc.challenge,
            title: uc.title || "Untitled",
            description: uc.description || "",
            metric: uc.metric || "",
            target_value: uc.target_value || 1,
            progress: uc.progress ?? 0,
            start_date: uc.start_date || "",
            end_date: uc.end_date || "",
            completed,
            failed,
          };
        })
        // Hide completed or failed
        .filter((c) => !c.completed && !c.failed);

      const available = availableRes.data || [];
      const joined = Array.isArray(joinedRes.data) ? joinedRes.data : [];
      const joinedIds = joined.map((uc) => uc.challenge);

      let leaderboard = [];
      if (active.length > 0) {
        const challengeId = active[0].challengeId;
        try {
          const res = await api.get(`/user_challenges/leaderboard/${challengeId}/`);
          leaderboard = res.data || [];
        } catch (err) {
          console.warn("⚠️ Failed to fetch leaderboard:", err);
        }
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

    if (!newChallenge.target_value || isNaN(parseFloat(newChallenge.target_value))) {
      toast.error("Target value must be a valid number.");
      return;
    }

    const challengePayload = {
      ...newChallenge,
      target_value: parseFloat(newChallenge.target_value),
    };

    try {
      console.log("🔍 challengePayload:", challengePayload);
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
      await api.post("/challenges/public/", { challenge_id: challengeId });
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

  const handleAddProgress = async (challenge) => {
    if (!challenge?.id) {
      console.warn("Challenge id is undefined, cannot add progress.", challenge);
      return;
    }

    try {
      await api.post(`/user_challenges/${challenge.id}/increment_progress/`);
      toast.success(`Progress added to "${challenge.title}"!`);
      // refetch after update
      fetchChallengeData();
    } catch (error) {
      console.error("❌ Error adding progress:", error);
      toast.error("Failed to add progress");
    }
  };

  const toggleExpand = (id) => {
    setExpandedChallengeId((prevId) => (prevId === id ? null : id));
  };

  const { active, available, leaderboard } = challengeData;

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
          <div className="mb-4" id="active-challenge">
            <strong className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={18} /> Active Challenge:
            </strong>
            {active.length > 0 ? (
              active.map((c) => (
                <div key={c.id || `active-challenge-${c.title}-${Math.random()}`} className="mb-3">
                  {/* Clickable title to toggle details */}
                  <p
                    className="fw-semibold cursor-pointer"
                    onClick={() => toggleExpand(c.id)}
                    style={{ userSelect: "none" }}
                    title="Click to view details"
                  >
                    {c.title}
                  </p>

                  {/* Expanded details shown only if this challenge is expanded */}
                  {expandedChallengeId === c.id && (
                    <div className="bg-light p-2 rounded border mb-2">
                      <p><strong>Description:</strong> {c.description || "No description provided."}</p>
                      <p><strong>Metric:</strong> {c.metric || "N/A"}</p>
                      <p><strong>Target:</strong> {c.target_value}</p>
                      <p><strong>Start:</strong> {c.start_date || "N/A"}</p>
                      <p><strong>End:</strong> {c.end_date || "N/A"}</p>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: c.target_value ? `${(c.progress / c.target_value) * 100}%` : "0%" }}
                    >
                      {c.target_value ? ((c.progress / c.target_value) * 100).toFixed(1) : "0"}%
                    </div>
                  </div>
                  <p>
                    {c.progress} / {c.target_value}
                  </p>

                  {/* Add progress button or completion message */}
                  {!c.completed && (
                    <button
                      className="btn btn-sm btn-success mt-2"
                      onClick={() => handleAddProgress(c)}
                    >
                      + Add Progress
                    </button>
                  )}
                  {c.completed && (
                    <div className="text-success mt-2">✅ Challenge Completed! +1 point</div>
                  )}
                  {c.failed && (
                    <div className="text-danger mt-2">❌ Challenge Failed (End Date Passed)</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-muted">No active challenge joined.</div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="mb-4" id="leaderboard">
            <strong className="flex items-center gap-2">
              <Users className="text-success" size={18} /> Leaderboard:
            </strong>
            {leaderboard.length > 0 ? (
              <ul className="mt-2">
                {leaderboard.map((entry, i) => (
                  <li key={entry.user || i}>
                    {i + 1}. {entry.user} -{" "}
                    {entry.target_value
                      ? ((entry.progress / entry.target_value) * 100).toFixed(1)
                      : "0"}
                    %
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
              <ul className="mt-2 list-unstyled">
                {available.map((c) => (
                  <li
                    key={c.id || `available-challenge-${c.title}-${Math.random()}`}
                    className="mb-3 border rounded p-2 bg-light"
                  >
                    {/* Title toggle */}
                    <p
                      className="fw-semibold cursor-pointer mb-1"
                      onClick={() => toggleExpand(c.id)}
                      style={{ userSelect: "none" }}
                      title="Click to view details"
                    >
                      {c.title}
                    </p>

                    {/* Expanded view */}
                    {expandedChallengeId === c.id && (
                      <div className="mb-2">
                        <p><strong>Description:</strong> {c.description || "No description provided."}</p>
                        <p><strong>Metric:</strong> {c.metric || "N/A"}</p>
                        <p><strong>Target:</strong> {c.target_value || "N/A"}</p>
                        <p><strong>Start:</strong> {c.start_date || "N/A"}</p>
                        <p><strong>End:</strong> {c.end_date || "N/A"}</p>
                      </div>
                    )}

                    {/* Join button */}
                    <button
                      className="btn btn-sm btn-outline-primary"
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
                placeholder="Target"
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
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="is_public"
                  checked={newChallenge.is_public}
                  onChange={(e) =>
                    setNewChallenge({ ...newChallenge, is_public: e.target.checked })
                  }
                  id="isPublicCheck"
                />
                <label className="form-check-label" htmlFor="isPublicCheck">
                  Public Challenge
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
