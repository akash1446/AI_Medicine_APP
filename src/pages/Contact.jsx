import React from "react";
import "../styles/contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Have questions? Reach out to us anytime.</p>

      <div className="contact-info">
        <p>
          <strong>Email:</strong> support@medicineapp.com
        </p>
        <p>
          <strong>Phone:</strong> +91 98765 43210
        </p>
        <p>
          <strong>Address:</strong> 123 Health Street, Hyderabad, India
        </p>
      </div>
    </div>
  );
}

export default Contact;
