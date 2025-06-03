"""
MCP Tool Implementations
Contains the implementation for all MCP tools used by the server.
"""

import logging
import psycopg2
from psycopg2 import sql
from app.database.connection import get_db_conn

logger = logging.getLogger(__name__)

def tool_get_employee_info(params):
    """
    Retrieves comprehensive information about an employee including profile, department, and related data.
    
    Args:
        params (dict): Contains employee_id
        
    Returns:
        dict: Employee information or error message
    """
    employee_id = params.get("employee_id")
    
    if not employee_id:
        return {"error": "Missing employee_id parameter"}
    
    try:
        conn = get_db_conn()
        
        # Helper function to execute queries
        def execute_query(query, params):
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                return cursor.fetchall()
        
        # Fetch employee data
        raw_employee = execute_query('SELECT * FROM employee WHERE id = %s', (employee_id,))
        
        # Fetch department data if employee has a department
        if raw_employee and raw_employee[0].get("departmentId"):
            department_id = raw_employee[0].get("departmentId")
            raw_department = execute_query('SELECT * FROM department WHERE id = %s', (department_id,))
        else:
            raw_department = []
        
        # Fetch project participation
        raw_projects = execute_query("""
            SELECT p.* FROM project p
            JOIN project_employee pe ON p.id = pe."projectId"
            WHERE pe."employeeId" = %s
        """, (employee_id,))
        
        # Fetch managed projects (where employee is manager)
        raw_managed_projects = execute_query('SELECT * FROM project WHERE "managerId" = %s', (employee_id,))
        
        # Fetch assigned tasks
        raw_assigned_tasks = execute_query("""
            SELECT t.* FROM task t
            JOIN task_assignee ta ON t.id = ta."taskId"
            WHERE ta."employeeId" = %s
            ORDER BY 
                CASE 
                    WHEN t.status <> 'completed' THEN 1
                    ELSE 2
                END,
                t."dueDate" ASC NULLS LAST
        """, (employee_id,))
        
        # Fetch tasks where employee is assigner
        raw_assigner_tasks = execute_query('SELECT * FROM task WHERE "assignerId" = %s', (employee_id,))
        
        # Fetch tasks where employee is supervisor
        raw_supervisor_tasks = execute_query('SELECT * FROM task WHERE "supervisorId" = %s', (employee_id,))

        # Process employee data
        employee_info = process_employee_data(raw_employee)
        
        # Process department data
        department_info = process_department_data(raw_department)
        
        # Process project data
        projects = process_projects_data(raw_projects)
        managed_projects = process_projects_data(raw_managed_projects)
        
        # Process task data
        assigned_tasks = process_tasks_data(raw_assigned_tasks)
        assigner_tasks = process_tasks_data(raw_assigner_tasks)
        supervisor_tasks = process_tasks_data(raw_supervisor_tasks)
        
        # Format text response
        formatted_response = format_employee_response(
            employee_info,
            department_info,
            projects,
            managed_projects,
            assigned_tasks,
            assigner_tasks,
            supervisor_tasks
        )
            
        conn.close()
        logger.info(f"Successfully retrieved comprehensive employee info for employee ID {employee_id}")
        return {"employee_info": formatted_response}
    
    except Exception as e:
        logger.error(f"Error retrieving employee info: {e}", exc_info=True)
        return {"error": f"Database error: {str(e)}"}

def process_employee_data(raw_employee):
    """Process raw employee data into a structured format."""
    employee_info = None
    sensitive_fields = {"password"}
    
    if raw_employee and len(raw_employee) > 0:
        row = raw_employee[0]
        employee_info = {}
        
        # If row is a dict (RealDictCursor)
        if isinstance(row, dict):
            for key, value in row.items():
                if key not in sensitive_fields:
                    employee_info[key] = value
        
        # Convert dates to string format for easier display
        if 'birthDate' in employee_info and employee_info['birthDate']:
            employee_info['birthDate'] = employee_info['birthDate'].strftime('%Y-%m-%d')
        if 'joinDate' in employee_info and employee_info['joinDate']:
            employee_info['joinDate'] = employee_info['joinDate'].strftime('%Y-%m-%d')
    
    return employee_info

