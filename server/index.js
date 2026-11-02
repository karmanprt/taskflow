const express = require("express");
const app = express();
const port = 4000;

// Middleware: Parse incoming JSON bodies
app.use(express.json());

// GET route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running");
});

// Health route
app.get("/api/health", (req, res) => {
  res.send({status: "ok"})
})

// POST route: Echo the received JSON
app.post("/api/echo", (req, res) => {
  res.send(req.body)
})

// Start server
app.listen(port, () => {
  console.log(`Taskflow is listening on port ${port}`);
})