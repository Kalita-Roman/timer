const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

class AuthService {
  // Build callback URL for GitHub Codespaces and other environments
  getCallbackURL(port = 3030) {
    if (process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
      return `https://${process.env.CODESPACE_NAME}-${port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/auth/google/callback`;
    }
    return process.env.CALLBACK_URL || `/auth/google/callback`;
  }

  setupGoogleStrategy() {
    // Only setup Google strategy if credentials are provided
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.warn('Google OAuth credentials not found. Authentication will not work.');
      return;
    }
    
    const port = process.env.PORT || 3030;
    
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: this.getCallbackURL(port)
    }, (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }));
  }

  setupSerialization() {
    // Serialize/deserialize user for session
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }

  initialize() {
    this.setupGoogleStrategy();
    this.setupSerialization();
  }

  initializePassport(app) {
    this.initialize();
    app.use(passport.initialize());
    app.use(passport.session());
  }

  // Authentication routes
  getGoogleAuthRoute() {
    return passport.authenticate('google', { scope: ['profile', 'email'] });
  }

  getGoogleCallbackRoute() {
    return passport.authenticate('google', { failureRedirect: '/login' });
  }
}

module.exports = new AuthService();