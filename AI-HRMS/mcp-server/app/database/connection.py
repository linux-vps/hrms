import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor

logger = logging.getLogger(__name__)

def get_db_connection_string():
    """
    Get the database connection string from environment variables or command-line arguments.
    """
    # First priority: Environment variable from .env file
    db_conn = os.getenv('DB_CONNECTION_STRING')
    if db_conn:
        logger.info("Using database connection from environment variable")
        return db_conn
    
    # Default connection string as fallback
    default_conn = "postgresql://postgres:abc123!@localhost:5432/attendance_db"
    logger.info(f"Using default database connection")
    return default_conn

def get_db_conn():
    """
    Get a database connection with RealDictCursor factory.
    """
    return psycopg2.connect(get_db_connection_string(), cursor_factory=RealDictCursor)

def init_db(app):
    """
    Initialize the database connection and test it.
    """
    db_connection = get_db_connection_string()
    
    # Test database connection
    try:
        conn = psycopg2.connect(db_connection)
        conn.close()
        app.logger.info(f"[OK] Successfully connected to PostgreSQL database")
    except Exception as e:
        app.logger.critical(f"CRITICAL ERROR: Could not connect to PostgreSQL database: {e}")
        app.logger.critical("Please check your connection string or database status.")
        exit(1)
    
    app.logger.info(f"[OK] MCP Server configured. PostgreSQL connection established.")
    app.logger.info(f"   All database operations will use this connection.")
