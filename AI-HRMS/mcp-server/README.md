# MCP PostgreSQL Server

A Flask application that provides an API for accessing PostgreSQL database functionality through a clean and modular structure.

## Project Structure

```
mcp-chatbot-flask-refactored/
├── .env                 # Environment variables (not in version control)
├── .env.example         # Example environment file
├── app/                 # Application package
│   ├── __init__.py      # Application factory
│   ├── database/        # Database connections and models
│   ├── mcp/             # MCP tools and routes
│   └── utils/           # Utility functions
├── logs/                # Application logs
├── requirements.txt     # Project dependencies
└── run.py              # Application entry point
```

## Installation

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and configure as needed

## Environment Variables

- `DB_CONNECTION_STRING`: PostgreSQL connection string
- `FLASK_APP`: Application entry point (default: run.py)
- `FLASK_ENV`: Environment (development/production)
- `FLASK_DEBUG`: Enable debug mode (1/0)
- `HOST`: Host to bind (default: 0.0.0.0)
- `PORT`: Port to listen on (default: 5003)

## Running the Application

```
python run.py
```

## API Endpoints

- `GET /mcp/tools`: List all available tools
- `POST /mcp/execute`: Execute a tool

## Available Tools

- `get_customer_info`: Retrieves customer information
- `get_all_products`: Retrieves all products
- `describe_table`: Describes a database table schema
- `execute_update`: Executes INSERT, UPDATE, DELETE queries
