def tool_update_contact_info(params):
    """
    Updates basic contact information for an employee such as phone number, address, and avatar URL.
    
    Args:
        params (dict): Contains employee_id and optional fields to update (phone_number, address, avatar)
        
    Returns:
        dict: Update result or error message
    """
    employee_id = params.get("employee_id")
    phone_number = params.get("phone_number")
    address = params.get("address")
    avatar = params.get("avatar")
    
    if not employee_id:
        return {"error": "Missing employee_id parameter"}
    
    # Check if at least one field to update is provided
    if not any([phone_number, address, avatar]):
        return {"error": "No fields to update provided. Please provide at least one of: phone_number, address, avatar"}
    
    try:
        from app.database.connection import get_db_conn
        import logging
        logger = logging.getLogger(__name__)
        
        conn = get_db_conn()
        
        # First check if the employee exists
        with conn.cursor() as cursor:
            cursor.execute('SELECT * FROM employee WHERE id = %s', (employee_id,))
            employee = cursor.fetchone()
            
            if not employee:
                return {"error": f"Employee with ID {employee_id} not found"}
        
        # Build the update query dynamically based on provided parameters
        update_fields = []
        update_values = []
        updated_field_names = []
        
        if phone_number is not None:
            update_fields.append('"phoneNumber" = %s')
            update_values.append(phone_number)
            updated_field_names.append("phone number")
        
        if address is not None:
            update_fields.append("address = %s")
            update_values.append(address)
            updated_field_names.append("address")
        
        if avatar is not None:
            update_fields.append("avatar = %s")
            update_values.append(avatar)
            updated_field_names.append("avatar")
        
        # Add employee_id at the end of values list for the WHERE clause
        update_values.append(employee_id)
        
        # Execute the update query
        with conn.cursor() as cursor:
            update_query = f"UPDATE employee SET {', '.join(update_fields)} WHERE id = %s"
            cursor.execute(update_query, update_values)
            
            # Commit the changes
            conn.commit()
        
        # Format the response
        formatted_response = format_update_contact_info_response(updated_field_names, employee_id)
        
        conn.close()
        logger.info(f"Successfully updated contact information for employee ID {employee_id}. Fields updated: {', '.join(updated_field_names)}")
        
        return {
            "success": True,
            "updated_fields": updated_field_names,
            "formatted_response": formatted_response
        }
    
    except Exception as e:
        logger.error(f"Error updating contact information: {e}", exc_info=True)
        return {"error": f"Database error: {str(e)}"}


def format_update_contact_info_response(updated_fields, employee_id):
    """Format contact info update into a readable text response."""
    
    if not updated_fields:
        return "No fields were updated."
    
    fields_text = ""
    if len(updated_fields) == 1:
        fields_text = updated_fields[0]
    elif len(updated_fields) == 2:
        fields_text = f"{updated_fields[0]} and {updated_fields[1]}"
    else:
        fields_text = ", ".join(updated_fields[:-1]) + f", and {updated_fields[-1]}"
    
    return f"✅ Successfully updated {fields_text} for employee ID: {employee_id}.\n\nThe changes have been saved to the database."
