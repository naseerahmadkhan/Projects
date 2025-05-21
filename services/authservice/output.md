# .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/superauth
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1d
CORS_ORIGIN=https://yourfrontenddomain.com
NODE_ENV=development
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
OTP_EXPIRY_TIME=300000  # 5 minutes in milliseconds


# docker-compose.yml
# Create a docker-compose.yml file for multi-container management if you're running multiple services like ProductService or UserAuth Service:
version: "3.8"

services:
  userauth:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGO_URI=mongodb://mongodb:27017/superauth
      - JWT_SECRET=supersecretjwtkey
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - mongodb
      - redis  # Added Redis dependency

  mongodb:
    image: mongo
    container_name: mongodb
    volumes:
      - mongodb_data:/data/db
    networks:
      - app_network

  redis:
    image: redis:alpine
    container_name: redis
    ports:
      - "6379:6379"
    networks:
      - app_network

volumes:
  mongodb_data:

networks:
  app_network:
    driver: bridge


# Dockerfile
# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Start the app
CMD ["node", "src/server.js"]


# README.md
Here is a list of all the endpoints for the **UserAuth Service**, along with the required headers and body for testing using **Thunder Client** (or any other API testing tool):

---

### 1. **User Registration**

* **Endpoint**: `POST /api/v1/auth/register`
* **Description**: Registers a new user.
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "passwordConfirmation": "password123",
    "name": "John Doe"
  }
  ```

---

### 2. **User Login**

* **Endpoint**: `POST /api/v1/auth/login`
* **Description**: Logs in a user and generates a JWT token.
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

---

### 3. **User Logout**

* **Endpoint**: `POST /api/v1/auth/logout`
* **Description**: Logs out the user (removes the session).
* **Headers**:

  * `Content-Type`: `application/json`
  * `Authorization`: `Bearer <JWT_TOKEN>`  *(JWT token required for authentication)*
* **Body**:
  None

---

### 4. **Get User Profile**

* **Endpoint**: `GET /api/v1/auth/me`
* **Description**: Retrieves the authenticated user's profile.
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>`  *(JWT token required for authentication)*
* **Body**:
  None

---

### 5. **Verify JWT Token**

* **Endpoint**: `POST /api/v1/auth/verify-token`
* **Description**: Verifies the provided JWT token and checks if it's valid.
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

---

### 6. **Request Password Reset**

* **Endpoint**: `POST /api/v1/password/reset-request`
* **Description**: Initiates the password reset process (by sending an email).
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "email": "user@example.com"
  }
  ```

---

### 7. **Reset Password**

* **Endpoint**: `POST /api/v1/password/reset`
* **Description**: Resets the password using a token (sent via email).
* **Headers**:

  * `Content-Type`: `application/json`
* **Body**:

  ```json
  {
    "token": "<RESET_TOKEN>",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
  }
  ```

---

### 8. **Get All Users** *(Admin only)*

* **Endpoint**: `GET /api/v1/users`
* **Description**: Retrieves a list of all users (accessible by admin only).
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required, admin role required)*
* **Body**:
  None

---

### 9. **Get User By ID** *(Admin only)*

* **Endpoint**: `GET /api/v1/users/:id`
* **Description**: Retrieves a user by their ID.
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required, admin role required)*
* **Body**:
  None

---

### 10. **Update User Profile**

* **Endpoint**: `PUT /api/v1/users/:id`
* **Description**: Updates the profile of a user.
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required)*
* **Body**:

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com"
  }
  ```

---

### 11. **Invalidate User Session** *(Admin only)*

* **Endpoint**: `POST /api/v1/sessions/invalidate`
* **Description**: Invalidates a user's session (admin only).
* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` *(JWT token required, admin role required)*
* **Body**:

  ```json
  {
    "userId": "<USER_ID>"
  }
  ```

---

### Example of Headers for Testing in Thunder Client:

* For most requests, you'll need to set the `Authorization` header with the JWT token:

  * **Authorization**: `Bearer <JWT_TOKEN>`
  * **Content-Type**: `application/json`

---

### Example Test Requests in Thunder Client:

#### 1. **User Registration**:

* **Method**: `POST`
* **URL**: `http://localhost:5000/api/v1/auth/register`
* **Body** (raw JSON):

  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "passwordConfirmation": "password123",
    "name": "John Doe"
  }
  ```

#### 2. **User Login**:

* **Method**: `POST`
* **URL**: `http://localhost:5000/api/v1/auth/login`
* **Body** (raw JSON):

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### 3. **Verify JWT Token**:

* **Method**: `POST`
* **URL**: `http://localhost:5000/api/v1/auth/verify-token`
* **Body** (raw JSON):

  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

