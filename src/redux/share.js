// src/utils/share.js
// Builds ready-to-send messages and opens the user's email, WhatsApp or SMS app.
// No backend needed: these use mailto:, wa.me and sms: links.

const rupees = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// "98765 43210" or "+91 98765 43210" -> "919876543210" (WhatsApp needs country code)
export const normalizePhone = (phone = "", defaultCountry = "91") => {
  const digits = String(phone).replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? defaultCountry + digits : digits;
};

/* ---------------- Message builders ---------------- */

export const buildCartMessage = (items = [], total) => {
  const sum =
    total ??
    items.reduce((s, i) => s + i.price * (i.quantity ?? i.qty ?? 1), 0);
  const lines = items.map((i, idx) => {
    const qty = i.quantity ?? i.qty ?? 1;
    return `${idx + 1}. ${i.name} x ${qty} - ${rupees(i.price * qty)}`;
  });
  return [
    "Medicine App - My Cart",
    "",
    ...lines,
    "",
    `Total: ${rupees(sum)}`,
  ].join("\n");
};

export const buildAppointmentMessage = ({
  doctorName,
  specialization,
  dateLabel,
  time,
  patientName,
  phone,
  fee,
}) =>
  [
    "Medicine App - Doctor Appointment",
    "",
    `Doctor: ${doctorName}${specialization ? ` (${specialization})` : ""}`,
    `Date: ${dateLabel}`,
    `Time: ${time}`,
    `Patient: ${patientName}`,
    phone ? `Mobile: ${phone}` : null,
    fee != null ? `Fee: ${rupees(fee)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

export const buildLabTestMessage = ({
  tests = [],
  date,
  time,
  patientName,
  address,
  total,
}) =>
  [
    "Medicine App - Lab Test Booking",
    "",
    "Tests:",
    ...tests.map(
      (t, i) =>
        `${i + 1}. ${t.name}${t.price != null ? ` - ${rupees(t.price)}` : ""}`,
    ),
    "",
    date ? `Date: ${date}` : null,
    time ? `Time: ${time}` : null,
    patientName ? `Patient: ${patientName}` : null,
    address ? `Address: ${address}` : null,
    total != null ? `Total: ${rupees(total)}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

// Generic: { title: "Healthcare tip", details: { Name: "...", Note: "..." } }
export const buildHealthcareMessage = ({
  title = "Healthcare information",
  details = {},
}) =>
  [
    `Medicine App - ${title}`,
    "",
    ...Object.entries(details).map(([key, value]) => `${key}: ${value}`),
  ].join("\n");

/* ---------------- Openers ---------------- */

export const shareViaEmail = (subject, body, to = "") => {
  const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
};

export const shareViaWhatsApp = (text, phone = "") => {
  const number = normalizePhone(phone);
  const url = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

export const shareViaSMS = (text, phone = "") => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const separator = isIOS ? "&" : "?";
  window.location.href = `sms:${phone.replace(/\s/g, "")}${separator}body=${encodeURIComponent(
    text,
  )}`;
};
