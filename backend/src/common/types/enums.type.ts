/**
 * Định nghĩa các vai trò của người dùng
 */
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'employee',
}

/**
 * Định nghĩa các vai trò trong phòng ban
 */
export enum DepartmentRole {
  MANAGER = 'Trưởng phòng',
  MEMBER = 'Thành viên',
}

/**
 * Định nghĩa các giới tính
 */
export enum Gender {
  MALE = 'Nam',
  FEMALE = 'Nữ',
  OTHER = 'Khác',
}

/**
 * Định nghĩa trạng thái chấm công
 */
export enum AttendanceStatus {
  PRESENT = 'Có mặt',
  ABSENT = 'Vắng mặt',
  LEAVE = 'Nghỉ phép',
}

/**
 * Định nghĩa loại nghỉ phép
 */
export enum LeaveType {
  ANNUAL = 'Nghỉ phép',
  SICK = 'Nghỉ ốm',
  UNPAID = 'Nghỉ không lương',
  OTHER = 'Khác',
}

/**
 * Định nghĩa trạng thái yêu cầu nghỉ phép
 */
export enum LeaveStatus {
  PENDING = 'Chờ duyệt',
  APPROVED = 'Đã duyệt',
  REJECTED = 'Từ chối',
}

/**
 * Định nghĩa loại ca làm việc
 */
export enum WorkShiftType {
  MORNING = 'Ca sáng',
  AFTERNOON = 'Ca chiều',
  EVENING = 'Ca tối',
  NIGHT = 'Ca đêm',
  FULL_DAY = 'Cả ngày',
} 