---

### Testing with Thunder Client

* **Headers**:

  * `Authorization`: `Bearer <JWT_TOKEN>` for requests that require authentication.
  * `Content-Type`: `application/json` for requests with a body.

* **Body**:

  * Use raw JSON in the body for all POST/PUT requests that accept a JSON payload.

---

With this setup, you'll be able to test all the endpoints for **User Authentication Service** in **Thunder Client** or any other similar API testing tool. Make sure to replace placeholders like `<JWT_TOKEN>` with actual tokens obtained during the login process.


# src/app.js
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
const authRoutes = require('./routes/authRoutes');
const passwordRoutes = require('./routes/passwordRoutes'); 
const otpRoutes = require('./routes/otpRoutes'); 
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


# src/server.js
require('dotenv').config();
const app = require('./app');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// Start the server only
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});


# src/auth/authUtils.js
const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

exports.comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};


# src/auth/jwtService.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Service to create a JWT token
const createToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  return token;
};

// Service to verify the JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  createToken,
  verifyToken
};


# src/auth/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Find or create user logic here
  done(null, profile);
}));

module.exports = passport;


# src/auth/sessionService.js
exports.createSession = (req, user) => {
    req.session.user = {
      id: user._id,
      email: user.email,
    };
  };
  
  exports.destroySession = (req) => {
    req.session.destroy();
  };
  

# src/auth/tokenService.js
const { v4: uuidv4 } = require('uuid');

exports.generateRefreshToken = () => {
  return uuidv4();
};

// You could later add DB/store handling to persist refresh tokens here


# src/config/ db.js
const mongoose = require('mongoose');
const { logger } = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = connectDB;


# src/config/appConfig.js
module.exports = {
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
  },
  corsOptions: {
    origin: process.env.CORS_ORIGIN || '*', // Use your frontend domain in production
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};


# src/config/env.js
const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
  throw new Error('⚠️  Couldn’t find .env file  ⚠️');
}


# src/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Add Facebook, Apple, etc., as needed.

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Logic to find or create user
  done(null, profile);
}));

module.exports = passport;


# src/config/redis.js
const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379
});

redisClient.on('connect', () => console.log('Redis connected'));
redisClient.on('error', (err) => console.error('Redis error:', err));

module.exports = redisClient;


# src/config/session.js
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redisClient = require('./redis');

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'sessionsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
});

module.exports = sessionMiddleware;


# src/controllers/adminController.js
exports.getSystemHealth = (req, res) => {
    res.json({ message: 'System health check (to be implemented)' });
  };
  
  exports.getLogs = (req, res) => {
    res.json({ message: 'Retrieve logs (to be implemented)' });
  };
  

# src/controllers/authController.js
const authService = require('../services/authService');
const jwtService = require('../services/jwtService'); // Import jwtService for JWT-related tasks

// @desc    Register a new user
// @route   POST /api/v1/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Register user using authService
    const user = await authService.registerUser(email, password, name);

    // Generate token using jwtService
    const token = jwtService.createToken({ id: user._id, email: user.email });

    // Remove password before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Optionally set token in a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token,
    });
  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// @desc    Login user and return JWT
// @route   POST /api/v1/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const { user, token } = await authService.loginUser(email, password);

    // Remove password before sending response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Set token in a secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token,
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(401).json({ message: err.message });
  }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
