import React from "react";
import { Link } from "react-router-dom";
import "../styles/dash.css";
import heroImage from "../assets/hero.jpeg";

const GuestDash = () => {
  return (
    <div className="container py-4 custom-wrap">
      <h2 className="text-center mb-3 custom-heading">Welcome to FitTrack</h2>
      <p className="text-center mb-2">
        FitTrack helps you take charge of your health — log workouts, track meals, and keep an eye on your sleep. Whether you're just getting started or fine-tuning your routine, it's your go-to app for staying consistent, building better habits, and feeling your best.
      </p>
      <img src={heroImage} alt="Fitness illustration" className="img-fluid mb-3 hero-img" />

      <div className="text-center mb-4">
        <span className="badge bg-secondary me-2">Free & easy to use</span>
        <span className="badge bg-secondary me-2">No account needed to browse</span>
        <span className="badge bg-secondary">Mobile-friendly</span>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5><i className="fa-solid fa-shoe-prints me-2"></i>Activity Overview</h5>
            <p>Monitor steps, sleep, and water intake.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5><i className="fa-solid fa-dumbbell me-2"></i>Nutrition & Workouts</h5>
            <p>See sample workout plans and meal logs.</p>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card p-3 shadow">
            <h5><i className="fa-solid fa-chart-line me-2"></i>Analytics & Goals</h5>
            <p>Get an idea of how progress tracking looks when you're signed in.</p>
          </div>
        </div>

        <div className="text-center mb-3">
          <Link to="/auth" className="btn btn-primary mt-2">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestDash;
