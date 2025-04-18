# Hệ thống Quản lý Nhân sự

## Công nghệ:
- NestJS, PostgreSQL, TypeORM, Swagger

## API Xác thực
- **POST /api/auth/login**
  - Input: `{ email, password }`
  - Output: `{ token, userId, employeeId, role }`
  - Chức năng: Xác thực người dùng và trả về token JWT

- **POST /api/auth/register**
  - Input: `{ email, password }`
  - Output: `{ message, userId, employeeId }`
  - Chức năng: Đăng ký người dùng mới và tạo hồ sơ nhân viên trống

## API Nhân viên
- **GET /api/employees**
  - Input: JWT token (trong header Authorization)
  - Output: Mảng các đối tượng nhân viên kèm thông tin phòng ban
  - Chức năng: Lấy danh sách tất cả nhân viên với số ngày nghỉ phép đã tính toán

- **GET /api/employees/:id**
  - Input: ID nhân viên trong URL, JWT token
  - Output: Đối tượng nhân viên kèm thông tin phòng ban
  - Chức năng: Lấy thông tin nhân viên cụ thể theo ID

- **POST /api/employees/create**
  - Input: `{ firstName, lastName, dateOfBirth, gender, address, email, phone, department, position, role, salary, hireDate, avatar, leaveDaysPerMonth }`, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Tạo hồ sơ nhân viên mới

- **PUT /api/employees/:id/update**
  - Input: ID nhân viên trong URL, các trường cần cập nhật trong body, JWT token
  - Output: `{ message, employee }` dữ liệu nhân viên đã cập nhật
  - Chức năng: Cập nhật thông tin nhân viên

- **PUT /api/employees/:id/salary/update**
  - Input: ID nhân viên trong URL, `{ salary }` trong body, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Cập nhật lương nhân viên

- **DELETE /api/employees/:id/delete**
  - Input: ID nhân viên trong URL, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Xóa hồ sơ nhân viên

- **POST /api/employees/:id/upload-avatar**
  - Input: ID nhân viên trong URL, file avatar qua form-data, JWT token
  - Output: `{ message, avatar }` đường dẫn đến avatar đã tải lên
  - Chức năng: Cập nhật ảnh đại diện nhân viên

## API Phòng ban
- **GET /api/departments**
  - Input: JWT token
  - Output: Mảng các đối tượng phòng ban
  - Chức năng: Lấy tất cả phòng ban

- **GET /api/departments/:id**
  - Input: ID phòng ban trong URL, JWT token
  - Output: Đối tượng phòng ban
  - Chức năng: Lấy thông tin phòng ban cụ thể theo ID

- **POST /api/departments/create**
  - Input: `{ name, description }`, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Tạo phòng ban mới

- **PUT /api/departments/:id/update**
  - Input: ID phòng ban trong URL, các trường cần cập nhật trong body, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Cập nhật thông tin phòng ban

- **DELETE /api/departments/:id/delete**
  - Input: ID phòng ban trong URL, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Xóa phòng ban

## API Chấm công
- **GET /api/attendance hoặc /api/attendance/all**
  - Input: JWT token
  - Output: Mảng các bản ghi chấm công
  - Chức năng: Lấy tất cả bản ghi chấm công

- **GET /api/attendance/:employeeId**
  - Input: ID nhân viên trong URL, JWT token
  - Output: Mảng các bản ghi chấm công của nhân viên cụ thể
  - Chức năng: Lấy bản ghi chấm công của nhân viên cụ thể

- **POST /api/attendance/create**
  - Input: `{ employeeId, date, status, note }`, JWT token
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Tạo bản ghi chấm công

- **PUT /api/attendance/:id/update**
  - Input: ID chấm công trong URL, các trường cần cập nhật trong body, JWT token
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Cập nhật bản ghi chấm công

- **DELETE /api/attendance/:id/delete**
  - Input: ID chấm công trong URL, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Xóa bản ghi chấm công

## API Nghỉ phép
- **GET /api/leaves**
  - Input: JWT token (quyền admin)
  - Output: Mảng tất cả các yêu cầu nghỉ phép
  - Chức năng: Lấy tất cả yêu cầu nghỉ phép (xem admin)

