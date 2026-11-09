const express = require("express");
const router = express.Router();

// Import all task controllers
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// Import authentication middleware
const { protect } = require("../middleware/authMiddleware");

// Protect all routes below this line
router.use(protect);

// Create a task
router.post("/", createTask);

// Get all tasks
router.get("/", getTasks);

// Update a specific task
router.put("/:id", updateTask);

// Delete a specific task
router.delete("/:id", deleteTask);

// Export router
module.exports = router;