const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // User's display name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Email is stored in a consistent format
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Store the hashed password, never the plain password
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    // Automatically creates createdAt and updatedAt
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
