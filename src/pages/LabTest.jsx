import React from 'react'
import '../styles/labTest.css';

function LabTest() {
    const tests = [
      {
        id: 1,
        name: "Complete Blood Count (CBC)",
        price: 399,
        icon: "🩸",
      },
      {
        id: 2,
        name: "Blood Sugar Test",
        price: 199,
        icon: "🍬",
      },
      {
        id: 3,
        name: "Thyroid Profile",
        price: 599,
        icon: "🦋",
      },
      {
        id: 4,
        name: "Lipid Profile",
        price: 699,
        icon: "❤️",
      },
    ];
  return (
    <div className="lab-container">
      <h2>Book Lab Tests</h2>

      <div className="lab-grid">
        {tests.map((test) => (
          <div className="lab-card" key={test.id}>
            <div className="lab-icon">{test.icon}</div>

            <h3>{test.name}</h3>

            <p>₹{test.price}</p>
            <button onClick={() => alert(`${test.name} booked successfully!`)}>
              Book Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default LabTest;