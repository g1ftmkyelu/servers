const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});


const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male','female'],
    default: 'male',
    unique:false
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  education: {
    type: [educationSchema],
    default:[]
  },
  workingHours: {
    type: String,
    default:"9:00 - 1700"
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'doctor'
  },
  profilePicture: {
    type: String,
    required: true
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
