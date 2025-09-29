# GitHub Copilot Instructions

## Project Overview
This is a simple Node.js Express server application that serves a "Hello, World!" message. The project is designed as a basic web server demonstration.

## Technology Stack
- **Runtime**: Node.js (version 14 or higher)
- **Framework**: Express.js
- **Package Manager**: npm

## Code Style Guidelines
- Use modern JavaScript (ES6+) features where appropriate
- Follow standard Express.js patterns and conventions
- Keep code simple and readable
- Use `const` for variables that don't change, `let` for variables that do
- Use arrow functions for callbacks where appropriate

## Project Structure
```
timer/
├── index.js          # Main server file
├── package.json      # Node.js dependencies and scripts
├── README.md         # Project documentation
└── .github/
    └── copilot-instructions.md  # This file
```

## Development Guidelines
1. **Server Configuration**: The server runs on port 3030 by default
2. **Route Handling**: All routes should follow RESTful conventions
3. **Error Handling**: Implement proper error handling for all routes
4. **Testing**: When adding tests, use a simple testing framework like Jest or Mocha
5. **Dependencies**: Keep dependencies minimal and only add what's necessary

## Common Tasks
- **Starting the server**: `npm start`
- **Installing dependencies**: `npm install`
- **Adding new routes**: Follow the pattern in `index.js`

## Code Examples
When suggesting code changes, prefer patterns like:

```javascript
// Good: Express route handler
app.get('/api/endpoint', (req, res) => {
  try {
    // Handle request
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Security Considerations
- Always validate input parameters
- Use proper HTTP status codes
- Implement CORS if needed for cross-origin requests
- Consider rate limiting for production use

## When Adding Features
- Keep the existing simplicity of the project
- Add minimal dependencies
- Ensure backward compatibility
- Update README.md with new functionality