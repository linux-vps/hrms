-- Tạo các enum types
-- Enum cho giới tính
CREATE TYPE "employees_gender_enum" AS ENUM ('Nam', 'Nữ', 'Khác');

-- Enum cho vai trò nhân viên trong phòng ban
CREATE TYPE "employees_role_enum" AS ENUM ('Trưởng phòng', 'Thành viên');

-- Enum cho vai trò người dùng trong hệ thống
CREATE TYPE "users_role_enum" AS ENUM ('admin', 'employee');

-- Enum cho trạng thái chấm công
CREATE TYPE "attendances_status_enum" AS ENUM ('Có mặt', 'Vắng mặt', 'Nghỉ phép');

-- Enum cho loại nghỉ phép
CREATE TYPE "leaves_type_enum" AS ENUM ('Nghỉ phép', 'Nghỉ ốm', 'Nghỉ không lương', 'Khác');

-- Enum cho trạng thái nghỉ phép
CREATE TYPE "leaves_status_enum" AS ENUM ('Chờ duyệt', 'Đã duyệt', 'Từ chối');

-- Enum cho loại ca làm việc
CREATE TYPE "work_shifts_type_enum" AS ENUM ('Ca sáng', 'Ca chiều', 'Ca tối', 'Ca đêm', 'Cả ngày');

-- Tạo extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bảng phòng ban
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  description VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng nhân viên
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "firstName" VARCHAR NOT NULL,
  "lastName" VARCHAR NOT NULL,
  "dateOfBirth" VARCHAR,
  gender employees_gender_enum,
  address VARCHAR,
  email VARCHAR NOT NULL UNIQUE,
  phone VARCHAR,
  department_id UUID REFERENCES departments(id),
  position VARCHAR,
  salary DECIMAL(10,2) DEFAULT 0,
  role employees_role_enum DEFAULT 'Thành viên',
  "hireDate" DATE DEFAULT CURRENT_DATE,
  avatar VARCHAR DEFAULT 'default.jpg',
  leave_days_per_month DECIMAL(4,1) DEFAULT 5,
  remaining_leave_days DECIMAL(5,1) DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng người dùng
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  role users_role_enum DEFAULT 'employee',
  employee_id UUID REFERENCES employees(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng ca làm việc
CREATE TABLE work_shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  description TEXT,
  type work_shifts_type_enum DEFAULT 'Cả ngày',
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  break_start TIME,
  break_end TIME,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng chấm công
CREATE TABLE attendances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  date DATE NOT NULL,
  status attendances_status_enum DEFAULT 'Có mặt',
  note VARCHAR,
  work_shift_id UUID REFERENCES work_shifts(id),
  check_in_time TIME,
  check_out_time TIME,
  is_late BOOLEAN DEFAULT FALSE,
  is_early_leave BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng nghỉ phép
CREATE TABLE leaves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  type leaves_type_enum DEFAULT 'Nghỉ phép',
  "startDate" DATE NOT NULL,
  "endDate" DATE NOT NULL,
  days DECIMAL(3,1) NOT NULL,
  reason VARCHAR NOT NULL,
  status leaves_status_enum DEFAULT 'Chờ duyệt',
  approved_by UUID REFERENCES users(id),
  approval_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng lương
CREATE TABLE payrolls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID NOT NULL REFERENCES employees(id),
  month INT NOT NULL,
  year INT NOT NULL,
  "baseSalary" DECIMAL(15,2) DEFAULT 0,
  working_days DECIMAL(5,1) DEFAULT 0,
  standard_working_days DECIMAL(5,1) DEFAULT 22,
  overtime_hours DECIMAL(5,1) DEFAULT 0,
  overtime_pay DECIMAL(15,2) DEFAULT 0,
  "grossSalary" DECIMAL(15,2) DEFAULT 0,
  total_allowance DECIMAL(15,2) DEFAULT 0,
  total_bonus DECIMAL(15,2) DEFAULT 0,
  total_deduction DECIMAL(15,2) DEFAULT 0,
  social_insurance DECIMAL(15,2) DEFAULT 0,
  health_insurance DECIMAL(15,2) DEFAULT 0,
  unemployment_insurance DECIMAL(15,2) DEFAULT 0,
  personal_income_tax DECIMAL(15,2) DEFAULT 0,
  "netSalary" DECIMAL(15,2) DEFAULT 0,
  note TEXT,
  is_paid BOOLEAN DEFAULT FALSE,
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng phụ cấp lương
CREATE TABLE payroll_allowances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_id UUID NOT NULL REFERENCES payrolls(id),
  name VARCHAR NOT NULL,
  description TEXT,
  amount DECIMAL(15,2) DEFAULT 0,
  taxable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng thưởng
CREATE TABLE payroll_bonuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_id UUID NOT NULL REFERENCES payrolls(id),
  name VARCHAR NOT NULL,
  description TEXT,
  amount DECIMAL(15,2) DEFAULT 0,
  taxable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng khấu trừ lương
CREATE TABLE payroll_deductions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_id UUID NOT NULL REFERENCES payrolls(id),
  name VARCHAR NOT NULL,
  description TEXT,
  amount DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng nhật ký hoạt động
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR NOT NULL,
  "entityType" VARCHAR,
  "entityId" VARCHAR,
  details TEXT,
  "ipAddress" INET,
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Bảng thông báo
CREATE TABLE feeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES users(id),
  department_id UUID REFERENCES departments(id),
  "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "isImportant" BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
); 