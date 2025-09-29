import express from 'express';
import timerController from '../controllers/timerController.js';

const router = express.Router();

// Timer API routes
router.get('/', timerController.getAllTimers.bind(timerController));
router.get('/:id', timerController.getTimerById.bind(timerController));
router.post('/', timerController.createTimer.bind(timerController));
router.put('/:id', timerController.updateTimer.bind(timerController));
router.delete('/:id', timerController.deleteTimer.bind(timerController));

export default router;