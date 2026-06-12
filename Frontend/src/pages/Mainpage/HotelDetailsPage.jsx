import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HotelDetailsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { hotel, destination } = state || {};

  if (!hotel) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
        <h2>No Hotel Selected</h2>
        <button 
          onClick={() => navigate('/home')}
          style={{ padding: "10px 20px", background: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}
        >
          Go Back Home
        </button>
      </div>
    );
  }

  // Format valid imageUrl
  const imageUrl = hotel.image || hotel.photo;
  const validImageUrl = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `https:${imageUrl}`
    : "https://images.unsplash.com/photo-1566073771259-6a8506099945";

  // Mock secondary images for the grid
  const sideImage1 = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b";
  const sideImage2 = "https://images.unsplash.com/photo-1590490360182-c33d57733427";

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: "50px" }}>
      
      {/* Header Area */}
      <div style={{ background: "white", padding: "15px 40px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#666" }}>
        <span style={{ cursor: "pointer", color: "#007BFF" }} onClick={() => navigate('/home')}>Home</span> {'>'} 
        <span style={{ cursor: "pointer", color: "#007BFF" }} onClick={() => navigate(-1)}>Hotels in {destination?.name || "Destination"}</span> {'>'} 
        <span style={{ color: "#333" }}>{hotel.name}</span>
      </div>

      <div style={{ maxWidth: "1200px", margin: "30px auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px", padding: "0 20px" }}>
        
        {/* Left Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Title Area */}
          <div style={{ background: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h1 style={{ margin: 0, fontSize: "28px", color: "#000" }}>{hotel.name}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#eb4b72", fontWeight: "bold", cursor: "pointer" }}>
                <span>♡</span> Wishlist
              </div>
            </div>

            {/* Images Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "65% 35%", gap: "10px", marginTop: "20px", height: "400px" }}>
              <img src={validImageUrl} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px 0 0 8px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <img src={sideImage1} alt="Room" style={{ width: "100%", height: "calc(50% - 5px)", objectFit: "cover", borderRadius: "0 8px 0 0" }} />
                <img src={sideImage2} alt="Amenities" style={{ width: "100%", height: "calc(50% - 5px)", objectFit: "cover", borderRadius: "0 0 8px 0" }} />
              </div>
            </div>
          </div>

          {/* About Property */}
          <div style={{ background: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>About Property</h2>
            <p style={{ color: "#4a4a4a", lineHeight: "1.6", fontSize: "15px" }}>
              Situated in the heart of {hotel.city || 'the city'} and boasting a private and comfortable stay experience, {hotel.name} has premium facilities throughout the property. This {hotel.type || 'property'} offers incredible access to local attractions and features top-class hospitality.
              <span style={{ color: "#008cff", cursor: "pointer", marginLeft: "5px" }}>...Read more</span>
            </p>
          </div>

          {/* Amenities */}
          <div style={{ background: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Amenities</h2>
            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", color: "#4a4a4a", fontSize: "14px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>🍽️ Dining Area</span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>❄️ Air Conditioning</span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>📶 Free Wi-Fi</span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>🧹 Daily Housekeeping</span>
              <span style={{ color: "#008cff", cursor: "pointer", fontWeight: "bold" }}>View All</span>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Booking Card */}
          <div style={{ background: "white", padding: "25px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", border: "1px solid #e7e7e7" }}>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>Premium Stay with Free Cancellation</h3>
            <p style={{ color: "#666", fontSize: "14px", margin: "0 0 20px 0" }}>Fits 2 Adults</p>
            
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", marginBottom: "5px" }}>
              <span style={{ fontSize: "28px", fontWeight: "800", color: "#000" }}>₹ {hotel.price || Math.floor(Math.random() * 5000 + 1000)}</span>
              <span style={{ fontSize: "12px", color: "#777", marginBottom: "6px" }}>+ ₹ {Math.floor(Math.random() * 500 + 100)} taxes & fees</span>
            </div>
            <p style={{ fontSize: "12px", color: "#008cff", fontWeight: "bold", margin: "0 0 20px 0" }}>Per Night</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ flex: 1, padding: "12px", background: "#008cff", color: "white", border: "none", borderRadius: "30px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
                VIEW THIS COMBO
              </button>
              <button style={{ flex: 1, padding: "12px", background: "white", color: "#008cff", border: "1px solid #008cff", borderRadius: "30px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
                VIEW OTHER OPTIONS
              </button>
            </div>
          </div>

          {/* Rating Card */}
          <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ background: "#065af3", color: "white", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "18px" }}>
                {hotel.rating || 4.2}
              </div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px", color: "#008cff" }}>Very Good</div>
                <div style={{ fontSize: "12px", color: "#777" }}>({hotel.reviews || Math.floor(Math.random() * 200 + 50)} ratings)</div>
              </div>
            </div>
            <span style={{ color: "#008cff", fontSize: "14px", cursor: "pointer" }}>All Reviews</span>
          </div>

          {/* Map Card */}
          <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", gap: "15px" }}>
            <div style={{ width: "60px", height: "60px", background: "#e8eff5", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              📍
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0", fontSize: "15px" }}>{hotel.city || 'Location'}</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#4a4a4a", lineHeight: "1.4" }}>
                {hotel.address || 'Central location'}
              </p>
            </div>
            <div style={{ color: "#008cff", fontSize: "13px", cursor: "pointer", alignSelf: "center", whiteSpace: "nowrap" }}>
              See on Map
            </div>
          </div>

          {/* Promotion Card */}
          <div style={{ background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #ffd8c4" }}>
            <div style={{ border: "1px solid #ff9d00", color: "#ff9d00", display: "inline-block", padding: "3px 8px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold", marginBottom: "10px" }}>
              Limited Time Sale
            </div>
            <p style={{ margin: 0, fontSize: "13px", color: "#4a4a4a", lineHeight: "1.5" }}>
              Special discount available on this property. Book by end of the month to save BIG!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HotelDetailsPage;
