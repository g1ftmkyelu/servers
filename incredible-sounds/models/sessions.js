const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      required: true,
      default: 'pending'
    }
  })
  module.exports = mongoose.model('Session', sessionSchema)
  
  
  