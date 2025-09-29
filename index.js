require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const authService = require('./services/authService');
const authRoutes = require('./routes/index');
const timerRoutes = require('./routes/timers');
const { isAuthenticated, ensureAuthenticated } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3030;

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

// Serve static files except index.html
app.use(express.static(path.join(__dirname, 'public'), {
  index: false // Don't serve index.html automatically
}));

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Root route - serve the timer management page (protected)
app.get('/', (req, res) => {
  // Check if user is authenticated
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  
  // Read the HTML file and inject user data
  const indexPath = path.join(__dirname, 'public', 'index.html');
  const fs = require('fs');
  
  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading page');
    }
    
    // Inject user data into the page
    const userInfo = {
      name: req.user.displayName || req.user.name || 'User',
      email: req.user.emails ? req.user.emails[0].value : '',
      picture: req.user.photos ? req.user.photos[0].value : ''
    };
    
    // Replace placeholder with user data
    const htmlWithUserData = data.replace(
      '<script src="script.js"></script>',
      `<script>window.userInfo = ${JSON.stringify(userInfo)};</script><script src="script.js"></script>`
    );
    
    res.send(htmlWithUserData);
  });
});

// Auth routes with /auth prefix
app.use('/auth', authRoutes);

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Timer API routes (protected)
app.use('/api/timers', ensureAuthenticated, timerRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});