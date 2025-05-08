import React from "react";

const UserDash = () => {
  return (
    <div className="container py-4 custom-wrap">
      <h2 className="mb-4 text-center custom-heading">Welcome Back!</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow">Activity Summary</div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow">Workout & Nutrition</div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow">Daily Goals</div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow">Progress & Analytics</div>
        </div>
        <div className="col-md-12">
          <div className="card p-3 shadow">Challenges & Motivation</div>
        </div>
      </div>
    </div>
  );
};

export default UserDash;