# Hướng dẫn sử dụng HTTP Test File

File `api.http` được thiết kế để sử dụng với extension [HTTPYac](https://httpyac.github.io/) trong VSCode hoặc IntelliJ IDEA để test các API của hệ thống HRMS (Human Resource Management System).

## Cài đặt

1. Cài đặt extension HTTPYac trong VSCode:
   - [HTTPYac cho VSCode](https://marketplace.visualstudio.com/items?itemName=anweber.vscode-httpyac)
   - Hoặc tìm kiếm "HTTPYac" trong tab Extensions của VSCode

2. Cài đặt extension HTTPYac trong IntelliJ IDEA:
   - [HTTPYac cho IntelliJ IDEA](https://plugins.jetbrains.com/plugin/19968-httpyac)

## Cách sử dụng

1. Mở file `api.http`
2. Đầu tiên, chạy request đăng nhập (login) để lấy token xác thực
3. Token và các ID sẽ được tự động lưu vào biến `$global` và sử dụng cho các request tiếp theo
4. Để gửi một request, di chuyển đến request đó và:
   - VSCode: Nhấn `Ctrl+Alt+R` hoặc nhấn vào nút "Send Request" phía trên request
   - IntelliJ: Nhấn vào nút "Run" bên cạnh request

## Cấu trúc file

File `api.http` được tổ chức theo các nhóm API:

1. **Authentication API**: Đăng nhập, đăng ký, lấy thông tin người dùng
2. **Departments API**: Quản lý phòng ban
3. **Employees API**: Quản lý nhân viên
4. **Attendance API**: Quản lý chấm công
5. **Work Shifts API**: Quản lý ca làm việc
6. **Leaves API**: Quản lý nghỉ phép
7. **Payroll API**: Quản lý lương
8. **Feed API**: Quản lý bảng tin

## Quản lý biến và ID

File api.http sử dụng biến toàn cục `$global` để lưu trữ và quản lý:

- `$global.accessToken`: Token xác thực JWT
- `$global.userId`: ID người dùng hiện tại
- `$global.employeeId`: ID nhân viên hiện tại
- Các ID khác từ các API response như: `$global.departmentId`, `$global.postId`, v.v.

Cú pháp sử dụng trong request:
```
Authorization: Bearer {{$global.accessToken}}
```

Cú pháp lưu trữ từ response:
```
{{
  $global.variableName = response.parsedBody.data.property;
}}
```

## Lưu ý

- Đảm bảo server đang chạy trước khi thực hiện các request
- Token JWT có thời hạn sử dụng, nếu bạn nhận được lỗi 401 Unauthorized, hãy chạy lại request đăng nhập để lấy token mới
- Các ID được tự động lưu từ response trước đó, bạn không cần phải thay thế thủ công

## Tạo request mới

Để tạo một request HTTP mới:

1. Thêm dấu `###` để phân tách request
2. Thêm tên với cú pháp `# @name request_name`
3. Xác định phương thức HTTP và URL: `GET {{baseUrl}}/your-endpoint`
4. Thêm headers và body nếu cần thiết

Ví dụ:
```
###
# @name myNewRequest
GET {{baseUrl}}/api/endpoint
Authorization: Bearer {{$global.accessToken}}
```

## Tùy chỉnh biến môi trường

Bạn có thể tạo file `http-client.env.json` để quản lý biến môi trường cho các môi trường khác nhau (development, staging, production):

```json
{
  "development": {
    "baseUrl": "http://localhost:3000",
    "email": "admin@example.com",
    "password": "Password123!"
  },
  "production": {
    "baseUrl": "https://api.example.com",
    "email": "admin@example.com",
    "password": "your-production-password"
  }
}
``` 