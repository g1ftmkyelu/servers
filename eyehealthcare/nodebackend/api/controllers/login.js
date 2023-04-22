const Staff = require('../models/staff');
const Patient = require('../models/patients');

// Staff login
exports.staffLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if staff exists
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    if (staff.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return staff data
    return res.status(200).json(staff);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Patient login
exports.patientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    if (patient.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return patient data
    return res.status(200).json(patient);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
