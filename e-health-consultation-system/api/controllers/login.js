const Doctor = require('../models/doctors');
const Patient = require('../models/patients');

// Doctor login
exports.doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if password is correct
    if (doctor.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return doctor data
    return res.status(200).json(doctor);

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
