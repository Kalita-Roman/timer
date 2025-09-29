import express from 'express';
import path from 'path';
import authService from '../services/authService.js';
import { logout } from '../middleware/auth.js';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

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

export default router;