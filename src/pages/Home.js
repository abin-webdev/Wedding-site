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

export default function Home() {
  const dispatch = useDispatch();
  const audioRef = useRef(null);

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

      {/* DETAILS (FINAL CORRECT STRUCTURE) */}
      <section className="home-details">

        {/* WEDDING */}
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

        {/* RECEPTION */}
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

          {/* Wedding */}
          <div className="inv-meta-row">
            <span>January 16, 2027</span>
            <span className="inv-dot">·</span>
            <span>10:45 AM</span>
            <span className="inv-dot">·</span>
            <span>Thriprayar</span>
          </div>

          {/* Reception */}
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
        </div>
      </section>

      

      {/* FOOTER */}
      <footer className="home-footer">
        <p className="footer-brand">Nayana & Midhun</p>
        <p className="footer-sub">
          January 16 · 2027 · Corniche Convention Centre · Thriprayar, Kerala
        </p>
      </footer>
    </div>
  );
}