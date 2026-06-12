import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DESTINATIONS } from "./Data/destinations";

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const DestinationPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loadingDest, setLoadingDest] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const resolveDestinationAndHotels = async () => {
      try {
        setLoadingDest(true);
        // 1. Try to find in static DESTINATIONS list
        let foundDest = DESTINATIONS.find((d) => toSlug(d.name) === slug);

        // 2. If not in static list, query backend dynamic destinations database
        if (!foundDest) {
          try {
            const res = await axios.get("http://localhost:5000/api/auth/destinations");
            const dbDestinations = res.data || [];
            const matched = dbDestinations.find(
              (d) => toSlug(d.city) === slug || toSlug(d.city || "").replace(/-/g, "") === slug.replace(/-/g, "")
            );
            if (matched) {
              foundDest = {
                name: matched.city,
                apiName: matched.city,
                location: matched.country,
                price: `₹${matched.price.toLocaleString("en-IN")}`,
                img: matched.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                tag: "Popular",
                rating: matched.rating || 4.5
              };
            }
          } catch (apiErr) {
            console.error("Failed to fetch dynamic destinations from backend:", apiErr);
          }
        }

        // 3. Graceful fallback if completely unresolvable to prevent page crash
        if (!foundDest) {
          const displayName = slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          foundDest = {
            name: displayName,
            apiName: displayName,
            location: "Global",
            price: "₹5,000",
            img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            tag: "Explore",
            rating: 4.5
          };
        }

        setDestination(foundDest);
        setLoadingDest(false);

        // Fetch hotels for the resolved destination
        await fetchHotels(foundDest.apiName || foundDest.name);
      } catch (err) {
        console.error("Error resolving destination:", err);
        setLoadingDest(false);
      }
    };

    resolveDestinationAndHotels();
  }, [slug]);

  const fetchHotels = async (cityName) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/auth/hotels", {
        params: { city: cityName }
      });
      let hotelsData = res.data?.hotels || res.data?.data || [];
      setHotels(hotelsData);
    } catch (err) {
      console.error(err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  if (loadingDest) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f4f4f4", fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold", color: "#001e3d", marginBottom: "15px" }}>Loading Destination details...</div>
        <div style={{ width: "50px", height: "50px", border: "5px solid #ddd", borderTop: "5px solid #007BFF", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!destination) {
    return (
      <div style={{ padding: "40px", textAlign: "center", fontFamily: "system-ui" }}>
        <h2>Destination not found</h2>
        <button onClick={() => navigate('/home')} style={{ padding: "10px 20px", background: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", paddingBottom: "50px" }}>

      {/* Top Search Bar (Mock) */}
     <div
  style={{
    background: "linear-gradient(to right, #001e3d, #004b8a)",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <div
    style={{
      background: "white",
      padding: "10px",
      borderRadius: "8px",
      display: "flex",
      gap: "15px",
      alignItems: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      flexWrap: "wrap",
    }}
  >
    {/* Destination */}
    <div style={{ borderRight: "1px solid #ddd", paddingRight: "15px" }}>
      <div
        style={{
          fontSize: "10px",
          color: "#777",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        CITY, AREA OR PROPERTY
      </div>
      <select
        style={{
          border: "none",
          outline: "none",
          fontWeight: "bold",
          fontSize: "15px",
          color: "#000",
          background: "transparent",
        }}
      >
        <option>Madurai</option>
        <option>Chennai</option>
        <option>Bangalore</option>
        <option>Mumbai</option>
      </select>
    </div>

    {/* Check In */}
    <div style={{ borderRight: "1px solid #ddd", paddingRight: "15px" }}>
      <div
        style={{
          fontSize: "10px",
          color: "#777",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        CHECK-IN
      </div>
      <input
        type="date"
        style={{
          border: "none",
          outline: "none",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      />
    </div>

    {/* Check Out */}
    <div style={{ borderRight: "1px solid #ddd", paddingRight: "15px" }}>
      <div
        style={{
          fontSize: "10px",
          color: "#777",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        CHECK-OUT
      </div>
      <input
        type="date"
        style={{
          border: "none",
          outline: "none",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      />
    </div>

    {/* Guests */}
    <div style={{ borderRight: "1px solid #ddd", paddingRight: "15px" }}>
      <div
        style={{
          fontSize: "10px",
          color: "#777",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        ROOMS & GUESTS
      </div>
      <select
        style={{
          border: "none",
          outline: "none",
          fontWeight: "bold",
          fontSize: "15px",
          color: "#000",
          background: "transparent",
        }}
      >
        <option>1 Room, 2 Adults</option>
        <option>1 Room, 1 Adult</option>
        <option>2 Rooms, 4 Adults</option>
        <option>3 Rooms, 6 Adults</option>
      </select>
    </div>

    {/* Search Button */}
    <button
      style={{
        background: "#3971e4",
        color: "white",
        border: "none",
        padding: "12px 30px",
        borderRadius: "30px",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        marginLeft: "10px",
      }}
    >
      SEARCH
    </button>
  </div>
</div>

      {/* Breadcrumb Header */}
      <div style={{ background: "#f4f4f4", padding: "15px 40px", fontSize: "12px", color: "#666" }}>
        <span style={{ cursor: "pointer", color: "#007BFF" }} onClick={() => navigate('/home')}>Home</span> {'>'} Hotels in {destination.location} {'>'} <span style={{ color: "#333" }}>Hotels in {destination.name}</span>
      </div>

      {/* Title & Sorting Bar */}
      <div style={{ padding: "0 40px" }}>
        <h1 style={{ margin: "0 0 15px 0", fontSize: "24px", color: "#000" }}>Hotels in {destination.name}</h1>
        <div style={{ background: "white", padding: "12px 20px", borderRadius: "8px", display: "flex", gap: "20px", fontSize: "13px", color: "#555", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", alignItems: "center" }}>
          <span style={{ fontWeight: "bold", background: "#e8f2ff", padding: "5px 15px", borderRadius: "20px", color: "#007BFF" }}>Popularity</span>
          <span style={{ cursor: "pointer" }}>Price (Low to High)</span>
          <span style={{ cursor: "pointer" }}>Price (High to Low)</span>
          <span style={{ cursor: "pointer" }}>User Rating (Highest)</span>
        </div>
      </div>

      <div style={{ maxWidth: "100%", margin: "20px auto", display: "flex", gap: "20px", padding: "0 40px" }}>
        
        {/* Left Sidebar (Filters) */}
        <div style={{ width: "250px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
           <div style={{ background: "white", borderRadius: "8px", overflow: "hidden", border: "1px solid #e7e7e7", cursor: "pointer" }}>
             <div style={{ height: "120px", background: "#ddd", position: "relative" }}>
                 <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} alt="Map" />
                 <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", background: "white", padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", color: "#008cff", boxShadow: "0 2px 5px rgba(0,0,0,0.2)", whiteSpace: "nowrap" }}>
                    EXPLORE ON MAP 📍
                 </div>
             </div>
           </div>

           <div style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e7e7e7" }}>
             <h3 style={{ fontSize: "15px", margin: "0 0 15px 0", color: "#000" }}>Suggested For You</h3>
             <label style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#4a4a4a", marginBottom: "12px", cursor: "pointer" }}><input type="checkbox" /> Early Bird Deals</label>
             <label style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#4a4a4a", marginBottom: "12px", cursor: "pointer" }}><input type="checkbox" /> 5 Star (12)</label>
             <label style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#4a4a4a", marginBottom: "12px", cursor: "pointer" }}><input type="checkbox" /> 4 Star (45)</label>
             <label style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#4a4a4a", marginBottom: "12px", cursor: "pointer" }}><input type="checkbox" /> Breakfast Included</label>
           </div>
        </div>

        {/* Right Main List */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "20px", margin: "0 0 5px 0", color: "#000" }}>Showing Properties in {destination.name}</h2>
            
            {loading && <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>Loading hotels...</div>}
            
            {!loading && hotels.length === 0 && (
                <div style={{ background: "white", padding: "40px", borderRadius: "8px", textAlign: "center" }}>
                   <img src="https://images.unsplash.com/photo-1584144574933-bf9a4c58f9df" alt="Not found" style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px", opacity: 0.8 }} />
                   <h3 style={{ margin: "0 0 10px 0", color: "#000" }}>No properties found</h3>
                   <p style={{ color: "#777", margin: 0 }}>Try adjusting your filters or destination.</p>
                </div>
            )}

            {hotels.map((hotel, index) => {
              const imageUrl = hotel.image || hotel.photo;
              const validImageUrl = imageUrl
                  ? imageUrl.startsWith("http")
                    ? imageUrl
                    : `https:${imageUrl}`
                  : "https://images.unsplash.com/photo-1566073771259-6a8506099945";

              const rating = hotel.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
              const price = hotel.price || Math.floor(Math.random() * 8000 + 1500);

              return (
              <div 
                  key={index} 
                  onClick={() => navigate(`/hotel/${hotel.id || index}`, { state: { hotel, destination } })}
                  style={{ background: "white", borderRadius: "8px", border: "1px solid #e7e7e7", overflow: "hidden", display: "flex", cursor: "pointer", transition: "box-shadow 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                  {/* Image Section */}
                  <div style={{ width: "300px", height: "100%", minHeight: "230px", position: "relative" }}>
                     <img src={validImageUrl} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c3"; }} />
                     <div style={{ position: "absolute", bottom: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold" }}>
                        10 Photos & Videos →
                     </div>
                  </div>

                  {/* Details Section */}
                  <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column" }}>
                     <div style={{ display: "flex", justifyContent: "space-between", height: "100%" }}>
                         <div style={{ flex: 1, paddingRight: "20px" }}>
                             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                 <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#000" }}>{hotel.name}</h3>
                                 <span style={{ fontSize: "14px", color: "#ccc" }}>♡</span>
                             </div>
                             <p style={{ margin: "0 0 10px 0", fontSize: "13px", color: "#008cff" }}>
                                 {hotel.city || destination.name} <span style={{ color: "#777" }}>| {hotel.address || "Central area"}</span>
                             </p>
                             <div style={{ background: "#f2f2f2", display: "inline-block", padding: "5px 10px", borderRadius: "4px", fontSize: "13px", fontWeight: "bold", marginBottom: "15px", color: "#333" }}>
                               Couple Friendly
                             </div>

                             <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px", color: "#259a58" }}>
                                 <li style={{ marginBottom: "5px" }}>✓ Free Cancellation till check-in</li>
                                 <li>✓ Book with ₹0 Payment</li>
                             </ul>
                         </div>
                         
                         {/* Price & Rating Section */}
                         <div style={{ width: "150px", borderLeft: "1px solid #eee", paddingLeft: "20px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
                             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                 <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                     <span style={{ fontWeight: "bold", color: "#008cff", fontSize: "14px" }}>Very Good</span>
                                     <span style={{ background: "#0b58e4", color: "white", padding: "4px 6px", borderRadius: "6px", fontWeight: "bold", fontSize: "14px" }}>{rating}</span>
                                 </div>
                                 <span style={{ fontSize: "11px", color: "#777", marginTop: "5px" }}>({Math.floor(Math.random()*300+10)} Ratings)</span>
                             </div>

                             <div style={{ textAlign: "right", marginTop: "20px" }}>
                                 <div style={{ background: "#ffedd1", color: "#d17700", fontSize: "11px", padding: "2px 6px", borderRadius: "10px", display: "inline-block", marginBottom: "5px", fontWeight: "bold" }}>Limited Time Offer</div>
                                 <div style={{ fontSize: "12px", color: "#777", textDecoration: "line-through", marginBottom: "2px" }}>₹ {Math.floor(price * 1.3)}</div>
                                 <div style={{ fontSize: "24px", fontWeight: "bold", color: "#000" }}>₹ {price}</div>
                                 <div style={{ fontSize: "11px", color: "#777", marginTop: "3px" }}>+ ₹ {Math.floor(price * 0.18)} taxes & fees</div>
                                 <div style={{ fontSize: "11px", color: "#777", marginTop: "2px" }}>Per Night</div>
                             </div>
                         </div>
                     </div>
                  </div>
              </div>
            )})}

        </div>
      </div>
    </div>
  );
};

export default DestinationPage;