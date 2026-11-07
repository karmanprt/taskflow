const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check whether title is provided
    if(!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required"
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      user: req.user._id
    });

    // Send response
    return res.status(201).json({
      message: "Task created successfully",
      task
    })

  } catch (error) {
    console.error("Create task error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

const getTasks = async (req,res) => {
  try {
    // Find tasks belonging to the logged-in user
    const tasks = await Task.find({
      user: req.user._id
    }).sort({createdAt: -1});

    // Send tasks
    return res.status(200).json({
      count: tasks.length,
      tasks
    })

  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = { createTask, getTasks };