"""
MCP Tool Definitions
Contains the metadata and schema definitions for the MCP tools for the HRMS system.
"""

# Tool definitions for MCP /mcp/tools endpoint
TOOLS_METADATA = [
    {
        "name": "update_contact_info",
        "description": "Updates basic contact information for an employee such as phone number, address, and avatar URL.",
        "input_schema": {
            "properties": {
                "employee_id": {"description": "UUID of the employee to update information for"},
                "phone_number": {"description": "New phone number (optional)"},
                "address": {"description": "New address (optional)"},
                "avatar": {"description": "New avatar URL (optional)"}
            },
            "required": ["employee_id"]
        },
        "output_schema": {
            "properties": {
                "success": {"description": "Boolean indicating if the update was successful"},
                "updated_fields": {"description": "List of fields that were updated"},
                "formatted_response": {"description": "Formatted text response with update results"},
                "error": {"description": "Error message if any"}
            }
        }
    },
    {
        "name": "get_employee_info",
        "description": "Retrieves comprehensive information about an employee including profile, department, projects, tasks, and related data.",
        "input_schema": {
            "properties": {
                "employee_id": {"description": "UUID of the employee to retrieve information for"}
            },
            "required": ["employee_id"]
        },
        "output_schema": {
            "properties": {
                "employee_info": {"description": "Employee basic information including personal details"},
                "department_info": {"description": "Information about the employee's department"},
                "projects": {"description": "List of projects the employee is participating in"},
                "managed_projects": {"description": "List of projects the employee is managing"},
                "assigned_tasks": {"description": "List of tasks assigned to the employee"},
                "supervisor_tasks": {"description": "List of tasks where the employee is the supervisor"},
                "assigner_tasks": {"description": "List of tasks assigned by the employee"},
                "formatted_response": {"description": "Formatted text response with all employee information"},
                "error": {"description": "Error message if any"}
            }
        }
    },
    {
        "name": "get_employee_timekeeping",
        "description": "Retrieves timekeeping records for a specific employee, optionally filtered by month and year.",
        "input_schema": {
            "properties": {
                "employee_id": {"description": "UUID of the employee to retrieve timekeeping records for"},
                "month": {"description": "Month to filter timekeeping records (1-12, optional)"},
                "year": {"description": "Year to filter timekeeping records (e.g., 2023, optional)"}
            },
            "required": ["employee_id"]
        },
        "output_schema": {
            "properties": {
                "timekeeping_records": {"description": "List of timekeeping records including check-in, check-out times, shifts, and status"},
                "formatted_response": {"description": "Formatted text response with timekeeping information"},
                "error": {"description": "Error message if any"}
            }
        }
    },
    {
        "name": "get_employee_projects",
        "description": "Retrieves all projects an employee is participating in or managing.",
        "input_schema": {
            "properties": {
                "employee_id": {"description": "UUID of the employee to retrieve projects for"}
            },
            "required": ["employee_id"]
        },
        "output_schema": {
            "properties": {
                "projects": {"description": "List of projects the employee is participating in"},
                "managed_projects": {"description": "List of projects the employee is managing"},
                "formatted_response": {"description": "Formatted text response with project information"},
                "error": {"description": "Error message if any"}
            }
        }
    },
    {
        "name": "get_task_details",
        "description": "Retrieves detailed information about a specific task, including subtasks, comments, and related entities.",
        "input_schema": {
            "properties": {
                "task_id": {"description": "UUID of the task to retrieve details for"}
            },
            "required": ["task_id"]
        },
        "output_schema": {
            "properties": {
                "task": {"description": "Detailed task information"},
                "subtasks": {"description": "List of subtasks associated with the task"},
                "comments": {"description": "List of comments on the task"},
                "formatted_response": {"description": "Formatted text response with all task information"},
                "error": {"description": "Error message if any"}
            }
        }
    },
    {
        "name": "describe_table",
        "description": "Retrieves schema information about a database table.",
        "input_schema": {
            "properties": {
                "table": {"description": "Name of the table to describe"},
                "schema": {"description": "Database schema (default: public)"}
            },
            "required": ["table"]
        },
        "output_schema": {
            "properties": {
                "columns": {"description": "Array of column definitions including name, type, and constraints"},
                "formatted_columns": {"description": "Formatted text response with column information"},
                "error": {"description": "Error message if any"}
            }
        }
    }
]
