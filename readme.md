# Define Project
This project is a Human Resource Management System (HRMS) developed using NestJS. It aims to provide functionalities for managing employees, departments, attendance, leaves, payroll, activity logs, and feeds. The system adheres to the requirements specified in `TODO.md` and the `ERD.puml` diagram. It includes features such as user authentication, API documentation, and file uploads.

# Index
- [Define Project](#define-project)
- [Stack Tech](#stack-tech)
- [Plan backend](#plan-backend)
- [Plan frontend](#plan-frontend)

# Stack Tech
- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation and Transformation**: class-validator, class-transformer
- **Authentication**: JWT (JSON Web Token)
- **API Documentation**: Swagger
- **Testing**: Unit tests

# Plan backend
- [ ] **Authentication API**: Implement login and registration endpoints with JWT-based authentication.
- [ ] **Employee Management**: Develop APIs for CRUD operations, salary updates, and avatar uploads.
- [ ] **Department Management**: Create APIs for managing departments, including CRUD operations.
- [ ] **Attendance Tracking**: Build APIs for recording, updating, and retrieving attendance records.
- [ ] **Leave Management**: Implement APIs for leave requests, approvals, and remaining leave calculations.
- [ ] **Payroll Management**: Develop APIs for creating, updating, and retrieving payroll records.
- [ ] **Activity Logs**: Create APIs for tracking user actions in the system.
- [ ] **Feed Management**: Implement APIs for creating and retrieving notifications for users and departments.
- [ ] **Data Models**: Define and implement database models for users, employees, departments, attendance, leaves, payroll, activity logs, and feeds.
- [ ] **Error Handling**: Standardize API responses and error handling mechanisms.
- [ ] **Testing**: Write unit tests to ensure the reliability of all APIs.

# Plan frontend
- [ ] **Authentication Pages**: Develop login and registration pages with JWT token handling.
- [x] **Dashboard**: Create a dashboard for admins and employees with role-based access.
- [ ] **Employee Management**: Build interfaces for viewing, creating, updating, and deleting employee records.
- [ ] **Department Management**: Develop pages for managing departments, including CRUD operations.
- [ ] **Attendance Tracking**: Create views for recording and viewing attendance records.
- [ ] **Leave Management**: Implement pages for submitting leave requests and viewing leave statuses.
- [ ] **Payroll Management**: Build interfaces for viewing payroll records and generating reports.
- [ ] **Activity Logs**: Create a page for admins to view user activity logs.
- [ ] **Feed Management**: Develop a feed page for viewing and posting notifications.
- [ ] **Responsive Design**: Ensure the frontend is mobile-friendly and responsive.
- [ ] **Integration**: Connect frontend with backend APIs using a state management library (e.g., Redux or Context API).
- [ ] **Testing**: Write unit and integration tests for all components.
