import { useEffect } from "react";
import "../App.css";

const stories = [
  {
    id: "01",
    title: "First Meet 💫",
    img: "/img1.jpeg",
    alt: "First meeting",
    text:
      "Our story started with a simple moment — a chance encounter that neither of us expected. One glance, one smile, and something quietly shifted in both our worlds. It was the beginning of everything.",
  },
  {
    id: "02",
    title: "Growing Closer 🌸",
    img: "/img2.jpeg",
    alt: "Growing closer",
    text:
      "What started as friendly conversations soon became long talks that stretched past midnight. We discovered how much we had in common — the same dreams, the same laughter, the same kind of silence that felt comfortable.",
    reverse: true,
  },
  {
    id: "03",
    title: "Love Story 💞",
    img: "/img3.jpeg",
    alt: "Love story",
    text:
      "From friendship to forever — every shared laugh, every quiet moment, every little adventure woven into the fabric of our days. We weren't just falling in love; we were building a life, one memory at a time.",
  },
  {
    id: "04",
    title: "The Promise 💍",
    img: "/img4.jpeg",
    alt: "The proposal",
    text:
      "And then came the moment that changed everything. A quiet evening, a heartfelt question, and two people who knew — with absolute certainty — that this was it. This was home.",
    reverse: true,
  },
];

function Story() {
  /* Scroll-triggered fade-in */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="story-page">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="story-hero">
        <div className="ornament" style={{ color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}>
          ✦ ✦ ✦
        </div>
        <h1>Our Story</h1>
        <p>The journey that brought us here</p>
      </section>

      {/* ─── STORY ENTRIES ────────────────────────────────── */}
      {stories.map((s) => (
        <article
          key={s.id}
          className={`story-entry${s.reverse ? " reverse" : ""}`}
        >
          <img src={s.img} alt={s.alt} />
          <div className="story-text">
            <span className="story-num fade-in">{s.id}</span>
            <h2 className="fade-in">{s.title}</h2>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "var(--gold-light)",
                marginBottom: "1.2rem",
                opacity: 0.6,
              }}
            />
            <p className="fade-in">{s.text}</p>
          </div>
        </article>
      ))}

      {/* ─── CLOSING ──────────────────────────────────────── */}
      <section
        className="full"
        style={{ background: "var(--blush)", padding: "6rem 2rem" }}
      >
        <div className="ornament">✦ ✦ ✦</div>
        <h2
          className="fade-in"
          style={{ marginTop: "1.2rem", fontStyle: "italic", fontFamily: "var(--serif-body)" }}
        >
          And now — forever begins 🥂
        </h2>
        <p
          className="fade-in"
          style={{
            fontFamily: "var(--serif-alt)",
            fontStyle: "italic",
            color: "var(--text-muted)",
            marginTop: "1rem",
            maxWidth: "440px",
            margin: "1rem auto 0",
            fontSize: "1.05rem",
          }}
        >
          January 16, 2027 · Corniche Convention Centre, Triprayar
        </p>
      </section>
    </div>
  );
}

export default Story;