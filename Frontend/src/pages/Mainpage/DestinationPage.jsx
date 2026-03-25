// import { useParams } from "react-router-dom";
// import { DESTINATIONS } from "./Data/destinations.jsx";
// import "./Data/destinations.css";

// const toSlug = (name) =>
//   name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// export default function DestinationPage() {
//   const { slug } = useParams();

//   const destination = DESTINATIONS.find(
//     (d) => toSlug(d.name) === slug
//   );

//   if (!destination) return <h2>Destination not found</h2>;

//   return (
//     <div className="destination-page">

//       {/* 🔥 HERO SECTION */}
//       <div className="hero">
//         <img src={destination.img} alt={destination.name} />
//         <div className="hero-overlay">
//           <h1>{destination.name}</h1>
//           <p>📍 {destination.location}</p>
//           <span>⭐ {destination.rating}</span>
//         </div>
//       </div>

//       {/* 🔥 CONTENT */}
//       <div className="content">

//         {/* Description */}
//         <p className="description">{destination.description}</p>

//         {/* Highlights */}
//         <div className="highlights">
//           <h3>Highlights</h3>
//           <ul>
//             {destination.highlights.map((h, i) => (
//               <li key={i}>✔ {h}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Gallery */}
//         <div className="gallery">
//           {destination.gallery.map((img, i) => (
//             <img key={i} src={img} alt="view" />
//           ))}
//         </div>

//         {/* Booking Card */}
//         <div className="booking-card">
//           <h2>{destination.price} / night</h2>
//           <button>Book Now</button>
//         </div>

//       </div>
//     </div>
//   );
// }


import { useParams } from "react-router-dom";
import { DESTINATIONS } from "./Data/destinations.jsx";
import { useEffect, useState } from "react";
import { searchHotels } from "./api.js"; // 👈 import API
import "./Data/destinations.css";

const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export default function DestinationPage() {
  const { slug } = useParams();

  const [hotels, setHotels] = useState([]);

  const destination = DESTINATIONS.find(
    (d) => toSlug(d.name) === slug
  );

  useEffect(() => {
    if (destination) {
      loadHotels();
    }
  }, [destination]);

  const loadHotels = async () => {
    const data = await searchHotels(destination.name);
    setHotels(data);
  };

  if (!destination) return <h2>Destination not found</h2>;

  return (
    <div className="destination-page">

      {/* HERO */}
      <div className="hero">
        <img src={destination.img} alt={destination.name} />
        <div className="hero-overlay">
          <h1>{destination.name}</h1>
          <p>📍 {destination.location}</p>
          <span>⭐ {destination.rating}</span>
        </div>
      </div>

      <div className="content">

        <p className="description">{destination.description}</p>

        {/* 🔥 HOTELS FROM API */}
        <h2>Available Hotels</h2>

        <div className="hotel-grid">
          {hotels.length === 0 ? (
            <p>Loading hotels...</p>
          ) : (
            hotels.map((hotel) => (
              <div key={hotel.hotel_id} className="hotel-card">
                <img
                  src={hotel.max_1440_photo_url}
                  alt={hotel.hotel_name}
                />
                <h3>{hotel.hotel_name}</h3>
                <p>📍 {hotel.address}</p>
                <p>⭐ {hotel.review_score}</p>
                <p className="price">
                  ₹ {hotel.min_total_price || "N/A"}
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}