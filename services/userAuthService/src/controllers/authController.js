const authService = require("../services/authService")
const jwtService = require("../services/jwtService") // Import jwtService for JWT-related tasks
const userService = require("../services/userService.js")

// @desc    Register a new user
// @route   POST /api/v1/auth/register
exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      isActive = false,
      isBlocked = false,
    } = req.body

    // Call authService to register user with default and optional fields
    const user = await authService.registerUser({
      email,
      password,
      firstName,
      lastName,
      isActive,
      isBlocked,
    })

    // Generate token using jwtService
    const token = jwtService.createAccessToken({ id: user._id, email: user.email })

    // Remove password and sensitive fields before sending response
    const userResponse = user.toObject()
    delete userResponse.password
    delete userResponse.changedPasswords

    // Optionally set token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    })
  } catch (err) {
    console.error("Register Error:", err.message)
    res.status(400).json({ message: err.message })
  }
}

// @desc    Login user and return access token & refresh token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Authenticate user
    const { user, accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    )

    // Remove password before sending response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      accessToken, // Access token for API access
      refreshToken, // Refresh token for token refresh flow
    })
  } catch (err) {
    console.error("Login Error:", err.message)
    res.status(401).json({ message: err.message })
  }
}

// @desc    Logout user
exports.logoutUser = (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ message: "Logout successful" })
}

// @desc    Get current user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // Verify and decode token using jwtService
    const decoded = jwtService.verifyToken(token)

    // Fetch user by decoded ID
    const user = await authService.getUserById(decoded.id)

    // Exclude password in response
    const userResponse = user.toObject()
    delete userResponse.password

    res.status(200).json({ user: userResponse })
  } catch (err) {
    console.error("Get Profile Error:", err.message)
    res.status(401).json({ message: "Invalid or expired token" })
  }
}

// @desc    Verify JWT Token
exports.verifyJwtAccessToken = (req, res) => {
  try {
    const token = req.token; // Get token from middleware

    // Use jwtService to verify the token
    const decoded = jwtService.verifyAccessToken(token);
    res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (err) {
    console.error("Token Verification Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


// @desc    Verify JWT Token
exports.verifyJwtRefreshToken = (req, res) => {
  try {
    const token  = req.token

    // Use jwtService to verify the token
    const decoded = jwtService.verifyRefreshToken(token)
    res.status(200).json({ message: "Token is valid", user: decoded })
  } catch (err) {
    console.error("Token Verification Error:", err.message)
    res.status(401).json({ message: "Invalid or expired token" })
  }
}



// @desc    Refresh access token using the refresh token
exports.refreshAccessToken = async (req, res) => {
  try {
    const refreshToken  = req.token;


    // Validate and refresh access token
    const { accessToken } = await jwtService.generateAccessToken(refreshToken);

    res.status(200).json({
      message: 'Access token refreshed successfully',
      accessToken,
    });
  } catch (err) {
    console.error('Refresh Token Error:', err.message);
    res.status(401).json({ message: err.message });
  }
};


// @desc    Rotate Refresh access token using the refresh token
exports.rotateRefreshToken = async (req, res) => {
  try {
    const refreshToken  = req.token;

     // Use jwtService to verify the token
     const decoded = jwtService.verifyRefreshToken(refreshToken)
     const user = userService.getUserById(decoded.id);

    // Validate and refresh access token
    const newRefreshToken =jwtService.createRefreshToken(user);
    const  accessToken  =  jwtService.createAccessToken({ id: user._id, email: user.email })
    console.log('refresh token new',accessToken)

    res.status(200).json({
      message: 'Token Rotation successfully',
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    console.error('Refresh Token Error:', err.message);
    res.status(401).json({ message: err.message });
  }
};
