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
    const { email, password } = req.body;

    // Check if producer already exists
    const existingProducer = await Producer.findOne({ email });
    if (existingProducer) {
      return res.status(400).json({ message: 'Producer already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    // Create the producer
    const producer = new Producer({
      email,
      password: hashedPassword,
      profilePicture: fileUrl
    });
    await producer.save();

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
    const producer = await Producer.findOne({ email });
    if (!producer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, producer.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ producerId: producer._id }, process.env.JWT_SECRET);

    return res.status(200).json({ message:'login successuful!', token:token, user: producer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Update producer password
router.put('/password', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Check if producer exists
    const producer = await Producer.findOne({ email });
    if (!producer) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if old password is correct
    const passwordMatch = await bcrypt.compare(oldPassword, producer.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the producer's password
    producer.password = hashedPassword;
    await producer.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});


// Update producer account
router.put('/', upload.single('file'), async (req, res) => {
  const { email } = req.body;
  const producerId = req.body.id;

  try {

    const producer = await Producer.findById(producerId);
    if (!producer) {
      return res.status(404).json({ message: 'Producer not found' });
    }


    // Upload the profile picture to Firebase Storage
    const fileRef = ref(storage, `profilePictures/${req.file.originalname}`);
    const metaData = {
      contentType: req.file.mimetype,
    }
    const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
    const fileUrl = await getDownloadURL(snapShot.ref);

    producer.email = email;
    producer.profilePicture = fileUrl;
    await producer.save();
    res.json({ message: 'Producer account updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;