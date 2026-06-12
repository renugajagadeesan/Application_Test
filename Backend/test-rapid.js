const axios = require('axios');
const API_KEY = "d67653e30cmsh640ce5d30aef310p1ad089jsn33b055d6e526";

async function test_travel_advisor() {
  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/locations/search',
    params: {
      query: 'Paris',
      limit: '5',
      offset: '0',
      units: 'km',
      location_id: '1',
      currency: 'USD',
      sort: 'relevance',
      lang: 'en_US'
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log("Travel Advisor Response:", JSON.stringify(response.data.data?.[0], null, 2));
  } catch (error) {
    if (error.response) {
      console.error("Travel Advisor error:", error.response.status, error.response.statusText);
    } else {
      console.error("Travel Advisor error:", error.message);
    }
  }
}

test_travel_advisor();
