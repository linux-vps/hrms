"""
Module to manage chat sessions with the Gemini model.
"""

import uuid
from datetime import datetime
import mcp_client
from utils import extract_tool_call

class SessionManager:
    """Manages chat sessions with the Gemini model."""
    
    def __init__(self):
        """Initialize the session manager."""
        self.active_sessions = {}
    
    def create_session(self, genai_client, employee_id=None):
        """
        Create a new chat session.
        
        Args:
            genai_client: The GenAI client to use for this session
            employee_id (str, optional): Employee ID to associate with this session
            
        Returns:
            tuple: (session_id, response_message)
        """
        session_id = str(uuid.uuid4())
        
        try:
            # Initialize chat
            chat = genai_client.start_chat()
            
            # Store the chat session with employee ID if provided
            self.active_sessions[session_id] = {
                "chat": chat,
                "last_activity": self._get_current_time(),
                "messages": [],
                "employee_id": employee_id
            }
            
            response_message = "Chat session created successfully"
            
            # If employee ID is provided, automatically load employee info
            if employee_id:
                # Store employee ID in session
                self.active_sessions[session_id]["employee_id"] = str(employee_id)
                
                # Automatically fetch employee information
                employee_result = mcp_client.call_mcp_tool_executor("get_employee_info", {"employee_id": str(employee_id)})
                
                if employee_result and "employee_info" in employee_result:
                    employee_summary = f"Employee information has been preloaded for this session."
                    
                    # Send brief confirmation message to model that employee data is available
                    _ = chat.send_message(employee_summary)
                    response_message += " with employee data"
                    
                    # Update session with info about preloaded data
                    self.active_sessions[session_id]["preloaded_data"] = self.active_sessions[session_id].get("preloaded_data", {})
                    self.active_sessions[session_id]["preloaded_data"]["employee"] = True
            
            return session_id, response_message
            
        except Exception as e:
            print(f"Error creating session: {e}")
            import traceback
            traceback.print_exc()
            raise
    
    def send_message(self, session_id, user_message, genai_client):
        """
        Send a message to an existing chat session.
        
        Args:
            session_id (str): The ID of the session to send the message to
            user_message (str): The message to send
            genai_client: The GenAI client to use for this session
            
        Returns:
            list: List of responses
        """
        if session_id not in self.active_sessions:
            raise ValueError("Session not found. Create a new session first.")
        
        session = self.active_sessions[session_id]
        chat = session["chat"]
        
        # Add user message to session history
        session["messages"].append({"role": "user", "content": user_message})
        
        # Check if the user input is a direct tool call command
        is_direct_tool_call = False
        tool_name = None
        tool_args = None
        
        # Parse direct tool calls like 'get_task_details 123'
        parts = user_message.strip().split(maxsplit=1)
        if len(parts) > 0 and parts[0] in [tool['name'] for tool in config.TOOLS_CONFIG]:
            is_direct_tool_call = True
            tool_name = parts[0]
            # Parse the argument as needed
            if len(parts) > 1:
                if tool_name == 'get_task_details':
                    tool_args = {'task_id': parts[1]}
                elif tool_name == 'describe_table':
                    tool_args = {'table': parts[1]}
                elif tool_name == 'execute_update':
                    tool_args = {'query': parts[1]}
                elif tool_name == 'get_employee_info':
                    tool_args = {'employee_id': parts[1]}
                elif tool_name == 'get_employee_timekeeping':
                    # Nếu có 1 tham số, đó là employee_id
                    tool_args = {'employee_id': parts[1]}
                elif tool_name == 'get_employee_projects':
                    tool_args = {'employee_id': parts[1]}
            # Nếu không có tham số cho các công cụ liên quan đến nhân viên, sử dụng ID từ session
            elif tool_name in ['get_employee_info', 'get_employee_timekeeping', 'get_employee_projects'] and not tool_args:
                tool_args = {}
        
        # Process based on whether it's a direct tool call or normal message
        responses = []
        
        if is_direct_tool_call:
            # Kiểm tra và thêm employee_id cho các công cụ liên quan đến nhân viên
            if tool_name in ['get_employee_info', 'get_employee_timekeeping', 'get_employee_projects', 'update_contact_info']:
                if session.get('employee_id'):
                    if not tool_args:
                        tool_args = {}
                    if 'employee_id' not in tool_args or tool_args.get('employee_id') == 'current_employee_id':
                        tool_args['employee_id'] = session['employee_id']
            
            # Execute tool directly without involving Gemini
            tool_execution_result = mcp_client.call_mcp_tool_executor(tool_name, tool_args)
            
            if tool_execution_result is None:
                raise ValueError("MCP tool execution failed to return data.")
            
            # Send the direct tool result to Gemini for interpretation
            response = genai_client.send_function_response(chat, tool_name, tool_execution_result)
            text_response = genai_client.extract_text_response(response)
            
            # Store the tool result and model's interpretation
            responses.append({
                "type": "tool_result",
                "tool_name": tool_name,
                "tool_args": tool_args,
                "result": tool_execution_result
            })
            
            if text_response:
                responses.append({
                    "type": "ai_message",
                    "content": text_response
                })
                session["messages"].append({"role": "assistant", "content": text_response})
                
        else:
            # Regular message processing
            response = chat.send_message(user_message)
            
            # First check if we got a text response before checking for function calls
            text_response = genai_client.extract_text_response(response)
            
            # Store the initial response
            if text_response:
                responses.append({
                    "type": "ai_message",
                    "content": text_response
                })
                session["messages"].append({"role": "assistant", "content": text_response})
            
            # Check if the response mentions a tool that should be automatically executed
            if text_response:
                auto_tool_name, auto_tool_args = extract_tool_call(text_response)
                if auto_tool_name and auto_tool_args:
                    # Kiểm tra và thay thế 'current_employee_id' bằng ID thật nếu cần
                    if auto_tool_name in ['get_employee_info', 'get_employee_timekeeping', 'get_employee_projects', 'update_contact_info']:
                        if session.get('employee_id'):
                            if 'employee_id' not in auto_tool_args or auto_tool_args.get('employee_id') == 'current_employee_id':
                                auto_tool_args['employee_id'] = session['employee_id']
                    
                    # Automatically execute the detected tool
                    auto_tool_result = mcp_client.call_mcp_tool_executor(auto_tool_name, auto_tool_args)
                    
                    if auto_tool_result is not None:
                        # Store the tool execution result
                        responses.append({
                            "type": "tool_result",
                            "tool_name": auto_tool_name,
                            "tool_args": auto_tool_args,
                            "result": auto_tool_result
                        })
                        
                        # Send the automatic tool result to Gemini for interpretation
                        response = genai_client.send_function_response(chat, auto_tool_name, auto_tool_result)
                        follow_up_response = genai_client.extract_text_response(response)
                        
                        # Store the follow-up response
                        if follow_up_response:
                            responses.append({
                                "type": "ai_message",
                                "content": follow_up_response
                            })
                            session["messages"].append({"role": "assistant", "content": follow_up_response})
            
            # Handle function calls from Gemini
            function_call = genai_client.extract_function_call(response)
            while function_call:
                tool_name = function_call["name"]
                tool_args = function_call["args"]
                
                # Check if this is an employee-related tool that needs employee_id
                if tool_name in ['get_employee_info', 'get_employee_timekeeping', 'get_employee_projects', 'update_contact_info']:
                    # Nếu employee_id là placeholder 'current_employee_id' hoặc chưa có, thay thế bằng ID thật
                    if session.get('employee_id'):
                        if 'employee_id' not in tool_args or tool_args.get('employee_id') == 'current_employee_id':
                            tool_args['employee_id'] = session['employee_id']
                        
                # Automatically execute the tool with possibly modified args
                tool_execution_result = mcp_client.call_mcp_tool_executor(tool_name, tool_args)
                
                if tool_execution_result is None:
                    tool_execution_result = {"error": "MCP tool execution failed to return data."}
                
                # Store the tool execution result
                responses.append({
                    "type": "tool_result",
                    "tool_name": tool_name,
                    "tool_args": tool_args,
                    "result": tool_execution_result
                })
                
                # Send the tool's result back to Gemini
                response = genai_client.send_function_response(chat, tool_name, tool_execution_result)
                
                # Update text_response after tool execution
                text_response = genai_client.extract_text_response(response)
                if text_response:
                    responses.append({
                        "type": "ai_message",
                        "content": text_response
                    })
                    session["messages"].append({"role": "assistant", "content": text_response})
                
                # Check for another function call
                function_call = genai_client.extract_function_call(response)
        
        # Update session's last activity timestamp
        session["last_activity"] = self._get_current_time()
        
        return responses
    
    def get_session_info(self, session_id):
        """
        Get information about a specific chat session.
        
        Args:
            session_id (str): The ID of the session to get information for
            
        Returns:
            dict: Session information
        """
        if session_id not in self.active_sessions:
            return None
        
        session = self.active_sessions[session_id]
        
        return {
            "messages": session["messages"],
            "last_activity": session["last_activity"],
            "preloaded_data": session.get("preloaded_data", {})
        }
    
    def list_sessions(self):
        """
        List all active chat sessions.
        
        Returns:
            dict: Information about all active sessions
        """
        sessions_info = {}
        for session_id, session in self.active_sessions.items():
            sessions_info[session_id] = {
                "last_activity": session["last_activity"],
                "message_count": len(session["messages"]),
                "preloaded_data": session.get("preloaded_data", {})
            }
        
        return sessions_info
    
    def delete_session(self, session_id):
        """
        Delete a chat session.
        
        Args:
            session_id (str): The ID of the session to delete
            
        Returns:
            bool: True if the session was deleted, False otherwise
        """
        if session_id not in self.active_sessions:
            return False
        
        del self.active_sessions[session_id]
        return True
    
    def _get_current_time(self):
        """Get the current time in ISO format."""
        return datetime.now().isoformat()

# Import here to avoid circular imports
import config
