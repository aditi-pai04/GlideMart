// routes/support.js
const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'ads201pai@gmail.com', // Your email address
        pass: 'iwfa svns xtuw awdw', // Your email password (use app password if using 2FA)
    },
});
router.get('/:userId', async (req, res) => {
  console.log('hello')
  const { userId } = req.params;
  console.log(`Fetching user details for userId: ${userId}`);
  try {
      // Fetch user details from MongoDB
      const user = await User.findById(userId);
      console.log('Fetched user:', user);
      
      // If user exists, return the email and name
      if (user) {

          res.json({ email: user.email, name: user.name });
      } else {
          return res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Server error' });
  }
});
router.post('/send-support-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Set up email options for sending the email
  const mailOptions = {
      from: email, // User's email
      to: 'ads201pai@gmail.com', // Support team's email address
      subject: `Support request from ${name}`,
      text: message,
  };

  try {
      // Send email via Nodemailer
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Support email sent successfully!' });
  } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send support email.' });
  }
});


module.exports = router;