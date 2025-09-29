const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { isAuthenticated, logout } = require('../middleware/auth');

// Main route
router.get('/', (req, res) => {
  if (isAuthenticated(req)) {
    res.send(`
      <h1>Welcome, ${req.user.displayName}!</h1>
      <p>Email: ${req.user.emails[0].value}</p>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>Timer Application</h1>
      <p>Please <a href="/login">login with Google</a> to continue.</p>
    `);
  }
});

// Login page
router.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <a href="/auth/google">Login with Google</a>
  `);
});

// Logout route
router.get('/logout', logout);

// Google OAuth routes
router.get('/auth/google', authService.getGoogleAuthRoute());

router.get('/auth/google/callback',
  authService.getGoogleCallbackRoute(),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;