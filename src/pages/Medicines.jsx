import React, { useEffect, useState } from "react";
import axios from "axios";
import MedicineCard from "../components/MedicineCard";

function Medicines() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/medicines")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Featured Medicines</h2>

      <div className="medicines-grid">
        {medicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
}

export default Medicines;
