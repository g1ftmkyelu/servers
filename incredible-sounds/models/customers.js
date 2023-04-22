// customers.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    profilePicture: {
      type: String,
      required: true,
      default: 'http://randomuser.me/api/portraits/men/32.jpg'
    }
  });
  
  module.exports = mongoose.model('Customer', customerSchema);
  