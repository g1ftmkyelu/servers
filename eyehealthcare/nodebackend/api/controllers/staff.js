const Staff = require('../models/staff');

// Get all staffs
const getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.json(staffs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single staff by ID
const getStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new staff
const createStaff = async (req, res) => {
  const { name, email, password, profilePicture, role } = req.body;
  try {
    const newStaff = new Staff({
      name,
      email,
      password,
      profilePicture,
      role,
    });
    const savedStaff = await newStaff.save();
    res.json(savedStaff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a staff by ID
const updateStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json(updatedStaff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a staff by ID
const deleteStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getStaffs,
  getStaffById,
  createStaff,
  updateStaffById,
  deleteStaffById,
};
