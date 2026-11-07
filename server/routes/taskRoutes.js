const express = require("express");
const router = express.Router();

const { createTask, getTasks } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// Protect every route in this router
router.use(protect);

// Task routes
router.post("/", createTask);
router.get("/", getTasks);

module.exports = router;