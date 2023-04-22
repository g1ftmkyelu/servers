const EHR = require('../models/EHR');
const Patient = require('../models/patients');

// Get a patient's EHR
exports.getEHR = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const ehr = await EHR.findOne({ patientId: patientId }).populate('patientId');
    if (!ehr) {
      return res.status(404).json({ success: false, message: 'EHR not found' });
    }
    res.status(200).json({ success: true, data: ehr });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Get EHR by patient ID
exports.getEHRByPatientId = async (req, res) => {
    const patientId = req.params.patientId;
  
    try {
      // Find patient by ID
      const patient = await Patient.findById(patientId);
  
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found'
        });
      }
  
      // Find EHR by patient ID
      const ehr = await EHR.findOne({ patientId: patientId });
  
      if (!ehr) {
        return res.status(404).json({
          success: false,
          message: 'EHR not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: ehr
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };

// Create a new EHR
exports.createEHR = async (req, res) => {
  try {
    const { patientId, allergies, surgeryHistory, geneticallyInheritedDiseases, specialNeeds, additionalNotes } = req.body;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    const ehr = new EHR({ patientId, allergies, surgeryHistory, geneticallyInheritedDiseases, specialNeeds, additionalNotes });
    await ehr.save();
    res.status(201).json({ success: true, data: ehr });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update an existing EHR
exports.updateEHR = async (req, res) => {
  try {
    const ehrId = req.params.ehrId;
    const { allergies, surgeryHistory, geneticallyInheritedDiseases, specialNeeds, additionalNotes } = req.body;
    const ehr = await EHR.findById(ehrId);
    if (!ehr) {
      return res.status(404).json({ success: false, message: 'EHR not found' });
    }
    ehr.allergies = allergies || ehr.allergies;
    ehr.surgeryHistory = surgeryHistory || ehr.surgeryHistory;
    ehr.geneticallyInheritedDiseases = geneticallyInheritedDiseases || ehr.geneticallyInheritedDiseases;
    ehr.specialNeeds = specialNeeds || ehr.specialNeeds;
    ehr.additionalNotes = additionalNotes || ehr.additionalNotes;
    await ehr.save();
    res.status(200).json({ success: true, data: ehr });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Delete an EHR
exports.deleteEHR = async (req, res) => {
  try {
    const ehrId = req.params.ehrId;
    const ehr = await EHR.findByIdAndDelete(ehrId);
    if (!ehr) {
      return res.status(404).json({ success: false, message: 'EHR not found' });
    }
    res.status(200).json({ success: true, message: 'EHR deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
