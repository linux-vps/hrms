"""
Error handling utilities for the application.
"""
import logging
from functools import wraps
from flask import jsonify, current_app

logger = logging.getLogger(__name__)

def handle_exceptions(f):
    """
    Decorator to handle exceptions in routes.
    
    Args:
        f: The function to decorate
        
    Returns:
        The decorated function with exception handling
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logger.error(f"Exception in {f.__name__}: {str(e)}", exc_info=True)
            
            # Provide more descriptive messages based on exception type
            error_message = str(e)
            status_code = 500
            
            # Handle different exception types with specific messages
            if isinstance(e, ValueError):
                status_code = 400
                error_message = f"Lỗi giá trị không hợp lệ: {str(e)}"
            elif isinstance(e, KeyError):
                status_code = 400
                error_message = f"Lỗi khóa không tồn tại: {str(e)}"
            elif isinstance(e, TypeError):
                status_code = 400
                error_message = f"Lỗi kiểu dữ liệu: {str(e)}"
            elif "timeout" in str(e).lower():
                status_code = 504
                error_message = "Lỗi timeout: Không thể kết nối tới dịch vụ"
            
            return jsonify({
                "error": error_message,
                "success": False
            }), status_code
            
    return decorated