def process_department_data(raw_department):
    """Process raw department data into a structured format."""
    department_info = None
    
    if raw_department and len(raw_department) > 0:
        row = raw_department[0]
        department_info = {}
        
        # If row is a dict (RealDictCursor)
        if isinstance(row, dict):
            for key, value in row.items():
                department_info[key] = value
    
    return department_info

def process_projects_data(raw_projects):
    """Process raw project data into a structured format."""
    projects = []
    if raw_projects:
        for row in raw_projects:
            if isinstance(row, dict):
                project = {}
                for key, value in row.items():
                    if key in ('startDate', 'endDate', 'createdAt', 'updatedAt') and value is not None:
                        if isinstance(value, str):
                            project[key] = value
                        else:
                            project[key] = value.strftime('%Y-%m-%d')
                    else:
                        project[key] = value
                projects.append(project)
    return projects

def process_tasks_data(raw_tasks):
    """Process raw task data into a structured format."""
    tasks = []
    if raw_tasks:
        for row in raw_tasks:
            if isinstance(row, dict):
                task = {}
                for key, value in row.items():
                    if key in ('startDate', 'dueDate', 'startedAt', 'submittedAt', 'completedAt', 'createdAt', 'updatedAt') and value is not None:
                        if isinstance(value, str):
                            task[key] = value
                        else:
                            task[key] = value.strftime('%Y-%m-%d %H:%M:%S')
                    else:
                        task[key] = value
                tasks.append(task)
    return tasks

def process_subtasks_data(raw_subtasks):
    """Process raw subtask data into a structured format."""
    subtasks = []
    if raw_subtasks:
        for row in raw_subtasks:
            if isinstance(row, dict):
                subtask = {}
                for key, value in row.items():
                    if key in ('createdAt', 'updatedAt') and value is not None:
                        if isinstance(value, str):
                            subtask[key] = value
                        else:
                            subtask[key] = value.strftime('%Y-%m-%d %H:%M:%S')
                    else:
                        subtask[key] = value
                subtasks.append(subtask)
    return subtasks

def process_comments_data(raw_comments):
    """Process raw comment data into a structured format."""
    comments = []
    if raw_comments:
        for row in raw_comments:
            if isinstance(row, dict):
                comment = {}
                for key, value in row.items():
                    if key in ('createdAt', 'updatedAt') and value is not None:
                        if isinstance(value, str):
                            comment[key] = value
                        else:
                            comment[key] = value.strftime('%Y-%m-%d %H:%M:%S')
                    else:
                        comment[key] = value
                comments.append(comment)
    return comments

