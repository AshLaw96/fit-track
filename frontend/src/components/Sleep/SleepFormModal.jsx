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
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={data.date || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Bedtime</label>
          <input
            type="time"
            name="bedtime"
            className="form-control"
            value={data.bedtime || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Wake-up Time</label>
          <input
            type="time"
            name="wake_time"
            className="form-control"
            value={data.wake_time || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Sleep Duration (hrs)</label>
          <input
            type="number"
            name="duration_hours"
            className="form-control"
            min="0"
            step="0.1"
            value={data.duration_hours || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Quality Rating (1-4)</label>
          <select
            name="quality_rating"
            className="form-control"
            value={data.quality_rating || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value={1}>Poor</option>
            <option value={2}>Fair</option>
            <option value={3}>Good</option>
            <option value={4}>Excellent</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Wake Feeling</label>
          <select
            name="wake_feeling"
            className="form-control"
            value={data.wake_feeling || ""}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="tired">Tired</option>
            <option value="okay">Okay</option>
            <option value="refreshed">Refreshed</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            rows="3"
            className="form-control"
            value={data.notes || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Quality Meter Visual */}
        {data.quality_rating && (
          <div className="col-12 mt-2">
            <label className="form-label">Quality Meter</label>
            <div className="progress">
              <div
                className={`progress-bar ${getBarColor(data.quality_rating)}`}
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
