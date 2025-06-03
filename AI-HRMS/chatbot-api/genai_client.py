"""
Module to handle interactions with Google's Generative AI models.
Supports both the new google.genai and legacy google.generativeai SDKs.
"""

import os
import config

# Try to import the latest recommended Google GenAI SDK first
try:
    import google.genai as genai
    print("Using new SDK: google.genai")
    USING_NEW_SDK = True
except ImportError:
    # Fall back to legacy SDK if needed
    try:
        import google.generativeai as genai
        print("Using legacy SDK: google.generativeai")
        USING_NEW_SDK = False
    except ImportError:
        print("Error: Neither 'google-genai' nor 'google-generativeai' packages are installed.")
        print("Please install one of these packages using pip:")
        print("pip install google-genai  # Recommended new SDK")
        print("  or")
        print("pip install google-generativeai  # Legacy SDK")
        exit(1)


class GenAIClient:
    """Client for interacting with Google's Generative AI models."""
    
    def __init__(self, api_key=None, model_name=None):
        """Initialize the GenAI client with API key and model name."""
        self.api_key = api_key or config.GOOGLE_API_KEY
        self.model_name = model_name or config.MODEL_NAME
        self.using_new_sdk = USING_NEW_SDK
        
        # Configure the SDK based on which one is being used
        if self.using_new_sdk:
            # New SDK approach
            self.client = genai.Client(api_key=self.api_key)
        else:
            # Legacy SDK approach
            genai.configure(api_key=self.api_key)
        
        # Convert TOOLS_CONFIG to the format needed by the SDK
        self.tools = self._prepare_tools()
    
    def _prepare_tools(self):
        """Convert tools configuration to the format needed by the SDK."""
        if self.using_new_sdk:
            # For the new SDK
            function_declarations = []
            for tool_config in config.TOOLS_CONFIG:
                # Convert each tool configuration
                function_declarations.append({
                    "name": tool_config["name"],
                    "description": tool_config["description"],
                    "parameters": {
                        "type": tool_config["parameters"]["type"].upper(),
                        "properties": {
                            k: {
                                "type": v["type"].upper(),
                                "description": v.get("description", "")
                            } for k, v in tool_config["parameters"]["properties"].items()
                        },
                        "required": tool_config["parameters"].get("required", [])
                    }
                })
            return [{
                "function_declarations": function_declarations
            }]
        else:
            # For the legacy SDK
            function_declarations = []
            for tool_config in config.TOOLS_CONFIG:
                properties = {}
                for prop_name, prop_config in tool_config["parameters"]["properties"].items():
                    properties[prop_name] = genai.protos.Schema(
                        type=prop_config["type"].upper(),
                        description=prop_config.get("description", "")
                    )
                
                schema = genai.protos.Schema(
                    type=tool_config["parameters"]["type"].upper(),
                    properties=properties,
                    required=tool_config["parameters"].get("required", [])
                )
                
                func_decl = genai.protos.FunctionDeclaration(
                    name=tool_config["name"],
                    description=tool_config["description"],
                    parameters=schema
                )
                function_declarations.append(func_decl)
            
            return genai.protos.Tool(
                function_declarations=function_declarations
            )
    
    def start_chat(self):
        """Initialize a new chat session with the model."""
        try:
            if self.using_new_sdk:
                # New SDK
                model = self.client.models.get_model(self.model_name)
                # Pass temperature when starting chat
                chat = model.start_chat(generation_config={"temperature": config.MODEL_TEMPERATURE})

                # Add system message
                if config.SYSTEM_MESSAGE_TEXT.strip():
                    chat.send_message({"role": "user", "parts": ["Set the system instructions"]})
                    chat.send_message({"role": "model", "parts": ["I'll follow the system instructions. What are they?"]})
                    chat.send_message({"role": "user", "parts": [config.SYSTEM_MESSAGE_TEXT]})
                    chat.send_message({"role": "model", "parts": ["I'll follow these instructions."]})
            else:
                # Legacy SDK approach
                model = genai.GenerativeModel(
                    self.model_name, 
                    tools=self.tools,
                    generation_config={
                        "temperature": config.MODEL_TEMPERATURE
                    }
                )
                # For Legacy SDK, we need to set up the chat and history manually
                # First create the chat without system message
                chat = model.start_chat()
                
                # Then send a system message as the first message
                if config.SYSTEM_MESSAGE_TEXT.strip():
                    # First add the system message
                    system_msg_response = chat.send_message(config.SYSTEM_MESSAGE_TEXT)
                    # Add a placeholder acknowledgment so user's first message starts fresh
                    _ = chat.send_message("I understand and I'll follow these instructions.")
            
            return chat
        except Exception as e:
            print(f"Error starting chat: {e}")
            import traceback
            traceback.print_exc()
            raise
    
    def extract_function_call(self, response):
        """Extract function call from model response."""
        if self.using_new_sdk:
            # For the new SDK
            if hasattr(response, 'functions') and response.functions:
                function_call = response.functions[0]
                return {
                    "name": function_call.name,
                    "args": function_call.args
                }
        else:
            # For the legacy SDK
            if (hasattr(response.candidates[0].content.parts[0], 'function_call') and 
                response.candidates[0].content.parts[0].function_call.name):
                fc = response.candidates[0].content.parts[0].function_call
                return {
                    "name": fc.name,
                    "args": {key: value for key, value in fc.args.items()}
                }
        return None
    
    def extract_text_response(self, response):
        """Extract text response from model response."""
        if self.using_new_sdk and hasattr(response, 'text'):
            return response.text
        elif not self.using_new_sdk and hasattr(response.candidates[0].content.parts[0], 'text'):
            return response.candidates[0].content.parts[0].text
        return None
    
    def send_function_response(self, chat, function_name, function_response):
        """Send function response to the model."""
        try:
            if self.using_new_sdk:
                response = chat.send_message({
                    "function_response": {
                        "name": function_name,
                        "response": function_response
                    }
                })
            else:
                response = chat.send_message(
                    genai.protos.Part(
                        function_response=genai.protos.FunctionResponse(
                            name=function_name,
                            response=function_response
                        )
                    )
                )
            return response
        except Exception as e:
            print(f"Error sending function response: {e}")
            import traceback
            traceback.print_exc()
            raise
