import React from "react";

const SleepFormModal = ({ data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">Date *</label>
          <input
            type="date"
            name="date"
            id="date"
            className="form-control"
            value={data.date || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="bedtime" className="form-label">Bedtime</label>
          <input
            type="time"
            name="bedtime"
            id="bedtime"
            className="form-control"
            value={data.bedtime || ""}
            onChange={handleChange}
            title="Time you went to bed"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="wake_time" className="form-label">Wake-up Time</label>
          <input
            type="time"
            name="wake_time"
            id="wake_time"
            className="form-control"
            value={data.wake_time || ""}
            onChange={handleChange}
            title="Time you woke up"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="duration_hours" className="form-label">
            Sleep Duration (hrs) *
          </label>
          <input
            type="number"
            name="duration_hours"
            id="duration_hours"
            className="form-control"
            min="0"
            max="24"
            step="0.1"
            value={data.duration_hours || ""}
            onChange={handleChange}
            required
            title="Total sleep time in hours (e.g., 7.5)"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="quality_rating" className="form-label">
            Quality Rating (1-4)
          </label>
          <select
            name="quality_rating"
            id="quality_rating"
            className="form-select"
            value={data.quality_rating || ""}
            onChange={handleChange}
          >
            <option value="">Choose one</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Excellent</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="wake_feeling" className="form-label">
            Wake Feeling
          </label>
          <select
            name="wake_feeling"
            id="wake_feeling"
            className="form-select"
            value={data.wake_feeling || ""}
            onChange={handleChange}
          >
            <option value="">Choose one</option>
            <option value="tired">Tired</option>
            <option value="okay">Okay</option>
            <option value="refreshed">Refreshed</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            name="notes"
            id="notes"
            rows="3"
            className="form-control"
            value={data.notes || ""}
            onChange={handleChange}
            placeholder="Optional notes (e.g., caffeine, exercise, mood)"
          ></textarea>
        </div>

        {data.quality_rating && (
          <div className="col-12 mt-2">
            <label className="form-label">Quality Meter</label>
            <div className="progress" style={{ height: "1.5rem" }}>
              <div
                className={`progress-bar progress-bar-striped ${getBarColor(
                  data.quality_rating
                )}`}
                style={{ width: `${(data.quality_rating / 4) * 100}%` }}
              >
                {["Poor", "Fair", "Good", "Excellent"][data.quality_rating - 1]}
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

const getBarColor = (rating) => {
  switch (parseInt(rating)) {
    case 1:
      return "bg-danger";
    case 2:
      return "bg-warning";
    case 3:
      return "bg-info";
    case 4:
      return "bg-success";
    default:
      return "bg-secondary";
  }
};

export default SleepFormModal;
