import { useState } from "react";

const DESTINATIONS = [
  { name: "Maldives", tag: "Beach", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=700&fit=crop", price: "₹12,500" },
  { name: "Manali", tag: "Mountains", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=700&fit=crop", price: "₹3,200" },
  { name: "Dubai", tag: "Luxury", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=700&fit=crop", price: "₹18,000" },
  { name: "Munnar", tag: "Nature", img: "https://images.unsplash.com/photo-1609766856923-5328f3b5f4da?w=600&h=700&fit=crop", price: "₹2,800" },
  { name: "Paris", tag: "City", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=700&fit=crop", price: "₹22,000" },
  { name: "Mysore", tag: "Heritage", img: "https://images.unsplash.com/photo-1600091166971-7f9faad6c2d5?w=600&h=700&fit=crop", price: "₹1,900" },
];

const CATEGORIES = ["All", "Beach", "Mountains", "Luxury", "Nature", "City", "Heritage"];

const OFFERS = [
  { label: "40% OFF", brand: "Sarovar Hotels", sub: "Limited period", color: "#fff3ee", accent: "#ff5c28" },
  { label: "10% OFF", brand: "Summit Resorts", sub: "Till 27 Mar '26", color: "#eef3ff", accent: "#2563eb" },
  { label: "15% OFF", brand: "Ginger Hotels", sub: "Across India", color: "#eefaf4", accent: "#059669" },
];

const NAV = ["Flights", "Hotels", "Trains", "Cabs", "Holidays", "Forex"];

export default function Hotels() {
  const [activeTab, setActiveTab] = useState("Hotels");
  const [activeFilter, setActiveFilter] = useState("All");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("2026-03-26");
  const [checkOut, setCheckOut] = useState("2026-03-27");

  const filtered = activeFilter === "All" ? DESTINATIONS : DESTINATIONS.filter(d => d.tag === activeFilter);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f8f7f4", color: "#111" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-link { font-size: 13px; font-weight: 500; color: #777; cursor: pointer; padding: 6px 0; position: relative; transition: color 0.2s; }
        .nav-link:hover { color: #111; }
        .nav-link.active { color: #111; font-weight: 700; }
        .nav-link.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: #111; border-radius: 2px; }

        .pill { display: inline-flex; align-items: center; padding: 8px 20px; border-radius: 999px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid #e0e0e0; background: white; color: #666; transition: all 0.18s; }
        .pill:hover { border-color: #111; color: #111; }
        .pill.active { background: #111; color: white; border-color: #111; }

        .search-field-label { font-size: 10px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: #aaa; margin-bottom: 4px; }
        .search-field-value { font-size: 15px; font-weight: 600; color: #111; }
        .search-input-raw { border: none; outline: none; background: transparent; font-size: 15px; font-weight: 600; color: #111; font-family: inherit; width: 100%; }
        .search-input-raw::placeholder { color: #c0c0c0; font-weight: 400; }

        .dest-card { border-radius: 20px; overflow: hidden; position: relative; cursor: pointer; }
        .dest-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
        .dest-card:hover img { transform: scale(1.06); }
        .dest-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%); }
        .dest-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; }

        .offer-card { background: white; border-radius: 16px; padding: 22px; display: flex; align-items: center; gap: 16px; border: 1px solid #ebebeb; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .offer-card:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.07); }

        .search-btn { background: #111; color: white; border: none; padding: 0 32px; height: 52px; border-radius: 14px; font-size: 14px; font-weight: 700; letter-spacing: 0.03em; cursor: pointer; transition: background 0.2s, transform 0.15s; white-space: nowrap; font-family: inherit; flex-shrink: 0; }
        .search-btn:hover { background: #333; }
        .search-btn:active { transform: scale(0.98); }

        .vdiv { width: 1px; height: 38px; background: #e5e5e5; flex-shrink: 0; }

        .tag-badge { display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.3); color: white; font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }

        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        input[type="date"] { border: none; outline: none; background: transparent; font-size: 15px; font-weight: 600; color: #111; font-family: inherit; cursor: pointer; }
      `}</style>

      {/* Navbar */}
      <header style={{ background: "white", borderBottom: "1px solid #efefef", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: 40, height: 62 }}>
          <div style={{ flexShrink: 0 }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 23, fontWeight: 800, color: "#ff5c28", letterSpacing: "-0.03em" }}>go</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 23, fontWeight: 800, color: "#111", letterSpacing: "-0.03em" }}>ibibo</span>
          </div>
          <nav style={{ display: "flex", gap: 28, flex: 1 }}>
            {NAV.map(n => <span key={n} className={`nav-link ${n === activeTab ? "active" : ""}`} onClick={() => setActiveTab(n)}>{n}</span>)}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 13, color: "#777", fontWeight: 500, cursor: "pointer" }}>My Trips</span>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#ff5c28", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>R</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: "white", padding: "52px 32px 44px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 38 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} className="pulse" />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", letterSpacing: "0.07em", textTransform: "uppercase" }}>3.2M+ properties worldwide</span>
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.04em" }}>
                Find your<br /><span style={{ color: "#ff5c28" }}>perfect stay.</span>
              </h1>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {["Best Price Guarantee", "Free Cancellation", "24/7 Support"].map(t => (
                <div key={t} style={{ background: "#f4f4f1", borderRadius: 10, padding: "9px 16px", fontSize: 12, fontWeight: 600, color: "#555" }}>{t}</div>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div style={{ background: "#f8f7f4", borderRadius: 20, padding: "20px 24px", display: "flex", alignItems: "center", gap: 18, border: "1px solid #e8e8e8" }}>
            <div style={{ flex: 2.5 }}>
              <div className="search-field-label">Destination</div>
              <input className="search-input-raw" placeholder="City, area or property name..." value={destination} onChange={e => setDestination(e.target.value)} />
            </div>
            <div className="vdiv" />
            <div style={{ flex: 1 }}>
              <div className="search-field-label">Check-in</div>
              <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
            </div>
            <div className="vdiv" />
            <div style={{ flex: 1 }}>
              <div className="search-field-label">Check-out</div>
              <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
            </div>
            <div className="vdiv" />
            <div style={{ flex: 1 }}>
              <div className="search-field-label">Guests & Rooms</div>
              <div className="search-field-value">2 Adults · 1 Room</div>
            </div>
            <button className="search-btn">Search →</button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Deals */}
        <section style={{ padding: "44px 0 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Deals for you</h2>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#ff5c28", cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {OFFERS.map((o, i) => (
              <div key={i} className="offer-card" style={{ background: o.color }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: o.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>🏷️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: o.accent }}>{o.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginTop: 1 }}>{o.brand}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{o.sub}</div>
                </div>
                <span style={{ color: "#ccc", fontSize: 20 }}>›</span>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations */}
        <section style={{ paddingBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Explore destinations</h2>
          </div>

          <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => <span key={c} className={`pill ${c === activeFilter ? "active" : ""}`} onClick={() => setActiveFilter(c)}>{c}</span>)}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "auto", gap: 14 }}>
            {filtered.map((d, i) => (
              <div
                key={d.name}
                className="dest-card"
                style={{
                  gridRow: i === 0 ? "span 2" : "span 1",
                  height: i === 0 ? "100%" : 230,
                  minHeight: i === 0 ? 474 : 230,
                }}
              >
                <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="dest-overlay" />
                <div className="dest-info">
                  <div className="tag-badge">{d.tag}</div>
                  <div style={{ fontSize: i === 0 ? 28 : 20, fontWeight: 800, color: "white", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>{d.name}</div>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>from</span>
                    <span style={{ fontSize: 17, fontWeight: 700, color: "white" }}>{d.price}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>/night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <footer style={{ background: "#111", padding: "60px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "white", letterSpacing: "-0.03em", marginBottom: 12 }}>Ready to explore?</h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 28 }}>Join 10M+ travellers who book smarter with goibibo.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={{ background: "#ff5c28", color: "white", border: "none", padding: "14px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Search Hotels</button>
            <button style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.18)", padding: "14px 32px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>View Offers</button>
          </div>
          <p style={{ marginTop: 44, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 Goibibo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}