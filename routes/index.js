const express = require('express');
const path = require('path');
const router = express.Router();
const authService = require('../services/authService');
const { logout } = require('../middleware/auth');

// Login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
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