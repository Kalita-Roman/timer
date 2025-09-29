# Timer

A simple Node.js server built with Express.js that provides a REST API for managing timers with in-memory storage.

## Features

- **Hello World endpoint**: Basic root endpoint
- **Timer CRUD API**: Full Create, Read, Update, Delete operations for timers
- **In-memory storage**: Timers are stored in memory during application runtime

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server

To start the server, run:
```bash
npm start
```

The server will start on `http://localhost:3000/`

## API Endpoints

### Root Endpoint
- **GET** `/` - Returns "Hello, World!"

### Timer API
All timer API endpoints use JSON format and return standardized responses with `success`, `data`, and optional `error` fields.

#### Get All Timers
- **GET** `/api/timers`
- Returns an array of all timers with count

Example response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Work Timer",
      "duration": 1500,
      "status": "stopped",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### Get Timer by ID
- **GET** `/api/timers/:id`
- Returns a specific timer by ID

#### Create Timer
- **POST** `/api/timers`
- Creates a new timer

Request body:
```json
{
  "name": "Timer Name",
  "duration": 1500
}
```

#### Update Timer
- **PUT** `/api/timers/:id`
- Updates an existing timer

Request body (all fields optional):
```json
{
  "name": "Updated Timer Name",
  "duration": 1800,
  "status": "running"
}
```

#### Delete Timer
- **DELETE** `/api/timers/:id`
- Deletes a timer by ID

### Timer Object Structure

```json
{
  "id": 1,
  "name": "Timer Name",
  "duration": 1500,
  "status": "stopped",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

- `id`: Unique identifier (auto-generated)
- `name`: Timer name (required)
- `duration`: Timer duration in seconds (required)
- `status`: Timer status ("stopped", "running", "paused")
- `createdAt`: ISO timestamp when timer was created
- `updatedAt`: ISO timestamp when timer was last updated

## Testing

### Manual Testing with curl

```bash
# Get all timers
curl http://localhost:3000/api/timers

# Create a timer
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Work Timer","duration":1500}' \
  http://localhost:3000/api/timers

# Get timer by ID
curl http://localhost:3000/api/timers/1

# Update timer
curl -X PUT -H "Content-Type: application/json" \
  -d '{"status":"running"}' \
  http://localhost:3000/api/timers/1

# Delete timer
curl -X DELETE http://localhost:3000/api/timers/1
```

### Testing the Root Endpoint

You can test the original endpoint by opening your browser to `http://localhost:3000/` or using curl:
```bash
curl http://localhost:3000/
```

## GitHub Copilot Instructions

This project includes GitHub Copilot instruction files to help with AI-assisted development:

- **`.github/copilot-instructions.md`** - General project guidelines and coding standards for Copilot
- **`.copilotrc.md`** - Project-specific configuration and preferences for Copilot suggestions

These files help ensure consistent and appropriate code suggestions when using GitHub Copilot with this project.
