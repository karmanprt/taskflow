require("dotenv").config();
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const express = require("express");
const app = express();

const port = process.env.PORT || 4000;
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Middleware: Parse incoming JSON bodies
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// GET route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running");
});

// Health route
app.get("/api/health", (req, res) => {
  res.send({ status: "ok" });
});

// POST route: Echo the received JSON
app.post("/api/echo", (req, res) => {
  res.send(req.body);
});

// Handle requests to unknown routes
app.use(notFound);

// Handle errors forwarded by next(error)
app.use(errorHandler);

// Start server after database connection
const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`TaskFlow is listening on port ${port}`);
  });
};

startServer();
