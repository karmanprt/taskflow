const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes that require a logged-in user
const protect = async (req, res, next) => {
  // Read the Authorization header
  const authHeader = req.headers.authorization;

  // Check that a Bearer token was provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized, no token provided"
    });
  }

  // Extract the token after "Bearer "
  const token = authHeader.split(" ")[1];

  let decoded;

  // Verify the JWT separately
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid or expired"
    });
  }

  // Look up the user in MongoDB
  try {
    const user = await User.findById(decoded.id).select("-password");

    // The token may be valid even if the user no longer exists
    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user not found"
      });
    }

    // Attach the authenticated user to the request
    req.user = user;

    // Continue to the next middleware or controller
    return next();
  } catch (error) {
    // Database or unexpected errors go to central error handling
    return next(error);
  }
};

module.exports = { protect };