def format_employee_response(employee_info, department_info, projects, managed_projects, assigned_tasks, assigner_tasks, supervisor_tasks):
    """Format employee data into a readable text response."""
    lines = []
    
    # Employee section
    lines.append(f"\n--- NHÂN VIÊN ---")
    if employee_info:
        for k, v in employee_info.items():
            if k != "password":
                # Format Vietnamese labels for better readability
                label = {
                    "id": "ID",
                    "fullName": "Họ và tên",
                    "email": "Email",
                    "phoneNumber": "Số điện thoại",
                    "birthDate": "Ngày sinh",
                    "joinDate": "Ngày vào làm",
                    "address": "Địa chỉ",
                    "identityCard": "Số CMND/CCCD",
                    "position": "Chức vụ",
                    "education": "Học vấn",
                    "isActive": "Đang làm việc",
                    "role": "Vai trò",
                    "departmentId": "ID Phòng ban",
                    "workExperience": "Kinh nghiệm làm việc",
                    "baseSalary": "Lương cơ bản",
                    "bankAccount": "Tài khoản ngân hàng",
                    "bankName": "Tên ngân hàng",
                    "taxCode": "Mã số thuế",
                    "insuranceCode": "Mã số bảo hiểm"
                }.get(k, k)
                
                # Format boolean values
                if isinstance(v, bool):
                    v = "Có" if v else "Không"
                
                lines.append(f"{label}: {v}")
    else:
        lines.append("Không có dữ liệu.")

    # Department section
    lines.append(f"\n--- PHÒNG BAN ---")
    if department_info:
        for k, v in department_info.items():
            # Format Vietnamese labels
            label = {
                "id": "ID",
                "departmentName": "Tên phòng ban",
                "description": "Mô tả",
                "isActive": "Đang hoạt động"
            }.get(k, k)
            
            # Format boolean values
            if isinstance(v, bool):
                v = "Có" if v else "Không"
                
            lines.append(f"{label}: {v}")
    else:
        lines.append("Không có dữ liệu.")

    # Projects section
    lines.append(f"\n--- DỰ ÁN THAM GIA ---")
    if projects:
        for project in projects:
            lines.append(f"- ID: {project.get('id')}")
            lines.append(f"  Tên dự án: {project.get('name')}")
            lines.append(f"  Mô tả: {project.get('description') or 'Không có mô tả'}")
            lines.append(f"  Ngày bắt đầu: {project.get('startDate') or 'Chưa xác định'}")
            lines.append(f"  Ngày kết thúc: {project.get('endDate') or 'Chưa xác định'}")
            lines.append(f"  Trạng thái: {project.get('status')}")
            lines.append("  ---")
    else:
        lines.append("Không có dữ liệu.")
        
    # Managed Projects section
    lines.append(f"\n--- DỰ ÁN QUẢN LÝ ---")
    if managed_projects:
        for project in managed_projects:
            lines.append(f"- ID: {project.get('id')}")
            lines.append(f"  Tên dự án: {project.get('name')}")
            lines.append(f"  Mô tả: {project.get('description') or 'Không có mô tả'}")
            lines.append(f"  Ngày bắt đầu: {project.get('startDate') or 'Chưa xác định'}")
            lines.append(f"  Ngày kết thúc: {project.get('endDate') or 'Chưa xác định'}")
            lines.append(f"  Trạng thái: {project.get('status')}")
            lines.append("  ---")
    else:
        lines.append("Không có dữ liệu.")
    
    # Assigned Tasks section
    lines.append(f"\n--- NHIỆM VỤ ĐƯỢC GIAO ---")
    if assigned_tasks:
        # Show incomplete tasks first
        incomplete_tasks = [t for t in assigned_tasks if t.get('status') != 'completed']
        completed_tasks = [t for t in assigned_tasks if t.get('status') == 'completed']
        
        if incomplete_tasks:
            lines.append("Nhiệm vụ chưa hoàn thành:")
            for task in incomplete_tasks:
                lines.append(f"- ID: {task.get('id')}")
                lines.append(f"  Tiêu đề: {task.get('title')}")
                lines.append(f"  Mô tả: {task.get('description') or 'Không có mô tả'}")
                lines.append(f"  Ưu tiên: {task.get('priority')}")
                lines.append(f"  Trạng thái: {task.get('status')}")
                lines.append(f"  Hạn hoàn thành: {task.get('dueDate') or 'Không có hạn'}")
                lines.append("  ---")
        
        if completed_tasks:
            lines.append("Nhiệm vụ đã hoàn thành (trong tháng hiện tại):")
            for task in completed_tasks:
                lines.append(f"- ID: {task.get('id')}")
                lines.append(f"  Tiêu đề: {task.get('title')}")
                lines.append(f"  Hoàn thành vào: {task.get('completedAt')}")
                lines.append("  ---")
    else:
        lines.append("Không có dữ liệu.")
    
    return "\n".join(lines)

