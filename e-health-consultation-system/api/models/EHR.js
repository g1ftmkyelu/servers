const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ehrSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
  allergies: [{ type: String }],
  surgeryHistory: [{
    surgeryName: { type: String },
    date: { type: Date },
    description: { type: String }
  }],
  geneticallyInheritedDiseases: [{ type: String }],
  specialNeeds: { type: String },
  additionalNotes: { type: String }
});

const EHR = mongoose.model('EHR', ehrSchema);

module.exports = EHR;
