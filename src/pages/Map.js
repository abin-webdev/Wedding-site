import { useEffect } from "react";
import "../App.css";

/* ─── DATA ───────────────────────────────────────────── */
const weddingDetails = [
  { label: "Date",  value: "January 16, 2027" },
  { label: "Time",  value: "10:45 AM – 11:20 AM" },
  { label: "Venue", value: "Corniche Convention Centre" },
  { label: "City",  value: "Triprayar, Kerala" },
];

const receptionDetails = [
  { label: "Time",  value: "6:30 PM onwards" },
  { label: "Venue", value: "Mangalath Riverview Resort" },
  { label: "City",  value: "Kerala" },
];

function Map() {
  /* Scroll fade-in */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--charcoal)", minHeight: "100vh" }}>
      
      {/* ─── HEADER ───────────────────────────────────────── */}
      <div
        style={{
          textAlign: "center",
          padding: "6rem 2rem 3.5rem",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center top, rgba(201,169,110,0.12), transparent 60%)",
          }}
        />
        <div className="ornament" style={{ color: "rgba(201,169,110,0.45)", marginBottom: "1rem" }}>
          ✦ ✦ ✦
        </div>
        <h1
          className="fade-in"
          style={{
            fontFamily: "var(--serif-display)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 400,
            letterSpacing: "0.12em",
            color: "var(--gold-light)",
          }}
        >
          Venue & Location
        </h1>
        <p
          className="fade-in"
          style={{
            fontFamily: "var(--serif-body)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.45)",
            marginTop: "0.8rem",
            fontSize: "1.05rem",
          }}
        >
          We hope to see you there
        </p>
      </div>

      {/* ─── WEDDING SECTION ─────────────────────────────── */}
      <div style={{ textAlign: "center", margin: "2rem 0", color: "var(--gold)", letterSpacing: "0.3em", fontSize: "0.75rem" }}>
        WEDDING
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1px",
        borderTop: "1px solid rgba(201,169,110,0.12)",
        borderBottom: "1px solid rgba(201,169,110,0.12)",
      }}>
        {weddingDetails.map((d) => (
          <div key={d.label} className="fade-in" style={{
            padding: "2.2rem 2rem",
            textAlign: "center",
            borderRight: "1px solid rgba(201,169,110,0.12)",
            background: "rgba(255,255,255,0.02)",
          }}>
            <p style={{
              fontFamily: "var(--serif-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.5rem",
              opacity: 0.7,
            }}>
              {d.label}
            </p>
            <p style={{
              fontFamily: "var(--serif-alt)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.05rem",
            }}>
              {d.value}
            </p>
          </div>
        ))}
      </div>

      {/* ─── WEDDING MAP ─────────────────────────────────── */}
      <iframe
        title="Wedding Location"
        src="https://www.google.com/maps?q=Corniche+Convention+Centre+Triprayar&output=embed"
        width="100%"
        height="460"
        style={{
          border: 0,
          display: "block",
          filter: "grayscale(25%) sepia(12%) brightness(0.85)",
        }}
        loading="lazy"
        allowFullScreen
      />

      {/* OPEN MAP BUTTON */}
      <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Corniche+Convention+Centre+Triprayar"
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
        >
          Open in Google Maps ↗
        </a>
      </div>

      {/* ✨ DIVIDER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "4rem 0",
        }}
      >
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(201,169,110,0.4))" }} />
        <span style={{ margin: "0 1.5rem", color: "var(--gold)", fontSize: "1.2rem" }}>
          ◆
        </span>
        <span style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(201,169,110,0.4))" }} />
      </div>

      {/* ─── RECEPTION SECTION ───────────────────────────── */}
      <div style={{ textAlign: "center", margin: "2rem 0", color: "var(--gold)", letterSpacing: "0.3em", fontSize: "0.75rem" }}>
        RECEPTION
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1px",
        borderTop: "1px solid rgba(201,169,110,0.12)",
        borderBottom: "1px solid rgba(201,169,110,0.12)",
      }}>
        {receptionDetails.map((d) => (
          <div key={d.label} className="fade-in" style={{
            padding: "2.2rem 2rem",
            textAlign: "center",
            borderRight: "1px solid rgba(201,169,110,0.12)",
            background: "rgba(255,255,255,0.02)",
          }}>
            <p style={{
              fontFamily: "var(--serif-display)",
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.5rem",
              opacity: 0.7,
            }}>
              {d.label}
            </p>
            <p style={{
              fontFamily: "var(--serif-alt)",
              fontStyle: "italic",
              color: "rgba(255,255,255,0.8)",
              fontSize: "1.05rem",
            }}>
              {d.value}
            </p>
          </div>
        ))}
      </div>

      {/* ─── RECEPTION MAP ───────────────────────────────── */}
      <iframe
        title="Reception Location"
        src="https://www.google.com/maps?q=Mangalath+Riverview+Resort&output=embed"
        width="100%"
        height="460"
        style={{
          border: 0,
          display: "block",
          filter: "grayscale(25%) sepia(12%) brightness(0.85)",
        }}
        loading="lazy"
        allowFullScreen
      />

      {/* OPEN MAP BUTTON */}
      <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Mangalath+Riverview+Resort"
          target="_blank"
          rel="noopener noreferrer"
          style={btnStyle}
        >
          Open in Google Maps ↗
        </a>
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "3rem 2rem 5rem" }}>
        <p style={{
          marginTop: "1.5rem",
          fontFamily: "var(--serif-alt)",
          fontStyle: "italic",
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.9rem",
        }}>
          We look forward to celebrating with you
        </p>
      </div>
    </div>
  );
}

/* BUTTON STYLE */
const btnStyle = {
  display: "inline-block",
  fontFamily: "var(--serif-display)",
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "var(--gold-light)",
  border: "1px solid rgba(201,169,110,0.4)",
  padding: "0.9rem 2.5rem",
  textDecoration: "none",
  background: "rgba(255,255,255,0.03)",
  transition: "all 0.35s",
};

export default Map;