def tool_get_employee_timekeeping(params):
    """
    Retrieves timekeeping records for a specific employee, with optional month and year filters.
    
    Args:
        params (dict): Contains employee_id, and optional month and year parameters
        
    Returns:
        dict: Timekeeping information or error message
    """
    employee_id = params.get("employee_id")
    month = params.get("month")
    year = params.get("year")
    
    if not employee_id:
        return {"error": "Missing employee_id parameter"}
    
    try:
        conn = get_db_conn()
        
        try:
            with conn.cursor() as cursor:
                query_params = [employee_id]
                
                # Build the query based on provided filters
                if month and year:
                    query = """
                    SELECT t.*, s."shiftName", s."startTime", s."endTime"
                    FROM timekeeping t
                    LEFT JOIN shift s ON t."shiftId" = s.id
                    WHERE t."employeeId" = %s
                    AND EXTRACT(MONTH FROM t.date) = %s
                    AND EXTRACT(YEAR FROM t.date) = %s
                    ORDER BY t.date DESC
                    """
                    query_params.extend([month, year])
                elif month:
                    query = """
                    SELECT t.*, s."shiftName", s."startTime", s."endTime"
                    FROM timekeeping t
                    LEFT JOIN shift s ON t."shiftId" = s.id
                    WHERE t."employeeId" = %s
                    AND EXTRACT(MONTH FROM t.date) = %s
                    ORDER BY t.date DESC
                    """
                    query_params.append(month)
                elif year:
                    query = """
                    SELECT t.*, s."shiftName", s."startTime", s."endTime"
                    FROM timekeeping t
                    LEFT JOIN shift s ON t."shiftId" = s.id
                    WHERE t."employeeId" = %s
                    AND EXTRACT(YEAR FROM t.date) = %s
                    ORDER BY t.date DESC
                    """
                    query_params.append(year)
                else:
                    # Default to current month if no filters provided
                    from datetime import datetime
                    current_month = datetime.now().month
                    current_year = datetime.now().year
                    query = """
                    SELECT t.*, s."shiftName", s."startTime", s."endTime"
                    FROM timekeeping t
                    LEFT JOIN shift s ON t."shiftId" = s.id
                    WHERE t."employeeId" = %s
                    AND EXTRACT(MONTH FROM t.date) = %s
                    AND EXTRACT(YEAR FROM t.date) = %s
                    ORDER BY t.date DESC
                    """
                    query_params.extend([current_month, current_year])
                
                cursor.execute(query, query_params)
                results = cursor.fetchall()
            
            # Process timekeeping records
            timekeeping_records = []
            for record in results:
                # Format the record
                formatted_record = {}
                for key, value in record.items():
                    if key in ('date') and value is not None:
                        if isinstance(value, str):
                            formatted_record[key] = value
                        else:
                            formatted_record[key] = value.strftime('%Y-%m-%d')
                    elif key in ('checkInTime', 'checkOutTime', 'startTime', 'endTime') and value is not None:
                        if isinstance(value, str):
                            formatted_record[key] = value
                        else:
                            formatted_record[key] = value.strftime('%H:%M:%S')
                    else:
                        formatted_record[key] = value
                timekeeping_records.append(formatted_record)
            
            # Format the response
            formatted_response = "\n--- CHẤM CÔNG ---\n"
            if timekeeping_records:
                time_period = ""
                if month and year:
                    time_period = f"tháng {month} năm {year}"
                elif month:
                    time_period = f"tháng {month}"
                elif year:
                    time_period = f"năm {year}"
                else:
                    current_month = datetime.now().month
                    current_year = datetime.now().year
                    time_period = f"tháng {current_month} năm {current_year}"
                
                formatted_response += f"Dữ liệu chấm công {time_period}:\n"
                for record in timekeeping_records:
                    formatted_response += f"- Ngày: {record.get('date')}\n"
                    formatted_response += f"  Ca làm: {record.get('shiftName', 'Không xác định')}\n"
                    formatted_response += f"  Giờ vào: {record.get('checkInTime', 'Chưa điểm danh')}\n"
                    formatted_response += f"  Giờ ra: {record.get('checkOutTime', 'Chưa điểm danh')}\n"
                    formatted_response += f"  Đi muộn: {'Có' if record.get('isLate') else 'Không'}\n"
                    formatted_response += f"  Về sớm: {'Có' if record.get('isEarlyLeave') else 'Không'}\n"
                    if record.get('note'):
                        formatted_response += f"  Ghi chú: {record.get('note')}\n"
                    formatted_response += "  ---\n"
            else:
                formatted_response += "Không có dữ liệu chấm công.\n"
            
            logger.info(f"Retrieved {len(timekeeping_records)} timekeeping records for employee ID {employee_id}")
            return {"timekeeping_records": timekeeping_records, "formatted_response": formatted_response}
            
        finally:
            conn.close()
    except Exception as e:
        logger.error(f"Error retrieving employee projects: {e}", exc_info=True)
        return {"error": f"Database error: {str(e)}"}

