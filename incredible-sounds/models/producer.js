// producers.js
const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: 'http://randomuser.me/api/portraits/men/32.jpg'
    }
  });
  
  module.exports = mongoose.model('Producer', producerSchema)
  