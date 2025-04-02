const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    default: null
  },
  type: {
    type: String,
    required: true,
    enum: ['admin', 'employee'], // ✅ Accepts only these two values
    lowercase: true,
    trim: true
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
