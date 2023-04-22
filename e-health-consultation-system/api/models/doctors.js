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

const workingHoursSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  }
});

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country: {
    type: String,
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
  qualification: {
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
    required: true
  },
  workingHours: {
    type: workingHoursSchema,
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
