require('dotenv').config();
const express = require('express');
const session = require('express-session');
const authService = require('./services/authService');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Initialize authentication service
authService.initializePassport(app);

// Use routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});