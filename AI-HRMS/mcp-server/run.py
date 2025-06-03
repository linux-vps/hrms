"""
Main application entry point
"""
import os
from app import create_app
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create the Flask application
app = create_app()

if __name__ == '__main__':
    # Get host and port from environment variables or use defaults
    host = os.getenv('HOST', '0.0.0.0')
    port = int(os.getenv('PORT', 5003))
    debug = os.getenv('FLASK_DEBUG', '1') == '1'
    
    # Print startup information
    print(f"Starting PostgreSQL MCP Server...")
    print("Endpoints:")
    print("  GET  /mcp/tools        (Lists available tools)")
    print("  POST /mcp/execute      (Executes a tool)")
    print("\nAvailable tools:")
    print("  get_customer_info     (Retrieves customer information)")
    print("  get_all_products      (Retrieves all products)")
    print("  describe_table        (Describes a database table schema)")
    print("  execute_update        (Executes INSERT, UPDATE, DELETE queries)")
    
    # Run the Flask application
    app.run(host=host, port=port, debug=debug)
