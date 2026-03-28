const axios = require("axios");

// ✅ NEW API (Hotels API)
const getHotelsByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const response = await axios.get(
      `https://api.hotels-api.com/v1/hotels/search`,
      {
        params: {
          city: city,
          limit: 10
        },
        headers: {
          "X-API-KEY": process.env.HOTEL_API_KEY
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    console.error("API ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch hotels" });
  }
};

module.exports = { getHotelsByCity };