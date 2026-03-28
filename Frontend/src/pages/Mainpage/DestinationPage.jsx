import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { DESTINATIONS } from "./Data/destinations";

const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-");

const DestinationPage = () => {
  const { slug } = useParams();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Find destination from slug
  const destination = DESTINATIONS.find(
    (d) => toSlug(d.name) === slug
  );

  // ✅ Fetch hotels
useEffect(() => {
  if (!destination) return;
  fetchHotels(destination.apiName);
}, [slug]);

const fetchHotels = async (cityName) => {
  try {
    setLoading(true);

    const res = await axios.get(
      "http://localhost:5000/api/auth/hotels",
      {
        params: { city: cityName }
      }
    );

    console.log("API RESPONSE 👉", res.data);

    let hotelsData = res.data?.data || [];

    // ✅ Fallback if empty
if (hotelsData.length === 0) {
  hotelsData = [
    {
      name: `${cityName} Beach Resort`,
      city: cityName,
      rating: 4.5,
      photo: `https://source.unsplash.com/400x300/?hotel,${cityName}`,
      price: "5000"
    },
    {
      name: `${cityName} Grand Hotel`,
      city: cityName,
      rating: 4.2,
      photo: `https://source.unsplash.com/400x300/?luxury hotel,${cityName}`,
      price: "3500"
    }
  ];
}

    setHotels(hotelsData);

  } catch (err) {
    console.error(err);
    setHotels([]);
  } finally {
    setLoading(false);
  }
};


  if (!destination) {
    return <h2>Destination not found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{destination.name} Hotels</h1>

      {/* ✅ Loading */}
      {loading && <p>Loading hotels...</p>}

      {/* ❌ No hotels */}
      {!loading && hotels.length === 0 && (
        <p>No hotels found</p>
      )}

      {/* ✅ Hotel List */}
      <div className="hotel-list">
       {hotels.map((hotel, index) => (
          // console.log("IMAGE URL 👉", hotel.photo);
  <div key={index} className="hotel-card">
    
   <img
  src={
    hotel.photo
      ? hotel.photo.startsWith("http")
        ? hotel.photo
        : `https:${hotel.photo}`   // ✅ FIX HERE
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  }
  alt={hotel.name}
  style={{
    width: "100%",
    height: "200px",
    objectFit: "cover"
  }}
  onError={(e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c3";
  }}
/>

    <h3>{hotel.name}</h3>
    
    <p>{hotel.address || hotel.city}</p>

    <p>⭐ {hotel.rating || "N/A"}</p>

    <p>₹ {hotel.price || "Not available"}</p>

  </div>
))}
      </div>
    </div>
  );
};

export default DestinationPage;