"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkShiftType = exports.LeaveStatus = exports.LeaveType = exports.AttendanceStatus = exports.Gender = exports.DepartmentRole = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MANAGER"] = "manager";
    UserRole["EMPLOYEE"] = "employee";
})(UserRole || (exports.UserRole = UserRole = {}));
var DepartmentRole;
(function (DepartmentRole) {
    DepartmentRole["MANAGER"] = "Tr\u01B0\u1EDFng ph\u00F2ng";
    DepartmentRole["MEMBER"] = "Th\u00E0nh vi\u00EAn";
})(DepartmentRole || (exports.DepartmentRole = DepartmentRole = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "Nam";
    Gender["FEMALE"] = "N\u1EEF";
    Gender["OTHER"] = "Kh\u00E1c";
})(Gender || (exports.Gender = Gender = {}));
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENT"] = "C\u00F3 m\u1EB7t";
    AttendanceStatus["ABSENT"] = "V\u1EAFng m\u1EB7t";
    AttendanceStatus["LEAVE"] = "Ngh\u1EC9 ph\u00E9p";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
var LeaveType;
(function (LeaveType) {
    LeaveType["ANNUAL"] = "Ngh\u1EC9 ph\u00E9p";
    LeaveType["SICK"] = "Ngh\u1EC9 \u1ED1m";
    LeaveType["UNPAID"] = "Ngh\u1EC9 kh\u00F4ng l\u01B0\u01A1ng";
    LeaveType["OTHER"] = "Kh\u00E1c";
})(LeaveType || (exports.LeaveType = LeaveType = {}));
var LeaveStatus;
(function (LeaveStatus) {
    LeaveStatus["PENDING"] = "Ch\u1EDD duy\u1EC7t";
    LeaveStatus["APPROVED"] = "\u0110\u00E3 duy\u1EC7t";
    LeaveStatus["REJECTED"] = "T\u1EEB ch\u1ED1i";
})(LeaveStatus || (exports.LeaveStatus = LeaveStatus = {}));
var WorkShiftType;
(function (WorkShiftType) {
    WorkShiftType["MORNING"] = "Ca s\u00E1ng";
    WorkShiftType["AFTERNOON"] = "Ca chi\u1EC1u";
    WorkShiftType["EVENING"] = "Ca t\u1ED1i";
    WorkShiftType["NIGHT"] = "Ca \u0111\u00EAm";
    WorkShiftType["FULL_DAY"] = "C\u1EA3 ng\u00E0y";
})(WorkShiftType || (exports.WorkShiftType = WorkShiftType = {}));
//# sourceMappingURL=enums.type.js.map