import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Medicines from "./pages/Medicines";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import LabTest from "./pages/LabTest";
import "./App.css";
import HealthCare from "./pages/HealthCare";
import ConsultDoctor from "./pages/ConsultDoctor";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/consultation" element={<ConsultDoctor />} />
        <Route path="/lab-tests" element={<LabTest />} />
        <Route path="/healthcare" element={<HealthCare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
