import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";

function Navbar() {
  const cartItems = useSelector((state) => state.cart);

  return (
    <nav className="navbar">
      {/* LEFT SIDE - LOGO */}
      <div className="navbar-left">
        <h2 className="logo">💊 Medicine App</h2>
      </div>

      {/* CENTER - MENU */}
      <div className="navbar-center">
        <ul className="nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/medicines">Medicines</Link>
          </li>

          <li>
            <Link to="/cart">Cart 🛒 ({cartItems.length})</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE - BUTTON */}
      <div>
      
          <Link to="/login">Login</Link>
      
      </div>
    </nav>
  );
}

export default Navbar;
