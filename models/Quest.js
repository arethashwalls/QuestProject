// Imports:
const mongoose = require('mongoose');
User = require('./User.js');
UserSchema = mongoose.model('users').schema;
const { Schema } = mongoose;

const questSchema = new Schema({
  chart: {
    type: String,
    get: function(data) {
      try {
        return JSON.parse(data);
      } catch (err) {
        return data;
      }
    },
    set: function(data) {
      return JSON.stringify(data);
    }
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String
  }
});

const Quest = mongoose.model('QuestItem', questSchema);

module.exports = Quest;
