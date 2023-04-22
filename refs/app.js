require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = new express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
const port = process.env.PORT || 3000;



























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
