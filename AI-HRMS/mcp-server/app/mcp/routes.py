"""
MCP Routes
Handles the API endpoints for the MCP server for HRMS system.
"""

from flask import Blueprint, request, jsonify, current_app
from app.mcp.tool_definitions import TOOLS_METADATA
from app.mcp.tools import (
    tool_get_employee_info,
    tool_get_employee_timekeeping,
    tool_get_employee_projects,
    tool_get_task_details,
    tool_describe_table,
    tool_update_contact_info
)

# Create blueprint
mcp_bp = Blueprint('mcp', __name__, url_prefix='/mcp')

@mcp_bp.route('/tools', methods=['GET'])
def get_tools():
    """
    Return the metadata for all available tools.
    """
    current_app.logger.info("Tool metadata requested")
    return jsonify(TOOLS_METADATA)

@mcp_bp.route('/execute', methods=['POST'])
def execute_tool():
    """
    Execute a specified tool with the provided parameters.
    """
    data = request.json
    tool_name = data.get("tool_name")
    parameters = data.get("parameters", {})

    current_app.logger.info(f"Received tool execution request: tool='{tool_name}', params={parameters}")

    result = {}
    status_code = 200
    
    # Route to the appropriate tool implementation
    try:
        if tool_name == "get_employee_info":
            result = tool_get_employee_info(parameters)
        elif tool_name == "get_employee_timekeeping":
            result = tool_get_employee_timekeeping(parameters)
        elif tool_name == "get_employee_projects":
            result = tool_get_employee_projects(parameters)
        elif tool_name == "get_task_details":
            result = tool_get_task_details(parameters)
        elif tool_name == "describe_table":
            result = tool_describe_table(parameters)
        elif tool_name == "update_contact_info":
            result = tool_update_contact_info(parameters)
        else:
            result = {"error": f"Unknown tool: {tool_name}"}
            status_code = 404
            current_app.logger.error(f"Unknown tool requested: {tool_name}")

        # Check for errors in result
        if "error" in result and status_code == 200:
            current_app.logger.error(f"Tool '{tool_name}' returned an error: {result.get('error')}")
            status_code = 400  # Use 400 for client-side logic errors (like customer not found)

    except Exception as e:
        current_app.logger.error(f"Exception occurred while executing tool '{tool_name}': {str(e)}", exc_info=True)
        result = {"error": f"Server error: {str(e)}"}
        status_code = 500

    current_app.logger.info(f"Sending tool execution response (status={status_code})")
    
    return jsonify({"tool_name": tool_name, "result": result}), status_code
