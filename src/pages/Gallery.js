import { useEffect, useState } from "react";
import "../App.css";

/* Add as many images as you have in /public */
const photos = [
  { src: "/img1.jpeg", alt: "Memory 1", wide: true },
  { src: "/img2.jpeg", alt: "Memory 2" },
  { src: "/img3.jpeg", alt: "Memory 3" },
  { src: "/img4.jpeg", alt: "Memory 4", wide: true },
  { src: "/img5.jpeg", alt: "Memory 5" },
  { src: "/img6.jpeg", alt: "Memory 6" },
  // { src: "/img7.jpeg", alt: "Memory 7", wide: true },
  { src: "/img8.jpeg", alt: "Memory 8" },
  { src: "/img9.jpeg", alt: "Memory 9" },
   { src: "/img10.jpeg", alt: "Memory 9" },
      { src: "/img11.jpeg", alt: "Memory 9" },
  
  

];

function Gallery() {
  const [lightbox, setLightbox] = useState(null); // index of open photo

  /* Keyboard close */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((p) => (p !== null ? (p + 1) % photos.length : null));
      if (e.key === "ArrowLeft")  setLightbox((p) => (p !== null ? (p - 1 + photos.length) % photos.length : null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Scroll fade-in */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Lock scroll when lightbox open */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="gallery-page">
      {/* ─── HEADER ───────────────────────────────────────── */}
      <div className="gallery-page-header fade-in">
        <div className="ornament" style={{ color: "rgba(201,169,110,0.5)", marginBottom: "1rem" }}>
          ✦ ✦ ✦
        </div>
        
        <h1 className="fade-in">Our Moments</h1>
        <p className="fade-in">A collection of memories we hold dear</p>

      </div>

{/* /////// */}
{/* ─── VIDEO SECTION ───────────────────────────
<div className="gallery-video-section fade-in">


  <video
    src="/video.mp4"   // put your video in public folder
    controls
    autoPlay
    muted
    loop
  />
</div> */}







      {/* ─── GRID ─────────────────────────────────────────── */}
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <img
            key={i}
            src={photo.src}
            alt={photo.alt}
            className={photo.wide ? "wide" : ""}
            onClick={() => setLightbox(i)}
            loading="lazy"
          />
        ))}
      </div>

      {/* ─── LIGHTBOX ─────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20, 12, 8, 0.95)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p - 1 + photos.length) % photos.length); }}
            style={arrowStyle("left")}
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "88vw",
              maxHeight: "86vh",
              objectFit: "contain",
              boxShadow: "0 0 80px rgba(0,0,0,0.7)",
              border: "1px solid rgba(201,169,110,0.2)",
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p + 1) % photos.length); }}
            style={arrowStyle("right")}
          >
            ›
          </button>

          {/* Counter */}
          <span
            style={{
              position: "absolute",
              bottom: "1.8rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--serif-display)",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {lightbox + 1} / {photos.length}
          </span>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "2rem",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.45)",
              fontSize: "2rem",
              cursor: "pointer",
              fontFamily: "var(--serif-body)",
              lineHeight: 1,
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#fff")}
            onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.45)")}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: "absolute",
    [side]: "1.5rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "1px solid rgba(201,169,110,0.25)",
    color: "rgba(255,255,255,0.55)",
    fontSize: "2.5rem",
    lineHeight: 1,
    width: "3rem",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "all 0.3s",
  };
}

export default Gallery;