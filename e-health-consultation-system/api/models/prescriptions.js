const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  diagnosisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diagnosis',
    required: true
  },
  drugs: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    morningDosage: {
      type: String,
      required: true
    },
    afternoonDosage: {
      type: String,
      required: true
    },
    eveningDosage: {
      type: String,
      required: true
    },
    daysRequiredToComplete: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
