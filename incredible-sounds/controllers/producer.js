const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../config/firebase.config')

initializeApp(firebaseConfig);

const storage = getStorage();

const Producer = require('../models/producer');

// Multer configuration for file uploads

const upload = multer({ storage: multer.memoryStorage() });





router.get('/', async(req, res) =>{
  try {
    const Producers= await Producer.find().exec()
    return res.status(200).json(Producers)
    
  } catch (error) {
    return res.status('400').json({ error: error.message})
  }
})





// Create a producer with an uploaded profile picture
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const producer = req.body;

    // Check if producer already exists
    const existingProducer = await Producer.findOne({ email:producer.email });
    if (existingProducer) {
      return res.status(400).json({ message: 'Producer already exists' });
    }

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    producer.profilePicture=fileUrl;

    // Create the producer
    const newProducer = new Producer(producer);
    await newProducer.save();

    return res.status(201).json({ message: 'Producer created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Producer login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if producer exists
    const producer = await Producer.findOne({ email:email, password:password });
    if (!producer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message:'login successuful!', user: producer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});




// Update producer account
router.put('/:id', upload.single('file'), async (req, res) => {
  const producer = req.body;
  const {id} = req.params

  try {

    const targetProducer = await Producer.findById(id);
    if (!targetProducer) {
      return res.status(404).json({ message: 'Producer not found' });
    }


    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    targetProducer.email = producer.email;
    targetProducer.profilePicture = fileUrl;
    await producer.save();
    res.json({ message: 'Producer account updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;