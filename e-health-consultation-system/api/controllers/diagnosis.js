// Import the required models
const Diagnosis = require('../models/diagnosis');
const Patient = require('../models/patients');

// Handle POST requests to create a new diagnosis
exports.createDiagnosis = async (req, res, next) => {
    try {
        const { patientId, symptoms, diseaseName, dateOfDiagnosis } = req.body;

        // Check if the patientId is valid
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Create a new diagnosis and save it to the database
        const diagnosis = new Diagnosis({
            patientId: patient._id,
            symptoms,
            diseaseName,
            dateOfDiagnosis
        });
        await diagnosis.save();

        res.status(201).json({
            success: true,
            message: 'Diagnosis created successfully',
            diagnosis
        });
    } catch (err) {
        next(err);
    }
};

// Handle GET requests to get a diagnosis by its ID
exports.getDiagnosisById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID'
            });
        }

        // Find the diagnosis by ID and populate the patient field
        const diagnosis = await Diagnosis.findById(id).populate('patientId');
        if (!diagnosis) {
            return res.status(404).json({
                success: false,
                message: 'Diagnosis not found'
            });
        }

        res.status(200).json({
            success: true,
            diagnosis
        });
    } catch (err) {
        next(err);
    }
};

// Handle GET requests to get all diagnoses for a specific patient
exports.getDiagnosesByPatientId = async (req, res, next) => {
    try {
        const { patientId } = req.params;

        // Check if the patientId is valid
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid patient ID'
            });
        }

        // Find all diagnoses for the given patientId and populate the patient field
        const diagnoses = await Diagnosis.find({ patientId }).populate('patientId');
        res.status(200).json({
            success: true,
            diagnoses
        });
    } catch (err) {
        next(err);
    }
};

// Handle PUT requests to update a diagnosis by its ID
exports.updateDiagnosisById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { patientId, symptoms, diseaseName, dateOfDiagnosis } = req.body;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID'
            });
        }

        // Find the diagnosis by ID
        let diagnosis = await Diagnosis.findById(id);
        if (!diagnosis) {
            return res.status(404).json({
                success: false,
                message: 'Diagnosis not found'
            });
        }

        // Update the diagnosis fields and save it to the database
        if (patientId) {
            const patient = await Patient.findById(patientId);
            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: "Patient not found"
                });
            }
            diagnosis.patientId = patientId;
        }

        try {
            const updatedDiagnosis = await diagnosis.save();
            res.status(200).json({
                success: true,
                message: "Diagnosis updated successfully",
                data: updatedDiagnosis
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

exports.deleteDiagnosis = async (req, res) => {
    try {
      const { id } = req.params;
      const diagnosis = await Diagnosis.findById(id);
  
      if (!diagnosis) {
        return res.status(404).json({
          success: false,
          message: 'Diagnosis not found'
        });
      }
  
      await diagnosis.remove();
  
      return res.status(200).json({
        success: true,
        message: 'Diagnosis deleted successfully'
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };
  
