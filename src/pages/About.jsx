import React from "react";
import "../styles/about.css";

const stats = [
  { label: "Founded", value: "2019" },
  { label: "Active users", value: "2.4M+" },
  { label: "Doctors", value: "18,000" },
  { label: "Cities", value: "120+" },
];

const missions = [
  {
    icon: "💊",
    title: "Patient-first care",
    desc: "Every feature is designed around what patients actually need — clarity, speed, and trust.",
  },
  {
    icon: "🔒",
    title: "Privacy & safety",
    desc: "Your health data is encrypted, never sold, and always under your control.",
  },
  {
    icon: "📱",
    title: "Accessible anywhere",
    desc: "Available on iOS, Android, and web — with offline support for low-connectivity areas.",
  },
];

const team = [
  {
    name: "Arjun Kapoor",
    role: "CEO & Co-founder",
    initials: "AK",
    color: "#E6F1FB",
    textColor: "#0C447C",
  },
  {
    name: "Sunita Rao",
    role: "Chief Medical Officer",
    initials: "SR",
    color: "#EAF3DE",
    textColor: "#27500A",
  },
  {
    name: "Priya Mehta",
    role: "Head of Engineering",
    initials: "PM",
    color: "#FAEEDA",
    textColor: "#633806",
  },
];

const styles = {
  page: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    maxWidth: 720,
    margin: "0 auto",
    padding: "2.5rem 1.5rem",
    color: "#1a1a1a",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#E6F1FB",
    color: "#185FA5",
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    marginBottom: "1rem",
  },
  h1: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1.3,
    margin: "0 0 1rem",
    color: "#111",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#555",
    maxWidth: 520,
    margin: "0 0 2.5rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: 12,
    marginBottom: "2.5rem",
  },
  statCard: {
    background: "#f5f5f5",
    borderRadius: 10,
    padding: "1rem",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    margin: "0 0 4px",
  },
  statValue: {
    fontSize: 22,
    fontWeight: 600,
    margin: 0,
    color: "#111",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    margin: "0 0 1rem",
    color: "#111",
  },
  missionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
    marginBottom: "2.5rem",
  },
  missionCard: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 12,
    padding: "1rem 1.25rem",
  },
  missionIcon: {
    fontSize: 22,
    marginBottom: 8,
    display: "block",
  },
  missionTitle: {
    fontSize: 14,
    fontWeight: 600,
    margin: "0 0 6px",
    color: "#111",
  },
  missionDesc: {
    fontSize: 13,
    color: "#666",
    margin: 0,
    lineHeight: 1.6,
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
    marginBottom: "2.5rem",
  },
  teamCard: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 12,
    padding: "1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  memberName: {
    fontSize: 14,
    fontWeight: 600,
    margin: "0 0 2px",
    color: "#111",
  },
  memberRole: {
    fontSize: 12,
    color: "#888",
    margin: 0,
  },
  contactCard: {
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 12,
    padding: "1rem 1.25rem",
  },
  contactRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f0f0f0",
    fontSize: 14,
  },
  contactLabel: {
    color: "#888",
  },
  contactValue: {
    color: "#185FA5",
    fontWeight: 500,
  },
};

function About() {
  return (
    <div style={styles.page}>
      <div style={styles.badge}>
        <span>💊</span> MediCare
      </div>

      <h1 style={styles.h1}>
        Your trusted partner
        <br />
        in modern healthcare
      </h1>
      <p style={styles.subtitle}>
        We build tools that help patients, caregivers, and doctors stay
        informed, connected, and in control of health — from medicine reminders
        to doctor consultations.
      </p>

      <div style={styles.statsGrid}>
        {stats.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <p style={styles.statLabel}>{s.label}</p>
            <p style={styles.statValue}>{s.value}</p>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Our mission</h2>
      <div style={styles.missionGrid}>
        {missions.map((m) => (
          <div key={m.title} style={styles.missionCard}>
            <span style={styles.missionIcon}>{m.icon}</span>
            <p style={styles.missionTitle}>{m.title}</p>
            <p style={styles.missionDesc}>{m.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Meet the team</h2>
      <div style={styles.teamGrid}>
        {team.map((member) => (
          <div key={member.name} style={styles.teamCard}>
            <div
              style={{
                ...styles.avatar,
                background: member.color,
                color: member.textColor,
              }}
            >
              {member.initials}
            </div>
            <div>
              <p style={styles.memberName}>{member.name}</p>
              <p style={styles.memberRole}>{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>Contact us</h2>
      <div style={styles.contactCard}>
        {[
          { label: "Email", value: "support@medicare.app" },
          { label: "Phone", value: "+91 98765 43210" },
          { label: "Location", value: "Hyderabad, India" },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            style={{
              ...styles.contactRow,
              borderBottom: i < arr.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <span style={styles.contactLabel}>{item.label}</span>
            <span style={styles.contactValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
