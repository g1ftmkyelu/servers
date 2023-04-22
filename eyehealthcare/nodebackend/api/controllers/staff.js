const Staff = require('../models/staff');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../configs/firebase.config')


initializeApp(firebaseConfig);
const storage = getStorage();



exports.getAllStaff = async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const staff = req.body;

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    staff.profilePicture = fileUrl

    const newStaff = new Staff(staff)

    await newStaff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const targetStaff = await Staff.findById(req.params.id);
    if (!targetStaff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    const staff = req.body;

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    staff.profilePicture = fileUrl

    Object.assign(targetStaff, staff);
    await targetStaff.save();
    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    await Staff.findByIdAndDelete(req.params.id).exec()
    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

