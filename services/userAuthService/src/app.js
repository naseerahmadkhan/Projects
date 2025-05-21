          // Loads .env variables before anything else
const express = require('express');
const connectDB = require('./config/db'); // ⬅ Connect DB here
const apiRoutes = require('./routes/apiRoutes');
const app = express();

// Connect to MongoDB
connectDB();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for form submissions


// Routes
app.use('/api/v1', apiRoutes);

module.exports = app;