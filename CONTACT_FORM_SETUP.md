# Contact Form Setup Guide

## Overview
I've created a complete contact form system that:
- ✅ Saves contact data to MongoDB
- ✅ Sends WhatsApp messages via Twilio
- ✅ Sends confirmation emails via Nodemailer
- ✅ Beautiful, responsive UI

## Backend Setup

### 1. Install Required Packages

Run this in the **Backend** folder:

```bash
npm install twilio nodemailer
```

### 2. Configure Environment Variables

Create a `.env` file in the **Backend** folder and add:

```env
# Existing variables
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# SMS API (existing)
SMS_API_KEY=your_2factor_api_key

# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# Email Configuration (Gmail Example)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 3. Get Twilio Credentials

1. Go to [twilio.com](https://www.twilio.com)
2. Sign up for a free account
3. Navigate to **Console > Auth Tokens** to get:
   - **Account SID**
   - **Auth Token**
4. Get a WhatsApp-enabled number from **Messaging > Try it out > WhatsApp**

### 4. Setup Gmail for Emails

If using Gmail:
1. Enable 2-Factor Authentication in your Google Account
2. Create an **App Password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use this app password in `EMAIL_PASSWORD`

### 5. Alternative: Use Different Email Service

You can also use:
- **SendGrid**: Change `EMAIL_SERVICE` and auth method
- **Mailgun**: Similar setup
- **Outlook/Office365**: Similar to Gmail

## Frontend Setup

### 1. Install Axios (if not already installed)

```bash
npm install axios
```

### 2. Update API URL

In [Frontend/src/pages/Mainpage/Contact.jsx](Frontend/src/pages/Mainpage/Contact.jsx), the API endpoint is:
```javascript
'http://localhost:5000/api/auth/contact'
```

If you deploy, update this to your production backend URL.

## Backend Files Created

1. **[Backend/models/Contact.js](Backend/models/Contact.js)** - Contact database model
2. **[Backend/controllers/contactController.js](Backend/controllers/contactController.js)** - Contact handling logic with WhatsApp & Email
3. **Updated [Backend/routes/authRoutes.js](Backend/routes/authRoutes.js)** - Added contact routes

## Frontend Files Modified

1. **[Frontend/src/pages/Mainpage/Contact.jsx](Frontend/src/pages/Mainpage/Contact.jsx)** - Functional contact form
2. **[Frontend/src/pages/Mainpage/Contact.css](Frontend/src/pages/Mainpage/Contact.css)** - Beautiful styling

## API Endpoints

### Create Contact (Save & Send Messages)
```
POST /api/auth/contact
Body: {
  name: string (required),
  phone: string (required),
  email: string (optional),
  address: string (required),
  message: string (optional)
}
```

### Get All Contacts (Admin)
```
GET /api/auth/contact
```

### Get Single Contact
```
GET /api/auth/contact/:id
```

### Delete Contact
```
DELETE /api/auth/contact/:id
```

## How It Works

### User Flow:
1. User fills out the contact form
2. Clicks "Send Message"
3. Data is sent to backend

### Backend Flow:
1. Validates required fields (name, phone, address)
2. Saves contact to MongoDB
3. Sends WhatsApp message via Twilio (auto-formatted with user's info)
4. Sends Email (if email provided)
5. Returns success message to frontend

### User Receives:
- ✅ WhatsApp message with their inquiry details
- ✅ Email confirmation (if provided)
- ✅ Success notification on the form

## Form Fields

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| Name | Yes | Text | Full name |
| Phone | Yes | Tel | Will receive WhatsApp |
| Email | No | Email | Optional, for email confirmation |
| Address | Yes | Text | Textarea for longer addresses |
| Message | No | Text | Optional message/inquiry details |

## Testing

### Local Testing:
1. Backend: `npm start` in Backend folder
2. Frontend: `npm run dev` in Frontend folder
3. Navigate to Contact page
4. Fill out and submit form
5. Check WhatsApp & Email for confirmations

### Without Real Services:
To test without Twilio/Email, you can see console logs:
- Check terminal for "WhatsApp message sent: [sid]"
- Check terminal for "Email sent to: [email]"

## Troubleshooting

### WhatsApp not sending?
- Verify Twilio credentials in .env
- Check phone number format (should be +country_code followed by number)
- Ensure Twilio WhatsApp is properly set up in Console

### Email not sending?
- Verify Gmail app password (not regular password)
- 2-Factor authentication must be enabled on Gmail
- Check firewall/network restrictions

### Database errors?
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify Connection string is correct

### CORS errors?
- Backend server running on `http://localhost:5000`?
- Frontend running on `http://localhost:5173` (Vite default)?

## Optional Enhancements

### 1. Add Admin Authentication to View Contacts
```javascript
// In contactController.js - Add middleware check
exports.getAllContacts = async (req, res) => {
  // Add: if (!req.user.isAdmin) return res.status(403).json("Unauthorized");
};
```

### 2. Add Rate Limiting to Prevent Spam
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per windowMs
});
router.post("/contact", limiter, createContact);
```

### 3. Add File Upload (Resume, Documents)
Already set up in your upload middleware - just extend it in contactController

### 4. Send Notification to Admin Email
```javascript
// Add in contactController after user email sends
await sendEmail(process.env.ADMIN_EMAIL, 
  `New Contact: ${name}`, 
  adminNotificationHTML);
```

## File Structure After Setup

```
Backend/
  models/
    Contact.js ✨ NEW
  controllers/
    contactController.js ✨ NEW
  routes/
    authRoutes.js ✨ UPDATED

Frontend/
  src/pages/Mainpage/
    Contact.jsx ✨ UPDATED
    Contact.css ✨ NEW
```

## What Happens When User Submits:

1. **Database**: Contact saved with all details
2. **WhatsApp**: Auto-formatted message sent to user's phone
3. **Email**: Confirmation email sent (if email provided)
4. **Frontend**: Success notification shown
5. **Form**: Auto-cleared for next entry

## Security Notes

- `.env` file is in `.gitignore` (don't commit credentials!)
- Phone numbers are formatted with country codes
- Email addresses are validated before sending
- MongoDB validates schema before saving
- API endpoints are ready for authentication middleware addition

---

## Next Steps

1. ✅ Install dependencies: `npm install twilio nodemailer`
2. ✅ Create `.env` file with credentials
3. ✅ Get Twilio account (free tier available)
4. ✅ Setup Gmail app password
5. ✅ Test the form locally
6. ✅ Deploy to production when ready

For questions or issues, check the console logs for detailed error messages!
