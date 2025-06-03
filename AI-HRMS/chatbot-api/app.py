"""
Gemini MCP Chatbot API

This Flask API allows you to interact with the Gemini MCP chatbot via HTTP requests
instead of using a terminal interface.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

# Import local modules
from genai_client import GenAIClient
from session_manager import SessionManager
import config

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the GenAI client
genai_client = GenAIClient(
    api_key=config.GOOGLE_API_KEY,
    model_name=config.MODEL_NAME
)

# Initialize the session manager
session_manager = SessionManager()

@app.route('/api/sessions', methods=['POST'])
def create_session():
    """
    Create a new chat session with Gemini
    Optional: Pass customer_id to preload customer info at session start
    """
    try:
        data = request.json or {}
        customer_id = data.get("customer_id")
        
        session_id, response_message = session_manager.create_session(genai_client, customer_id)
        
        return jsonify({
            "session_id": session_id,
            "message": response_message,
            "status": "success"
        })
    except Exception as e:
        print(f"Error creating session: {e}")
        traceback.print_exc()
        return jsonify({
            "error": f"Failed to create chat session: {str(e)}",
            "status": "error"
        }), 500

@app.route('/api/sessions/<session_id>/messages', methods=['POST'])
def send_message(session_id):
    """Send a message to an existing chat session"""
    try:
        data = request.json
        if not data or 'message' not in data:
            return jsonify({
                "error": "Message is required",
                "status": "error"
            }), 400
        
        user_message = data['message']
        
        responses = session_manager.send_message(session_id, user_message, genai_client)
        
        return jsonify({
            "session_id": session_id,
            "responses": responses,
            "status": "success"
        })
    except ValueError as e:
        # Handle known errors like session not found
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 404
    except Exception as e:
        print(f"Error processing message: {e}")
        traceback.print_exc()
        return jsonify({
            "error": f"Failed to process message: {str(e)}",
            "status": "error"
        }), 500

@app.route('/api/sessions/<session_id>', methods=['GET'])
def get_session(session_id):
    """Get information about a specific chat session"""
    session_info = session_manager.get_session_info(session_id)
    
    if not session_info:
        return jsonify({
            "error": "Session not found",
            "status": "error"
        }), 404
    
    return jsonify({
        "session_id": session_id,
        "messages": session_info["messages"],
        "last_activity": session_info["last_activity"],
        "preloaded_data": session_info.get("preloaded_data", {}),
        "status": "success"
    })

@app.route('/api/sessions', methods=['GET'])
def list_sessions():
    """List all active chat sessions"""
    sessions_info = session_manager.list_sessions()
    
    return jsonify({
        "sessions": sessions_info,
        "count": len(sessions_info),
        "status": "success"
    })

@app.route('/api/sessions/<session_id>', methods=['DELETE'])
def delete_session(session_id):
    """Delete a chat session"""
    success = session_manager.delete_session(session_id)
    
    if not success:
        return jsonify({
            "error": "Session not found",
            "status": "error"
        }), 404
    
    return jsonify({
        "message": f"Session {session_id} deleted successfully",
        "status": "success"
    })

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({
        "status": "healthy",
        "version": "1.0.0",
        "sdk_version": "new" if genai_client.using_new_sdk else "legacy"
    })

if __name__ == '__main__':
    print(f"Starting Gemini MCP Chatbot API Server...")
    print(f"Using {'new' if genai_client.using_new_sdk else 'legacy'} Google GenAI SDK")
    app.run(host='0.0.0.0', port=config.FLASK_PORT, debug=config.FLASK_DEBUG)
