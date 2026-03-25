import { useState, useEffect, useRef, useCallback } from "react";

const SLIDES = [
  {
    tag: "Exploration",
    vol: "Vol. 12, No. 4",
    readTime: "8 min read",
    headline: ["Where the ", "silence", " speaks louder than the summit"],
    deck: "High altitudes strip away the noise of modern life — what remains is a clarity most people only glimpse. Three climbers share what they discovered at 5,400 metres.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Mountain landscape",
    author: "Elena Vargas",
    avatar: "https://i.pravatar.cc/64?img=12",
  },
  {
    tag: "Culture",
    vol: "Feature",
    readTime: "12 min read",
    headline: ["The ", "lost art", " of going nowhere in particular"],
    deck: "Aimless wandering was once a philosophical practice. A new generation is rediscovering what the flâneur knew — that the city reveals itself only to those with nowhere to be.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
    imageAlt: "Misty forest lake",
    author: "Theo Nakamura",
    avatar: "https://i.pravatar.cc/64?img=5",
  },
  {
    tag: "Design",
    vol: "Essay",
    readTime: "6 min read",
    headline: ["Film isn't ", "nostalgia", " — it's a philosophy of attention"],
    deck: "When every phone can take a thousand photos a day, choosing to load 36 frames becomes an act of radical intentionality. The analog revival is really about learning to see again.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    imageAlt: "Photography darkroom",
    author: "Simone Park",
    avatar: "https://i.pravatar.cc/64?img=33",
  },
  {
    tag: "Living",
    vol: "Interview",
    readTime: "10 min read",
    headline: ["Designing for ", "slowness", " in a world built for speed"],
    deck: "Architect Jun Tanaka has spent a decade building spaces that deliberately resist efficiency. Her homes don't optimise — they breathe. We sat down to understand why.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    imageAlt: "Cozy interior",
    author: "Marcus Chen",
    avatar: "https://i.pravatar.cc/64?img=47",
  },
];

const AUTOPLAY_MS = 5000;

const s = {
  // tokens
  bg: "#0d0d0d",
  surface: "#151515",
  border: "rgba(255,255,255,0.08)",
  accent: "#e8c97e",
  text: "#f0ece4",
  muted: "rgba(240,236,228,0.45)",

  // layout
  wrap: {
    background: "#0d0d0d",
    color: "#f0ece4",
    fontFamily: "'DM Sans', sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  masthead: {
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 18,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    marginBottom: 40,
    animation: "fadeDown 0.7s ease both",
  },
  mastheadLogo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.05rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#e8c97e",
  },
  mastheadDate: {
    fontSize: "0.72rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(240,236,228,0.45)",
  },
  carouselWrap: {
    width: "100%",
    maxWidth: 1000,
    position: "relative",
  },
  viewport: {
    overflow: "hidden",
    borderRadius: 4,
  },
  controlsRow: {
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    animation: "fadeUp 0.7s 0.3s ease both",
  },
};

