# Gemini MCP Chatbot API

This Flask API allows you to interact with the Gemini MCP chatbot via HTTP requests instead of using a terminal interface.

## Project Structure

The application has been refactored into a modular structure:

- `app.py` - Main Flask application entry point
- `config.py` - Configuration settings loaded from environment variables
- `genai_client.py` - Client for interacting with Google's Generative AI models
- `mcp_client.py` - Client for interacting with the MCP server
- `session_manager.py` - Manages chat sessions with the Gemini model
- `utils.py` - Utility functions for the chatbot
- `.env.example` - Example environment variable file (rename to `.env` and customize)

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and add your Google API key
4. Make sure the MCP server is running at the URL specified in your `.env` file

## Environment Variables

- `GOOGLE_API_KEY` - Your Google API key for Gemini
- `MODEL_NAME` - The Gemini model to use (default: "gemini-1.5-flash-latest")
- `MCP_SERVER_URL` - URL of your local MCP server (default: "http://localhost:5003")
- `FLASK_PORT` - Port for the Flask server (default: 5004)
- `FLASK_DEBUG` - Enable debug mode (default: True)

## API Endpoints

### Create a new chat session
- **URL**: `/api/sessions`
- **Method**: POST
- **Body**: Optional `{ "customer_id": "123" }`
- **Response**: `{ "session_id": "uuid", "message": "Chat session created successfully", "status": "success" }`

### Send a message
- **URL**: `/api/sessions/<session_id>/messages`
- **Method**: POST
- **Body**: `{ "message": "your message here" }`
- **Response**: `{ "session_id": "uuid", "responses": [...], "status": "success" }`

### Get session information
- **URL**: `/api/sessions/<session_id>`
- **Method**: GET
- **Response**: `{ "session_id": "uuid", "messages": [...], "last_activity": "timestamp", "preloaded_data": {...}, "status": "success" }`

### List all sessions
- **URL**: `/api/sessions`
- **Method**: GET
- **Response**: `{ "sessions": {...}, "count": 1, "status": "success" }`

### Delete a session
- **URL**: `/api/sessions/<session_id>`
- **Method**: DELETE
- **Response**: `{ "message": "Session uuid deleted successfully", "status": "success" }`

### Health check
- **URL**: `/health`
- **Method**: GET
- **Response**: `{ "status": "healthy", "version": "1.0.0", "sdk_version": "new" }`

## Running the Server

```
python app.py
```

This will start the server at `http://0.0.0.0:5004` by default.
