const Appointments = require('../models/appointments');
const Patient = require('../models/patients');
const Doctor = require('../models/doctors');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, reason, date, time } = req.body;

    // Check if the patient and doctor exist
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({
        success: false,
        message: 'Patient or doctor not found'
      });
    }

    const appointment = new Appointments({
      patient: {
        patientId: patientId,
        patientName: patient.name
      },
      doctor: {
        doctorId: doctorId,
        doctorName: doctor.name
      },
      reason: reason,
      date: date,
      time: time
    });

    await appointment.save();

    res.status(201).json({
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
// Update an appointment
exports.updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;
  
    try {
      const appointment = await Appointments.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }
  
      appointment.status = status;
      await appointment.save();
  
      res.status(200).json({
        success: true,
        message: 'Appointment updated successfully',
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
  