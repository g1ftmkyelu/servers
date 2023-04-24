const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Reason:  {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending',
  },
});


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
