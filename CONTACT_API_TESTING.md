# Contact Form - API Testing Guide

## Testing with cURL, Postman, or Frontend

### 1. Submit a Contact (Most Important)

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Patel",
    "phone": "9876543210",
    "email": "raj@example.com",
    "address": "123 Marina Bay, Singapore 018972",
    "message": "Looking for honeymoon packages in Europe"
  }'
```

**JavaScript/Fetch:**
```javascript
fetch('http://localhost:5000/api/auth/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Raj Patel',
    phone: '9876543210',
    email: 'raj@example.com',
    address: '123 Marina Bay, Singapore 018972',
    message: 'Looking for honeymoon packages in Europe'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
```

**Postman:**
1. Create new POST request to: `http://localhost:5000/api/auth/contact`
2. Go to Body > Raw > JSON
3. Paste this:
```json
{
  "name": "Raj Patel",
  "phone": "9876543210",
  "email": "raj@example.com",
  "address": "123 Marina Bay, Singapore 018972",
  "message": "Looking for honeymoon packages in Europe"
}
```
4. Click Send

**Expected Response:**
```json
{
  "message": "Contact saved successfully. Messages sent!",
  "contact": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Raj Patel",
    "phone": "9876543210",
    "email": "raj@example.com",
    "address": "123 Marina Bay, Singapore 018972",
    "message": "Looking for honeymoon packages in Europe",
    "createdAt": "2024-01-15T10:30:00.123Z"
  }
}
```

---

### 2. Get All Contacts (Admin)

**cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/contact
```

**Response:**
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Raj Patel",
    "phone": "9876543210",
    "email": "raj@example.com",
    "address": "123 Marina Bay, Singapore 018972",
    "message": "Looking for honeymoon packages in Europe",
    "createdAt": "2024-01-15T10:30:00.123Z"
  },
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "name": "Sarah Williams",
    "phone": "9876543211",
    "email": "sarah@example.com",
    "address": "456 Oxford St, London, UK",
    "message": "London tour inquiry",
    "createdAt": "2024-01-15T10:45:00.123Z"
  }
]
```

---

### 3. Get Single Contact

**cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/contact/65a1b2c3d4e5f6g7h8i9j0k1
```

**Replace** `65a1b2c3d4e5f6g7h8i9j0k1` with actual contact ID

---

### 4. Delete Contact

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/auth/contact/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response:**
```json
{
  "message": "Contact deleted successfully"
}
```

---

## Test Cases & Validation

### Test Case 1: Required Fields
**Test:** Submit without name
```json
{
  "phone": "9876543210",
  "email": "user@example.com",
  "address": "Some address",
  "message": "Test"
}
```

**Expected Error:**
```json
{
  "error": "Name, phone, and address are required"
}
```

---

### Test Case 2: All Fields (Full Example)
```json
{
  "name": "Priya Singh",
  "phone": "8765432109",
  "email": "priya@example.com",
  "address": "Flat 5, Mumbai Plaza, Delhi 110001, India",
  "message": "Interested in 5-day Italy tour. Have kids aged 5 and 8."
}
```

---

### Test Case 3: Minimum Required (Only Required Fields)
```json
{
  "name": "Ahmed Hassan",
  "phone": "7654321098",
  "address": "Dubai Marina, UAE"
}
```

**Note:** Email and message are optional, contact will still be saved and WhatsApp will be sent!

---

### Test Case 4: Indian Phone Numbers

**With +91 prefix:**
```json
{
  "name": "Ankit Kumar",
  "phone": "+919876543210",
  "address": "Bangalore, India"
}
```

**Without +91 prefix:**
```json
{
  "name": "Ankit Kumar",
  "phone": "9876543210",
  "address": "Bangalore, India"
}
```

**Both formats work!** The backend auto-formats to international format.

---

### Test Case 5: International Numbers

```json
{
  "name": "John Smith",
  "phone": "+14155552671",
  "email": "john@example.com",
  "address": "San Francisco, USA"
}
```

---

## What Happens Behind the Scenes

### Request Flow:
```
1. User submits form
   ↓
2. Frontend validates (name, phone, address required)
   ↓
3. POST to http://localhost:5000/api/auth/contact
   ↓
4. Backend validates again
   ↓
5. Save to MongoDB
   ↓
6. Send WhatsApp via Twilio
   ↓
7. Send Email via Nodemailer (if email provided)
   ↓
8. Return success response
   ↓
9. Frontend shows success message
```

---

## Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 201 | ✅ Contact created successfully | WhatsApp & Email sent |
| 400 | ❌ Bad request (missing fields) | Missing required field |
| 404 | ❌ Not found | Contact ID doesn't exist |
| 500 | ❌ Server error | Database error, API error |

---

## Real-World Test Scenarios

### Scenario 1: Tour Package Inquiry
```json
{
  "name": "Ramesh Gupta",
  "phone": "9912345678",
  "email": "ramesh.gupta@company.com",
  "address": "Sector 15, Noida, Uttar Pradesh 201301",
  "message": "Hello, I'm interested in your 7-day Southeast Asia package. Could you send details for 2 adults and 1 child (age 12)? Budget: ₹1,50,000. Please call me after 6 PM."
}
```

**Messages Sent:**
- ✅ WhatsApp: "Hello Ramesh Gupta! Thank you for contacting TravelNest. We received your inquiry about Southeast Asia package. We will get back to you soon!"
- ✅ Email: Detailed confirmation with all inquiry info

---

### Scenario 2: Support Request (No Email)
```json
{
  "name": "Lisa Wong",
  "phone": "85698765432",
  "address": "Hong Kong"
}
```

**Messages Sent:**
- ✅ WhatsApp: Confirmation message
- ❌ Email: Skipped (no email provided)

---

### Scenario 3: Corporate Booking
```json
{
  "name": "Mr. Vikram Sharma",
  "phone": "9899112233",
  "email": "vikram@techcorp.in",
  "address": "TechCorp Headquarters, Whitefield, Bangalore 560066",
  "message": "Corporate team outing for 50+ employees. 3-day package. Requirement: Group discount, hotel stay, meals included, activity program. Budget negotiable. Need quote by 25th Jan."
}
```

---

## Debugging Tips

### Check Backend Logs
```bash
# Look for these messages in terminal where Backend is running:
"WhatsApp message sent: SMxxxxxxxxxxxxxxxxxxxxxxxxxx"
"Email sent to: user@example.com"
"Contact created with ID: 65a1b2c3d4e5f6g7h8i9j0k1"
```

### Common Errors & Solutions

1. **"TWILIO_ACCOUNT_SID not defined"**
   - Solution: Check .env file has TWILIO_ACCOUNT_SID

2. **"ENOTFOUND twilio.com"**
   - Solution: Network/firewall issue, check internet connection

3. **"Failed to send OTP"** (if using SMS features)
   - Solution: Check 2Factor API key or network

4. **"Nodemailer error"**
   - Solution: Check Gmail app password & 2FA enabled

---

## Testing Checklist

- [ ] Submit form with all fields → Check WhatsApp + Email received
- [ ] Submit form without email → Check only WhatsApp received
- [ ] Submit form with invalid email → Check for validation error
- [ ] Submit form with different phone formats → Check all work
- [ ] Get all contacts → Check MongoDB data appears
- [ ] Check contact appears in MongoDB → Verify data saved
- [ ] Delete contact → Verify removed from database
- [ ] Check Frontend success message → Appears for 5 seconds
- [ ] Check Frontend error message → Shows on API failure
- [ ] Check form auto-clears after submit → Ready for next entry
- [ ] Test on mobile device → Responsive design works
- [ ] Test with special characters in name/address → Saves correctly

---

## Performance Notes

- **Database:** Contacts saved in ~100ms
- **WhatsApp:** Sent in ~500-1000ms (Twilio API)
- **Email:** Sent in ~1-2 seconds (Gmail)
- **Total Response Time:** ~2-3 seconds average

---

## Rate Limiting (Optional Future Enhancement)

Currently no rate limiting. To add:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many contacts submitted, please try again later.'
});

router.post('/contact', limiter, createContact);
```

---

Happy testing! 🚀
