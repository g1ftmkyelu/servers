const mongoose = require('mongoose');


// purchases.js


const purchaseSchema = new mongoose.Schema({
    beatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beat',
      required: true
    },
    beatUrl: {
      type: String,
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    price: {
      type: Number,
      required: true
    }
  });
  
  module.exports = mongoose.model('Purchase', purchaseSchema);
  