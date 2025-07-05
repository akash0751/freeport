const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const contactRoutes = require('./routes/Contact.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/contact', contactRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection failed:', err.message);
});