def tool_get_employee_projects(params):
    """
    Retrieves all projects an employee is participating in.
    
    Args:
        params (dict): Contains employee_id
        
    Returns:
        dict: Projects information or error message
    """
    employee_id = params.get("employee_id")
    
    if not employee_id:
        return {"error": "Missing employee_id parameter"}
    
    try:
        conn = get_db_conn()
        
        try:
            # Helper function to execute queries
            def execute_query(query, params):
                with conn.cursor() as cursor:
                    cursor.execute(query, params)
                    return cursor.fetchall()
            
            # Get projects the employee is participating in
            raw_projects = execute_query("""
                SELECT p.*, d."departmentName", e."fullName" as manager_name
                FROM project p
                JOIN project_employee pe ON p.id = pe."projectId"
                JOIN department d ON p."departmentId" = d.id
                JOIN employee e ON p."managerId" = e.id
                WHERE pe."employeeId" = %s
                ORDER BY p.status, p."startDate" DESC NULLS LAST
            """, (employee_id,))
            
            # Get managed projects (where employee is manager)
            raw_managed_projects = execute_query("""
                SELECT p.*, d."departmentName"
                FROM project p
                JOIN department d ON p."departmentId" = d.id
                WHERE p."managerId" = %s
                ORDER BY p.status, p."startDate" DESC NULLS LAST
            """, (employee_id,))
            
            # Process project data
            projects = process_projects_data(raw_projects)
            managed_projects = process_projects_data(raw_managed_projects)
            
            # For each project, get team members
            for project in projects + managed_projects:
                project_id = project.get('id')
                if project_id:
                    # Get team members for this project
                    team_members = execute_query("""
                        SELECT e.id, e."fullName", e.email, e.position
                        FROM employee e
                        JOIN project_employee pe ON e.id = pe."employeeId"
                        WHERE pe."projectId" = %s
                    """, (project_id,))
                    
                    project['team_members'] = []
                    for member in team_members:
                        project['team_members'].append({
                            'id': member.get('id'),
                            'fullName': member.get('fullName'),
                            'email': member.get('email'),
                            'position': member.get('position')
                        })
            
            # Format text response
            formatted_response = "\n--- DỰ ÁN CỦA NHÂN VIÊN ---\n"
            
            # First section: Managed projects
            formatted_response += "\n### DỰ ÁN QUẢN LÝ ###\n"
            if managed_projects:
                for project in managed_projects:
                    formatted_response += f"- ID: {project.get('id')}\n"
                    formatted_response += f"  Tên dự án: {project.get('name')}\n"
                    formatted_response += f"  Phòng ban: {project.get('departmentName', 'Không xác định')}\n"
                    formatted_response += f"  Mô tả: {project.get('description') or 'Không có mô tả'}\n"
                    formatted_response += f"  Ngày bắt đầu: {project.get('startDate') or 'Chưa xác định'}\n"
                    formatted_response += f"  Ngày kết thúc: {project.get('endDate') or 'Chưa xác định'}\n"
                    formatted_response += f"  Trạng thái: {project.get('status')}\n"
                    
                    # Team members
                    if project.get('team_members'):
                        formatted_response += "  Thành viên:\n"
                        for member in project.get('team_members'):
                            formatted_response += f"    - {member.get('fullName')} ({member.get('position') or 'Không có chức vụ'})\n"
                    formatted_response += "  ---\n"
            else:
                formatted_response += "Không có dự án nào được quản lý.\n"
            
            # Second section: Participating projects (not managed)
            participating_projects = [p for p in projects if p.get('id') not in [mp.get('id') for mp in managed_projects]]
            
            formatted_response += "\n### DỰ ÁN THAM GIA ###\n"
            if participating_projects:
                for project in participating_projects:
                    formatted_response += f"- ID: {project.get('id')}\n"
                    formatted_response += f"  Tên dự án: {project.get('name')}\n"
                    formatted_response += f"  Phòng ban: {project.get('departmentName', 'Không xác định')}\n"
                    formatted_response += f"  Quản lý: {project.get('manager_name', 'Không xác định')}\n"
                    formatted_response += f"  Mô tả: {project.get('description') or 'Không có mô tả'}\n"
                    formatted_response += f"  Ngày bắt đầu: {project.get('startDate') or 'Chưa xác định'}\n"
                    formatted_response += f"  Ngày kết thúc: {project.get('endDate') or 'Chưa xác định'}\n"
                    formatted_response += f"  Trạng thái: {project.get('status')}\n"
                    formatted_response += "  ---\n"
            else:
                formatted_response += "Không có dự án nào được tham gia.\n"
            
            logger.info(f"Retrieved {len(projects)} projects and {len(managed_projects)} managed projects for employee ID {employee_id}")
            return {
                "projects": projects, 
                "managed_projects": managed_projects,
                "formatted_response": formatted_response
            }
            
        finally:
            conn.close()
    except Exception as e:
        logger.error(f"Error retrieving employee projects: {e}", exc_info=True)
        return {"error": f"Database error: {str(e)}"}

