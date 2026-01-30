const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  resume: {
    type: String,
    default: ''
  },
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
