## 1. Vai Trò: Nhân Viên (User)

### 1.1. Đăng nhập
- **Endpoint**: `POST /auth/login`
- **Flow**:
  1. UI yêu cầu đăng nhập với email và mật khẩu
  2. Controller nhận request và gọi AuthService.validateEmployee
  3. AuthService xác thực thông tin đăng nhập
  4. Nếu xác thực thành công, tạo JWT token
  5. Trả về thông tin nhân viên và token

### 1.2. Quên mật khẩu
- **Endpoint**: `POST /auth/forgot-password`
- **Flow**:
  1. UI yêu cầu đặt lại mật khẩu với email
  2. Controller gọi AuthService.requestPasswordReset 
  3. Gửi mã OTP đến email người dùng
  4. Người dùng nhập OTP để xác thực
  5. Hệ thống tạo mật khẩu mới và gửi đến email

### 1.3. Đổi mật khẩu
- **Endpoint**: `POST /auth/change-password`
- **Flow**:
  1. UI gửi mật khẩu hiện tại và mật khẩu mới
  2. JwtAuthGuard xác thực token JWT
  3. Controller lấy ID nhân viên từ token và gọi AuthService.changePassword
  4. Kiểm tra và cập nhật mật khẩu mới

### 1.4. Chấm công
- **Endpoint**: `POST /timekeeping/check-in` và `POST /timekeeping/check-out/:id`
- **Flow**:
  1. UI gửi thông tin chấm công
  2. JwtAuthGuard xác thực người dùng
  3. Người dùng chỉ có thể chấm công cho chính mình
  4. TimekeepingService tạo hoặc cập nhật bản ghi chấm công

### 1.5. Chấm công bằng QR code
- **Endpoint**: `POST /timekeeping/checkin/qr` và `POST /timekeeping/checkout/qr`
- **Flow**:
  1. UI quét mã QR và gửi token
  2. TimekeepingService xác thực token và người dùng
  3. Tạo hoặc cập nhật bản ghi chấm công

### 1.6. Xem lịch sử chấm công cá nhân
- **Endpoint**: `GET /timekeeping/history`
- **Flow**:
  1. UI yêu cầu lịch sử chấm công cá nhân
  2. Controller lấy ID người dùng từ token
  3. TimekeepingService trả về lịch sử chấm công của người dùng đó

### 1.7. Xem danh sách công việc được giao
- **Endpoint**: `GET /tasks/assigned-to-me`
- **Flow**:
  1. UI yêu cầu danh sách công việc được giao
  2. Controller lấy ID người dùng từ token
  3. TaskService tìm các công việc được giao cho người dùng đó
  4. Trả về danh sách công việc

### 1.8. Cập nhật trạng thái công việc
- **Endpoint**: `PATCH /tasks/:id/status`
- **Flow**:
  1. UI gửi trạng thái mới và ghi chú
  2. TaskService kiểm tra xem người dùng có quyền cập nhật trạng thái không
  3. Cập nhật trạng thái công việc nếu được phép

### 1.9. Quản lý công việc con
- **Endpoint**: `POST /tasks/:id/subtasks` và `PATCH /tasks/:id/subtasks`
- **Flow**:
  1. UI gửi thông tin công việc con hoặc cập nhật trạng thái
  2. Controller kiểm tra xem người dùng có phải là người được giao việc không
  3. TaskService thêm hoặc cập nhật công việc con
### 1.10. Xem dự án tham gia
- **Endpoint**: `GET /projects/my-projects`
- **Flow**:
  1. UI yêu cầu danh sách dự án
  2. Controller lấy ID người dùng từ token
  3. ProjectService tìm các dự án mà người dùng tham gia
  4. Trả về danh sách dự án

