import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

class AuthService {
  constructor() {
    // Don't initialize immediately - wait for explicit call
  }

  // Build callback URL for GitHub Codespaces and other environments
  getCallbackURL(port = 3000) {
    if (process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN) {
      return `https://${process.env.CODESPACE_NAME}-${port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/auth/google/callback`;
    }
    return process.env.CALLBACK_URL || `http://localhost:${port}/auth/google/callback`;
  }

  setupGoogleStrategy() {
    const port = process.env.PORT || 3000;
    
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

export default new AuthService();