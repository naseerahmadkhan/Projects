const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');
const xssClean = require('xss-clean');
const hpp = require('hpp');

const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const { logger, morganStream } = require('./utils/logger');

const app = express();

// Security Middleware
app.use(helmet());
app.use(xssClean());
app.use(hpp());

// CORS (Cross-Origin Resource Sharing) middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// User agent middleware
app.use(useragent.express());

// Logging middleware
app.use(morgan('combined', { stream: morganStream }));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Routes
app.use('/api/v1/auth', authRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
