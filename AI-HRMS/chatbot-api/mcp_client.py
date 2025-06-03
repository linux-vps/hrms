"""
Module to handle interactions with the MCP server.
"""

import requests
import config

def call_mcp_tool_executor(tool_name, params):
    """
    Call the MCP Server's execute endpoint with the specified tool and parameters.
    
    Args:
        tool_name (str): The name of the tool to execute
        params (dict): The parameters to pass to the tool
        
    Returns:
        dict: The result of the tool execution
    """
    try:
        print(f"🤖 ChatApp: Calling MCP Server to execute '{tool_name}' with params: {params}")
        mcp_response = requests.post(
            f"{config.MCP_SERVER_URL}/mcp/execute",
            json={"tool_name": tool_name, "parameters": params},
            timeout=10
        )
        
        # Handle HTTP errors
        if mcp_response.status_code != 200:
            print(f"❌ MCP Server returned error {mcp_response.status_code}: {mcp_response.text}")
            return {"error": f"MCP Server error {mcp_response.status_code}: {mcp_response.text}"}
            
        result = mcp_response.json()
        # The 'result' key contains the actual tool execution result
        return result.get("result", {})
        
    except Exception as e:
        print(f"❌ Error calling MCP server: {e}")
        return {"error": f"Failed to call MCP server: {str(e)}"}
