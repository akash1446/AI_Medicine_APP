import React from "react";
import "../styles/healthCare.css";

function HealthCare() {
  return (
    <div className="healthcare-page">
      <div className="healthcare-header">
        <h1>🌿 Healthcare Products</h1>
        <p>
          Explore wellness, nutrition, personal care, and healthcare essentials.
        </p>
      </div>

      <div className="healthcare-grid">
        <div className="healthcare-card">
          <span className="health-icon">💊</span>
          <h3>Vitamins & Supplements</h3>
          <p>Boost immunity and maintain overall wellness.</p>
        </div>

        <div className="healthcare-card">
          <span className="health-icon">🧴</span>
          <h3>Personal Care</h3>
          <p>Skin care, hygiene, and grooming essentials.</p>
        </div>

        <div className="healthcare-card">
          <span className="health-icon">🍎</span>
          <h3>Nutrition</h3>
          <p>Healthy foods and dietary supplements.</p>
        </div>

        <div className="healthcare-card">
          <span className="health-icon">🏃</span>
          <h3>Fitness</h3>
          <p>Products for active and healthy lifestyles.</p>
        </div>
      </div>
    </div>
  );
}

export default HealthCare;
