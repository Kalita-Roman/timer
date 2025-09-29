require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authService = require('./services/authService');
const authRoutes = require('./routes/index');
const timerRoutes = require('./routes/timers');
const { isAuthenticated } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Initialize authentication service
authService.initializePassport(app);

// Main route - moved back from routes/index.js
app.get('/', (req, res) => {
  if (isAuthenticated(req)) {
    res.send(`
      <h1>Welcome, ${req.user.displayName}!</h1>
      <p>Email: ${req.user.emails[0].value}</p>
      <a href="/auth/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>Timer Application</h1>
      <p>Please <a href="/auth/login">login with Google</a> to continue.</p>
    `);
  }
});

// Auth routes with /auth prefix
app.use('/auth', authRoutes);

// Timer API routes
app.use('/api/timers', timerRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});