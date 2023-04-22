const express = require('express');
const router = express.Router();
const Beat = require('../models/beats');
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../config/firebase.config')


initializeApp(firebaseConfig);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });



router.get('/', async (req, res) => {
    try {
        const Beats = await Beat.find().exec()
        return res.status(200).json(Beats)

    } catch (error) {
        return res.status('400').json({ error: error.message })
    }
})

// Create a beat with an uploaded profile picture
router.post('/', upload.single('file'), async (req, res) => {
    try {
        const beat = req.body;

        // Check if beat already exists
        const existingBeat = await Beat.findOne({ name:beat.name });
        if (existingBeat) {
            return res.status(400).json({ message: 'Beat already exists' });
        }



        // Upload the profile picture to Firebase Storage
        const fileRef = ref(storage, `beats/${req.file.originalname}`);
        const metaData = {
            contentType: req.file.mimetype,
        }
        const snapShot = await uploadBytesResumable(fileRef, req.file.buffer, metaData)
        const fileUrl = await getDownloadURL(snapShot.ref);
        beat.url = fileUrl;
        // Create the beat
        const newBeat = new Beat(
            beat
        );
        await newBeat.save();

        return res.status(201).json({ message: 'Beat created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const targetBeat = await Beat.findById(id).exec()
        if (!targetBeat) return res.status(200).json({ message: 'Beat not found' })
        await Beat.findByIdAndDelete(id).exec()
        return res.status(200).json({ targetBeat: "deleted successfully" })
    } catch (error) {
        return res.status(500).json({ error: error.messsage });
    }
})

module.exports = router;
