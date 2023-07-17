const mongoose = require('mongoose');

const ThoughtSchema = mongoose.Schema({
  questions: {
    type: [],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('thought', ThoughtSchema);
