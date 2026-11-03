require("dotenv").config()

const express = require("express");
const app = express();
const User = require("./models/User");

const port = process.env.PORT || 4000;
const connectDB = require("./config/db");

// Middleware: Parse incoming JSON bodies
app.use(express.json());

// GET route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running");
});

// Health route
app.get("/api/health", (req, res) => {
  res.send({status: "ok"});
});

// POST route: Echo the received JSON
app.post("/api/echo", (req, res) => {
  res.send(req.body);
});

// Temporary test-user route
app.post("/api/test-user", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// Start server after database connection
const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Taskflow is listening on port ${port}`);
  });
};

startServer();