exports.getUserProfile = async (req, res) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify and decode token using jwtService
    const decoded = jwtService.verifyToken(token);

    // Fetch user by decoded ID
    const user = await authService.getUserById(decoded.id);

    // Exclude password in response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
  } catch (err) {
    console.error('Get Profile Error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// @desc    Verify JWT Token
// @route   POST /api/v1/auth/verify-token
exports.verifyJwtToken = (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Use jwtService to verify the token
    const decoded = jwtService.verifyToken(token);
    res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (err) {
    console.error('Token Verification Error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


# src/controllers/otpController.js
const OTPService = require('../services/OTPService');

// @desc    Send OTP to the user's email
// @route   POST /api/v1/otp/send
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await OTPService.sendOTP(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Verify OTP entered by the user
// @route   POST /api/v1/otp/verify
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const result = await OTPService.verifyOTP(email, otp);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


# src/controllers/passwordController.js
const PasswordService = require('../services/passwordService');

// @desc    Request a password reset
// @route   POST /api/v1/password/reset-request
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await PasswordService.requestPasswordReset(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Reset password
// @route   POST /api/v1/password/reset
exports.resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    const result = await PasswordService.resetPassword(resetToken, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


# src/controllers/socialController.js
exports.googleCallback = (req, res) => {
    res.json({ message: 'Google login callback (to be implemented)' });
  };
  
  exports.facebookCallback = (req, res) => {
    res.json({ message: 'Facebook login callback (to be implemented)' });
  };
  
  exports.appleCallback = (req, res) => {
    res.json({ message: 'Apple login callback (to be implemented)' });
  };
  

# src/controllers/userController.js
const userService = require('../services/userService');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    console.error('Error getting all users:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Admin or Self
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Error getting user by ID:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Admin or Self
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found or update failed' });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Admin or Self
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


# src/docs/swagger.js
// src/docs/swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // or .yaml if parsed

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = setupSwaggerDocs;


# src/events/authEvents.js
// src/events/authEvents.js
const eventEmitter = require('./eventEmitter');

eventEmitter.on('userRegistered', (user) => {
  console.log('User registered:', user.email);
  // You can trigger email verification or logging here
});

eventEmitter.on('userLoggedIn', (user) => {
  console.log('User logged in:', user.email);
});


# src/events/eventEmitter.js
// src/events/eventEmitter.js
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

module.exports = eventEmitter;


# src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { authMiddleware };


# src/middleware/csrfProtection.js
// Import the 'csurf' package to enable CSRF protection
const csurf = require('csurf');

// Initialize the CSRF protection middleware with the option to store the token in a cookie
// Setting { cookie: true } ensures that the CSRF token is stored as a cookie, which can be accessed on subsequent requests
const csrfProtection = csurf({ cookie: true });

// Export the csrfProtection middleware so it can be used in other parts of the application (e.g., in routes)
module.exports = { csrfProtection };


# src/middleware/errorHandler.js
const { logger } = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = { errorHandler };


# src/middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.'
});

module.exports = { limiter };


# src/middleware/sanitizeInput.js
const xssClean = require('xss-clean');

const sanitizeInput = xssClean();

module.exports = { sanitizeInput };


# src/middleware/validateRequest.js
const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateRequest };


# src/models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  additionalInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);


# src/models/PasswordReset.js
const mongoose = require('mongoose');

const PasswordResetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const PasswordReset = mongoose.model('PasswordReset', PasswordResetSchema);

module.exports = PasswordReset;


# src/models/Session.js
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sessionToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;


# src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  lastLogin: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;


# src/queues/passwordResetQueries.js
const PasswordReset = require('../models/PasswordReset');

// Find password reset request by user ID
const findPasswordResetByUserId = async (userId) => {
  try {
    return await PasswordReset.findOne({ userId });
  } catch (error) {
    throw new Error('Error while finding password reset request by user ID');
  }
};

// Create a new password reset request
const createPasswordReset = async (resetData) => {
  try {
    const passwordReset = new PasswordReset(resetData);
    return await passwordReset.save();
  } catch (error) {
    throw new Error('Error while creating password reset request');
  }
};

// Delete password reset request by user ID
const deletePasswordResetByUserId = async (userId) => {
  try {
    return await PasswordReset.findOneAndDelete({ userId });
  } catch (error) {
    throw new Error('Error while deleting password reset request');
  }
};

module.exports = {
  findPasswordResetByUserId,
  createPasswordReset,
  deletePasswordResetByUserId,
};


# src/queues/sessionQueries.js
const Session = require('../models/Session');

// Find a session by user ID
const findSessionByUserId = async (userId) => {
  try {
    return await Session.findOne({ userId });
  } catch (error) {
    throw new Error('Error while finding session by user ID');
  }
};

// Create a new session
const createSession = async (sessionData) => {
  try {
    const session = new Session(sessionData);
    return await session.save();
  } catch (error) {
    throw new Error('Error while creating session');
  }
};

// Delete a session by session token
const deleteSessionByToken = async (sessionToken) => {
  try {
    return await Session.findOneAndDelete({ sessionToken });
  } catch (error) {
    throw new Error('Error while deleting session');
  }
};

module.exports = {
  findSessionByUserId,
  createSession,
  deleteSessionByToken,
};


# src/queues/userQueries.js
const User = require('../models/User');

// Find a user by email
const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error('Error while finding user by email');
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error('Error while creating user');
  }
};

// Find a user by ID
const findUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw new Error('Error while finding user by ID');
  }
};

// Update a user's information
const updateUser = async (userId, updateData) => {
  try {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  } catch (error) {
    throw new Error('Error while updating user');
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error('Error while deleting user');
  }
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
};


# src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const passwordRoutes = require('./passwordRoutes');
const userRoutes = require('./userRoutes');
const otpRoutes = require('./otpRoutes');
const { authMiddleware } = require('../middleware/authMiddleware'); // Import the authMiddleware
const { csrfProtection } = require('../middleware/csrfProtection'); // Import the csrfProtection middleware

// Define the array of middlewares you want to use for /users routes
const userMiddlewares = [authMiddleware, csrfProtection];

// Mount all the sub-routes
router.use('/auth', authRoutes);
router.use('/password', passwordRoutes);

// Apply the middlewares to /users routes
router.use('/users', userMiddlewares, userRoutes); // Protect /users routes with multiple middlewares

router.use('/otp', otpRoutes);

module.exports = router;


# src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, verifyJwtToken } = require('../controllers/authController');
const { validateRegistration, validateLogin, checkValidation } = require('../validators/userValidator');
const passport = require('passport');

// Register route with validation
router.post('/register', validateRegistration, checkValidation, registerUser);

// Login route with validation
router.post('/login', validateLogin, checkValidation, loginUser);

// Logout route (no validation needed)
router.post('/logout', logoutUser);

// Get user profile route
router.get('/me', getUserProfile);

// JWT Token Verification route
router.post('/verify-token', verifyJwtToken);  // New endpoint to verify JWT token

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );
  
  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful login
      // Instead of sending JSON in /google/callback, you can redirect to your frontend:
      // res.redirect(`http://your-frontend.com/dashboard?token=xyz`);

      res.json({ message: 'Google login successful', user: req.user });
    }
  );

