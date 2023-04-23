const Appointments = require('../models/appointments');
const Patient = require('../models/patients');
const Doctor = require('../models/doctors');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = req.body;

    const newAppointment = new Appointments(appointment);

    await newAppointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.find()
      .populate('patient.patientId', 'name')
      .populate('doctor.doctorId', 'name');

    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get a single appointment by id
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointments.findById(req.params.id)
      .populate('patient.patientId', 'name')
      .populate('doctor.doctorId', 'name');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointments.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
  // Delete an appointment
  exports.deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;
  
    try {
      const appointment = await Appointments.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }
  
      await appointment.remove();
  
      res.status(200).json({
        success: true,
        message: 'Appointment deleted successfully',
        data: appointment
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };
  