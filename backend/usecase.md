# Đặc tả Use Case - Hệ thống Quản lý Nhân sự (HRMS)

## 1. Chức năng Đăng nhập
**Minh họa về use case Đăng nhập**
	
**Tác nhân:** Admin, Nhân viên, Quản lý

**Mô tả:** Tác nhân sử dụng chức năng này để đăng nhập vào tài khoản cá nhân trên hệ thống.

**Sự kiện kích hoạt chức năng:** Người dùng kích chuột vào ô "Đăng nhập"

**Tiền điều kiện:** Người dùng đã có tài khoản trên hệ thống

**Luồng sự kiện chính:**
1. Hệ thống hiển thị form đăng nhập.
2. Người dùng nhập email/tên đăng nhập và mật khẩu.
3. Người dùng nhấn nút "Đăng nhập".
4. Hệ thống xác thực thông tin đăng nhập.
5. Hệ thống chuyển hướng người dùng đến trang chủ tương ứng với vai trò.

**Luồng sự kiện thay thế:**
1. Thông tin đăng nhập không chính xác:
   - Hệ thống hiển thị thông báo lỗi.
   - Người dùng nhập lại thông tin.
2. Quên mật khẩu:
   - Người dùng nhấn vào "Quên mật khẩu".
   - Hệ thống chuyển đến trang khôi phục mật khẩu.

**Hậu điều kiện:** Người dùng truy cập được vào hệ thống với đầy đủ quyền hạn theo vai trò.

## 2. Chức năng Quản lý nhân viên
**Minh họa về use case Quản lý nhân viên**

**Tác nhân:** Admin, Quản lý nhân sự

**Mô tả:** Tác nhân sử dụng chức năng này để thêm, sửa, xóa và xem thông tin nhân viên trong hệ thống.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Quản lý nhân viên"

**Tiền điều kiện:** Người dùng đã đăng nhập với quyền Admin hoặc Quản lý nhân sự

**Luồng sự kiện chính:**
1. Hệ thống hiển thị danh sách nhân viên.
2. Người dùng có thể thực hiện các thao tác:
   - Xem chi tiết thông tin nhân viên
   - Thêm nhân viên mới
   - Chỉnh sửa thông tin nhân viên
   - Vô hiệu hóa/kích hoạt tài khoản nhân viên

**Luồng sự kiện thay thế:**
1. Tìm kiếm nhân viên:
   - Người dùng nhập từ khóa vào ô tìm kiếm
   - Hệ thống hiển thị kết quả phù hợp
2. Lọc danh sách nhân viên:
   - Người dùng chọn các tiêu chí lọc (phòng ban, chức vụ, trạng thái)
   - Hệ thống hiển thị danh sách đã lọc

**Hậu điều kiện:** Thông tin nhân viên được cập nhật trong hệ thống.

## 3. Chức năng Quản lý phòng ban
**Minh họa về use case Quản lý phòng ban**

**Tác nhân:** Admin, Quản lý nhân sự

**Mô tả:** Chức năng cho phép quản lý thông tin các phòng ban trong tổ chức.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Quản lý phòng ban"

**Tiền điều kiện:** Người dùng đã đăng nhập với quyền Admin hoặc Quản lý nhân sự

**Luồng sự kiện chính:**
1. Hệ thống hiển thị danh sách các phòng ban.
2. Người dùng có thể thực hiện các thao tác:
   - Xem chi tiết phòng ban (nhân viên, quản lý, vị trí còn trống)
   - Thêm phòng ban mới
   - Chỉnh sửa thông tin phòng ban
   - Vô hiệu hóa/kích hoạt phòng ban

**Luồng sự kiện thay thế:**
1. Phân công nhân viên vào phòng ban:
   - Quản lý chọn nhân viên cần phân công
   - Chọn phòng ban đích
   - Xác nhận phân công
2. Thay đổi người quản lý phòng ban:
   - Quản lý chọn phòng ban cần thay đổi
   - Chọn người quản lý mới
   - Xác nhận thay đổi

**Hậu điều kiện:** Thông tin phòng ban được cập nhật trong hệ thống.

## 4. Chức năng Quản lý chấm công
**Minh họa về use case Quản lý chấm công**

**Tác nhân:** Admin, Quản lý nhân sự, Nhân viên

**Mô tả:** Chức năng cho phép quản lý thông tin chấm công của nhân viên và cho phép nhân viên xác nhận chấm công.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Chấm công"

**Tiền điều kiện:** Người dùng đã đăng nhập vào hệ thống

