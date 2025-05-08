# TÀI LIỆU YÊU CẦU SẢN PHẨM (PRD) - HỆ THỐNG QUẢN LÝ NHÂN SỰ (HRMS)

## 1. TỔNG QUAN SẢN PHẨM

### Mục đích
Hệ thống Quản lý Nhân sự (HRMS) là một giải pháp backend được xây dựng trên nền tảng NestJS, nhằm cung cấp nền tảng toàn diện cho doanh nghiệp quy mô nhỏ trong việc quản lý các quy trình nhân sự, từ quản lý thông tin nhân viên, chấm công, quản lý nghỉ phép đến tính lương và điều phối công việc. Hệ thống tập trung vào việc cung cấp API cho frontend ReactJS, với giao diện Kanban cho phần quản lý công việc.

### Giá trị cốt lõi
- **Hiệu quả**: Tự động hóa quy trình quản lý nhân sự, chấm công và tính lương
- **Minh bạch**: Cung cấp thông tin rõ ràng, dễ truy cập cho nhân viên và quản lý
- **Linh hoạt**: Hỗ trợ nhiều loại vai trò và phân quyền phù hợp với cấu trúc tổ chức

### Đối tượng người dùng
- **Administrator (Admin)**: Quản trị viên hệ thống, có quyền kiểm soát toàn diện
- **Manager (Quản lý)**: Quản lý các phòng ban, có quyền phê duyệt và giám sát nhân viên
- **Employee (Nhân viên)**: Người dùng thông thường, truy cập thông tin cá nhân và chức năng cơ bản

### Phạm vi dự án

**Bao gồm:**
- Quản lý thông tin nhân viên và phòng ban
- Hệ thống chấm công qua web (điểm danh thủ công)
- Tính toán lương tự động dựa trên ngày công và các yếu tố khác
- Quản lý tài liệu/file cho cá nhân và phòng ban
- Hệ thống Feed nội bộ cho công ty và phòng ban
- Quản lý công việc dạng danh sách và Kanban
- Phân quyền qua decorator theo vai trò

**Không bao gồm:**
- Xác thực vị trí khi chấm công
- Tích hợp với các hệ thống bên ngoài
- Ứng dụng di động
- Xem trước nội dung file tài liệu
- Thay đổi cơ chế xác thực hiện có

## 2. CÁC CHỨC NĂNG ĐÃ ĐÁP ỨNG

### 2.1. Quản lý Người dùng và Xác thực
- **Đăng ký và Đăng nhập**: Hệ thống xác thực người dùng an toàn với JWT
- **Phân quyền**: Phân quyền chi tiết dựa trên vai trò (Admin, Manager, Employee)
- **Quản lý Tài khoản**: Tạo và quản lý tài khoản người dùng với các mức quyền khác nhau
- **Tương thích JWT**: Sử dụng JWT để bảo mật API và quản lý phiên đăng nhập
- **Phân quyền bằng Decorator**: Sử dụng decorator để định nghĩa quyền truy cập cho các API

### 2.2. Quản lý Nhân viên và Phòng ban
- **Hồ sơ Nhân viên**: Lưu trữ và quản lý thông tin cá nhân, liên hệ, thông tin làm việc
- **Quản lý Phòng ban**: Tổ chức nhân viên theo phòng ban và vai trò
- **Quản lý Chức vụ**: Theo dõi vị trí, chức vụ của nhân viên trong tổ chức
- **Upload Ảnh đại diện**: Tải lên và quản lý ảnh đại diện nhân viên
- **Cấu trúc Phòng ban**: Hỗ trợ cấu trúc phòng ban với người quản lý

### 2.3. Quản lý Chấm công
- **Điểm danh**: Chức năng check-in, check-out hàng ngày
- **Ca làm việc**: Định nghĩa và quản lý ca làm việc (sáng, chiều, tối, đêm, cả ngày)
- **Báo cáo Chuyên cần**: Theo dõi đi muộn, về sớm, vắng mặt
- **Xuất báo cáo**: Tổng hợp dữ liệu chấm công theo thời gian
- **Thống kê**: Thống kê ngày công theo nhân viên, phòng ban

