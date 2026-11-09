// Middleware for handling requests to routes that don't exist
const notFound = (req, res, next) => {
  // Create an error containing the requested URL
  const error = new Error(`Not Found - ${req.originalUrl}`);

  // Set the HTTP status code to 404
  res.statusCode = 404;

  // Forward the error to the central error handler
  next(error);
};

// Central error-handling middleware
const errorHandler = (err, req, res, next) => {
  // Start with the error message
  let message = err.message;

  // Handle invalid MongoDB ObjectIds
  if (err.name === "CastError") {
    res.statusCode = 400;
    message = "Invalid id";
  } else {
    // Preserve an existing error status, otherwise use 500
    res.statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  }

  // Build the error response
  const response = {
    message,
  };

  // Include stack trace only during development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  // Send the final JSON error response
  res.status(res.statusCode).json(response);
};

// Export both middleware functions
module.exports = {
  notFound,
  errorHandler,
};
