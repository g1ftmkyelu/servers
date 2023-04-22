require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = new express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
const port = process.env.PORT || 3000;



const producerController=require('./controllers/producer')
app.use('/api/producer', producerController)

const beatController=require('./controllers/beat')
app.use('/api/beat', beatController)

const customerController=require('./controllers/customers')
app.use('/api/customer', customerController)

const purchaseController=require('./controllers/purchases')
app.use('/api/purchase', purchaseController)

const sessionController=require('./controllers/session')
app.use('/api/session', sessionController)



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
