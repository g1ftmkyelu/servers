require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = new express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
const port = process.env.PORT || 3000;


// Import routes
const appointmentRoutes = require('./api/routes/appointments');
const doctorRoutes = require('./api/routes/doctors');
const patientRoutes = require('./api/routes/patients');
const loginRoutes = require('./api/routes/login');
const diagnosisRoutes = require('./api/routes/diagnosis');
const prescriptionRoutes = require('./api/routes/prescriptions');
const EHRRoutes = require('./api/routes/EHR');

// Use routes as middleware
app.use('/appointments', appointmentRoutes);
app.use('/doctor', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/diagnosis', diagnosisRoutes);
app.use('/login', loginRoutes)
app.use('/prescritions', prescriptionRoutes);
app.use('/ehr', EHRRoutes);









//Mongoose setup (database connection)
const url = process.env.DATABASE_URL
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
    console.log('database connected', url)
})

db.on('error', err => {
    console.error('connection error:', err)
})

mongoose.Promise = global.Promise;

app.listen(port,
    () => {
        console.log(`App listening on port ${port}`)
    }
);
