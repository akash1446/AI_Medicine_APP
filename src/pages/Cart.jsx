import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { addToCart, removeCart, clearCart } from "../redux/cartslice";
import "../styles/cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  // ---- Validation helpers ----
  const validateCardDetails = () => {
    const { number, name, expiry, cvv } = cardDetails;

    if (!name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Missing Name",
        text: "Please enter the name on the card.",
      });
      return false;
    }
    if (!/^\d{16}$/.test(number.replace(/\s/g, ""))) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card Number",
        text: "Card number must be 16 digits.",
      });
      return false;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Expiry",
        text: "Use MM/YY format.",
      });
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      Swal.fire({
        icon: "error",
        title: "Invalid CVV",
        text: "CVV must be 3 or 4 digits.",
      });
      return false;
    }
    return true;
  };

  const validatePaymentMethod = () => {
    if (!paymentMethod) {
      Swal.fire({
        icon: "warning",
        title: "Select Payment Method",
        text: "Please choose QR Code, Credit Card, or Cash on Delivery.",
      });
      return false;
    }
    if (paymentMethod === "card" && !validateCardDetails()) {
      return false;
    }
    return true;
  };

  const saveOrderToBackend = async () => {
    try {
      const orderData = cartItems.map((item) => ({
        medicineName: item.name,
        price: item.price,
        quantity: item.qty,
        img: item.img,
        totalPrice: item.price * item.qty,
        paymentMethod,
      }));
      await axios.post("http://localhost:8080/api/v1/cart", orderData);
      console.log("Order saved successfully");
    } catch (error) {
      console.error("Error saving order:", error);
      Swal.fire({
        icon: "error",
        title: "Order Save Failed",
        text: "Could not save order to server. Please try again.",
      });
      throw error;
    }
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Cart is Empty",
        text: "Please add items before placing an order.",
      });
      return;
    }

    if (!validatePaymentMethod()) return;

    try {
      await saveOrderToBackend();

      const successText =
        paymentMethod === "cod"
          ? "Your order will be delivered. Pay cash on delivery."
          : paymentMethod === "qr"
            ? "Payment received via QR Code."
            : "Payment received via Credit Card.";

      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: successText,
      });

      dispatch(clearCart());
      setPaymentMethod("");
      setCardDetails({ number: "", name: "", expiry: "", cvv: "" });
    } catch {
      // error already shown in saveOrderToBackend
    }
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className="qty-controls">
                  <button onClick={() => dispatch(removeCart(item.id))}>
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => dispatch(addToCart(item))}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-section">
          <h3>Total: ₹{totalAmount}</h3>

          {/* ---- Payment Method Selection ---- */}
          <div className="payment-methods">
            <h4>Select Payment Method</h4>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="qr"
                checked={paymentMethod === "qr"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              QR Code Payment
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit Card Payment
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          {/* ---- QR Code Payment UI ---- */}
          {paymentMethod === "qr" && (
            <div className="qr-payment-box">
              <p>Scan the QR code below to pay ₹{totalAmount}</p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?am=${totalAmount}`}
                alt="Payment QR Code"
                className="qr-code-img"
              />
            </div>
          )}

          {/* ---- Credit Card Payment UI ---- */}
          {paymentMethod === "card" && (
            <div className="card-payment-box">
              <input
                type="text"
                name="name"
                placeholder="Name on Card"
                value={cardDetails.name}
                onChange={handleCardChange}
              />
              <input
                type="text"
                name="number"
                placeholder="Card Number (16 digits)"
                maxLength="19"
                value={cardDetails.number}
                onChange={handleCardChange}
              />
              <div className="card-row">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="4"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                />
              </div>
            </div>
          )}

          {/* ---- Cash on Delivery Note ---- */}
          {paymentMethod === "cod" && (
            <div className="cod-box">
              <p>Pay ₹{totalAmount} in cash when your order arrives.</p>
            </div>
          )}

          <button className="place-order-btn" onClick={handleOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
