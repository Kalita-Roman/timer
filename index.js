const express = require('express');
const timerRoutes = require('./routes/timers');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Timer API routes
app.use('/api/timers', timerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});