const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    skills: {
      type: [String],
    },

    education: {
      type: [String],
    },

    experience: {
      type: [String],
    },

    resume: {
      type: String,
      default: '',
    },

    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