export default function BlogCarousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const fillRef = useRef(null);
  const total = SLIDES.length;

  const go = useCallback((n) => {
    setCurrent(((n % total) + total) % total);
  }, [total]);

  // Autoplay + progress bar
  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.transition = "none";
      fillRef.current.style.width = "0%";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (fillRef.current) {
            fillRef.current.style.transition = `width ${AUTOPLAY_MS}ms linear`;
            fillRef.current.style.width = "100%";
          }
        });
      });
    }
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(intervalRef.current);
  }, [current, total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, go]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-img { transition: transform 0.9s ease; filter: brightness(0.88) saturate(0.9); }
        .slide-card:hover .slide-img { transform: scale(1.04); }
        .read-btn:hover { background: #d4b468 !important; transform: translateY(-1px); }
        .arrow-btn:hover { border-color: #e8c97e !important; color: #e8c97e !important; background: rgba(232,201,126,0.05) !important; }
        @media (max-width: 660px) {
          .slide-card { grid-template-columns: 1fr !important; min-height: auto !important; }
          .slide-img-wrap { height: 220px !important; }
          .slide-overlay { background: linear-gradient(to bottom, transparent 60%, #151515 100%) !important; }
          .slide-content { padding: 28px 24px 32px !important; }
          .slide-headline { font-size: 1.5rem !important; }
        }
      `}</style>

      <div style={s.wrap}>
        {/* Masthead */}
        <header style={s.masthead}>
          <div style={s.mastheadLogo}>The Journal</div>
          <div style={s.mastheadDate}>{today}</div>
        </header>

        {/* Carousel */}
        <div style={s.carouselWrap}>
          <div style={s.viewport}>
            <div
              style={{
                display: "flex",
                transition: "transform 0.7s cubic-bezier(0.77,0,0.175,1)",
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {SLIDES.map((slide, i) => (
                <article
                  key={i}
                  className="slide-card"
                  style={{
                    minWidth: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    minHeight: 520,
                    background: s.surface,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Image side */}
                  <div
                    className="slide-img-wrap"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <img
                      className="slide-img"
                      src={slide.image}
                      alt={slide.imageAlt}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {/* overlay */}
                    <div
                      className="slide-overlay"
                      style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: "linear-gradient(to right, transparent 60%, #151515 100%)",
                      }}
                    />
                    {/* tag */}
                    <span style={{
                      position: "absolute", top: 22, left: 22,
                      fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      padding: "5px 12px", border: `1px solid ${s.accent}`,
                      color: s.accent, background: "rgba(13,13,13,0.6)", backdropFilter: "blur(6px)",
                    }}>
                      {slide.tag}
                    </span>
                  </div>

                  {/* Content side */}
                  <div
                    className="slide-content"
                    style={{
                      padding: "52px 44px 44px 36px",
                      display: "flex", flexDirection: "column", justifyContent: "space-between",
                      position: "relative",
                    }}
                  >
                    {/* vertical rule */}
                    <div style={{
                      position: "absolute", left: 0, top: 44, bottom: 44, width: 2,
                      background: `linear-gradient(to bottom, transparent, ${s.accent}, transparent)`,
                      opacity: 0.5,
                    }} />

                    <div>
                      {/* meta */}
                      <div style={{
                        display: "flex", alignItems: "center", gap: 14,
                        fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase",
                        color: s.muted, marginBottom: 20,
                      }}>
                        <span>{slide.vol}</span>
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: s.accent, display: "inline-block" }} />
                        <span>{slide.readTime}</span>
                      </div>

                      {/* headline */}
                      <h2
                        className="slide-headline"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "clamp(1.7rem, 2.8vw, 2.5rem)",
                          fontWeight: 900, lineHeight: 1.12,
                          letterSpacing: "-0.01em", marginBottom: 20,
                        }}
                      >
                        {slide.headline[0]}
                        <em style={{ fontStyle: "italic", color: s.accent }}>{slide.headline[1]}</em>
                        {slide.headline[2]}
                      </h2>

                      {/* deck */}
                      <p style={{
                        fontSize: "0.88rem", lineHeight: 1.7, color: s.muted,
                        fontWeight: 300, marginBottom: 32, flexGrow: 1,
                      }}>
                        {slide.deck}
                      </p>
                    </div>

                    {/* footer */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                          src={slide.avatar}
                          alt={slide.author}
                          style={{
                            width: 32, height: 32, borderRadius: "50%",
                            objectFit: "cover", border: `1px solid ${s.border}`,
                          }}
                        />
                        <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: s.muted }}>
                          {slide.author}
                        </span>
                      </div>
                      <button
                        className="read-btn"
                        style={{
                          fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase",
                          color: s.bg, background: s.accent, border: "none",
                          padding: "10px 22px", cursor: "pointer",
                          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                          transition: "background 0.2s, transform 0.15s",
                        }}
                      >
                        Read Story
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ width: "100%", height: 2, background: s.border, overflow: "hidden" }}>
            <div
              ref={fillRef}
              style={{ height: "100%", background: s.accent, width: "0%" }}
            />
          </div>
        </div>

        {/* Controls */}
        <div style={s.controlsRow}>
          {/* Counter */}
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", color: s.muted }}>
            <span style={{ color: s.accent, fontWeight: 500 }}>
              {String(current + 1).padStart(2, "0")}
            </span>
            {" / "}
            {String(total).padStart(2, "0")}
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: 6, height: 6, borderRadius: "50%", cursor: "pointer",
                  border: `1px solid ${i === current ? s.accent : "rgba(255,255,255,0.15)"}`,
                  background: i === current ? s.accent : s.border,
                  transform: i === current ? "scale(1.3)" : "scale(1)",
                  transition: "all 0.3s", padding: 0,
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: "flex", gap: 10 }}>
            {["←", "→"].map((arrow, i) => (
              <button
                key={arrow}
                className="arrow-btn"
                onClick={() => go(i === 0 ? current - 1 : current + 1)}
                aria-label={i === 0 ? "Previous" : "Next"}
                style={{
                  width: 42, height: 42, border: `1px solid ${s.border}`,
                  background: "transparent", color: s.text, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1rem", transition: "all 0.2s",
                }}
              >
                {arrow}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}