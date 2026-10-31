// src/components/ShareActions.jsx
import React from "react";
import { shareViaEmail, shareViaWhatsApp, shareViaSMS } from "../redux/share";
import "../styles/shareActions.css";

/**
 * Props
 *  - message  (string, required)  text to send
 *  - subject  (string)            email subject
 *  - phone    (string)            optional recipient number
 *  - email    (string)            optional recipient email
 *  - title    (string)            small heading, default "Send details"
 */
function ShareActions({
  message,
  subject = "Medicine App",
  phone = "",
  email = "",
  title = "Send details",
}) {
  return (
    <div className="share-actions">
      <p className="share-title">{title}</p>

      <div className="share-buttons">
        <button
          type="button"
          className="share-btn email"
          onClick={() => shareViaEmail(subject, message, email)}
        >
          <span aria-hidden="true">✉️</span> Email
        </button>

        <button
          type="button"
          className="share-btn whatsapp"
          onClick={() => shareViaWhatsApp(message, phone)}
        >
          <span aria-hidden="true">💬</span> WhatsApp
        </button>

        <button
          type="button"
          className="share-btn sms"
          onClick={() => shareViaSMS(message, phone)}
        >
          <span aria-hidden="true">📱</span> Message
        </button>
      </div>
    </div>
  );
}

export default ShareActions;