module.exports = router;


# src/routes/otpRoutes.js
const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP } = require('../controllers/otpController');

// POST: /api/v1/otp/send - Request OTP
router.post('/send', sendOTP);

// POST: /api/v1/otp/verify - Verify OTP
router.post('/verify', verifyOTP);

module.exports = router;


# src/routes/passwordRoutes.js
const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('../controllers/passwordController');

// POST: /api/v1/password/reset-request - Request password reset
router.post('/reset-request', requestPasswordReset);

// POST: /api/v1/password/reset - Reset password with token
router.post('/reset', resetPassword);

module.exports = router;


# src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser
} = require('../controllers/userController');

// GET: /api/v1/users - Get all users (public or without authentication)
router.get('/', getAllUsers);

// GET: /api/v1/users/:id - Get user by ID
router.get('/:id', getUserById); // No need to apply authMiddleware here if it's already globally applied

// PUT: /api/v1/users/:id - Update user profile
router.put('/:id', updateUserProfile); // No need to apply authMiddleware here

// DELETE: /api/v1/users/:id - Delete user
router.delete('/:id', deleteUser); // No need to apply authMiddleware here

module.exports = router;


# src/services/authService.js
const User = require('../models/User');
const jwtService = require('./jwtService'); // Import jwtService for creating and verifying tokens
const { hashPassword, comparePassword } = require('../auth/authUtils'); // Import the utility functions

// Service to register a new user
const registerUser = async (email, password, name) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User with this email already exists');
  }

  // Hash the password using the utility function
  const hashedPassword = await hashPassword(password);

  // Create and save the new user
  const user = new User({
    email,
    password: hashedPassword,
    name,
  });

  await user.save();
  return user;
};

// Service to log a user in
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the entered password with the stored hash using the utility function
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Use jwtService to create the token
  const token = jwtService.createToken(user);

  return { token, user };
};

// Service to get the user by ID
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
};


# src/services/OTPService.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); // Assuming you're using a Mongoose model
const { OTP_EXPIRY_TIME } = process.env; // OTP expiry time from environment

// Helper function to generate OTP (6 digits)
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Function to send OTP to the user's email
async function sendOTP(email) {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP and its expiry time in the database
    user.otp = otp;
    user.otpExpiry = Date.now() + parseInt(OTP_EXPIRY_TIME); // OTP expiry time (e.g., 5 minutes)
    await user.save();

    // Send OTP via email (using Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // You can configure other email services
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);

    return { message: 'OTP sent successfully' };
  } catch (err) {
    throw new Error(err.message || 'Failed to send OTP');
  }
}

// Function to verify OTP entered by the user
async function verifyOTP(email, otp) {
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if OTP exists and is valid (expiry not passed)
    if (!user.otp || Date.now() > user.otpExpiry) {
      throw new Error('OTP expired or invalid');
    }

    // Check if the entered OTP matches the one sent
    if (user.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // OTP is valid, clear OTP and expiry time from database
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return { message: 'OTP verified successfully' };
  } catch (err) {
    throw new Error(err.message || 'Failed to verify OTP');
  }
}

module.exports = {
  sendOTP,
  verifyOTP
};


# src/services/passwordService.js
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');  // Assuming you have an email service to send emails

