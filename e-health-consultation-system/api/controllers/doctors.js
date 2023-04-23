const Doctor = require('../models/doctors');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../configs/firebase.config')


initializeApp(firebaseConfig);
const storage = getStorage();



exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDoctor = async (req, res) => {
  try {
    const doctor = req.body;

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    doctor.profilePicture = fileUrl

    const newDoctor = new Doctor(doctor)

    await newDoctor.save();
    res.status(201).json({message:"doctor registration successful"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const targetDoctor = await Doctor.findById(req.params.id);
    if (!targetDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const doctor = req.body;

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    doctor.profilePicture = fileUrl

    Object.assign(targetDoctor, doctor);
    await targetDoctor.save();
    res.json({message: 'doctor updated successfully'});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.AddDoctorEducation = async (req, res) => {
  try {
    const targetDoctor = await Doctor.findById(req.params.id);
    if (!targetDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const education = req.body;

    await Doctor.findByIdAndUpdate(req.params.id, {$push:{education: education}})
    return res.status(200).json({message: "medical education updated successfully"});

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.RemoveDoctorEducation = async (req, res) => {
  try {
    const targetDoctor = await Doctor.findById(req.params.id);
    if (!targetDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const education = req.body;

    await Doctor.findByIdAndUpdate(req.params.id, {$pop:{education:education}})
    return res.status(200).json({message: "medical education updated successfully"});

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    await Doctor.findByIdAndDelete(req.params.id).exec()
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

