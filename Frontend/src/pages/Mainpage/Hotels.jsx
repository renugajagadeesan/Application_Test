import { useState } from "react";
import "./Hotels.css";
import { useNavigate } from "react-router-dom";


const DESTINATIONS = [
    // Beach
    { name: "Maldives", tag: "Beach", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=700&fit=crop", price: "₹12,500" },
    { name: "Goa", tag: "Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=700&fit=crop", price: "₹4,200" },
    { name: "Phuket", tag: "Beach", img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=700&fit=crop", price: "₹8,900" },
    { name: "Bali", tag: "Beach", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=700&fit=crop", price: "₹7,600" },
    { name: "Andaman", tag: "Beach", img: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&h=700&fit=crop", price: "₹5,500" },
    // Mountains
    { name: "Manali", tag: "Mountains", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&h=700&fit=crop", price: "₹3,200" },
    { name: "Shimla", tag: "Mountains", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&h=700&fit=crop", price: "₹2,600" },
    { name: "Darjeeling", tag: "Mountains", img: "https://images.unsplash.com/photo-1582488046249-eaea4a6d47bc?w=600&h=700&fit=crop", price: "₹2,100" },
    { name: "Leh Ladakh", tag: "Mountains", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=700&fit=crop", price: "₹4,800" },
    { name: "Coorg", tag: "Mountains", img: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&h=700&fit=crop", price: "₹3,000" },
    // Luxury
    { name: "Dubai", tag: "Luxury", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=700&fit=crop", price: "₹18,000" },
    { name: "Singapore", tag: "Luxury", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=700&fit=crop", price: "₹16,500" },
    { name: "Abu Dhabi", tag: "Luxury", img: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&h=700&fit=crop", price: "₹14,200" },
    { name: "Monaco", tag: "Luxury", img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=700&fit=crop", price: "₹32,000" },
    // Nature
    { name: "Munnar", tag: "Nature", img: "https://images.unsplash.com/photo-1609766856923-5328f3b5f4da?w=600&h=700&fit=crop", price: "₹2,800" },
    { name: "Wayanad", tag: "Nature", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=700&fit=crop", price: "₹2,400" },
    { name: "Rishikesh", tag: "Nature", img: "https://images.unsplash.com/photo-1543164939-9c29a7f30f4e?w=600&h=700&fit=crop", price: "₹1,800" },
    { name: "Kaziranga", tag: "Nature", img: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&h=700&fit=crop", price: "₹3,500" },
    { name: "Spiti Valley", tag: "Nature", img: "https://images.unsplash.com/photo-1571996864038-44f6c0cd4e28?w=600&h=700&fit=crop", price: "₹2,900" },
    // City
    { name: "Paris", tag: "City", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=700&fit=crop", price: "₹22,000" },
    { name: "Tokyo", tag: "City", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=700&fit=crop", price: "₹19,500" },
    { name: "New York", tag: "City", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=700&fit=crop", price: "₹28,000" },
    { name: "London", tag: "City", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=700&fit=crop", price: "₹24,500" },
    { name: "Bangkok", tag: "City", img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=700&fit=crop", price: "₹7,200" },
    { name: "Mumbai", tag: "City", img: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&h=700&fit=crop", price: "₹5,800" },
    // Heritage
    { name: "Mysore", tag: "Heritage", img: "https://images.unsplash.com/photo-1600091166971-7f9faad6c2d5?w=600&h=700&fit=crop", price: "₹1,900" },
    { name: "Jaipur", tag: "Heritage", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=700&fit=crop", price: "₹2,300" },
    { name: "Varanasi", tag: "Heritage", img: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&h=700&fit=crop", price: "₹1,600" },
    { name: "Agra", tag: "Heritage", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=700&fit=crop", price: "₹1,750" },
    { name: "Hampi", tag: "Heritage", img: "https://images.unsplash.com/photo-1600100397608-4bef9c5f4e4e?w=600&h=700&fit=crop", price: "₹1,400" },
    { name: "Pondicherry", tag: "Heritage", img: "https://images.unsplash.com/photo-1621264448270-9ef00e88a935?w=600&h=700&fit=crop", price: "₹2,000" },
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
    const navigate = useNavigate();
    


    const filtered =
        activeFilter === "All"
            ? DESTINATIONS
            : DESTINATIONS.filter((d) => d.tag === activeFilter);

    const goToSignin = () => {
        navigate("/signup");
    };
    const backhome = () => {
        navigate("/home");
    }

    return (
        <div className="hotels-page">

            {/* ── Navbar ── */}
            <header className="header">
                <nav className="navbar">
                    <div className="nav-container">
                        <div className="logo">
              <span className="logo-icon">✈</span>
              <span className="logo-text">TravelNest</span>
            </div>

                        <ul className="nav-links">
                            <li><a href="#home" className="nav-link">Home</a></li>
                            <li><a href="/hotels" className="nav-link">Destinations</a></li>
                            <li><a href="#deals" className="nav-link">Deals</a></li>
                            <li><a href="#about" className="nav-link">About</a></li>
                            <li><a href="#contact" className="nav-link">Contact</a></li>
                        </ul>

                        <div className="nav-actions">
                            <button className="btn-secondary" onClick={goToSignin}>Sign In</button>
                            <button className="btn-secondary" onClick={backhome}>Back</button>
                        </div>

                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </nav>
            </header>

            {/* ── Hero ── */}
            <section className="hero">
                <div className="hero__inner">
                    <div className="hero__top">
                        <div>
                            <div className="hero__badge">
                                <span className="hero__badge-dot" />
                                <span className="hero__badge-text">3.2M+ properties worldwide</span>
                            </div>
                            <h1 className="hero__title">
                                Find your<br />
                                <span className="hero__title-accent">perfect stay.</span>
                            </h1>
                        </div>
                        <div className="hero__tags">
                            {["Best Price Guarantee", "Free Cancellation", "24/7 Support"].map((t) => (
                                <div key={t} className="hero__tag">{t}</div>
                            ))}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <div className="search-bar__field search-bar__field--wide">
                            <div className="search-field-label">Destination</div>
                            <input
                                className="search-input-raw"
                                placeholder="City, area or property name..."
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>
                        <div className="search-bar__divider" />
                        <div className="search-bar__field">
                            <div className="search-field-label">Check-in</div>
                            <input
                                type="date"
                                className="search-input-date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div className="search-bar__divider" />
                        <div className="search-bar__field">
                            <div className="search-field-label">Check-out</div>
                            <input
                                type="date"
                                className="search-input-date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>
                        <div className="search-bar__divider" />
                        <div className="search-bar__field">
                            <div className="search-field-label">Guests & Rooms</div>
                            <div className="search-field-value">2 Adults · 1 Room</div>
                        </div>
                        <button className="search-btn">Search →</button>
                    </div>
                </div>
            </section>

            {/* ── Main Content ── */}
            <div className="content-wrapper">

                {/* Deals */}
                <section className="deals-section">
                    <div className="section-header">
                        <h2 className="section-title">Deals for you</h2>
                        <span className="section-link">View all →</span>
                    </div>
                    <div className="deals-grid">
                        {OFFERS.map((o, i) => (
                            <div key={i} className="offer-card" style={{ background: o.color }}>
                                <div className="offer-card__icon" style={{ background: o.accent }}>🏷️</div>
                                <div className="offer-card__body">
                                    <div className="offer-card__label" style={{ color: o.accent }}>{o.label}</div>
                                    <div className="offer-card__brand">{o.brand}</div>
                                    <div className="offer-card__sub">{o.sub}</div>
                                </div>
                                <span className="offer-card__arrow">›</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Destinations */}
                <section className="destinations-section">
                    <div className="section-header">
                        <h2 className="section-title">Explore destinations</h2>
                    </div>
                    <div className="filter-pills">
                        {CATEGORIES.map((c) => (
                            <span
                                key={c}
                                className={`pill ${c === activeFilter ? "active" : ""}`}
                                onClick={() => setActiveFilter(c)}
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                    <div className="destinations-grid">
                        {filtered.map((d, i) => (
                            <div
                                key={d.name}
                                className={`dest-card ${i === 0 ? "dest-card--featured" : "dest-card--normal"}`}
                            >
                                <img src={d.img} alt={d.name} />
                                <div className="dest-overlay" />
                                <div className="dest-info">
                                    <div className="tag-badge">{d.tag}</div>
                                    <div className={`dest-name ${i === 0 ? "dest-name--featured" : "dest-name--normal"}`}>
                                        {d.name}
                                    </div>
                                    <div className="dest-price">
                                        <span className="dest-price__from">from</span>
                                        <span className="dest-price__amount">{d.price}</span>
                                        <span className="dest-price__night">/night</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* ── Footer ── */}
            <footer className="footer">
                <div className="footer__inner">
                    <h3 className="footer__title">Ready to explore?</h3>
                    <p className="footer__sub">Join 10M+ travellers who book smarter with goibibo.</p>
                    <div className="footer__actions">
                        <button className="footer__btn-primary">Search Hotels</button>
                        <button className="footer__btn-secondary">View Offers</button>
                    </div>
                    <p className="footer__copy">© 2026 Goibibo. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}