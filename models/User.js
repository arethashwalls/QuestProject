// Imports:
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  class: {
    type: String,
    default: 'Warrior'
  }
});

module.exports = User = mongoose.model('users', UserSchema);