def tool_get_task_details(params):
    """
    Retrieves detailed information about a specific task, including subtasks, comments, and related entities.
    
    Args:
        params (dict): Contains task_id
        
    Returns:
        dict: Task details or error message
    """
    task_id = params.get("task_id")
    
    if not task_id:
        return {"error": "Missing task_id parameter"}
    
    try:
        conn = get_db_conn()
        
        try:
            # Helper function to execute queries
            def execute_query(query, params):
                with conn.cursor() as cursor:
                    cursor.execute(query, params)
                    return cursor.fetchall()
            
            # Get task details
            raw_task = execute_query("""
                SELECT t.*, p.name as project_name, 
                       a."fullName" as assignee_name,
                       s."fullName" as supervisor_name
                FROM task t
                LEFT JOIN project p ON t."projectId" = p.id
                LEFT JOIN employee a ON t."assignerId" = a.id
                LEFT JOIN employee s ON t."supervisorId" = s.id
                WHERE t.id = %s
            """, (task_id,))
            
            if not raw_task:
                return {"error": "Task not found"}
            
            # Get subtasks
            raw_subtasks = execute_query("""
                SELECT st.*
                FROM sub_task st
                WHERE st."taskId" = %s
                ORDER BY st.completed
            """, (task_id,))
            
            # Get comments
            raw_comments = execute_query("""
                SELECT c.*, e."fullName" as author_name
                FROM comment c
                JOIN employee e ON c."employeeId" = e.id
                WHERE c."taskId" = %s
                ORDER BY c."createdAt" DESC
            """, (task_id,))
            
            # Process task data
            task = process_tasks_data(raw_task)[0] if raw_task else {}
            
            # Process subtasks
            subtasks = []
            for subtask in raw_subtasks:
                formatted_subtask = {}
                for key, value in subtask.items():
                    if key in ('createdAt', 'updatedAt', 'completedAt', 'dueDate') and value is not None:
                        if isinstance(value, str):
                            formatted_subtask[key] = value
                        else:
                            formatted_subtask[key] = value.strftime('%Y-%m-%d %H:%M:%S')
                    else:
                        formatted_subtask[key] = value
                subtasks.append(formatted_subtask)
            
            # Process comments
            comments = []
            for comment in raw_comments:
                formatted_comment = {}
                for key, value in comment.items():
                    if key in ('createdAt', 'updatedAt') and value is not None:
                        if isinstance(value, str):
                            formatted_comment[key] = value
                        else:
                            formatted_comment[key] = value.strftime('%Y-%m-%d %H:%M:%S')
                    else:
                        formatted_comment[key] = value
                comments.append(formatted_comment)
            
            # Format text response
            formatted_response = "\n--- CHI TIẾT NHIỆM VỤ ---\n"
            
            # Task details
            if task:
                formatted_response += f"ID: {task.get('id')}\n"
                formatted_response += f"Tiêu đề: {task.get('title')}\n"
                formatted_response += f"Mô tả: {task.get('description') or 'Không có mô tả'}\n"
                formatted_response += f"Ưu tiên: {task.get('priority')}\n"
                formatted_response += f"Trạng thái: {task.get('status')}\n"
                formatted_response += f"Dự án: {task.get('project_name') or 'Không thuộc dự án nào'}\n"
                formatted_response += f"Người được giao: {task.get('assignee_name') or 'Chưa xác định'}\n"
                formatted_response += f"Người giám sát: {task.get('supervisor_name') or 'Không có'}\n"
                formatted_response += f"Hạn hoàn thành: {task.get('dueDate') or 'Không có hạn'}\n"
                
                if task.get('completedAt'):
                    formatted_response += f"Đã hoàn thành vào: {task.get('completedAt')}\n"
                
                formatted_response += f"Tạo vào: {task.get('createdAt') or 'Không xác định'}\n"
                formatted_response += f"Cập nhật lần cuối: {task.get('updatedAt') or 'Chưa cập nhật'}\n"
            
            # Subtasks section
            formatted_response += "\n### SUBTASKS ###\n"
            if subtasks:
                # Show incomplete subtasks first
                incomplete_subtasks = [st for st in subtasks if not st.get('completed')]
                completed_subtasks = [st for st in subtasks if st.get('completed')]
                
                if incomplete_subtasks:
                    formatted_response += "Subtasks chưa hoàn thành:\n"
                    for subtask in incomplete_subtasks:
                        formatted_response += f"- ID: {subtask.get('id')}\n"
                        formatted_response += f"  Nội dung: {subtask.get('content')}\n"
                        formatted_response += f"  Tạo vào: {subtask.get('createdAt')}\n"
                        formatted_response += "  ---\n"
                
                if completed_subtasks:
                    formatted_response += "Subtasks đã hoàn thành:\n"
                    for subtask in completed_subtasks:
                        formatted_response += f"- ID: {subtask.get('id')}\n"
                        formatted_response += f"  Nội dung: {subtask.get('content')}\n"
                        formatted_response += f"  Tạo vào: {subtask.get('createdAt')}\n"
                        formatted_response += f"  Cập nhật lần cuối: {subtask.get('updatedAt')}\n"
                        formatted_response += "  ---\n"
            else:
                formatted_response += "Không có subtask nào.\n"
            
            # Comments section
            formatted_response += "\n### COMMENTS ###\n"
            if comments:
                for comment in comments:
                    formatted_response += f"- {comment.get('author_name')} ({comment.get('createdAt')}):\n"
                    formatted_response += f"  {comment.get('content')}\n"
                    formatted_response += "  ---\n"
            else:
                formatted_response += "Không có comment nào.\n"
            
            logger.info(f"Retrieved task details for task ID {task_id}")
            return {
                "task": task,
                "subtasks": subtasks,
                "comments": comments,
                "formatted_response": formatted_response
            }
            
        finally:
            conn.close()
    except Exception as e:
        logger.error(f"Error retrieving task details: {e}", exc_info=True)
        return {"error": f"Database error: {str(e)}"}

