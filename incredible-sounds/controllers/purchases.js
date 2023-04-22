const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchases');

router.get('/', async (req, res) => {
    try {

        const purchases = await Purchase.find().exec()
        return res.status(200).json(purchases)

    } catch (error) {
        return res.status(500).json({ error: error.messsage });
    }
})
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const queriedPurchase = await Purchase.findById(id).exec()
        if (!queriedPurchase) return res.status(404).json({ error: 'Purchase not found' });
        return res.status(200).json(queriedPurchase)
    } catch (error) {
        return res.status(500).json({ error: error.messsage });
    }
})
router.post('/', async (req, res) => {
    const purchase = req.body
    try {
        const newPurchase = new Purchase( purchase )
        await newPurchase.save()
        return res.status(200).json("purchased successfully!")

    } catch (error) {
        return res.status(500).json({ error: error.messsage });
    }
})
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const targetPurchase = await Purchase.findById(id).exec()
        if (!targetPurchase) return res.status(200).json({ message: 'Purchase not found'})
        await Purchase.findByIdAndDelete(id).exec()
        return res.status(200).json({ targetPurchase: "deleted successfully"})
    } catch (error) {
        return res.status(500).json({ error: error.messsage });
    }
})


module.exports = router