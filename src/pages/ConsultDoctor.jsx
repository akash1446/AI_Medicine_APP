import React,{ useEffect, useMemo, useState } from "react";
import ShareActions from "../pages/ShareActions";
import { buildAppointmentMessage } from "../redux/share";
import "../styles/consultDoctor.css";

const DOCTORS = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialization: "General Physician",
    experience: 12,
    fee: 499,
    languages: "English, Hindi",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialization: "Dermatologist",
    experience: 8,
    fee: 699,
    languages: "English, Hindi",
  },
  {
    id: 3,
    name: "Dr. Anil Reddy",
    specialization: "Cardiologist",
    experience: 15,
    fee: 899,
    languages: "English, Telugu",
  },
  {
    id: 4,
    name: "Dr. Sneha Patel",
    specialization: "Pediatrician",
    experience: 10,
    fee: 599,
    languages: "English, Gujarati",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:00 PM",
  "06:30 PM",
];

const formatFee = (amount) => `₹${amount.toLocaleString("en-IN")}`;

const getInitials = (name) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("");

// Next 5 days starting today
const getNextDays = (count = 5) =>
  Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      weekday:
        i === 0 ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" }),
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    };
  });

function ConsultDoctor() {
  const [filter, setFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  const days = useMemo(() => getNextDays(5), []);

  const specializations = useMemo(
    () => ["All", ...new Set(DOCTORS.map((d) => d.specialization))],
    [],
  );

  const visibleDoctors =
    filter === "All"
      ? DOCTORS
      : DOCTORS.filter((d) => d.specialization === filter);

  const openBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setBooking({ date: days[0].key, time: "", name: "", phone: "" });
    setErrors({});
    setConfirmed(null);
  };

  const closeBooking = () => {
    setSelectedDoctor(null);
    setConfirmed(null);
  };

  // Close modal with Escape and lock page scroll while open
  useEffect(() => {
    if (!selectedDoctor) return;
    const onKey = (e) => e.key === "Escape" && closeBooking();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!booking.time) next.time = "Choose a time slot.";
    if (booking.name.trim().length < 2) next.name = "Enter the patient's name.";
    if (!/^[6-9]\d{9}$/.test(booking.phone))
      next.phone = "Enter a valid 10-digit mobile number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const appointment = {
      id: Date.now(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      fee: selectedDoctor.fee,
      ...booking,
    };

    // TODO: replace with your API call, e.g. axios.post("/api/appointments", appointment)
    setConfirmed(appointment);
  };

  const selectedDay = days.find((d) => d.key === booking.date);

  return (
    <div className="consult-page">
      <header className="consult-header">
        <h1>Consult a doctor online</h1>
        <p>
          Pick a specialist, choose a time, and talk to them by video or call.
        </p>
      </header>

      <div
        className="consult-filters"
        role="group"
        aria-label="Filter by specialization"
      >
        {specializations.map((spec) => (
          <button
            key={spec}
            type="button"
            className={`filter-chip ${filter === spec ? "active" : ""}`}
            aria-pressed={filter === spec}
            onClick={() => setFilter(spec)}
          >
            {spec}
          </button>
        ))}
      </div>

      <div className="doctor-grid">
        {visibleDoctors.map((doctor) => (
          <article className="doctor-card" key={doctor.id}>
            <div className="doctor-avatar" aria-hidden="true">
              {getInitials(doctor.name)}
            </div>

            <h3>{doctor.name}</h3>
            <p className="specialization">{doctor.specialization}</p>

            <dl className="doctor-meta">
              <div>
                <dt>Experience</dt>
                <dd>{doctor.experience} years</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{doctor.languages}</dd>
              </div>
            </dl>

            <p className="fee">
              <span>Consultation fee</span>
              <strong>{formatFee(doctor.fee)}</strong>
            </p>

            <button
              type="button"
              className="consult-btn"
              onClick={() => openBooking(doctor)}
            >
              Book appointment
            </button>
          </article>
        ))}
      </div>

      {selectedDoctor && (
        <div className="modal-backdrop" onClick={closeBooking}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close"
              onClick={closeBooking}
            >
              ×
            </button>

            {confirmed ? (
              <div className="confirmation">
                <div className="confirmation-icon" aria-hidden="true">
                  ✓
                </div>
                <h2 id="booking-title">Appointment booked</h2>
                <p className="confirmation-text">
                  {confirmed.doctorName} will see {confirmed.name} on{" "}
                  <strong>
                    {selectedDay?.label} at {confirmed.time}
                  </strong>
                  .
                </p>
                <p className="confirmation-sub">
                  We'll send the call link to {confirmed.phone}. Pay{" "}
                  {formatFee(confirmed.fee)} when the consultation starts.
                </p>
                <ShareActions
                  title="Send appointment details"
                  subject={`Appointment with ${confirmed.doctorName}`}
                  phone={confirmed.phone}
                  message={buildAppointmentMessage({
                    doctorName: confirmed.doctorName,
                    specialization: selectedDoctor.specialization,
                    dateLabel: selectedDay?.label,
                    time: confirmed.time,
                    patientName: confirmed.name,
                    phone: confirmed.phone,
                    fee: confirmed.fee,
                  })}
                />

                <button
                  type="button"
                  className="consult-btn"
                  onClick={closeBooking}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirm} noValidate>
                <div className="modal-doctor">
                  <div className="doctor-avatar small" aria-hidden="true">
                    {getInitials(selectedDoctor.name)}
                  </div>
                  <div>
                    <h2 id="booking-title">{selectedDoctor.name}</h2>
                    <p className="specialization">
                      {selectedDoctor.specialization} ·{" "}
                      {formatFee(selectedDoctor.fee)}
                    </p>
                  </div>
                </div>

                <fieldset className="field-group">
                  <legend>Date</legend>
                  <div className="day-row">
                    {days.map((day) => (
                      <button
                        key={day.key}
                        type="button"
                        className={`day-chip ${booking.date === day.key ? "active" : ""}`}
                        aria-pressed={booking.date === day.key}
                        onClick={() =>
                          setBooking((p) => ({ ...p, date: day.key }))
                        }
                      >
                        <span>{day.weekday}</span>
                        <strong>{day.label}</strong>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="field-group">
                  <legend>Time</legend>
                  <div className="slot-grid">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`slot-chip ${booking.time === slot ? "active" : ""}`}
                        aria-pressed={booking.time === slot}
                        onClick={() =>
                          setBooking((p) => ({ ...p, time: slot }))
                        }
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="error-text">{errors.time}</p>}
                </fieldset>

                <div className="field">
                  <label htmlFor="patient-name">Patient name</label>
                  <input
                    id="patient-name"
                    name="name"
                    type="text"
                    value={booking.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="field">
                  <label htmlFor="patient-phone">Mobile number</label>
                  <input
                    id="patient-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={booking.phone}
                    onChange={handleChange}
                    autoComplete="tel-national"
                  />
                  {errors.phone && <p className="error-text">{errors.phone}</p>}
                </div>

                <button type="submit" className="consult-btn full">
                  Confirm appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultDoctor;
