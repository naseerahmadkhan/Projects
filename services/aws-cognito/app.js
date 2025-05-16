require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Session config
app.use(session({
    secret: 'your_super_secret',
    resave: false,
    saveUninitialized: false
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // Updated to point into src/views

// Routes (update import paths)
const authRoutes = require('./src/routes/authRoutes');
const indexRoutes = require('./src/routes/indexRoutes');

app.use('/', indexRoutes);
app.use('/', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
