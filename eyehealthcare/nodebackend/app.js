require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const app = new express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
const port = process.env.PORT || 3000;

// Import routes
const appointmentRoutes = require('./api/routes/appointment');
const staffRoutes = require('./api/routes/staff');
const patientRoutes = require('./api/routes/patients');
const productRoutes = require('./api/routes/stock');
const loginRoutes = require('./api/routes/login');
const diagnosisRoutes = require('./api/routes/diagnosis');

// Use routes as middleware
app.use('/appointments', appointmentRoutes);
app.use('/staff', staffRoutes);
app.use('/patients', patientRoutes);
app.use('/products', productRoutes);

app.use('/login', loginRoutes);
app.use('/diagnosis', diagnosisRoutes);





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