- **GET /api/leaves/:employeeId**
  - Input: ID nhân viên trong URL, JWT token
  - Output: Mảng các yêu cầu nghỉ phép của nhân viên cụ thể
  - Chức năng: Lấy yêu cầu nghỉ phép của nhân viên cụ thể

- **POST /api/leaves/create**
  - Input: `{ employeeId, startDate, endDate, reason, type }`, JWT token
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Tạo yêu cầu nghỉ phép

- **PUT /api/leaves/:id/update**
  - Input: ID nghỉ phép trong URL, `{ status }` trong body, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Cập nhật trạng thái yêu cầu nghỉ phép (phê duyệt/từ chối)

- **DELETE /api/leaves/:id/delete**
  - Input: ID nghỉ phép trong URL, JWT token
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Xóa yêu cầu nghỉ phép

- **GET /api/leaves/remaining/:employeeId**
  - Input: ID nhân viên trong URL, JWT token
  - Output: `{ remainingLeaveDays }` số ngày nghỉ phép còn lại
  - Chức năng: Lấy số ngày nghỉ phép còn lại của nhân viên

## API Bảng lương
- **GET /api/payroll/all**
  - Input: JWT token (quyền admin)
  - Output: Mảng tất cả các bản ghi bảng lương
  - Chức năng: Lấy tất cả bản ghi bảng lương (xem admin)

- **GET /api/payroll/:employeeId**
  - Input: ID nhân viên trong URL, JWT token
  - Output: Mảng các bản ghi bảng lương của nhân viên cụ thể
  - Chức năng: Lấy bản ghi bảng lương của nhân viên cụ thể

- **POST /api/payroll/create**
  - Input: `{ employeeId, month, year, baseSalary, bonusSalary, taxDeduction, netSalary }`, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Tạo bản ghi bảng lương

- **PUT /api/payroll/update/:payrollId**
  - Input: ID bảng lương trong URL, các trường cần cập nhật trong body, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Cập nhật bản ghi bảng lương

- **DELETE /api/payroll/delete/:payrollId**
  - Input: ID bảng lương trong URL, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Xóa bản ghi bảng lương

## API Nhật ký hoạt động
- **GET /api/activity-log**
  - Input: JWT token (quyền admin)
  - Output: Mảng tất cả các nhật ký hoạt động
  - Chức năng: Lấy tất cả nhật ký hoạt động (xem admin)

- **GET /api/activity-log/:userId**
  - Input: ID người dùng trong URL, JWT token
  - Output: Mảng các nhật ký hoạt động của người dùng cụ thể
  - Chức năng: Lấy nhật ký hoạt động của người dùng cụ thể

## API Bảng feed
- **POST /api/feed/create**
  - Input: `{ title, content, departmentId }`, JWT token (quyền admin)
  - Output: `{ message }` trạng thái thành công
  - Chức năng: Tạo thông báo mới trên bảng feed (toàn cục hoặc dành riêng cho phòng ban)

- **GET /api/feed**
  - Input: JWT token
  - Output: Mảng các thông báo toàn cục và thông báo dành riêng cho phòng ban của người dùng
  - Chức năng: Lấy tất cả thông báo liên quan đến người dùng

- **GET /api/feed/:departmentId**
  - Input: ID phòng ban trong URL, JWT token
  - Output: Mảng thông báo cho phòng ban cụ thể
  - Chức năng: Lấy thông báo cho phòng ban cụ thể

## Các chức năng cốt lõi

1. **Xác thực người dùng**
   - Hệ thống đăng nhập/đăng xuất
   - Kiểm soát truy cập dựa trên vai trò (admin/nhân viên)

2. **Quản lý nhân viên**
   - Tạo, đọc, cập nhật, xóa hồ sơ nhân viên
   - Quản lý thông tin hồ sơ
   - Tải lên ảnh đại diện

3. **Quản lý phòng ban**
   - Tạo, đọc, cập nhật, xóa phòng ban
   - Phân công phòng ban cho nhân viên

4. **Theo dõi chấm công**
   - Ghi lại chấm công của nhân viên
   - Xem lịch sử chấm công

