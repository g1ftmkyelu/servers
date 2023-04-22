const express = require('express');
const router = express.Router();
const Customer = require('../models/customers')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../config/firebase.config')



initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });




router.get('/', async (req, res) => {
    try {
        const Customers = await Customer.find().exec()
        return res.status(200).json(Customers)

    } catch (error) {
        return res.status('400').json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const {id}= req.params
    try {
        const targetCustomer = await Customer.findById(id).exec()
        return res.status(200).json(targetCustomer)

    } catch (error) {
        return res.status('400').json({ error: error.message })
    }
})

// Create a customer with an uploaded profile picture
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const customer = req.body;

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email:customer.email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer already exists' });
        }

        // Upload the profile picture to Firebase Storage
        const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
        const metaData = {
            contentType: req.file.mimetype,
        }
        const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
        const fileUrl = await getDownloadURL(snapShot.ref);
        customer.profilePicture = fileUrl

        // Create the customerp
        const newCustomer = new Customer(customer);
        await newCustomer.save();

        return res.status(201).json({ message: 'Customer created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if customer exists
        const customer = await Customer.findOne({ email:email, password:password });
        if (!customer) {
            return res.status(400).json({ message: 'Invalid cridentials' });
        }

        return res.status(200).json({ message: 'login successuful!',  user: customer });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});


// Update customer account
router.put('/:id', upload.single('file'), async (req, res) => {

    const { id } = req.params;
    const customer = req.body;

    try {

        const targetCustomer = await Customer.findById(id).exec();
        if (!targetCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }


        // Upload the profile picture to Firebase Storage
        const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
        const metaData = {
            contentType: req.file.mimetype,
        }
        const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
        const fileUrl = await getDownloadURL(snapShot.ref);

        targetCustomer.email = customer.email;
        targetCustomer.profilePicture = fileUrl;
        targetCustomer.password= customer.password;
        await targetCustomer.save();
        res.json({ message: 'Customer account updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const targetCustomer= await Customer.findById(id).exec();
        if(!targetCustomer) return res.status(404).json({ message: 'customer not found' });
        await Customer.findByIdAndDelete(id).exec();
        return res.status(200).json({ message: 'Customer account deleted successfully' });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = router