require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const authService = require('./services/authService');
const authRoutes = require('./routes/index');
const timerRoutes = require('./routes/timers');
const { isAuthenticated } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Initialize authentication service
authService.initializePassport(app);

app.use(express.static(path.join(__dirname, 'public')));
// Root route - serve the timer management page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Auth routes with /auth prefix
app.use('/auth', authRoutes);

// Timer API routes
app.use('/api/timers', timerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});