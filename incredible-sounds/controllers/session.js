const express = require('express');
const router = express.Router();
const Session = require('../models/sessions');

router.get('/', async (req, res) => {
    try {
        const Sessions = await Session.find().exec()
        return res.status(200).json(Sessions)

    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const session = await Session.findById(id).exec()
        if (!session) res.status(404).json({ error: 'Session not found' })
        return res.status(200).json(session)

    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
})
router.post('/', async (req, res) => {
    const session = req.body
    try {
        const newSession = new Session( session )
        await newSession.save()
        return res.status(200).json({ message: "session saved" })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
router.put('/approve/:id', async (req, res) => {
    const { id } = req.params
    try {
        const targetSession = await Session.findById(id).exec()
        if (!targetSession) return res.status(404).json({ message: "session not found" })
        targetSession.status = "approved"
        targetSession.save()
        return res.status(200).json({ message: "session approved successfully" })

    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
});
router.put('/cancel/:id', async (req, res) => {
    const { id } = req.params
    try {
        const targetSession = await Session.findById(id).exec()
        if (!targetSession) return res.status(404).json({ message: "session not found" })
        targetSession.status = "cancelled"
        targetSession.save()
        return res.status(200).json({ message: "session cancelled successfully" })

    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
});
router.put('/reschedule/:id', async (req, res) => {
    const { id } = req.params
    const session = req.body
    try {
        const targetSession = await Session.findById(id).exec()
        if (!targetSession) return res.status(404).json({ message: "session not found" })
        targetSession.date = session.date
        targetSession.time = session.time
        targetSession.save()
        return res.status(200).json({ message: `session rescheduled successfully to date ${session.date} and at time ${session.time}` })

    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const targetSession = await Session.findById(id).exec()
        if (!targetSession) return res.status(404).json({ message: "target session not found" })
        await Session.findByIdAndDelete(id).exec()
        return res.status(200).json({ message: "session deleted successfully" })
    } catch (error) {
        return res.status(200).json({ error: error.message })
    }
})


module.exports = router