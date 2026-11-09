// Handle requests to routes that do not exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);

  // Mark this error as a 404
  error.statusCode = 404;

  next(error);
};

// Central error-handling middleware
const errorHandler = (err, req, res, next) => {
  // Start with the original error message
  let message = err.message;
  let statusCode = err.statusCode || res.statusCode;

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid id";
  }

  // Mongoose schema validation failure
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // MongoDB duplicate-key error
  else if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  // Use 500 for unexpected errors without a valid status
  if (!statusCode || statusCode === 200) {
    statusCode = 500;
  }

  // Build the JSON error response
  const response = {
    message,
  };

  // Include stack trace only during development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

// Export middleware functions
module.exports = {
  notFound,
  errorHandler,
};
