import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export const searchHotels = async (cityName) => {
  try {
    // Step 1: Get destination ID
    const locationRes = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/locations",
      {
        params: {
          name: cityName,
          locale: "en-gb",
        },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      }
    );

    const dest = locationRes.data[0];
    if (!dest) return [];

    // Step 2: Get hotels
    const hotelRes = await axios.get(
      "https://booking-com.p.rapidapi.com/v1/hotels/search",
      {
        params: {
          dest_id: dest.dest_id,
          dest_type: dest.dest_type,
          checkin_date: "2026-04-01",
          checkout_date: "2026-04-02",
          adults_number: "2",
          room_number: "1",
          order_by: "popularity",
          locale: "en-gb",
          units: "metric",              // ✅ add this
          currency: "INR",              // ✅ add this
        },
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      }
    );

    return hotelRes.data.result;

  } catch (err) {
    console.error(err);
    return [];
  }
};