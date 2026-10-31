import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice";
import "../styles/medicineCard.css";

function MedicineCard({ medicine }) {
  const dispatch = useDispatch();

  // Safety check
  if (!medicine) return null;

  const { img, name, price } = medicine;

  return (
    <div className="medicine-card">
      <img
        src={img}
        alt={name}
        className="medicine-img"
        onError={(e) => {
          e.target.src = "/images/default-medicine.png";
        }}
      />

      <h3 className="medicine-name">{name}</h3>

      <p className="medicine-price">₹{price}</p>

      <button
        className="add-to-cart-btn"
        onClick={() => dispatch(addToCart(medicine))}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default MedicineCard;