**Luồng sự kiện chính:**
1. Đối với nhân viên:
   - Hệ thống hiển thị form chấm công
   - Nhân viên nhấn nút "Check-in" khi bắt đầu làm việc
   - Nhân viên nhấn nút "Check-out" khi kết thúc làm việc
2. Đối với quản lý:
   - Hệ thống hiển thị danh sách chấm công của tất cả nhân viên
   - Quản lý có thể xem, điều chỉnh thông tin chấm công

**Luồng sự kiện thay thế:**
1. Xem báo cáo chấm công:
   - Quản lý chọn thời gian cần xem báo cáo
   - Hệ thống hiển thị báo cáo chấm công theo thời gian đó
2. Xuất báo cáo chấm công:
   - Quản lý chọn định dạng xuất báo cáo
   - Hệ thống tạo file báo cáo theo định dạng đã chọn

**Hậu điều kiện:** Thông tin chấm công được lưu trữ và cập nhật trong hệ thống.

## 5. Chức năng Quản lý nghỉ phép
**Minh họa về use case Quản lý nghỉ phép**

**Tác nhân:** Admin, Quản lý, Nhân viên

**Mô tả:** Chức năng cho phép nhân viên tạo đơn xin nghỉ phép và quản lý phê duyệt các đơn xin nghỉ.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Quản lý nghỉ phép"

**Tiền điều kiện:** Người dùng đã đăng nhập vào hệ thống

**Luồng sự kiện chính:**
1. Đối với nhân viên:
   - Hệ thống hiển thị form xin nghỉ phép
   - Nhân viên nhập thông tin nghỉ phép (loại phép, ngày bắt đầu, ngày kết thúc, lý do)
   - Nhân viên gửi đơn xin nghỉ phép
2. Đối với quản lý:
   - Hệ thống hiển thị danh sách đơn xin nghỉ phép chờ phê duyệt
   - Quản lý xem xét và phê duyệt/từ chối đơn xin nghỉ phép

**Luồng sự kiện thay thế:**
1. Hủy đơn xin nghỉ phép:
   - Nhân viên chọn đơn xin nghỉ phép cần hủy
   - Nhân viên nhấn nút "Hủy đơn"
   - Hệ thống cập nhật trạng thái đơn
2. Xem lịch sử nghỉ phép:
   - Nhân viên hoặc quản lý chọn xem lịch sử nghỉ phép
   - Hệ thống hiển thị danh sách các đơn xin nghỉ phép đã tạo/phê duyệt

**Hậu điều kiện:** Thông tin nghỉ phép được cập nhật trong hệ thống và ảnh hưởng đến dữ liệu chấm công.

## 6. Chức năng Quản lý lương
**Minh họa về use case Quản lý lương**

**Tác nhân:** Admin, Quản lý nhân sự, Kế toán

**Mô tả:** Chức năng cho phép quản lý thông tin lương, tính lương và chi trả lương cho nhân viên.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Quản lý lương"

**Tiền điều kiện:** Người dùng đã đăng nhập với quyền Admin, Quản lý nhân sự hoặc Kế toán

**Luồng sự kiện chính:**
1. Hệ thống hiển thị danh sách lương của nhân viên.
2. Người dùng có thể thực hiện các thao tác:
   - Xem chi tiết lương của từng nhân viên
   - Tính toán lương (dựa trên dữ liệu chấm công, phụ cấp, thưởng/phạt)
   - Xuất báo cáo lương

**Luồng sự kiện thay thế:**
1. Điều chỉnh lương:
   - Quản lý chọn nhân viên cần điều chỉnh lương
   - Nhập thông tin điều chỉnh và lý do
   - Lưu thay đổi vào hệ thống
2. Xuất báo cáo lương theo bộ phận:
   - Quản lý chọn bộ phận cần xuất báo cáo
   - Hệ thống tạo báo cáo lương cho bộ phận đó

**Hậu điều kiện:** Thông tin lương được cập nhật và lưu trữ trong hệ thống.

## 7. Chức năng Feed (Tin tức nội bộ)
**Minh họa về use case Feed**

**Tác nhân:** Admin, Quản lý, Nhân viên

**Mô tả:** Chức năng cho phép chia sẻ thông tin, thông báo trong công ty và phòng ban.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Feed"

**Tiền điều kiện:** Người dùng đã đăng nhập vào hệ thống

**Luồng sự kiện chính:**
1. Hệ thống hiển thị danh sách các bài đăng tin tức.
2. Người dùng có thể thực hiện các thao tác:
   - Xem các bài đăng tin tức
   - Tạo bài đăng mới (nếu có quyền)
   - Bình luận vào bài đăng
   - Chỉnh sửa/xóa bài đăng của mình

