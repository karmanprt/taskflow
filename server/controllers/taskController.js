const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Check whether title is provided and not empty
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    // Create task and assign it to the logged-in user
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    // Send success response
    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    // Forward unexpected errors to central error middleware
    next(error);
  }
};

// Get all tasks belonging to the logged-in user
const getTasks = async (req, res, next) => {
  try {
    // Find only this user's tasks, newest first
    const tasks = await Task.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    // Send tasks and their count
    return res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    // Forward unexpected errors to central error middleware
    next(error);
  }
};

// Update an existing task
const updateTask = async (req, res, next) => {
  try {
    // Get task ID from URL
    const taskId = req.params.id;

    // Get permitted fields from request body
    const { title, description, completed } = req.body;

    // Find task by ID
    const task = await Task.findById(taskId);

    // Check existence and ownership
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Update only fields provided by the client
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    // Save updated document
    await task.save();

    // Return updated task
    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    // Forward unexpected errors to central error middleware
    next(error);
  }
};

// Delete an existing task
const deleteTask = async (req, res, next) => {
  try {
    // Get task ID from URL
    const taskId = req.params.id;

    // Find task by ID
    const task = await Task.findById(taskId);

    // Check existence and ownership
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Delete the found task
    await task.deleteOne();

    // Return success response
    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    // Forward unexpected errors to central error middleware
    next(error);
  }
};

// Export all controller functions
module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};