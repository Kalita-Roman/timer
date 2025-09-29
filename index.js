const express = require('express');
const path = require('path');
const timerRoutes = require('./routes/timers');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serve the timer management page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Timer API routes
app.use('/api/timers', timerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});