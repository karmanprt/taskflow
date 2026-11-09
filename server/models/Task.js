const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // The user who owns this task
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Task title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional task description
    description: {
      type: String,
      trim: true,
    },

    // Whether the task is completed
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically creates createdAt and updatedAt
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);