// Function to request a password reset
async function requestPasswordReset(email) {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetExpires = Date.now() + 30 * 60 * 1000; // Token expires in 30 minutes

    // Store the hashed token and expiration in the database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Create a reset link
    const resetLink = `${process.env.BASE_URL}/api/v1/password/reset/${resetToken}`;

    // Send email with reset link
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the following link to reset your password: ${resetLink}. This link will expire in 30 minutes.`,
    });

    return { message: 'Password reset email sent' };
  } catch (err) {
    throw new Error(err.message || 'Error in password reset request');
  }
}

// Function to reset the password
async function resetPassword(resetToken, password) {
  try {
    if (!resetToken || !password) {
      throw new Error('Reset token and new password are required');
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Find the user with the hashed token and check if the token is expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: 'Password successfully reset' };
  } catch (err) {
    throw new Error(err.message || 'Error in password reset');
  }
}

module.exports = {
  requestPasswordReset,
  resetPassword,
};


# src/services/userService.js
const User = require('../models/User');

// Get all users (excluding sensitive fields)
const getAllUsers = async () => {
  return await User.find().select('-password -resetPasswordToken -resetPasswordExpires -otp -otpExpiry');
};

// Get a single user by ID
const getUserById = async (userId) => {
  return await User.findById(userId).select('-password -resetPasswordToken -resetPasswordExpires -otp -otpExpiry');
};

// Update user by ID
const updateUser = async (userId, data) => {
  const allowedFields = ['name', 'email'];
  const updates = {};

  allowedFields.forEach(field => {
    if (data[field]) updates[field] = data[field];
  });

  return await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
    select: '-password -resetPasswordToken -resetPasswordExpires -otp -otpExpiry'
  });
};

// Delete user by ID
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};



# src/test/sample.test.js
import { describe, it } from 'mocha'; describe('Auth Service', () => { it('should run', () => {}); });


# src/utils/auditLogger.js
const AuditLog = require('../models/AuditLog');
const nodemailer = require('nodemailer');
const { logger } = require('./logger');

// Log user activity in the system
const logUserActivity = async (userId, action, ipAddress, userAgent, additionalInfo = {}) => {
  try {
    const log = new AuditLog({
      userId,
      action,
      ipAddress,
      userAgent,
      additionalInfo
    });
    await log.save();
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

// Send a notification email for new login from different location/device
const sendLoginNotification = async (email, location) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Login Notification',
      text: `New login detected from location/device: ${location}`
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Login notification sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending login notification: ${error.message}`);
  }
};

// Login function with location detection, notification, and audit logging
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const currentLocation = req.useragent.source;
    if (user.lastLogin.location !== currentLocation) {
      await sendLoginNotification(email, currentLocation);
    }

    // Update last login location
    user.lastLogin.location = currentLocation;
    user.lastLogin.timestamp = new Date();
    await user.save();

    // Log the activity in the audit logs
    await logUserActivity(user._id, 'User Login', req.ip, req.useragent.source);

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { loginUser, sendLoginNotification, logUserActivity };


# src/utils/emailService.js
// utils/emailService.js
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password (or an app-specific password)
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
};

module.exports = { sendEmail };


# src/utils/logger.js
// Importing required libraries
const winston = require('winston');   // For logging messages (to files and console)
const fs = require('fs');             // To interact with the file system
const path = require('path');         // To handle file paths safely across platforms

// Directory where logs will be stored
const logDir = 'src/logs';

// Check if the logs directory exists, if not, create it
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir); // Create 'src/logs' directory
}

// Create a winston logger instance with various settings
const logger = winston.createLogger({
  level: 'info',                        // The minimum level of logging to record (logs info, warn, and error messages)
  format: winston.format.json(),        // Log messages will be in JSON format
  transports: [
    // Logs 'error' level messages and higher to 'error.log' file
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),

    // Logs 'info' level messages and higher to 'combined.log' file
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});

// If the environment is not 'production', log messages to the console too
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));  // Simple format for console logs
}

// Creating a custom stream for morgan (used for HTTP request logging) to log to winston
const morganStream = {
  write: (message) => logger.info(message.trim()) // Stream the HTTP logs as 'info' level logs
};

// Exporting the logger and morgan stream for use in other files
module.exports = { logger, morganStream };


# src/validators/userValidator.js
const { body, validationResult } = require('express-validator');

// Validation for user registration
const validateRegistration = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('passwordConfirmation')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
  body('name').notEmpty().withMessage('Name is required'),
];

// Validation for user login
const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Check validation result
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateRegistration, validateLogin, checkValidation };


