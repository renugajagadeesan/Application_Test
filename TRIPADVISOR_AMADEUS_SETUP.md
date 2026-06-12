# 🏨 Tripadvisor & Amadeus API Integration Guide

## Overview
Your travel application now uses **Tripadvisor** and **Amadeus** APIs to fetch hotel information. Both APIs work together to provide comprehensive hotel listings.

---

## 📋 API Keys Setup

### 1️⃣ **Tripadvisor API**

#### Get Your API Key:
1. Visit: https://developer.tripadvisor.com/
2. Sign up for a free developer account
3. Create a new project
4. Get your **API Key** from the dashboard
5. Request access to the "Hotels" category

#### Add to `.env`:
```env
TRIPADVISOR_API_KEY=your_actual_tripadvisor_api_key_here
TRIPADVISOR_HOST=api.tripadvisor.com
```

---

### 2️⃣ **Amadeus API**

#### Get Your API Keys:
1. Visit: https://developers.amadeus.com/
2. Sign up for a free account
3. Create a new app in the dashboard
4. Copy both:
   - **Client ID** (API Key)
   - **Client Secret** (API Secret)
5. Enable the following APIs:
   - Hotel Search v2
   - Hotel Booking v1 (optional)
   - Reference Data

#### Add to `.env`:
```env
AMADEUS_API_KEY=your_actual_amadeus_client_id_here
AMADEUS_API_SECRET=your_actual_amadeus_secret_here
```

---

## 🔧 Backend Implementation

### Updated Hotel Controller
Location: `Backend/controllers/hotelController.js`

**New Functions:**
- `getHotelsFromTripadvisor(city)` - Fetches hotels from Tripadvisor
- `getHotelsFromAmadeus(city)` - Fetches hotels from Amadeus
- `getHotelsByCity(req, res)` - Combines results from both APIs
- `getAmadeusToken()` - Handles OAuth2 token generation for Amadeus

**Features:**
✅ Retrieves hotels from both APIs simultaneously
✅ Supports filtering by source (Tripadvisor, Amadeus, or both)
✅ Combines results with consistent data structure
✅ Error handling for each API independently

---

## 😊 Frontend Implementation

### Updated API Service
Location: `Frontend/src/pages/Mainpage/api.js`

**Three Main Functions:**

#### 1. `searchHotels(cityName, source = "both")`
Fetches from both APIs (default)
```javascript
const hotels = await searchHotels("Paris");
// Returns combined results from Tripadvisor & Amadeus
```

#### 2. `searchHotelsTripadvisor(cityName)`
Fetches only from Tripadvisor
```javascript
const hotels = await searchHotelsTripadvisor("Paris");
```

#### 3. `searchHotelsAmadeus(cityName)`
Fetches only from Amadeus
```javascript
const hotels = await searchHotelsAmadeus("Paris");
```

---

## 🚀 API Endpoint Usage

### Backend Endpoint
```
GET http://localhost:5000/api/hotels?city=Paris&source=both
```

**Query Parameters:**
- `city` (required) - City name to search (e.g., "Paris", "New York")
- `source` (optional) - "tripadvisor", "amadeus", or "both" (default: "both")

### Response Format
```json
{
  "city": "Paris",
  "totalHotels": 25,
  "sources": ["Tripadvisor", "Amadeus"],
  "hotels": [
    {
      "source": "Tripadvisor",
      "name": "Hotel Name",
      "id": "12345",
      "rating": 4.5,
      "reviews": 1250,
      "address": "123 Main St, Paris",
      "type": "Hotel",
      "image": "https://..."
    },
    {
      "source": "Amadeus",
      "name": "Another Hotel",
      "id": "ABCDE",
      "iataCode": "CDG",
      "address": "456 Side St, Paris",
      "city": "Paris",
      "country": "FR",
      "chainCode": "HH"
    }
  ]
}
```

---

## 🎯 Usage Examples

### Frontend Component Example
```jsx
import { searchHotels, searchHotelsTripadvisor, searchHotelsAmadeus } from './pages/Mainpage/api';

function HotelSearch() {
  const [hotels, setHotels] = useState([]);

  const handleSearch = async () => {
    // Get hotels from both APIs
    const results = await searchHotels("Paris");
    setHotels(results);
  };

  const handleTripAdvisorOnly = async () => {
    // Get only Tripadvisor hotels
    const results = await searchHotelsTripadvisor("Paris");
    setHotels(results);
  };

  const handleAmadeusOnly = async () => {
    // Get only Amadeus hotels
    const results = await searchHotelsAmadeus("Paris");
    setHotels(results);
  };

  return (
    <div>
      <button onClick={handleSearch}>Search All Hotels</button>
      <button onClick={handleTripAdvisorOnly}>Tripadvisor Only</button>
      <button onClick={handleAmadeusOnly}>Amadeus Only</button>
      
      <div>
        {hotels.map((hotel) => (
          <div key={hotel.id}>
            <h3>{hotel.name}</h3>
            <p>Source: {hotel.source}</p>
            <p>Rating: {hotel.rating}</p>
            <p>{hotel.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🔗 API Rate Limits

### Tripadvisor
- Free tier: 5,000 calls/month
- Rate limit: 100 requests/minute

### Amadeus
- Free tier: 2,000 calls/month
- Rate limit: 10 requests/second

**💡 Tip:** Implement caching in your backend to reduce API calls:
```javascript
// Example: Cache results for 1 hour
const cache = new Map();

const getCachedHotels = (city) => {
  if (cache.has(city)) {
    const cached = cache.get(city);
    if (Date.now() - cached.timestamp < 3600000) {
      return cached.data;
    }
  }
  return null;
};
```

---

## ✅ Checklist

- [ ] Get Tripadvisor API key from https://developer.tripadvisor.com/
- [ ] Get Amadeus API credentials from https://developers.amadeus.com/
- [ ] Add keys to `Backend/.env` file
- [ ] Restart backend server (`npm start` in Backend folder)
- [ ] Test endpoint: `curl "http://localhost:5000/api/hotels?city=Paris"`
- [ ] Update your frontend components to use new API functions
- [ ] Test frontend hotel search functionality

---

## 🐛 Troubleshooting

### Issue: "API Key not found"
**Solution:** Make sure `.env` file has the correct keys and restart the server.

### Issue: "Invalid credentials" from Amadeus
**Solution:** Check that you've correctly copied the Client ID and Secret from https://developers.amadeus.com/

### Issue: Empty results from Tripadvisor
**Solution:** Verify your API key has access to the "Hotels" API category.

### Issue: CORS errors in frontend
**Solution:** Make sure your backend is running on `http://localhost:5000`

---

## 📚 Documentation Links

- **Tripadvisor API Docs:** https://developer.tripadvisor.com/page/apis
- **Amadeus Self-Service Workspace:** https://developers.amadeus.com/
- **Amadeus API Documentation:** https://developers.amadeus.com/self-service/category/hotel

---

## 💬 Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify API keys in `.env` file
3. Test API keys directly on the providers' websites
4. Check rate limits haven't been exceeded

---

**Happy hotel hunting! 🏨✈️**
