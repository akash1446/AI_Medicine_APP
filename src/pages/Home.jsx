import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [prescription, setPrescription] = useState("");

  // NEW STATES
  const [featuredMedicines, setFeaturedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  // ==============================
  // Load Featured Medicines
  // ==============================
  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/medicines",
      );

      setFeaturedMedicines(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Search
  // ==============================
  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/medicines?q=${encodeURIComponent(search.trim())}`);
    }
  };

  // ==============================
  // Voice Search
  // ==============================
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice search isn't supported in this browser. Try Chrome or Edge.",
      );
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setSearch(transcript);

      navigate(`/medicines?q=${encodeURIComponent(transcript.trim())}`);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // ==============================
  // Upload Button
  // ==============================
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // ==============================
  // Upload Prescription
  // ==============================
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPrescription(file.name);

      alert(`Prescription Uploaded Successfully!\n${file.name}`);

      console.log(file);

      // Optional Backend Upload

      /*
      const formData=new FormData();

      formData.append("file",file);

      axios.post("http://localhost:8080/api/v1/upload",formData)
      */
    }
  };

  return (
    <div className="home-page">
      {/* Search */}

      <form className="search-section" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search medicines, health conditions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          type="button"
          className={`voice-btn ${isListening ? "listening" : ""}`}
          onClick={handleVoiceSearch}
        >
          {isListening ? "🔴" : "🎤"}
        </button>

        <button type="submit" className="search-btn">
          🔍
        </button>
      </form>

      {/* Prescription */}

      <div className="prescription-banner">
        <div>
          <h3>Order with Prescription</h3>

          <p>Upload your doctor's prescription and get medicines delivered</p>

          {prescription && (
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Uploaded : {prescription}
            </p>
          )}
        </div>

        <div>
          <button className="upload-btn" onClick={handleUploadClick}>
            Upload Prescription
          </button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Quick Actions */}

      <div className="quick-actions">
        <Link to="/medicines" className="action-card">
          <span className="action-icon">💊</span>
          <p>Medicines</p>
        </Link>

        <Link to="/consultation" className="action-card">
          <span className="action-icon">🩺</span>
          <p>Consult Doctor</p>
        </Link>

        <Link to="/lab-tests" className="action-card">
          <span className="action-icon">🧪</span>
          <p>Lab Tests</p>
        </Link>

        <Link to="/healthcare" className="action-card">
          <span className="action-icon">🌿</span>
          <p>Healthcare</p>
        </Link>
      </div>

      {/* Offer */}

      <div className="offers-banner">
        <p>🎉 Flat 20% OFF on your first order — Use code HEALTH20</p>
      </div>

      {/* Featured Medicines */}

      <section className="featured-section">
        <h2>Featured Medicines</h2>

        {loading ? (
          <h3>Loading Medicines...</h3>
        ) : (
          <div className="medicine-grid">
            {featuredMedicines.map((medicine) => (
              <div className="medicine-card" key={medicine.id}>
                <img
                  src={medicine.img}
                  alt={medicine.name}
                  width="150"
                  height="150"
                />

                <h3>{medicine.name}</h3>

                <p>₹ {medicine.price}</p>

                <button
                  onClick={() => navigate(`/medicines?q=${medicine.name}`)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Health Tips */}

      <section className="health-tips">
        <h2>Health Tips</h2>

        <ul>
          <li>💧 Drink at least 2–3 litres of water every day.</li>

          <li>🥗 Eat fresh fruits and vegetables.</li>

          <li>🏃 Exercise for 30 minutes daily.</li>

          <li>😴 Sleep at least 8 hours.</li>

          <li>💊 Take medicines only as prescribed by your doctor.</li>
        </ul>
      </section>

      {/* Emergency */}

      <section className="emergency-banner">
        <h2>🚑 Emergency Help</h2>

        <p>Need immediate medical assistance?</p>

        <h3>Call : 108</h3>
      </section>
    </div>
  );
}

export default Home;
