const Patient = require('../models/patients');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../configs/firebase.config')


initializeApp(firebaseConfig);
const storage = getStorage();



exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPatient = async (req, res) => {
  try {
    const patient = req.body;

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    patient.profilePicture = fileUrl

    const newPatient = new Patient(patient)

    await newPatient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const targetPatient = await Patient.findById(req.params.id);
    if (!targetPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const patient = req.body;

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    patient.profilePicture = fileUrl

    Object.assign(targetPatient, patient);
    await targetPatient.save();
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await Patient.removeById(req.params.id).exec()
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

