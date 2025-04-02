const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true // ✅ Keeps the whitespace clean
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true // ✅ Converts email to lowercase automatically
  },
  password: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    default: null // ✅ Optional image path
  }
});

// ❌ Removed the pre-save password hashing hook

const User = mongoose.model('User', userSchema);
module.exports = User;
