const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  symptoms: {
    type: [String],
    required: true
  },
  diseaseName: {
    type: String,
    required: true
  },
  dateOfDiagnosis: {
    type: Date,
    required: true
  }
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
