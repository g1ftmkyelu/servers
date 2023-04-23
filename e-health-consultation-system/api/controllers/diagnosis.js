// Import the required models
const mongoose = require('mongoose');
const Diagnosis = require('../models/diagnosis');
const Patient = require('../models/patients');


// Handle GET requests to get all diagnoses for a specific patient
exports.getAllDiagnoses = async (req, res, next) => {
    try {
        // Find all diagnoses for the given patientId and populate the patient field
        const diagnoses = await Diagnosis.find();
        res.status(200).json(diagnoses);
    } catch (err) {
        next(err);
    }
};

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


        // Find the diagnosis by ID and populate the patient field
        const diagnosis = await Diagnosis.findById(id).exec();
        if (!diagnosis) {
            return res.status(404).json({
                success: false,
                message: 'Diagnosis not found'
            });
        }

        res.status(200).json(
            diagnosis
        );
    } catch (err) {
        next(err);
    }
};



// Handle GET requests to get all diagnoses for a specific patient
exports.getDiagnosesByPatientId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find all diagnoses for the given patientId and populate the patient field
        const diagnoses = await Diagnosis.find({ patientId: id }).exec();
        res.status(200).json(
            diagnoses
        );
    } catch (err) {
        next(err);
    }
};

// Handle PUT requests to update a diagnosis by its ID
exports.updateDiagnosisById = async (req, res, next) => {
    try {
        const diagnosis = await Diagnosis.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json({message:'diagnosis updated successfully'});
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

        await Diagnosis.findByIdAndDelete(id).exec();

        return res.status(200).json({
            success: true,
            message: 'Diagnosis deleted successfully'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

