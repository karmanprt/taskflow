
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

const port = process.env.PORT || 4000;
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Parse incoming JSON request bodies
app.use(express.json());

// Allow requests from our React development server
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running");
});

// Health route
app.get("/api/health", (req, res) => {
  res.send({ status: "ok" });
});

// Handle unknown routes
app.use(notFound);

// Handle application errors
app.use(errorHandler);

// Start server after database connection
const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`TaskFlow is listening on port ${port}`);
  });
};

startServer();
