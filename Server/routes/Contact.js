const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ContactMessage = require('../model/ContactMessage.js');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save to MongoDB
    await new ContactMessage({ name, email, message }).save();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Message sent & saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

module.exports = router;