lấy đanh sách người dùng hiện tại
curl -X 'GET' \
  'http://localhost:3000/projects/my-projects' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM2Y2YjNkMi0zOGI5LTQ1M2ItYTZjMy1iOTdiNWUzMDgyNzEiLCJyb2xlIjoidXNlciIsImRlcGFydG1lbnRJZCI6ImMwZDg1NmY3LTRkZjItNGNhMy1hZjMzLTVjYTYyOGQxZDgxYyIsImlhdCI6MTc0NzM2OTUyNCwiZXhwIjoxNzQ3NDU1OTI0fQ.Fzv_tcvMW_h1vZT_mvDMkp8Qs0WbqDvJO-bYCEEbNkk'
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
    "name": "Database HRM ",
    "description": "dhdhdhd",
    "startDate": "2025-05-16",
    "endDate": "2025-05-21",
    "status": "draft",
    "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
    "managerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
    "createdAt": "2025-05-16T03:50:15.830Z",
    "updatedAt": "2025-05-16T03:50:15.830Z",
    "department": {
      "id": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
      "departmentName": "it",
      "description": "Công nghệ thông tin",
      "isActive": true
    },
    "manager": {
      "id": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "fullName": "manager",
      "password": "$2b$10$FL.LvYYx62Uq55DQXATfi.erWG35q3/02EnCECGUJ0bEogUITOBBq",
      "avatar": null,
      "phoneNumber": "0868434863",
      "email": "john.managerit@example.com",
      "birthDate": "2003-09-01",
      "isActive": true,
      "role": "manager",
      "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
      "address": null,
      "identityCard": null,
      "joinDate": null,
      "position": null,
      "education": null,
      "workExperience": null,
      "baseSalary": null,
      "bankAccount": null,
      "bankName": null,
      "taxCode": null,
      "insuranceCode": null
lấy thông tin chi tiết dự án theo ID 
curl -X 'GET' \
  'http://localhost:3000/projects/1d2dfa7a-68ee-4fe9-802c-49f812999a7e' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM2Y2YjNkMi0zOGI5LTQ1M2ItYTZjMy1iOTdiNWUzMDgyNzEiLCJyb2xlIjoidXNlciIsImRlcGFydG1lbnRJZCI6ImMwZDg1NmY3LTRkZjItNGNhMy1hZjMzLTVjYTYyOGQxZDgxYyIsImlhdCI6MTc0NzM2OTUyNCwiZXhwIjoxNzQ3NDU1OTI0fQ.Fzv_tcvMW_h1vZT_mvDMkp8Qs0WbqDvJO-bYCEEbNkk'

  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
    "name": "Database HRM ",
    "description": "dhdhdhd",
    "startDate": "2025-05-16",
    "endDate": "2025-05-21",
    "status": "draft",
    "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
    "managerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
    "createdAt": "2025-05-16T03:50:15.830Z",
    "updatedAt": "2025-05-16T03:50:15.830Z",
    "department": {
      "id": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
      "departmentName": "it",
      "description": "Công nghệ thông tin",
      "isActive": true
    },
    "manager": {
      "id": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "fullName": "manager",
      "password": "$2b$10$FL.LvYYx62Uq55DQXATfi.erWG35q3/02EnCECGUJ0bEogUITOBBq",
      "avatar": null,
      "phoneNumber": "0868434863",
      "email": "john.managerit@example.com",
      "birthDate": "2003-09-01",
      "isActive": true,
      "role": "manager",
      "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
      "address": null,
      "identityCard": null,
      "joinDate": null,
      "position": null,
      "education": null,
      "workExperience": null,
      "baseSalary": null,
      "bankAccount": null,
      "bankName": null,
      "taxCode": null,
      "insuranceCode": null
    },
    "members": [

-Lấy danh sách công việc được giao của người dùng hiện tại
curl -X 'GET' \
  'http://localhost:3000/tasks/assigned-to-me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM2Y2YjNkMi0zOGI5LTQ1M2ItYTZjMy1iOTdiNWUzMDgyNzEiLCJyb2xlIjoidXNlciIsImRlcGFydG1lbnRJZCI6ImMwZDg1NmY3LTRkZjItNGNhMy1hZjMzLTVjYTYyOGQxZDgxYyIsImlhdCI6MTc0NzM2OTUyNCwiZXhwIjoxNzQ3NDU1OTI0fQ.Fzv_tcvMW_h1vZT_mvDMkp8Qs0WbqDvJO-bYCEEbNkk'
 "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "b7484945-f742-44d0-af49-9b853051bfc3",
      "title": "nhap du lieu",
      "description": "dfsđf",
      "status": "pending",
      "priority": 3,
      "startDate": "2025-05-16T05:03:00.000Z",
      "dueDate": "2025-05-20T05:03:00.000Z",
      "startedAt": null,
      "submittedAt": null,
      "completedAt": null,
      "projectId": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
      "assignerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "supervisorId": "8fa1ac07-44b8-45d5-97a3-e2207f5e504a",
      "createdAt": "2025-05-16T05:03:49.456Z",
      "updatedAt": "2025-05-16T05:03:49.456Z",
      "assignees": [
        {
          "id": "94dc470d-0890-4990-87cb-8c98aad0e1ad",
          "fullName": "vantoan",
          "password": "$2b$10$JKUGs/phdmv/piu0oNMEZemu/.KebGrLVWerxsOGfRAss6xea4y.a",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee5@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },

Lấy danh sách danh sách công việc trong các dự án của người dùng 
curl -X 'GET' \
  'http://localhost:3000/tasks/in-my-projects' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM2Y2YjNkMi0zOGI5LTQ1M2ItYTZjMy1iOTdiNWUzMDgyNzEiLCJyb2xlIjoidXNlciIsImRlcGFydG1lbnRJZCI6ImMwZDg1NmY3LTRkZjItNGNhMy1hZjMzLTVjYTYyOGQxZDgxYyIsImlhdCI6MTc0NzM3MTQ5OSwiZXhwIjoxNzQ3NDU3ODk5fQ.Lk-bM146NXpQUkL7-Ry1QztoziOTCfHb2RXaKP9PdN8'
 {
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "b7484945-f742-44d0-af49-9b853051bfc3",
      "title": "nhap du lieu",
      "description": "dfsđf",
      "status": "pending",
      "priority": 3,
      "startDate": "2025-05-16T05:03:00.000Z",
      "dueDate": "2025-05-20T05:03:00.000Z",
      "startedAt": null,
      "submittedAt": null,
      "completedAt": null,
      "projectId": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
      "assignerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "supervisorId": "8fa1ac07-44b8-45d5-97a3-e2207f5e504a",
      "createdAt": "2025-05-16T05:03:49.456Z",
      "updatedAt": "2025-05-16T05:03:49.456Z",
      "project": {
        "id": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
        "name": "Database HRM ",
        "description": "dhdhdhd",
        "startDate": "2025-05-16",
        "endDate": "2025-05-21",
        "status": "draft",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "managerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
        "createdAt": "2025-05-16T03:50:15.830Z",
        "updatedAt": "2025-05-16T03:50:15.830Z"
      },
      "assigner": {
        "id": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
        "fullName": "manager",
        "password": "$2b$10$FL.LvYYx62Uq55DQXATfi.erWG35q3/02EnCECGUJ0bEogUITOBBq",
        "avatar": null,
        "phoneNumber": "0868434863",
        "email": "john.managerit@example.com",
        "birthDate": "2003-09-01",
        "isActive": true,
        "role": "manager",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      "supervisor": {
        "id": "8fa1ac07-44b8-45d5-97a3-e2207f5e504a",
        "fullName": "nguyen văn a",
        "password": "$2b$10$Ch27F5yDjBRjNbUQQcmO5OZl0qtrU/x9A1xMCbZZ3KHj0SOoeGpOG",
        "avatar": null,
        "phoneNumber": "08684348626",
        "email": "employee2@example.com",
        "birthDate": null,
        "isActive": true,
        "role": "user",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      "assignees": [
        {
          "id": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
          "fullName": "la van toan",
          "password": "$2b$10$AckeNtvyes4s1rarGdg4Be8cJjY.OC2OjCP5YO0hhtulkdCHz4diq",
          "avatar": null,
          "phoneNumber": "0123456782",
          "email": "employee1@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "8fa1ac07-44b8-45d5-97a3-e2207f5e504a",
          "fullName": "nguyen văn a",
          "password": "$2b$10$Ch27F5yDjBRjNbUQQcmO5OZl0qtrU/x9A1xMCbZZ3KHj0SOoeGpOG",
          "avatar": null,
          "phoneNumber": "08684348626",
          "email": "employee2@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "5a9ff3b8-ebeb-4a95-87f0-743bbb729e0a",
          "fullName": "nguyen văn b",
          "password": "$2b$10$kFuGIedt7qg.C37b64i21ONcTSwWQxvcpw2UBD5uuW5jnvER/wBie",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee3@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "9af4a052-2a23-4d28-8804-4a50853310da",
          "fullName": "vantoan",
          "password": "$2b$10$wJdsVvTxe3SRyJTwps2kSema4dXRn5YJeIILMGYpvnm31.bQNpxC2",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee4@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "94dc470d-0890-4990-87cb-8c98aad0e1ad",
          "fullName": "vantoan",
          "password": "$2b$10$JKUGs/phdmv/piu0oNMEZemu/.KebGrLVWerxsOGfRAss6xea4y.a",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee5@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        }
      ],
      "subtasks": []
    }
  ],
  "meta": {
    "timestamp": "2025-05-16T05:04:40.490Z",
    "path": "/tasks/in-my-projects"
  }
}

Lấy danh dách công việc do người dùng giám sát 
curl -X 'GET' \
  'http://localhost:3000/tasks/supervised-by-me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM2Y2YjNkMi0zOGI5LTQ1M2ItYTZjMy1iOTdiNWUzMDgyNzEiLCJyb2xlIjoidXNlciIsImRlcGFydG1lbnRJZCI6ImMwZDg1NmY3LTRkZjItNGNhMy1hZjMzLTVjYTYyOGQxZDgxYyIsImlhdCI6MTc0NzM3MTQ5OSwiZXhwIjoxNzQ3NDU3ODk5fQ.Lk-bM146NXpQUkL7-Ry1QztoziOTCfHb2RXaKP9PdN8'
  {
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "e8346ec7-debe-43be-8b18-ec7e5336327d",
      "title": "sfds",
      "description": "dsfd",
      "status": "pending",
      "priority": 3,
      "startDate": "2025-05-16T05:07:00.000Z",
      "dueDate": "2025-05-21T05:07:00.000Z",
      "startedAt": null,
      "submittedAt": null,
      "completedAt": null,
      "projectId": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
      "assignerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "supervisorId": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
      "createdAt": "2025-05-16T05:07:22.652Z",
      "updatedAt": "2025-05-16T05:07:22.652Z",
      "project": {
        "id": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
        "name": "Database HRM ",
        "description": "dhdhdhd",
        "startDate": "2025-05-16",
        "endDate": "2025-05-21",
        "status": "draft",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "managerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
        "createdAt": "2025-05-16T03:50:15.830Z",
        "updatedAt": "2025-05-16T03:50:15.830Z"
      },
      "assigner": {
        "id": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
        "fullName": "manager",
        "password": "$2b$10$FL.LvYYx62Uq55DQXATfi.erWG35q3/02EnCECGUJ0bEogUITOBBq",
        "avatar": null,
        "phoneNumber": "0868434863",
        "email": "john.managerit@example.com",
        "birthDate": "2003-09-01",
        "isActive": true,
        "role": "manager",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      "assignees": [
        {
          "id": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
          "fullName": "la van toan",
          "password": "$2b$10$AckeNtvyes4s1rarGdg4Be8cJjY.OC2OjCP5YO0hhtulkdCHz4diq",
          "avatar": null,
          "phoneNumber": "0123456782",
          "email": "employee1@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "8fa1ac07-44b8-45d5-97a3-e2207f5e504a",
          "fullName": "nguyen văn a",
          "password": "$2b$10$Ch27F5yDjBRjNbUQQcmO5OZl0qtrU/x9A1xMCbZZ3KHj0SOoeGpOG",
          "avatar": null,
          "phoneNumber": "08684348626",
          "email": "employee2@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "5a9ff3b8-ebeb-4a95-87f0-743bbb729e0a",
          "fullName": "nguyen văn b",
          "password": "$2b$10$kFuGIedt7qg.C37b64i21ONcTSwWQxvcpw2UBD5uuW5jnvER/wBie",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee3@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "9af4a052-2a23-4d28-8804-4a50853310da",
          "fullName": "vantoan",
          "password": "$2b$10$wJdsVvTxe3SRyJTwps2kSema4dXRn5YJeIILMGYpvnm31.bQNpxC2",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee4@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "94dc470d-0890-4990-87cb-8c98aad0e1ad",
          "fullName": "vantoan",
          "password": "$2b$10$JKUGs/phdmv/piu0oNMEZemu/.KebGrLVWerxsOGfRAss6xea4y.a",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee5@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        }
      ],
      "subtasks": []
    }
  ],
  "meta": {
    "timestamp": "2025-05-16T05:07:31.969Z",
    "path": "/tasks/supervised-by-me"
  }
}
lấy danh sách công việc quá hạn 
curl -X 'GET' \
  'http://localhost:3000/tasks/overdue' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM2Y2YjNkMi0zOGI5LTQ1M2ItYTZjMy1iOTdiNWUzMDgyNzEiLCJyb2xlIjoidXNlciIsImRlcGFydG1lbnRJZCI6ImMwZDg1NmY3LTRkZjItNGNhMy1hZjMzLTVjYTYyOGQxZDgxYyIsImlhdCI6MTc0NzM3MTQ5OSwiZXhwIjoxNzQ3NDU3ODk5fQ.Lk-bM146NXpQUkL7-Ry1QztoziOTCfHb2RXaKP9PdN8'
 {
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": "a5c7943b-8540-4040-a3df-2b4c52cbd64b",
      "title": "dsvd",
      "description": "vdsvd",
      "status": "pending",
      "priority": 3,
      "startDate": "2025-05-06T05:09:00.000Z",
      "dueDate": "2025-05-15T05:09:00.000Z",
      "startedAt": null,
      "submittedAt": null,
      "completedAt": null,
      "projectId": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
      "assignerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "supervisorId": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
      "createdAt": "2025-05-16T05:09:22.624Z",
      "updatedAt": "2025-05-16T05:09:22.624Z",
      "project": {
        "id": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
        "name": "Database HRM ",
        "description": "dhdhdhd",
        "startDate": "2025-05-16",
        "endDate": "2025-05-21",
        "status": "draft",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "managerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
        "createdAt": "2025-05-16T03:50:15.830Z",
        "updatedAt": "2025-05-16T03:50:15.830Z"
      },
      "assigner": {
        "id": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
        "fullName": "manager",
        "password": "$2b$10$FL.LvYYx62Uq55DQXATfi.erWG35q3/02EnCECGUJ0bEogUITOBBq",
        "avatar": null,
        "phoneNumber": "0868434863",
        "email": "john.managerit@example.com",
        "birthDate": "2003-09-01",
        "isActive": true,
        "role": "manager",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      "supervisor": {
        "id": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
        "fullName": "la van toan",
        "password": "$2b$10$AckeNtvyes4s1rarGdg4Be8cJjY.OC2OjCP5YO0hhtulkdCHz4diq",
        "avatar": null,
        "phoneNumber": "0123456782",
        "email": "employee1@example.com",
        "birthDate": null,
        "isActive": true,
        "role": "user",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      "assignees": [
        {
          "id": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
          "fullName": "la van toan",
          "password": "$2b$10$AckeNtvyes4s1rarGdg4Be8cJjY.OC2OjCP5YO0hhtulkdCHz4diq",
          "avatar": null,
          "phoneNumber": "0123456782",
          "email": "employee1@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "8fa1ac07-44b8-45d5-97a3-e2207f5e504a",
          "fullName": "nguyen văn a",
          "password": "$2b$10$Ch27F5yDjBRjNbUQQcmO5OZl0qtrU/x9A1xMCbZZ3KHj0SOoeGpOG",
          "avatar": null,
          "phoneNumber": "08684348626",
          "email": "employee2@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "5a9ff3b8-ebeb-4a95-87f0-743bbb729e0a",
          "fullName": "nguyen văn b",
          "password": "$2b$10$kFuGIedt7qg.C37b64i21ONcTSwWQxvcpw2UBD5uuW5jnvER/wBie",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee3@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "9af4a052-2a23-4d28-8804-4a50853310da",
          "fullName": "vantoan",
          "password": "$2b$10$wJdsVvTxe3SRyJTwps2kSema4dXRn5YJeIILMGYpvnm31.bQNpxC2",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee4@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        },
        {
          "id": "94dc470d-0890-4990-87cb-8c98aad0e1ad",
          "fullName": "vantoan",
          "password": "$2b$10$JKUGs/phdmv/piu0oNMEZemu/.KebGrLVWerxsOGfRAss6xea4y.a",
          "avatar": null,
          "phoneNumber": "0868434862",
          "email": "employee5@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        }
      ]
    }
  ],
  "meta": {
    "timestamp": "2025-05-16T05:09:31.120Z",
    "path": "/tasks/overdue"
  }
}
Câp nhật trạng thái công việc
curl -X 'PATCH' \
  'http://localhost:3000/tasks/e8346ec7-debe-43be-8b18-ec7e5336327d/status' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxM2Y2YjNkMi0zOGI5LTQ1M2ItYTZjMy1iOTdiNWUzMDgyNzEiLCJyb2xlIjoidXNlciIsImRlcGFydG1lbnRJZCI6ImMwZDg1NmY3LTRkZjItNGNhMy1hZjMzLTVjYTYyOGQxZDgxYyIsImlhdCI6MTc0NzM3MTQ5OSwiZXhwIjoxNzQ3NDU3ODk5fQ.Lk-bM146NXpQUkL7-Ry1QztoziOTCfHb2RXaKP9PdN8' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": "in_progress",
  "comment": "Đã bắt đầu làm việc trên tính năng này"
}'
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": "e8346ec7-debe-43be-8b18-ec7e5336327d",
    "title": "sfds",
    "description": "dsfd",
    "status": "in_progress",
    "priority": 3,
    "startDate": "2025-05-16T05:07:00.000Z",
    "dueDate": "2025-05-21T05:07:00.000Z",
    "startedAt": "2025-05-16T05:30:08.841Z",
    "submittedAt": null,
    "completedAt": null,
    "projectId": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
    "assignerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
    "supervisorId": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
    "createdAt": "2025-05-16T05:07:22.652Z",
    "updatedAt": "2025-05-16T05:30:08.847Z",
    "project": {
      "id": "1d2dfa7a-68ee-4fe9-802c-49f812999a7e",
      "name": "Database HRM ",
      "description": "dhdhdhd",
      "startDate": "2025-05-16",
      "endDate": "2025-05-21",
      "status": "draft",
      "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
      "managerId": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "createdAt": "2025-05-16T03:50:15.830Z",
      "updatedAt": "2025-05-16T03:50:15.830Z"
    },
    "assigner": {
      "id": "979efbb2-e304-4d27-a4d5-3d0566effeaf",
      "fullName": "manager",
      "password": "$2b$10$FL.LvYYx62Uq55DQXATfi.erWG35q3/02EnCECGUJ0bEogUITOBBq",
      "avatar": null,
      "phoneNumber": "0868434863",
      "email": "john.managerit@example.com",
      "birthDate": "2003-09-01",
      "isActive": true,
      "role": "manager",
      "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
      "address": null,
      "identityCard": null,
      "joinDate": null,
      "position": null,
      "education": null,
      "workExperience": null,
      "baseSalary": null,
      "bankAccount": null,
      "bankName": null,
      "taxCode": null,
      "insuranceCode": null
    },
    "supervisor": {
      "id": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
      "fullName": "la van toan",
      "password": "$2b$10$AckeNtvyes4s1rarGdg4Be8cJjY.OC2OjCP5YO0hhtulkdCHz4diq",
      "avatar": null,
      "phoneNumber": "0123456782",
      "email": "employee1@example.com",
      "birthDate": null,
      "isActive": true,
      "role": "user",
      "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
      "address": null,
      "identityCard": null,
      "joinDate": null,
      "position": null,
      "education": null,
      "workExperience": null,
      "baseSalary": null,
      "bankAccount": null,
      "bankName": null,
      "taxCode": null,
      "insuranceCode": null
    },
    "assignees": [
      {
        "id": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
        "fullName": "la van toan",
        "password": "$2b$10$AckeNtvyes4s1rarGdg4Be8cJjY.OC2OjCP5YO0hhtulkdCHz4diq",
        "avatar": null,
        "phoneNumber": "0123456782",
        "email": "employee1@example.com",
        "birthDate": null,
        "isActive": true,
        "role": "user",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      {
        "id": "8fa1ac07-44b8-45d5-97a3-e2207f5e504a",
        "fullName": "nguyen văn a",
        "password": "$2b$10$Ch27F5yDjBRjNbUQQcmO5OZl0qtrU/x9A1xMCbZZ3KHj0SOoeGpOG",
        "avatar": null,
        "phoneNumber": "08684348626",
        "email": "employee2@example.com",
        "birthDate": null,
        "isActive": true,
        "role": "user",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      {
        "id": "5a9ff3b8-ebeb-4a95-87f0-743bbb729e0a",
        "fullName": "nguyen văn b",
        "password": "$2b$10$kFuGIedt7qg.C37b64i21ONcTSwWQxvcpw2UBD5uuW5jnvER/wBie",
        "avatar": null,
        "phoneNumber": "0868434862",
        "email": "employee3@example.com",
        "birthDate": null,
        "isActive": true,
        "role": "user",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      {
        "id": "9af4a052-2a23-4d28-8804-4a50853310da",
        "fullName": "vantoan",
        "password": "$2b$10$wJdsVvTxe3SRyJTwps2kSema4dXRn5YJeIILMGYpvnm31.bQNpxC2",
        "avatar": null,
        "phoneNumber": "0868434862",
        "email": "employee4@example.com",
        "birthDate": null,
        "isActive": true,
        "role": "user",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      },
      {
        "id": "94dc470d-0890-4990-87cb-8c98aad0e1ad",
        "fullName": "vantoan",
        "password": "$2b$10$JKUGs/phdmv/piu0oNMEZemu/.KebGrLVWerxsOGfRAss6xea4y.a",
        "avatar": null,
        "phoneNumber": "0868434862",
        "email": "employee5@example.com",
        "birthDate": null,
        "isActive": true,
        "role": "user",
        "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
        "address": null,
        "identityCard": null,
        "joinDate": null,
        "position": null,
        "education": null,
        "workExperience": null,
        "baseSalary": null,
        "bankAccount": null,
        "bankName": null,
        "taxCode": null,
        "insuranceCode": null
      }
    ],
    "subtasks": [],
    "comments": [
      {
        "id": "aaaf7d0f-747a-4edc-befa-5277e1bc2587",
        "content": "Đã bắt đầu làm việc trên tính năng này",
        "isSummary": true,
        "taskId": "e8346ec7-debe-43be-8b18-ec7e5336327d",
        "employeeId": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
        "createdAt": "2025-05-16T05:30:08.859Z",
        "updatedAt": "2025-05-16T05:30:08.859Z",
        "employee": {
          "id": "13f6b3d2-38b9-453b-a6c3-b97b5e308271",
          "fullName": "la van toan",
          "password": "$2b$10$AckeNtvyes4s1rarGdg4Be8cJjY.OC2OjCP5YO0hhtulkdCHz4diq",
          "avatar": null,
          "phoneNumber": "0123456782",
          "email": "employee1@example.com",
          "birthDate": null,
          "isActive": true,
          "role": "user",
          "departmentId": "c0d856f7-4df2-4ca3-af33-5ca628d1d81c",
          "address": null,
          "identityCard": null,
          "joinDate": null,
          "position": null,
          "education": null,
          "workExperience": null,
          "baseSalary": null,
          "bankAccount": null,
          "bankName": null,
          "taxCode": null,
          "insuranceCode": null
        }
      }
    ]
  },
  "meta": {
    "timestamp": "2025-05-16T05:30:08.879Z",
    "path": "/tasks/e8346ec7-debe-43be-8b18-ec7e5336327d/status"
  }
}
Phân Công việc con và bình luận sử dụng lại bên MANAGER



Luồng xử lý
Người dùng click "Quên mật khẩu" trên trang đăng nhập
Nhập email
Hệ thống gửi OTP tới email
Người dùng nhập OTP
Hệ thống xác nhận OTP và gửi mật khẩu mới qua email
Người dùng đăng nhập và đổi mật khẩu
API Endpoints
Yêu cầu OTP
POST /auth/forgot-password
Request: { "email": "example@domain.com" }
Response: { "success": true, "message": "Mã OTP đã được gửi..." }
Xác thực OTP
POST /auth/verify-otp
Request: { "email": "example@domain.com", "otp": "123456" }
Response: { "success": true, "message": "Mật khẩu mới đã được gửi..." }
Giao diện cần có
Màn hình 1: Quên mật khẩu
Trường nhập email
Nút "Gửi mã OTP"
Link quay lại đăng nhập
Màn hình 2: Nhập OTP
Hiển thị email đã nhập (disabled)
Trường nhập OTP 6 số
Đồng hồ đếm ngược 15 phút
Nút "Xác nhận"
Link gửi lại OTP
Màn hình 3: Thông báo thành công
Thông báo đã gửi mật khẩu mới
Nút "Đăng nhập"

