# Timer

A Node.js server with Google OAuth2 authentication built with Express.js and Passport.js.
A simple Node.js server built with Express.js that provides a REST API for managing timers with in-memory storage.

## Features

- **Hello World endpoint**: Basic root endpoint
- **Timer CRUD API**: Full Create, Read, Update, Delete operations for timers
- **In-memory storage**: Timers are stored in memory during application runtime

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm
- Google Cloud Platform project with OAuth2 credentials

### Google Cloud Platform Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Google+ API
3. Create OAuth2 credentials:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/auth/google/callback`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your Google OAuth2 credentials:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   SESSION_SECRET=your_random_session_secret_here
   ```

### Running the Server

To start the server, run:
```bash
npm start
```

The server will start on `http://localhost:3000/` and provide Google OAuth2 authentication.

### Usage

1. Navigate to `http://localhost:3000/`
2. Click "Login with Google" to authenticate
3. After successful authentication, you'll see your profile information
4. Use the logout link to sign out

### Environment Variables

- `GOOGLE_CLIENT_ID`: Your Google OAuth2 client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth2 client secret  
- `SESSION_SECRET`: Secret key for session encryption
- `PORT`: Server port (defaults to 3000)
