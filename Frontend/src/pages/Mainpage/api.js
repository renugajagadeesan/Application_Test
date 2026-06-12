import axios from "axios";

// ✅ COMBINED HOTEL SEARCH - Uses Tripadvisor & Amadeus APIs
export const searchHotels = async (cityName, source = "both") => {
  try {
    // Call backend endpoint that combines both APIs
    const response = await axios.get("http://localhost:5000/api/hotels", {
      params: {
        city: cityName,
        source: source, // "tripadvisor", "amadeus", or "both"
      },
    });

    return response.data.hotels || [];
  } catch (err) {
    console.error("Hotel search error:", err);
    return [];
  }
};

// ✅ TRIPADVISOR ONLY - Get hotels from Tripadvisor
export const searchHotelsTripadvisor = async (cityName) => {
  try {
    const response = await axios.get("http://localhost:5000/api/hotels", {
      params: {
        city: cityName,
        source: "tripadvisor",
      },
    });

    return response.data.hotels.filter(h => h.source === "Tripadvisor") || [];
  } catch (err) {
    console.error("Tripadvisor search error:", err);
    return [];
  }
};

// ✅ AMADEUS ONLY - Get hotels from Amadeus
export const searchHotelsAmadeus = async (cityName) => {
  try {
    const response = await axios.get("http://localhost:5000/api/hotels", {
      params: {
        city: cityName,
        source: "amadeus",
      },
    });

    return response.data.hotels.filter(h => h.source === "Amadeus") || [];
  } catch (err) {
    console.error("Amadeus search error:", err);
    return [];
  }
};