### 2.4. Quản lý Nghỉ phép
- **Yêu cầu Nghỉ phép**: Nhân viên tạo yêu cầu nghỉ phép
- **Phê duyệt**: Quy trình phê duyệt nghỉ phép với nhiều cấp
- **Các loại Nghỉ phép**: Hỗ trợ nhiều loại nghỉ phép (phép năm, nghỉ ốm, không lương, khác)
- **Theo dõi Số ngày phép**: Tự động tính toán và cập nhật số ngày phép còn lại

### 2.5. Quản lý Lương
- **Tính lương**: Tính lương dựa trên lương cơ bản, ngày công, phụ cấp, khấu trừ
- **Phụ cấp và Thưởng**: Quản lý các khoản phụ cấp và thưởng
- **Khấu trừ**: Quản lý các khoản khấu trừ (bảo hiểm xã hội, bảo hiểm y tế, thuế thu nhập cá nhân)
- **Bảng lương**: Tạo và quản lý bảng lương hàng tháng
- **Lịch sử Thanh toán**: Theo dõi lịch sử thanh toán lương
- **Danh mục Cố định**: Quản lý các danh mục cố định (thuế TNCN, BHYT, BHXH, quỹ công ty)

### 2.6. Quản lý Tài liệu
- **Lưu trữ file cá nhân**: Hỗ trợ lưu trữ file cá nhân (giới hạn 5GB/người)
- **Lưu trữ file phòng ban**: Hỗ trợ lưu trữ file phòng ban (không giới hạn)
- **Tải lên/tải xuống file**: Hỗ trợ tải lên và tải xuống file (kích thước tối đa 500MB/file)
- **Phân loại tài liệu**: Phân loại và quản lý tài liệu theo danh mục

### 2.7. Nhật ký Hoạt động
- **Ghi nhật ký**: Tự động ghi lại mọi hoạt động quan trọng trong hệ thống
- **Theo dõi Thay đổi**: Theo dõi thay đổi thông tin, phê duyệt, cập nhật
- **Bảo mật**: Ghi lại thông tin người dùng, IP, thời gian cho mục đích kiểm toán
- **Tìm kiếm và Lọc**: Tìm kiếm nhật ký hoạt động với nhiều tiêu chí

### 2.8. Hệ thống Feed (Tin tức và Thông báo)
- **Tin tức nội bộ**: Chia sẻ thông tin, thông báo trong công ty
- **Bảng tin**: Hiển thị các tin tức và sự kiện mới nhất
- **Quản lý Nội dung**: Tạo, chỉnh sửa, xóa bài đăng tin tức
- **Phân quyền đăng tin**: Quản lý có thể đăng feed cho phòng ban, Admin đăng cho toàn công ty
- **Bình luận**: Hỗ trợ bình luận trên các bài đăng feed

### 2.9. Quản lý Công việc
- **Thêm/sửa/xóa công việc**: Quản lý công việc cho cá nhân
- **Giao việc**: Quản lý có thể giao việc cho nhân viên
- **Hiển thị Kanban**: API hỗ trợ hiển thị công việc dạng Kanban trên frontend
- **Hiển thị danh sách**: API hỗ trợ hiển thị công việc dạng danh sách
- **Theo dõi tiến độ**: Theo dõi và cập nhật trạng thái công việc

### 2.10. Tích hợp và API
- **API Documentation**: Tích hợp Swagger UI để tự động tạo tài liệu API
- **RESTful API**: Cung cấp API tiêu chuẩn cho tích hợp với các hệ thống khác
- **Định dạng JSON**: Giao tiếp API theo chuẩn JSON

### 2.11. Bảo mật và Quyền riêng tư
- **Bảo vệ dữ liệu**: Bảo vệ thông tin nhân viên và dữ liệu nhạy cảm
- **Kiểm soát Truy cập**: Quản lý quyền truy cập dựa trên vai trò
- **Mã hóa**: Mã hóa dữ liệu nhạy cảm (mật khẩu, thông tin cá nhân)

## 3. QUY TRÌNH NGHIỆP VỤ CHÍNH

### 3.1. Quy trình chấm công
1. Nhân viên đăng nhập vào hệ thống
2. Nhân viên bấm nút điểm danh vào khi bắt đầu làm việc
3. Nhân viên bấm nút điểm danh ra khi kết thúc ngày làm việc
4. Hệ thống tự động ghi nhận thời gian và tính toán số giờ làm việc

