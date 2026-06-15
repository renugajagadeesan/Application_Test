const Contact = require("../models/Contact");
const axios = require("axios");
const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Send SMS Message via SMS API
const sendSMS = async (phone, message) => {
    try {
        const apiKey = process.env.SMS_API_KEY;
        
        // Format phone number - remove leading 0 and add country code if needed
        let formattedPhone = phone;
        if (formattedPhone.startsWith("0")) {
            formattedPhone = formattedPhone.substring(1);
        }
        if (!formattedPhone.startsWith("+") && !formattedPhone.startsWith("91")) {
            formattedPhone = "91" + formattedPhone; // For Indian numbers
        }

        // Using 2Factor.in API (adjust URL if using different SMS provider)
        const url = `https://2factor.in/API/V1/sendSMS/${apiKey}/${formattedPhone}/${encodeURIComponent(message)}`;

        const response = await axios.get(url);
        console.log("SMS sent successfully:", response.data);
        return true;
    } catch (err) {
        console.error("SMS send error:", err.message);
        return false;
    }
};

// Send Email
const sendEmail = async (email, subject, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: message
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", email);
        return true;
    } catch (err) {
        console.error("Email send error:", err.message);
        return false;
    }
};

// CREATE CONTACT
exports.createContact = async (req, res) => {
    try {
        const { name, phone, email, address, message } = req.body;

        // Validate required fields
        if (!name || !phone || !address) {
            return res.status(400).json({ error: "Name, phone, and address are required" });
        }

        // Create contact document
        const contact = await Contact.create({
            name,
            phone,
            email: email || "",
            address,
            message: message || ""
        });

        // Prepare SMS message
        const smsMessage = `Hello ${name}! Thank you for contacting TravelNest. We have received your inquiry. Address: ${address}. We will get back to you soon! - TravelNest Team`;

        // Prepare Email message
        const emailMessage = `
            <h2>Hello ${name}! 🙏</h2>
            <p>Thank you for contacting TravelNest. We have received your inquiry:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Address:</strong> ${address}</li>
                ${message ? `<li><strong>Message:</strong> ${message}</li>` : ""}
            </ul>
            <p>We will get back to you soon!</p>
            <p><strong>Best regards,</strong><br>TravelNest Team</p>
        `;

        // Send SMS message
        if (phone) {
            await sendSMS(phone, smsMessage);
        }

        // Send Email if provided
        if (email) {
            await sendEmail(email, "Thank You for Contacting TravelNest", emailMessage);
        }

        res.status(201).json({
            message: "Contact saved successfully. Messages sent!",
            contact
        });

    } catch (err) {
        console.error("Error creating contact:", err.message);
        res.status(500).json({ error: err.message });
    }
};

// GET ALL CONTACTS (Admin)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SINGLE CONTACT
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE CONTACT
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.json({ message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
