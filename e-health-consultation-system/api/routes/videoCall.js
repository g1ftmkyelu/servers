const express = require('express');
const router = express.Router();
const videoCallController = require('../controllers/videoCall');

router.post('/call', videoCallController.initiateCall);
router.post('/answer', videoCallController.answerCall);
router.post('/hangup', videoCallController.hangupCall);

module.exports = router;