### 3.2. Quy trình xin nghỉ phép
1. Nhân viên tạo đơn xin nghỉ phép trên hệ thống
2. Quản lý phòng ban nhận thông báo và xem xét đơn
3. Quản lý phê duyệt hoặc từ chối đơn
4. Nhân viên nhận thông báo về kết quả
5. Nếu được phê duyệt, hệ thống tự động cập nhật vào dữ liệu chấm công

### 3.3. Quy trình tính lương
1. Cuối tháng, hệ thống tự động tổng hợp dữ liệu chấm công
2. Hệ thống tính toán lương dựa trên ngày công và các khoản thưởng/phạt
3. Quản lý xem xét và phê duyệt bảng lương
4. Nhân viên có thể xem thông tin lương của mình

### 3.4. Quy trình quản lý công việc
1. Quản lý hoặc nhân viên tạo công việc mới
2. Hệ thống lưu trữ và hiển thị công việc trong danh sách/Kanban
3. Người thực hiện cập nhật trạng thái công việc
4. Quản lý theo dõi tiến độ công việc

## 4. MÔ HÌNH DỮ LIỆU

### 4.1. Các Entity chính

2. **User** (Nhân viên)
   - id, firstName, lastName, dateOfBirth, gender, address, email, phone, departmentId, position, salary, role, hireDate, avatar, leaveDaysPerMonth, remainingLeaveDays, email, password, role, employeeId, createdAt, updatedAt

3. **Department** (Phòng ban)
   - id, name, description, managerId

4. **Attendance** (Điểm danh)
   - id, employeeId, date, status, note, workShiftId, checkInTime, checkOutTime, isLate, isEarlyLeave

5. **WorkShift** (Ca làm việc)
   - id, name, type, startTime, endTime, description

6. **Leave** (Nghỉ phép)
   - id, employeeId, type, startDate, endDate, days, reason, status, approvedById, approvalDate

7. **Payroll** (Bảng lương)
   - id, employeeId, month, year, baseSalary, workingDays, standardWorkingDays, overtimeHours, overtimePay, grossSalary, totalAllowance, totalBonus, totalDeduction, socialInsurance, healthInsurance, unemploymentInsurance, personalIncomeTax, netSalary, note, isPaid, paymentDate

8. **PayrollAllowance** (Phụ cấp)
   - id, payrollId, name, amount

9. **PayrollDeduction** (Khấu trừ)
   - id, payrollId, name, amount

10. **PayrollBonus** (Thưởng)
    - id, payrollId, name, amount

11. **Feed** (Tin tức)
    - id, title, content, authorId, departmentId, isCompanyWide, createdAt

12. **Comment** (Bình luận)
    - id, content, feedId, userId, createdAt

13. **Task** (Công việc)
    - id, title, description, assigneeId, creatorId, status, priority, dueDate

14. **ActivityLog** (Nhật ký hoạt động)
    - id, userId, action, entityType, entityId, details, ipAddress, timestamp

15. **File** (Tài liệu)
    - id, name, path, size, type, ownerId, departmentId, isPrivate, uploadedAt

### 4.2. Mối quan hệ chính
- User - Employee: Một-một (Một user gắn với một employee)
- Employee - Department: Nhiều-một (Một phòng ban có nhiều nhân viên)
- Department - Employee: Một-một (Một phòng ban có một manager)
- Employee - Attendance: Một-nhiều (Một nhân viên có nhiều bản ghi chấm công)
- Employee - Leave: Một-nhiều (Một nhân viên có nhiều đơn nghỉ phép)
- Employee - Payroll: Một-nhiều (Một nhân viên có nhiều bản ghi lương theo tháng)
- Payroll - PayrollAllowance/PayrollDeduction/PayrollBonus: Một-nhiều

## 5. GIAO DIỆN API

### 5.1. Các nhóm API chính

1. **Authentication API**
   - POST /auth/login
   - POST /auth/register
   - POST /auth/refresh-token
   - POST /auth/logout
   - GET /auth/profile

2. **User API**
   - GET /users
   - GET /users/:id
   - POST /users
   - PATCH /users/:id
   - DELETE /users/:id

