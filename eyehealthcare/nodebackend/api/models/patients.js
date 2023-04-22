const mongoose = require('mongoose');

const healthHistorySchema = new mongoose.Schema({
  date: Date,
  condition: String,
  treatment: String,
  doctor: String,
});

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: String,
  age: Number,
  address: String,
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  healthHistory: [healthHistorySchema],
  role: {
    type: String,
    enum: ['Patient', 'Doctor', 'Admin'],
    default: 'Patient',
  },
  profilePicture: String,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
