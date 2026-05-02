import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlaying } from "../store/weddingSlice";
import "../App.css";

/* Countdown helper logic */
function useCountdown(target) {
  const [time, setTime] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

/* ── RSVP Modal ── */
const GOOGLE_SHEET_URL ="https://docs.google.com/forms/d/e/1FAIpQLSf2i4NritQSVkuOTeb8E-H9qF1p0fUX8nRS-YCNlHJ7YmUF5g/formResponse";

function RSVPModal({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", guests: "1", attending: "yes", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async () => {
      if (!form.name.trim() || !form.phone.trim()) return;

      setStatus("loading");

      try {
        const formData = new FormData();

        // 🔥 Map your fields to Google Form entry IDs
        formData.append("entry.1202367524", form.name);
        formData.append("entry.201018773", form.phone);

        formData.append(
          "entry.1097014482",
          form.attending === "yes"
            ? "Joyfully Accept"
            : "Regretfully Decline"
        );

        formData.append("entry.1595575961", form.guests);
        formData.append("entry.845269837", form.message);

        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });

        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

  return (
    <div className="rsvp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rsvp-modal">
        <button className="rsvp-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="rsvp-header">
          <span className="rsvp-ornament">✦</span>
          <h2 className="rsvp-title">RSVP</h2>
          <span className="rsvp-ornament">✦</span>
        </div>
        <p className="rsvp-subtitle">Kindly reply by December 1, 2026</p>

        {status === "success" ? (
          <div className="rsvp-success">
            <span className="rsvp-success-icon">🌸</span>
            <p>Thank you! We've received your RSVP.</p>
            <p>We can't wait to celebrate with you.</p>
            <button className="rsvp-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="rsvp-field">
              <label>Full Name <span className="rsvp-required">*</span></label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="rsvp-field">
              <label>Phone Number <span className="rsvp-required">*</span></label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="rsvp-row">
              <div className="rsvp-field">
                <label>Attending?</label>
                <select name="attending" value={form.attending} onChange={handleChange}>
                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>

              <div className="rsvp-field">
                <label>No. of Guests</label>
                <select name="guests" value={form.guests} onChange={handleChange}>
                  {["1","2","3","4","5"].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rsvp-field">
              <label>Message <span className="rsvp-optional">(optional)</span></label>
              <textarea
                name="message"
                rows={3}
                placeholder="A note for the couple…"
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {status === "error" && (
              <p className="rsvp-error">Something went wrong. Please try again.</p>
            )}

            <button
              className={`rsvp-btn ${status === "loading" ? "rsvp-btn--loading" : ""}`}
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : "Send RSVP ✦"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [showRSVP, setShowRSVP] = useState(false);

  const { targetDate, isAudioPlaying } = useSelector((state) => state.wedding);
  const countdown = useCountdown(targetDate);

  /* Play music */
  useEffect(() => {
    const handleFirstInteraction = () => {
      audioRef.current?.play().then(() => {
        dispatch(setAudioPlaying(true));
      }).catch(() => {});
      document.removeEventListener("click", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    return () => document.removeEventListener("click", handleFirstInteraction);
  }, [dispatch]);

  /* Scroll animation */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pad = (n) => String(n ?? 0).padStart(2, "0");

  return (
    <div className="home">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>

      {/* HERO */}
      <section className="home-hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/wedding.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <p className="hero-pre fade-in">The Wedding of</p>
          <h1 className="hero-names fade-in">
            <span>Nayana</span>
            <span className="hero-amp">❧</span>
            <span>Midhun</span>
          </h1>
          <p className="hero-tagline fade-in">Our Forever Begins</p>

          <div className="hero-divider fade-in">
            <span /><span className="hero-divider-gem">◆</span><span />
          </div>

          <p className="hero-date fade-in">
            January 16 · 2027 · Thriprayar
          </p>

          {isAudioPlaying && <p className="audio-status">♪ Music Playing</p>}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="home-countdown">
        <p className="section-eyebrow fade-in">Counting down to forever</p>
        <div className="countdown-grid fade-in">
          {[
            { val: pad(countdown.d), lbl: "Days" },
            { val: pad(countdown.h), lbl: "Hours" },
            { val: pad(countdown.m), lbl: "Minutes" },
            { val: pad(countdown.s), lbl: "Seconds" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="countdown-cell">
              <span className="countdown-num">{val}</span>
              <span className="countdown-lbl">{lbl}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section className="home-details">

        <div className="details-left fade-in">
          <span className="detail-icon">💍</span>
          <h3>Wedding</h3>
          <p>January 16, 2027</p>
          <p>10:45 AM – 11:20 AM</p>
          <p style={{ marginTop: "0.6rem" }}>
            Corniche Convention Centre
          </p>
          <p>Thriprayar, Kerala</p>
        </div>

        <div className="details-divider">
          <span /><span className="details-diamond">◆</span><span />
        </div>

        <div className="details-right fade-in">
          <span className="detail-icon">🎉</span>
          <h3>Reception</h3>
          <p>January 17, 2027</p>
          <p>6:30 PM onwards</p>
          <p style={{ marginTop: "0.6rem" }}>
            Mangalath Riverview Resort
          </p>
          <p>Kerala</p>
        </div>

      </section>

      {/* INVITATION */}
      <section className="home-invitation">
        <div className="invitation-bg">
          <img src="/img1.jpeg" alt="" />
        </div>

        <div className="invitation-card fade-in">
          <div className="inv-top-ornament">✦ ✦ ✦</div>

          <p className="inv-sub">Together with their families</p>

          <h2 className="inv-names">
            Nayana ❤️ Midhun
          </h2>

          <div className="inv-line" />

          <p className="inv-request">
            joyfully invite you to celebrate<br />their wedding
          </p>

          <div className="inv-meta-row">
            <span>January 16, 2027</span>
            <span className="inv-dot">·</span>
            <span>10:45 AM</span>
            <span className="inv-dot">·</span>
            <span>Thriprayar</span>
          </div>

          <div className="inv-line" style={{ marginTop: "1.5rem", opacity: 0.5 }} />

          <p style={{ marginTop: "1rem", fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
            Reception to follow
          </p>

          <div className="inv-meta-row">
            <span>January 17, 2027</span>
            <span className="inv-dot">·</span>
            <span>6:30 PM</span>
            <span className="inv-dot">·</span>
            <span>Mangalath Riverview Resort</span>
          </div>

          {/* ── RSVP Button ── */}
          <div className="inv-line" style={{ marginTop: "1.5rem", opacity: 0.4 }} />
          <button className="rsvp-open-btn" onClick={() => setShowRSVP(true)}>
            RSVP ✦
          </button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p className="footer-brand">Nayana & Midhun</p>
        <p className="footer-sub">
          January 16 · 2027 · Corniche Convention Centre · Thriprayar, Kerala
        </p>
      </footer>

      {/* RSVP Modal */}
      {showRSVP && <RSVPModal onClose={() => setShowRSVP(false)} />}
    </div>
  );
}