-- Tạo extension UUID nếu chưa có
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Xóa các constraints để tránh lỗi khi insert
SET session_replication_role = 'replica';

-- ===== Dữ liệu mẫu cho phòng ban =====
INSERT INTO departments (id, name, description, is_active)
VALUES
  ('c5ca7414-6226-4a43-8574-9527e26d7da0', 'Ban giám đốc', 'Quản lý cấp cao của công ty', true),
  ('b056e8cb-55fd-4f1a-b5c6-63c1bf9939ab', 'Phòng nhân sự', 'Quản lý nhân sự và tuyển dụng', true),
  ('a73d4e7c-173e-4907-bf34-af01ee0e5970', 'Phòng công nghệ', 'Phát triển và duy trì hệ thống CNTT', true),
  ('9e82dcc3-8d2f-4106-8c80-9df39c3a67e6', 'Phòng kế toán', 'Quản lý tài chính và kế toán', true),
  ('f4b340a1-03f9-47d0-9ce6-27b1859e523d', 'Phòng kinh doanh', 'Phát triển kinh doanh và bán hàng', true);

-- ===== Dữ liệu mẫu cho nhân viên =====
INSERT INTO employees (id, "firstName", "lastName", "dateOfBirth", gender, address, email, phone, department_id, position, salary, role, "hireDate", avatar, leave_days_per_month, remaining_leave_days)
VALUES
  ('d3ec38f3-eb97-4a7b-b9bf-e41f5d495bcf', 'Nguyễn', 'Anh', '1980-05-15', 'Nam', 'Hà Nội', 'anh.nguyen@example.com', '0901234567', 'c5ca7414-6226-4a43-8574-9527e26d7da0', 'Giám đốc', 50000000, 'Trưởng phòng', '2020-01-01', 'default.jpg', 5, 10),
  ('c7d84e3b-d397-4e39-9508-dae3b41912a3', 'Trần', 'Bình', '1985-08-20', 'Nam', 'Hồ Chí Minh', 'binh.tran@example.com', '0912345678', 'b056e8cb-55fd-4f1a-b5c6-63c1bf9939ab', 'Trưởng phòng nhân sự', 30000000, 'Trưởng phòng', '2020-03-15', 'default.jpg', 5, 7),
  ('e89f590d-fb65-4e0e-bad2-41fa08ad8da4', 'Lê', 'Châu', '1990-10-25', 'Nữ', 'Đà Nẵng', 'chau.le@example.com', '0923456789', 'a73d4e7c-173e-4907-bf34-af01ee0e5970', 'Trưởng phòng công nghệ', 35000000, 'Trưởng phòng', '2020-05-10', 'default.jpg', 5, 8),
  ('f2e3a23c-13c7-4bea-b249-1be7841e062c', 'Phạm', 'Dũng', '1988-12-30', 'Nam', 'Hải Phòng', 'dung.pham@example.com', '0934567890', '9e82dcc3-8d2f-4106-8c80-9df39c3a67e6', 'Trưởng phòng kế toán', 28000000, 'Trưởng phòng', '2020-07-20', 'default.jpg', 5, 6),
  ('0e20e5c9-7c4a-4b5b-9205-5210b6f7341a', 'Hoàng', 'Giang', '1992-03-05', 'Nữ', 'Nha Trang', 'giang.hoang@example.com', '0945678901', 'f4b340a1-03f9-47d0-9ce6-27b1859e523d', 'Trưởng phòng kinh doanh', 32000000, 'Trưởng phòng', '2021-01-10', 'default.jpg', 5, 9),
  ('1a2c5ed7-46b2-4a0b-a27a-0b7e3c209dda', 'Vũ', 'Hương', '1991-07-12', 'Nữ', 'Cần Thơ', 'huong.vu@example.com', '0956789012', 'b056e8cb-55fd-4f1a-b5c6-63c1bf9939ab', 'Chuyên viên nhân sự', 15000000, 'Thành viên', '2021-03-25', 'default.jpg', 5, 5),
  ('2b3d6fe8-57c3-4b1c-b38b-1c8f4d21e8eb', 'Đỗ', 'Khoa', '1993-09-18', 'Nam', 'Huế', 'khoa.do@example.com', '0967890123', 'a73d4e7c-173e-4907-bf34-af01ee0e5970', 'Lập trình viên', 18000000, 'Thành viên', '2021-05-15', 'default.jpg', 5, 5),
  ('3c4e7gf9-68d4-4c2d-c49c-2d9f5e32f9fc', 'Ngô', 'Lan', '1995-11-22', 'Nữ', 'Vũng Tàu', 'lan.ngo@example.com', '0978901234', 'a73d4e7c-173e-4907-bf34-af01ee0e5970', 'Kiểm thử viên', 16000000, 'Thành viên', '2021-08-05', 'default.jpg', 5, 5),
  ('4d5f8hg0-79e5-5d3e-d50d-3e0g6f43g0gd', 'Trịnh', 'Minh', '1994-01-28', 'Nam', 'Thanh Hóa', 'minh.trinh@example.com', '0989012345', '9e82dcc3-8d2f-4106-8c80-9df39c3a67e6', 'Kế toán viên', 14000000, 'Thành viên', '2021-10-20', 'default.jpg', 5, 5),
  ('5e6g9ih1-80f6-6e4f-e61e-4f1h7g54h1he', 'Lý', 'Nam', '1996-04-02', 'Nam', 'Vinh', 'nam.ly@example.com', '0990123456', 'f4b340a1-03f9-47d0-9ce6-27b1859e523d', 'Nhân viên kinh doanh', 15000000, 'Thành viên', '2022-01-15', 'default.jpg', 5, 5);

