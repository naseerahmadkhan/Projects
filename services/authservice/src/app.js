require('./config/env'); // Loads .env variables before anything else
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const connectDB = require('./config/db'); // ⬅ Connect DB here
const apiRoutes = require('./routes/apiRoutes');

const { errorHandler } = require('./middleware/errorHandler');
const { morganStream } = require('./utils/logger');
const appConfig = require('./config/appConfig'); 
const passport = require('./config/passport');

const app = express();


// Connect to MongoDB
connectDB();

// Security Middleware

// Helmet helps secure your Express app by setting various HTTP headers.
// These headers can help protect your app from a range of attacks such as XSS, clickjacking, and others.
app.use(helmet());       // Apply helmet security headers

// xssClean is a middleware to prevent Cross-Site Scripting (XSS) attacks by sanitizing input.
// It cleans user input by removing potentially dangerous HTML tags and scripts that could be used to inject malicious code.
app.use(xssClean());    // Sanitize input to prevent XSS attacks

// HPP (HTTP Parameter Pollution) middleware helps prevent attacks where multiple instances of the same parameter are sent in a request.
// It protects your app by ensuring that only one instance of each parameter is used and handled correctly.
// This helps avoid unexpected behavior and vulnerabilities caused by malicious users sending multiple query parameters with the same name.
app.use(hpp());       // Prevent HTTP Parameter Pollution (HPP)


// CORS (Cross-Origin Resource Sharing) Middleware
// CORS is a mechanism that allows resources (such as APIs) to be requested from a domain different from the one the resource is hosted on.
// By default, web browsers block such cross-origin requests for security reasons (same-origin policy).
// This middleware enables cross-origin requests to your server by setting the appropriate headers.
// The cors() middleware enables the server to handle cross-origin requests from different domains.
// You can configure it to allow specific origins or methods, or set other CORS-related options.
app.use(cors());      // Enables all origins by default

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// User agent middleware
app.use(useragent.express());

// Logging middleware
app.use(morgan('combined', { stream: morganStream }));

// Rate limiting middleware
const limiter = rateLimit(appConfig.rateLimit);

app.use(limiter);

// Initialize Passport BEFORE routes
app.use(passport.initialize());

// Routes
app.use('/api/v1', apiRoutes);



// Error handler
app.use(errorHandler);

module.exports = app;
