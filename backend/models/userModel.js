const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please fill in your name'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Please fill in your name'],
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Enter your email'],
      lowercase: true,
      unique: true,
    },
    password: { 
      type: String,
       required: [true, 'Please insert your password'],
       minLength: [8, "passwords must be at least 8 character long"],
         },
    clientIP: {
      type: String,
    },
    funds: {
      available: { type: Number, default: 0 },
      reserved: { type: Number, default: 0 },
    },
    clientBrowser: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    activation: {
      type: Boolean,
      default: false,
    },

    // refreshTokens: [{ token: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