5. **Quản lý nghỉ phép**
   - Yêu cầu nghỉ phép
   - Phê duyệt/từ chối yêu cầu nghỉ phép
   - Tính toán số ngày nghỉ phép còn lại

6. **Quản lý bảng lương**
   - Tạo báo cáo lương
   - Tính toán tiền thưởng và thuế
   - Lịch sử bảng lương

7. **Ghi nhật ký hoạt động**
   - Theo dõi hành động của người dùng trong hệ thống
   - Theo dõi kiểm toán cho mục đích quản trị

8. **Bảng Feed**
   - Admin có thể gửi thông báo đến tất cả người dùng hoặc phòng ban cụ thể trong phần Feed
   - Nhân viên có thể xem thông báo liên quan

## Chi tiết mô hình dữ liệu

1. **Người dùng (User)**
   - _id: ObjectId (tự động tạo)
   - email: String (bắt buộc, duy nhất)
   - password: String (bắt buộc)
   - role: String (enum: ['admin', 'employee'], mặc định: 'employee')
   - employeeId: ObjectId (tham chiếu đến Employee, mặc định: null)

2. **Nhân viên (Employee)**
   - _id: ObjectId (tự động tạo)
   - firstName: String
   - lastName: String
   - dateOfBirth: String
   - gender: String (enum: ['', 'Nam', 'Nữ', 'Khác'])
   - address: String
   - email: String (bắt buộc, duy nhất)
   - phone: String
   - department: ObjectId (tham chiếu đến Department)
   - position: String
   - salary: Number (mặc định: 0)
   - role: String (enum: ['Trưởng phòng', 'Thành viên'], mặc định: 'Thành viên')
   - hireDate: Date (mặc định: ngày hiện tại)
   - avatar: String (mặc định: 'default.jpg')
   - leaveDaysPerMonth: Number (mặc định: 5)
   - remainingLeaveDays: Number (mặc định: 5)

3. **Phòng ban (Department)**
   - _id: ObjectId (tự động tạo)
   - name: String (bắt buộc)
   - description: String

4. **Chấm công (Attendance)**
   - _id: ObjectId (tự động tạo)
   - employeeId: ObjectId (tham chiếu đến Employee, bắt buộc)
   - date: Date (bắt buộc)
   - status: String (enum: ['Có mặt', 'Vắng mặt', 'Nghỉ phép'], mặc định: 'Có mặt')
   - note: String

5. **Nghỉ phép (Leave)**
   - _id: ObjectId (tự động tạo)
   - employeeId: ObjectId (tham chiếu đến Employee, bắt buộc)
   - startDate: Date (bắt buộc)
   - endDate: Date (bắt buộc)
   - reason: String
   - type: String (enum: ['Nghỉ phép', 'Nghỉ ốm', 'Nghỉ không lương', 'Khác'])
   - status: String (enum: ['Chờ duyệt', 'Đã duyệt', 'Từ chối'], mặc định: 'Chờ duyệt')

6. **Bảng lương (Payroll)**
   - _id: ObjectId (tự động tạo)
   - employeeId: ObjectId (tham chiếu đến Employee, bắt buộc)
   - month: Number (bắt buộc)
   - year: Number (bắt buộc)
   - baseSalary: Number (mặc định: 0)
   - bonusSalary: Number (mặc định: 0)
   - taxDeduction: Number (mặc định: 0)
   - netSalary: Number (mặc định: 0)

7. **Nhật ký hoạt động (ActivityLog)**
   - _id: ObjectId (tự động tạo)
   - userId: ObjectId (tham chiếu đến User, bắt buộc)
   - action: String (bắt buộc)
   - entityType: String
   - entityId: ObjectId
   - timestamp: Date (mặc định: ngày hiện tại)

8. **Thông báo (Feed)**
   - _id: ObjectId (tự động tạo)
   - title: String (bắt buộc)
   - content: String (bắt buộc)
   - departmentId: ObjectId (tham chiếu đến Department, null nếu là thông báo toàn cục)
   - timestamp: Date (mặc định: ngày hiện tại)


Bổ sung:
- Cấu trúc response & lỗi