**Luồng sự kiện thay thế:**
1. Lọc tin tức theo phòng ban:
   - Người dùng chọn lọc tin tức theo phòng ban
   - Hệ thống hiển thị tin tức của phòng ban đã chọn
2. Đánh dấu tin đã đọc:
   - Người dùng đánh dấu tin đã đọc
   - Hệ thống cập nhật trạng thái đọc của tin

**Hậu điều kiện:** Thông tin tin tức được lưu trữ và cập nhật trong hệ thống.

## 8. Chức năng Nhật ký hoạt động
**Minh họa về use case Nhật ký hoạt động**

**Tác nhân:** Admin, Quản lý

**Mô tả:** Chức năng cho phép theo dõi và ghi lại các hoạt động của người dùng trong hệ thống.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Nhật ký hoạt động"

**Tiền điều kiện:** Người dùng đã đăng nhập với quyền Admin hoặc Quản lý

**Luồng sự kiện chính:**
1. Hệ thống hiển thị danh sách các hoạt động đã được ghi lại.
2. Người dùng có thể thực hiện các thao tác:
   - Xem chi tiết hoạt động
   - Lọc hoạt động theo loại
   - Tìm kiếm hoạt động theo người dùng
   - Xuất báo cáo nhật ký

**Luồng sự kiện thay thế:**
1. Lọc nhật ký theo thời gian:
   - Người dùng chọn khoảng thời gian cần xem
   - Hệ thống hiển thị nhật ký trong khoảng thời gian đó
2. Xem nhật ký theo module:
   - Người dùng chọn module cần xem nhật ký
   - Hệ thống hiển thị nhật ký của module đã chọn

**Hậu điều kiện:** Thông tin nhật ký hoạt động được hiển thị cho người dùng.

## 9. Chức năng Báo cáo thống kê
**Minh họa về use case Báo cáo thống kê**

**Tác nhân:** Admin, Quản lý nhân sự, Quản lý

**Mô tả:** Chức năng cho phép tạo và xem các báo cáo thống kê về nhân sự, lương, chấm công, hiệu suất.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Báo cáo thống kê"

**Tiền điều kiện:** Người dùng đã đăng nhập với quyền phù hợp

**Luồng sự kiện chính:**
1. Hệ thống hiển thị danh sách các loại báo cáo.
2. Người dùng chọn loại báo cáo cần xem:
   - Báo cáo nhân sự
   - Báo cáo lương
   - Báo cáo chấm công
   - Báo cáo nghỉ phép
3. Hệ thống hiển thị báo cáo tương ứng với các biểu đồ, số liệu.

**Luồng sự kiện thay thế:**
1. Tùy chỉnh báo cáo:
   - Người dùng chọn các thông số cần hiển thị
   - Chọn khoảng thời gian cần báo cáo
   - Hệ thống tạo báo cáo tùy chỉnh
2. Xuất báo cáo:
   - Người dùng chọn định dạng xuất (PDF, Excel, CSV)
   - Hệ thống tạo file báo cáo và cho phép tải xuống

**Hậu điều kiện:** Báo cáo thống kê được hiển thị hoặc xuất ra file.

## 10. Chức năng Quản lý tài khoản
**Minh họa về use case Quản lý tài khoản**

**Tác nhân:** Admin, Tất cả người dùng

**Mô tả:** Chức năng cho phép người dùng quản lý thông tin tài khoản cá nhân và admin quản lý tất cả tài khoản.

**Sự kiện kích hoạt chức năng:** Người dùng truy cập vào mục "Quản lý tài khoản"

**Tiền điều kiện:** Người dùng đã đăng nhập vào hệ thống

**Luồng sự kiện chính:**
1. Đối với người dùng thông thường:
   - Hệ thống hiển thị thông tin tài khoản cá nhân
   - Người dùng có thể cập nhật thông tin cá nhân
   - Người dùng có thể thay đổi mật khẩu
2. Đối với admin:
   - Hệ thống hiển thị danh sách tất cả tài khoản
   - Admin có thể tạo, sửa, khóa/mở tài khoản
   - Admin có thể phân quyền cho tài khoản

**Luồng sự kiện thay thế:**
1. Khôi phục mật khẩu:
   - Người dùng chọn "Quên mật khẩu"
   - Hệ thống gửi email khôi phục
   - Người dùng đặt lại mật khẩu mới
2. Cập nhật thông tin liên hệ:
   - Người dùng cập nhật thông tin liên hệ mới
   - Hệ thống gửi mã xác nhận
   - Người dùng xác nhận thay đổi

**Hậu điều kiện:** Thông tin tài khoản được cập nhật trong hệ thống. 