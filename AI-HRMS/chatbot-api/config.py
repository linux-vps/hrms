"""
Configuration module for the Gemini MCP Chatbot API.
Loads environment variables and provides configuration settings.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    GOOGLE_API_KEY = "AIzaSyAersDweFBbVxZ004IbEJcVbyPGxJMZIJw"
    print("⚠️ Using hardcoded API key. For production, use environment variable.")

# Model Configuration
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.5-flash-preview-05-20")
MODEL_TEMPERATURE = float(os.getenv("MODEL_TEMPERATURE", "0.7"))

# Server Configuration
MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "http://localhost:5003")
FLASK_PORT = int(os.getenv("FLASK_PORT", 5004))
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "True").lower() == "true"

# Define tools configuration
TOOLS_CONFIG = [
    {
        "name": "get_employee_info",
        "description": "Retrieves comprehensive information about an employee including profile, department, projects, tasks, and related data.",
        "parameters": {
            "type": "object",
            "properties": {
                "employee_id": {
                    "type": "string",
                    "description": "UUID of the employee to retrieve information for"
                }
            },
            "required": ["employee_id"]
        }
    },
    {
        "name": "get_employee_timekeeping",
        "description": "Retrieves timekeeping records for a specific employee, optionally filtered by month and year.",
        "parameters": {
            "type": "object",
            "properties": {
                "employee_id": {
                    "type": "string",
                    "description": "UUID of the employee to retrieve timekeeping records for"
                },
                "month": {
                    "type": "integer",
                    "description": "Month to filter timekeeping records (1-12, optional)"
                },
                "year": {
                    "type": "integer",
                    "description": "Year to filter timekeeping records (e.g., 2023, optional)"
                }
            },
            "required": ["employee_id"]
        }
    },
    {
        "name": "get_employee_projects",
        "description": "Retrieves all projects an employee is participating in or managing.",
        "parameters": {
            "type": "object",
            "properties": {
                "employee_id": {
                    "type": "string",
                    "description": "UUID of the employee to retrieve projects for"
                }
            },
            "required": ["employee_id"]
        }
    },
    {
        "name": "get_task_details",
        "description": "Retrieves detailed information about a specific task, including subtasks, comments, and related entities.",
        "parameters": {
            "type": "object",
            "properties": {
                "task_id": {
                    "type": "string",
                    "description": "UUID of the task to retrieve details for"
                }
            },
            "required": ["task_id"]
        }
    },
    {
        "name": "describe_table",
        "description": "Retrieves schema information about a database table.",
        "parameters": {
            "type": "object",
            "properties": {
                "table": {
                    "type": "string",
                    "description": "Name of the table to describe"
                },
                "schema": {
                    "type": "string",
                    "description": "Database schema (default: public)"
                }
            },
            "required": ["table"]
        }
    },
    {
        "name": "update_contact_info",
        "description": "Updates basic contact information for an employee such as phone number, address, and avatar URL.",
        "parameters": {
            "type": "object",
            "properties": {
                "employee_id": {
                    "type": "string",
                    "description": "UUID of the employee to update information for"
                },
                "phone_number": {
                    "type": "string",
                    "description": "New phone number (optional)"
                },
                "address": {
                    "type": "string",
                    "description": "New address (optional)"
                },
                "avatar": {
                    "type": "string",
                    "description": "New avatar URL (optional)"
                }
            },
            "required": ["employee_id"]
        }
    }
]

# System message for the chatbot
SYSTEM_MESSAGE_TEXT = """
You are an AI assistant augmented with special tools that allow you to interact with the HRMS (Human Resource Management System) PostgreSQL database.

When your session is created, you already know the ID of the employee who is logged in, and you don't need to ask for it. ALWAYS use this employee ID for any tools that require an employee_id parameter.

You have access to the following tools to retrieve data from the HRMS system:

1. The get_employee_info tool automatically uses the logged-in employee's ID. When this tool is used, it will return a comprehensive report including:
   - Employee profile information (name, email, phone, position, etc.)
   - Department information
   - Projects the employee is participating in
   - Projects the employee is managing
   - Tasks assigned to the employee
   - Tasks where the employee is a supervisor
   - Tasks assigned by the employee

2. The get_employee_timekeeping tool automatically uses the logged-in employee's ID, with optional filtering by month and year. It returns:
   - Check-in and check-out times
   - Shift information
   - Status (e.g., on time, late, absent)
   - Working hours calculation

3. The get_employee_projects tool automatically uses the logged-in employee's ID and retrieves all projects the employee is participating in or managing, including:
   - Project details (name, description, status, etc.)
   - Team members in each project
   - Role of the employee in the project

4. The get_task_details tool retrieves comprehensive information about a specific task, including:
   - Task information (title, description, status, deadline, etc.)
   - Subtasks associated with the task
   - Comments on the task
   - Related employee information (assignee, supervisor, creator)

5. The describe_table tool retrieves schema information about database tables, including columns, primary keys, and foreign keys.

6. The update_contact_info tool allows the employee to update their own contact information including:
   - Phone number
   - Address
   - Avatar URL (profile picture)
   This tool automatically uses the logged-in employee's ID, so you don't need to ask for it.

Your interactions with the database are secured and monitored. When you use these tools, you're using secure external tools that handle the actual database interactions.
These tools validate that all operations are safe and prevent potentially dangerous operations.

VERY IMPORTANT: When a user asks for information that requires using a tool, you MUST directly execute the tool WITHOUT asking for confirmation or explaining your intention to use it first. Execute the tool immediately and provide the information to the user.

For example, if the user says "Kiểm tra thông tin của tôi" or simply "Thông tin của tôi", immediately call the get_employee_info tool. When the user asks about their projects, timekeeping, or other personal information, you should automatically use the appropriate tool with their employee ID that's already stored in the session.

To effectively help with database queries and operations, follow these steps:
1. Understand the user's request fully, especially if it relates to employee information or HR data.
2. If the user's request involves database operations, identify which MCP tool to use.
3. If the user wants employee information, directly call the appropriate tool with the necessary parameters.
4. Process the tool's result and use it to complete the user's request (e.g., explain employee information, provide timekeeping details).
5. If you need any clarification about what the user is asking, don't hesitate to ask questions.

Your goal is to assist users with HR database tasks by intelligently using the available database tools without requiring them to explicitly tell you which tool to use for every database operation. You should present information in a clear, organized manner, using the formatted responses provided by the tools.
"""
