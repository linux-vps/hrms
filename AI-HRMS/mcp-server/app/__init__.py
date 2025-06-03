"""
Application factory and configuration package
"""
from flask import Flask
import logging
from logging.handlers import RotatingFileHandler
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    """Application factory function to create and configure the Flask app."""
    app = Flask(__name__)
    
    # Configure logging
    configure_logging(app)
    
    # Import and register blueprints
    from app.mcp.routes import mcp_bp
    app.register_blueprint(mcp_bp)
    
    # Database initialization
    from app.database.connection import init_db
    init_db(app)
    
    return app

def configure_logging(app):
    """Configure logging for the application."""
    # Set up basic logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    
    # Configure Flask logger
    app.logger.setLevel(logging.INFO)
    
    # Add file handler (optional)
    if not os.path.exists('logs'):
        os.mkdir('logs')
    
    file_handler = RotatingFileHandler(
        'logs/mcp_server.log', 
        maxBytes=10240, 
        backupCount=5
    )
    
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s'
    ))
    
    app.logger.addHandler(file_handler)
