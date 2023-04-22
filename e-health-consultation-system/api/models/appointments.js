const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentsSchema = new Schema({
    patient: {
        patientId: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        patientName: {
            type: String,
            required: true
        }
    },
    doctor: {
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        doctorName: {
            type: String,
            required: true
        }
    },
    reason: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Cancelled'],
        default: 'Pending'
    }
});

const Appointments = mongoose.model('Appointments', appointmentsSchema);

module.exports = Appointments;