3. **Employee API**
   - GET /employees
   - GET /employees/:id
   - POST /employees
   - PUT /employees/:id
   - DELETE /employees/:id
   - POST /employees/:id/avatar
   - PATCH /employees/:id/salary

4. **Department API**
   - GET /departments
   - GET /departments/:id
   - POST /departments
   - PATCH /departments/:id
   - DELETE /departments/:id
   - GET /departments/:id/employees

5. **Attendance API**
   - POST /attendance/check-in
   - POST /attendance/check-out
   - GET /attendance/me
   - GET /attendance/department/:id
   - GET /attendance/statistics

6. **Leave API**
   - POST /leaves
   - GET /leaves/me
   - GET /leaves/department/:id
   - PATCH /leaves/:id/approve
   - PATCH /leaves/:id/reject

7. **Payroll API**
   - GET /payroll/me
   - GET /payroll/department/:id
   - POST /payroll/calculate
   - PATCH /payroll/:id
   - GET /payroll-components
   - POST /payroll-components
   - PATCH /payroll-components/:id
   - DELETE /payroll-components/:id

8. **File API**
   - POST /files/upload
   - GET /files/me
   - GET /files/department/:id
   - GET /files/:id/download
   - DELETE /files/:id

9. **Feed API**
   - POST /feeds
   - GET /feeds
   - GET /feeds/department/:id
   - PATCH /feeds/:id
   - DELETE /feeds/:id
   - POST /feeds/:id/comments
   - GET /feeds/:id/comments

10. **Task API**
    - POST /tasks
    - GET /tasks/me
    - GET /tasks/department/:id
    - GET /tasks/:id
    - PATCH /tasks/:id
    - DELETE /tasks/:id
    - GET /tasks/kanban

11. **Activity Log API**
    - GET /activity-logs
    - GET /activity-logs/:id
    - GET /activity-logs/user/:userId

## 6. YÊU CẦU KỸ THUẬT

### 6.1. Kiến trúc và Công nghệ
- **Framework**: NestJS (Node.js)
- **Cơ sở dữ liệu**: PostgreSQL
- **ORM**: TypeORM
- **Xác thực**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator
- **Transformer**: class-transformer
- **Upload File**: Multer

### 6.2. Hiệu suất và Khả năng mở rộng
- **Modularity**: Kiến trúc module rõ ràng, dễ mở rộng
- **DI (Dependency Injection)**: Sử dụng Dependency Injection để giảm sự phụ thuộc giữa các thành phần
- **Chuẩn hóa API**: RESTful API với response format chuẩn
- **Xử lý lỗi**: Cơ chế xử lý lỗi toàn cục
- **Thời gian phản hồi**: < 500ms cho 90% request
- **Xử lý đồng thời**: Hỗ trợ ít nhất 50 người dùng đồng thời

### 6.3. Bảo mật
- **Phân quyền**: Phân quyền chặt chẽ theo vai trò
- **Bảo vệ dữ liệu nhạy cảm**: CCCD, số tài khoản, lương
- **Mã hóa**: Mã hóa mật khẩu và thông tin nhạy cảm
- **JWT**: Sử dụng JWT cho xác thực API

### 6.4. Độ tin cậy
- **Uptime**: Hệ thống phải hoạt động 99.9% thời gian
- **Backup dữ liệu**: Backup định kỳ
- **Kiểm thử**: Kiểm thử đơn vị cho các tính năng

## 7. KẾT LUẬN

Hệ thống Quản lý Nhân sự (HRMS) đã đáp ứng đầy đủ các yêu cầu cốt lõi của một hệ thống quản lý nhân sự hiện đại, bao gồm quản lý nhân viên, chấm công, nghỉ phép, lương, và các tính năng phụ trợ như quản lý tài liệu, feed nội bộ và quản lý công việc. Hệ thống được xây dựng trên nền tảng NestJS với kiến trúc module rõ ràng, dễ bảo trì và mở rộng, đồng thời đảm bảo bảo mật và hiệu suất cao.

Với các quy trình nghiệp vụ được thiết kế tối ưu và giao diện API đầy đủ, hệ thống có thể dễ dàng tích hợp với frontend ReactJS hiện có, đồng thời cung cấp nền tảng vững chắc cho việc mở rộng thêm tính năng trong tương lai. 