// Authentication middleware
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Check if user is authenticated (for conditional rendering)
function isAuthenticated(req) {
  return req.isAuthenticated();
}

// Logout handler
function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

module.exports = {
  ensureAuthenticated,
  isAuthenticated,
  logout
};