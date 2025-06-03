"""
Utility functions for the Gemini MCP Chatbot API.
"""

import re
import config

def extract_tool_call(text):
    """
    Check if a response text mentions a tool call.
    
    Args:
        text (str): The text to check for tool calls
        
    Returns:
        tuple: (tool_name, tool_args) if a tool call is found, (None, None) otherwise
    """
    for tool_config in config.TOOLS_CONFIG:
        tool_name = tool_config["name"]
        
        # Check for common patterns like "I'll use tool_name" or "Using tool_name" or just the tool name
        if f"use {tool_name}" in text.lower() or f"using {tool_name}" in text.lower() or f"{tool_name}" in text.lower():
            # First look for patterns like "customer ID X" or "ID X" or "ID: X"
            id_patterns = [r"customer\s+id\s+(\d+)", r"customer\s*id:\s*(\d+)", r"id\s+(\d+)", r"id:\s*(\d+)"]
            
            for pattern in id_patterns:
                match = re.search(pattern, text, re.IGNORECASE)
                if match:
                    param_value = match.group(1)
                    if tool_name == "get_customer_info":
                        return tool_name, {"customer_id": param_value}
            
            # If no ID pattern found, look for any number in the text
            numbers = re.findall(r"\d+", text)
            if numbers and tool_name == "get_customer_info":
                return tool_name, {"customer_id": numbers[0]}
    
    return None, None