-- ===== Dữ liệu mẫu cho người dùng =====
INSERT INTO users (id, email, password, role, employee_id, is_active)
VALUES
  ('a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'admin@example.com', '$2b$10$NZZpj2Vw3QCUkHCXc9I3JuQmRnNNrH0qXXpnGrOW1FwJyG8NMxFTO', 'admin', null, true), -- password: admin123
  ('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'anh.nguyen@example.com', '$2b$10$NZZpj2Vw3QCUkHCXc9I3JuQmRnNNrH0qXXpnGrOW1FwJyG8NMxFTO', 'employee', 'd3ec38f3-eb97-4a7b-b9bf-e41f5d495bcf', true), -- password: admin123
  ('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'binh.tran@example.com', '$2b$10$NZZpj2Vw3QCUkHCXc9I3JuQmRnNNrH0qXXpnGrOW1FwJyG8NMxFTO', 'employee', 'c7d84e3b-d397-4e39-9508-dae3b41912a3', true), -- password: admin123
  ('d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9', 'chau.le@example.com', '$2b$10$NZZpj2Vw3QCUkHCXc9I3JuQmRnNNrH0qXXpnGrOW1FwJyG8NMxFTO', 'employee', 'e89f590d-fb65-4e0e-bad2-41fa08ad8da4', true), -- password: admin123
  ('e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0', 'dung.pham@example.com', '$2b$10$NZZpj2Vw3QCUkHCXc9I3JuQmRnNNrH0qXXpnGrOW1FwJyG8NMxFTO', 'employee', 'f2e3a23c-13c7-4bea-b249-1be7841e062c', true), -- password: admin123
  ('f6g7h8i9-j0k1-l2m3-n4o5-p6q7r8s9t0u1', 'giang.hoang@example.com', '$2b$10$NZZpj2Vw3QCUkHCXc9I3JuQmRnNNrH0qXXpnGrOW1FwJyG8NMxFTO', 'employee', '0e20e5c9-7c4a-4b5b-9205-5210b6f7341a', true); -- password: admin123

-- ===== Dữ liệu mẫu cho ca làm việc =====
INSERT INTO work_shifts (id, name, description, type, start_time, end_time, break_start, break_end, active)
VALUES
  ('a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5', 'Ca sáng', 'Ca làm việc buổi sáng', 'Ca sáng', '08:00:00', '12:00:00', NULL, NULL, true),
  ('b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 'Ca chiều', 'Ca làm việc buổi chiều', 'Ca chiều', '13:30:00', '17:30:00', NULL, NULL, true),
  ('c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7', 'Ca đêm', 'Ca làm việc buổi tối', 'Ca đêm', '19:00:00', '23:00:00', NULL, NULL, true),
  ('d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', 'Cả ngày', 'Ca làm việc cả ngày', 'Cả ngày', '08:00:00', '17:00:00', '12:00:00', '13:00:00', true);

-- ===== Dữ liệu mẫu cho chấm công =====
INSERT INTO attendances (id, employee_id, date, status, note, work_shift_id, check_in_time, check_out_time, is_late, is_early_leave)
VALUES
  ('a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'd3ec38f3-eb97-4a7b-b9bf-e41f5d495bcf', '2023-08-01', 'Có mặt', NULL, 'd3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', '08:05:00', '17:00:00', true, false),
  ('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'c7d84e3b-d397-4e39-9508-dae3b41912a3', '2023-08-01', 'Có mặt', NULL, 'd3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', '07:55:00', '17:05:00', false, false),
  ('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'e89f590d-fb65-4e0e-bad2-41fa08ad8da4', '2023-08-01', 'Có mặt', NULL, 'd3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', '08:00:00', '17:00:00', false, false),
  ('d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9', 'f2e3a23c-13c7-4bea-b249-1be7841e062c', '2023-08-01', 'Vắng mặt', 'Đi công tác', NULL, NULL, NULL, false, false),
  ('e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0', '0e20e5c9-7c4a-4b5b-9205-5210b6f7341a', '2023-08-01', 'Có mặt', NULL, 'd3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', '08:10:00', '16:30:00', true, true);

-- ===== Dữ liệu mẫu cho nghỉ phép =====
INSERT INTO leaves (id, employee_id, type, "startDate", "endDate", days, reason, status, approved_by, approval_date)
VALUES
  ('a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5', 'd3ec38f3-eb97-4a7b-b9bf-e41f5d495bcf', 'Nghỉ phép', '2023-08-10', '2023-08-11', 2, 'Nghỉ phép cá nhân', 'Đã duyệt', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', '2023-08-05 10:00:00'),
  ('b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 'c7d84e3b-d397-4e39-9508-dae3b41912a3', 'Nghỉ ốm', '2023-08-15', '2023-08-16', 2, 'Bị cảm', 'Đã duyệt', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', '2023-08-14 09:00:00'),
  ('c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7', 'e89f590d-fb65-4e0e-bad2-41fa08ad8da4', 'Nghỉ phép', '2023-08-20', '2023-08-20', 1, 'Việc gia đình', 'Chờ duyệt', NULL, NULL),
  ('d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', 'f2e3a23c-13c7-4bea-b249-1be7841e062c', 'Nghỉ không lương', '2023-08-25', '2023-08-27', 3, 'Du lịch cá nhân', 'Từ chối', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', '2023-08-20 14:00:00');

-- ===== Dữ liệu mẫu cho bảng lương =====
INSERT INTO payrolls (id, employee_id, month, year, "baseSalary", working_days, standard_working_days, overtime_hours, overtime_pay, "grossSalary", total_allowance, total_bonus, total_deduction, social_insurance, health_insurance, unemployment_insurance, personal_income_tax, "netSalary", note, is_paid, payment_date)
VALUES
  ('a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'd3ec38f3-eb97-4a7b-b9bf-e41f5d495bcf', 7, 2023, 50000000, 22, 22, 0, 0, 50000000, 5000000, 1000000, 0, 4000000, 750000, 500000, 3000000, 47750000, 'Lương tháng 7/2023', true, '2023-08-05 10:00:00'),
  ('b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'c7d84e3b-d397-4e39-9508-dae3b41912a3', 7, 2023, 30000000, 21, 22, 2, 500000, 30000000, 3000000, 0, 0, 2400000, 450000, 300000, 1000000, 29350000, 'Lương tháng 7/2023', true, '2023-08-05 10:00:00'),
  ('c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'e89f590d-fb65-4e0e-bad2-41fa08ad8da4', 7, 2023, 35000000, 22, 22, 5, 1000000, 36000000, 3500000, 2000000, 0, 2800000, 525000, 350000, 1500000, 36325000, 'Lương tháng 7/2023', true, '2023-08-05 10:00:00'),
  ('d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9', 'f2e3a23c-13c7-4bea-b249-1be7841e062c', 7, 2023, 28000000, 20, 22, 0, 0, 25454545, 2800000, 0, 500000, 2240000, 420000, 280000, 800000, 24014545, 'Lương tháng 7/2023', true, '2023-08-05 10:00:00'),
  ('e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0', '0e20e5c9-7c4a-4b5b-9205-5210b6f7341a', 7, 2023, 32000000, 22, 22, 3, 750000, 32750000, 3200000, 1500000, 0, 2560000, 480000, 320000, 1200000, 33440000, 'Lương tháng 7/2023', true, '2023-08-05 10:00:00');

-- ===== Dữ liệu mẫu cho phụ cấp =====
INSERT INTO payroll_allowances (id, payroll_id, name, description, amount, taxable)
VALUES
  ('a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'Phụ cấp chức vụ', 'Phụ cấp cho vị trí giám đốc', 3000000, true),
  ('b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'Phụ cấp đi lại', 'Phụ cấp đi lại', 2000000, false),
  ('c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7', 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'Phụ cấp chức vụ', 'Phụ cấp cho vị trí trưởng phòng', 2000000, true),
  ('d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'Phụ cấp ăn trưa', 'Phụ cấp ăn trưa', 1000000, false),
  ('e4f5g6h7-i8j9-k0l1-m2n3-o4p5q6r7s8t9', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'Phụ cấp chức vụ', 'Phụ cấp cho vị trí trưởng phòng', 2000000, true),
  ('f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u0', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'Phụ cấp điện thoại', 'Phụ cấp điện thoại', 500000, false),
  ('g6h7i8j9-k0l1-m2n3-o4p5-q6r7s8t9u0v1', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'Phụ cấp đi lại', 'Phụ cấp đi lại', 1000000, false);

-- ===== Dữ liệu mẫu cho thưởng =====
INSERT INTO payroll_bonuses (id, payroll_id, name, description, amount, taxable)
VALUES
  ('a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'Thưởng dự án', 'Hoàn thành dự án đúng tiến độ', 1000000, true),
  ('b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'Thưởng dự án', 'Hoàn thành dự án A đúng tiến độ', 1000000, true),
  ('c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'Thưởng chuyên cần', 'Đi làm đầy đủ trong tháng', 1000000, true),
  ('d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', 'e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0', 'Thưởng doanh số', 'Đạt doanh số tháng 7/2023', 1500000, true);

-- ===== Dữ liệu mẫu cho khấu trừ =====
INSERT INTO payroll_deductions (id, payroll_id, name, description, amount)
VALUES
  ('a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5', 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9', 'Phạt đi muộn', 'Đi muộn 3 lần trong tháng', 300000),
  ('b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9', 'Phạt về sớm', 'Về sớm 2 lần trong tháng', 200000);

-- ===== Dữ liệu mẫu cho nhật ký hoạt động =====
INSERT INTO activity_logs (id, user_id, action, "entityType", "entityId", details, "ipAddress", "timestamp")
VALUES
  ('a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'Đăng nhập', NULL, NULL, 'Đăng nhập vào hệ thống', '192.168.1.1', '2023-08-01 08:00:00'),
  ('b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', 'Tạo mới', 'Employee', 'd3ec38f3-eb97-4a7b-b9bf-e41f5d495bcf', 'Thêm nhân viên mới', '192.168.1.1', '2023-08-01 09:30:00'),
  ('c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7', 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'Đăng nhập', NULL, NULL, 'Đăng nhập vào hệ thống', '192.168.1.2', '2023-08-01 10:00:00'),
  ('d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', 'Cập nhật', 'Employee', 'c7d84e3b-d397-4e39-9508-dae3b41912a3', 'Cập nhật thông tin cá nhân', '192.168.1.2', '2023-08-01 10:15:00'),
  ('e4f5g6h7-i8j9-k0l1-m2n3-o4p5q6r7s8t9', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'Đăng nhập', NULL, NULL, 'Đăng nhập vào hệ thống', '192.168.1.3', '2023-08-01 13:00:00'),
  ('f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u0', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', 'Tạo mới', 'Leave', 'c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7', 'Đăng ký nghỉ phép', '192.168.1.3', '2023-08-01 13:30:00');

-- ===== Dữ liệu mẫu cho thông báo =====
INSERT INTO feeds (id, title, content, created_by, department_id, "timestamp", "isImportant")
VALUES
  ('a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5', 'Thông báo lịch họp tháng 8', 'Lịch họp hàng tháng sẽ được tổ chức vào ngày 05/08/2023 lúc 9:00 sáng tại phòng họp lớn. Đề nghị tất cả trưởng phòng và nhân viên tham dự.', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', NULL, '2023-08-01 08:30:00', true),
  ('b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q6', 'Thông báo nghỉ lễ Quốc khánh 2/9', 'Công ty sẽ nghỉ lễ Quốc khánh từ ngày 02/09/2023 đến hết ngày 04/09/2023. Nhân viên quay trở lại làm việc vào ngày 05/09/2023.', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', NULL, '2023-08-15 10:00:00', true),
  ('c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r7', 'Đội phát triển phần mềm A cần tuyển thêm thành viên', 'Đội phát triển phần mềm A cần tuyển thêm 2 lập trình viên Frontend và 1 lập trình viên Backend. Đề nghị các trưởng phòng giới thiệu ứng viên phù hợp.', 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9', 'a73d4e7c-173e-4907-bf34-af01ee0e5970', '2023-08-20 14:00:00', false),
  ('d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s8', 'Thông báo thay đổi chính sách nghỉ phép', 'Từ tháng 9/2023, công ty sẽ áp dụng chính sách nghỉ phép mới. Mỗi nhân viên sẽ được cộng thêm 1 ngày phép mỗi tháng.', 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', NULL, '2023-08-25 09:00:00', true),
  ('e4f5g6h7-i8j9-k0l1-m2n3-o4p5q6r7s8t9', 'Kế hoạch kinh doanh quý 4/2023', 'Phòng kinh doanh vui lòng chuẩn bị báo cáo kế hoạch kinh doanh quý 4/2023 và gửi về ban giám đốc trước ngày 15/09/2023.', 'e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0', 'f4b340a1-03f9-47d0-9ce6-27b1859e523d', '2023-08-30 15:30:00', false);

-- Khôi phục chế độ xác thực ràng buộc
SET session_replication_role = 'origin'; 