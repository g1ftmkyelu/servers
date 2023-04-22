const Prescription = require('../models/prescription');
const Diagnosis = require('../models/diagnosis');

// Get all prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find();
    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Create a new prescription
exports.createPrescription = async (req, res) => {
  const { diagnosisId, drugs } = req.body;

  try {
    // Check if the diagnosis exists
    const diagnosis = await Diagnosis.findById(diagnosisId);
    if (!diagnosis) {
      return res.status(404).json({ success: false, error: 'Diagnosis not found' });
    }

    // Create the new prescription
    const newPrescription = new Prescription({ diagnosisId, drugs });
    await newPrescription.save();

    res.status(201).json({ success: true, data: newPrescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Update a prescription
exports.updatePrescription = async (req, res) => {
  const { id } = req.params;
  const { drugs } = req.body;

  try {
    // Check if the prescription exists
    let prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).json({ success: false, error: 'Prescription not found' });
    }

    // Update the prescription fields and save it to the database
    prescription.drugs = drugs;
    await prescription.save();

    res.status(200).json({ success: true, data: prescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Delete a prescription
exports.deletePrescription = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the prescription exists
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).json({ success: false, error: 'Prescription not found' });
    }

    // Delete the prescription from the database
    await prescription.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};