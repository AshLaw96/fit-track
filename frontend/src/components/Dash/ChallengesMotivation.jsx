import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  Trophy,
  PlusCircle,
  Flame,
  TrendingUp,
} from "lucide-react";
import { toast } from "react-toastify";

const ChallengesMotivation = ({ data, refreshData }) => {
  const [challengeData, setChallengeData] = useState({
    active: [],
    available: [],
  });
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
      setChallengeData({
        active: [],
        available: [],
      });

      const [activeRes, availableRes] = await Promise.all([
        api.get("/user_challenges/active/"),
        api.get("/challenges/public/"),
      ]);

      const today = new Date();
      const active = activeRes.data.results
        .map((uc) => {
          const endDate = uc.end_date ? new Date(uc.end_date) : null;
          const completed =
            uc.completed || uc.progress >= (uc.target_value || 1);
          const failed = !completed && endDate && today > endDate;

          return {
            ...uc,
            challengeId: uc.challenge_id || uc.challenge,
            completed,
            failed,
          };
        })
        .filter((c) => !c.completed && !c.failed);

      const available = availableRes.data || [];

      setChallengeData({
        active,
        available,
      });
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

    if (
      !newChallenge.target_value ||
      isNaN(parseFloat(newChallenge.target_value))
    ) {
      toast.error("Target value must be a valid number.");
      return;
    }

    const challengePayload = {
      ...newChallenge,
      target_value: parseFloat(newChallenge.target_value),
    };

    try {
      await api.post("/challenges/", challengePayload);
      toast.success("🎉 Challenge created!");
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
      const errMsg =
        error.response?.data?.[Object.keys(error.response.data)[0]]?.[0] ||
        "Failed to create challenge. Check your inputs.";
      alert(errMsg);
    }
  };

  const handleAddProgress = async (challenge) => {
    if (!challenge?.id) return;

    try {
      await api.post(`/user_challenges/${challenge.id}/increment_progress/`);
      toast.success(`Progress added to "${challenge.title}"!`);
      fetchChallengeData();
    } catch (error) {
      toast.error("Failed to add progress");
    }
  };

  const toggleExpand = (id) => {
    setExpandedChallengeId((prevId) => (prevId === id ? null : id));
  };

  const { active, available } = challengeData;
  const userPoints = active.reduce((sum, c) => sum + (c.user_points || 0), 0);

  return (
    <div className="card p-4 shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 flex items-center gap-2">
          <Trophy className="text-warning" size={20} /> Challenges & Motivation
        </h4>
        <span className="badge bg-primary">🏆 Points: {userPoints}</span>
      </div>

      {loading ? (
        <div className="text-muted">Loading challenge data...</div>
      ) : (
        <>
          {/* Active Challenges */}
          <div className="mb-4" id="active-challenge">
            <strong className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={18} /> Active Challenges:
            </strong>
            {active.length > 0 ? (
              active.map((c) => (
                <div key={c.id} className="mb-3">
                  <p
                    className="fw-semibold cursor-pointer"
                    onClick={() => toggleExpand(c.id)}
                    style={{ userSelect: "none" }}
                  >
                    {c.title}{" "}
                    {c.completed && (
                      <span className="badge bg-success ms-2">Completed</span>
                    )}
                  </p>
                  {expandedChallengeId === c.id && (
                    <div className="bg-light p-2 rounded border mb-2">
                      <p><strong>Description:</strong> {c.description || "No description."}</p>
                      <p><strong>Metric:</strong> {c.metric}</p>
                      <p><strong>Target:</strong> {c.target_value}</p>
                      <p><strong>Start:</strong> {c.start_date}</p>
                      <p><strong>End:</strong> {c.end_date}</p>
                    </div>
                  )}
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${(c.progress / c.target_value) * 100}%` }}
                    >
                      {((c.progress / c.target_value) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <p>{c.progress} / {c.target_value}</p>
                  <button
                    className="btn btn-sm btn-success mt-2"
                    onClick={() => handleAddProgress(c)}
                    disabled={c.completed}
                  >
                    + Add Progress
                  </button>
                </div>
              ))
            ) : (
              <div className="text-muted">No active challenges yet.</div>
            )}
          </div>

          {/* Available Challenges */}
          <div className="mb-4">
            <strong className="flex items-center gap-2">
              <Flame className="text-danger" size={18} /> Available Challenges:
            </strong>
            <div className="alert alert-secondary mt-2">
              Joining challenges is currently disabled.
            </div>
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
                    setNewChallenge({
                      ...newChallenge,
                      is_public: e.target.checked,
                    })
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
