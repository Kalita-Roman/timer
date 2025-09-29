const express = require('express');
const timerController = require('./controllers/timerController');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Timer API routes
app.get('/api/timers', timerController.getAllTimers.bind(timerController));
app.get('/api/timers/:id', timerController.getTimerById.bind(timerController));
app.post('/api/timers', timerController.createTimer.bind(timerController));
app.put('/api/timers/:id', timerController.updateTimer.bind(timerController));
app.delete('/api/timers/:id', timerController.deleteTimer.bind(timerController));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});