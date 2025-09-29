# Project Structure

This document explains the project structure after refactoring the authentication code into separate services.

## Directory Structure

```
timer/
├── middleware/
│   └── auth.js               # Authentication middleware functions
├── routes/
│   └── index.js              # Application routes
├── services/
│   └── authService.js        # Authentication service and passport configuration
├── .env                      # Environment variables (not committed)
├── .env.example              # Environment variables template
├── index.js                  # Main application entry point
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## Architecture

### Services Layer (`services/`)
- **authService.js**: Handles Google OAuth2 configuration, passport strategy setup, and authentication-related methods

### Middleware Layer (`middleware/`)
- **auth.js**: Contains authentication middleware functions like `ensureAuthenticated`, `isAuthenticated`, and `logout`

### Routes Layer (`routes/`)
- **index.js**: Defines all application routes including authentication endpoints

### Main Application (`index.js`)
- Minimal entry point that ties everything together
- Handles session configuration
- Initializes services and middleware

## Benefits of this Structure

1. **Separation of Concerns**: Authentication logic is separated from routing and main app logic
2. **Maintainability**: Easier to modify authentication behavior without touching other parts
3. **Testability**: Individual components can be tested in isolation
4. **Reusability**: Services and middleware can be reused across different parts of the application
5. **Scalability**: Easy to add more services and middleware as the application grows