def tool_describe_table(params):
    """
    Retrieves schema information about a database table.
    
    Args:
        params (dict): Contains table name and optional schema
        
    Returns:
        dict: Table schema information or error message
    """
    table_name = params.get("table")
    schema = params.get("schema", "public")
    
    if not table_name:
        return {"error": "Missing table parameter"}
    
    try:
        conn = get_db_conn()
        
        with conn.cursor() as cursor:
            # Get column information
            cursor.execute("""
                SELECT 
                    column_name, 
                    data_type, 
                    character_maximum_length,
                    column_default, 
                    is_nullable
                FROM 
                    information_schema.columns
                WHERE 
                    table_schema = %s AND 
                    table_name = %s
                ORDER BY 
                    ordinal_position
            """, (schema, table_name))
            
            columns = []
            column_data = cursor.fetchall()
            
            for row in column_data:
                column = {
                    "name": row.get("column_name"),
                    "type": row.get("data_type"),
                    "max_length": row.get("character_maximum_length"),
                    "default": row.get("column_default"),
                    "nullable": row.get("is_nullable") == "YES"
                }
                columns.append(column)
            
            # Get primary key information
            cursor.execute("""
                SELECT 
                    tc.constraint_name, 
                    kcu.column_name
                FROM 
                    information_schema.table_constraints tc
                JOIN 
                    information_schema.key_column_usage kcu
                ON 
                    tc.constraint_name = kcu.constraint_name
                WHERE 
                    tc.constraint_type = 'PRIMARY KEY' AND
                    tc.table_schema = %s AND
                    tc.table_name = %s
            """, (schema, table_name))
            
            pk_data = cursor.fetchall()
            pk_columns = [row.get("column_name") for row in pk_data]
            
            # Update columns with primary key information
            for column in columns:
                column["is_primary_key"] = column["name"] in pk_columns
            
            # Get foreign key information
            cursor.execute("""
                SELECT 
                    kcu.column_name,
                    ccu.table_schema AS foreign_table_schema,
                    ccu.table_name AS foreign_table_name,
                    ccu.column_name AS foreign_column_name
                FROM 
                    information_schema.table_constraints AS tc
                JOIN 
                    information_schema.key_column_usage AS kcu
                ON 
                    tc.constraint_name = kcu.constraint_name
                JOIN 
                    information_schema.constraint_column_usage AS ccu
                ON 
                    ccu.constraint_name = tc.constraint_name
                WHERE 
                    tc.constraint_type = 'FOREIGN KEY' AND
                    tc.table_schema = %s AND
                    tc.table_name = %s
            """, (schema, table_name))
            
            fk_data = cursor.fetchall()
            
            # Update columns with foreign key information
            for fk in fk_data:
                column_name = fk.get("column_name")
                for column in columns:
                    if column["name"] == column_name:
                        column["is_foreign_key"] = True
                        column["references"] = {
                            "schema": fk.get("foreign_table_schema"),
                            "table": fk.get("foreign_table_name"),
                            "column": fk.get("foreign_column_name")
                        }
                        break
            
            # Format columns for text response
            formatted_columns = format_table_description(table_name, columns)
            
            conn.close()
            logger.info(f"Successfully described table {schema}.{table_name}")
            return {
                "columns": columns,
                "formatted_columns": formatted_columns
            }
    
    except Exception as e:
        logger.error(f"Error describing table: {e}", exc_info=True)
        return {"error": f"Database error: {str(e)}"}

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
