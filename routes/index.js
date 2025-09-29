const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { logout } = require('../middleware/auth');

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
router.get('/google', authService.getGoogleAuthRoute());

router.get('/google/callback',
  authService.getGoogleCallbackRoute(),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;