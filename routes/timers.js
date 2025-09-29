const express = require('express');
const timerController = require('../controllers/timerController');

const router = express.Router();

// Timer API routes
router.get('/', timerController.getAllTimers.bind(timerController));
router.get('/:id', timerController.getTimerById.bind(timerController));
router.post('/', timerController.createTimer.bind(timerController));
router.put('/:id', timerController.updateTimer.bind(timerController));
router.delete('/:id', timerController.deleteTimer.bind(timerController));

module.exports = router;