"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payroll_entity_1 = require("../entities/payroll.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const enums_type_1 = require("../../common/types/enums.type");
const attendance_entity_1 = require("../../attendance/entities/attendance.entity");
const leave_entity_1 = require("../../leaves/entities/leave.entity");
const enums_type_2 = require("../../common/types/enums.type");
const payroll_bonus_entity_1 = require("../entities/payroll-bonus.entity");
let PayrollService = class PayrollService {
    payrollRepository;
    employeeRepository;
    userRepository;
    attendanceRepository;
    leaveRepository;
    payrollBonusRepository;
    constructor(payrollRepository, employeeRepository, userRepository, attendanceRepository, leaveRepository, payrollBonusRepository) {
        this.payrollRepository = payrollRepository;
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.attendanceRepository = attendanceRepository;
        this.leaveRepository = leaveRepository;
        this.payrollBonusRepository = payrollBonusRepository;
    }
    async create(createPayrollDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền tạo bảng lương');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: createPayrollDto.employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Nhân viên không tồn tại');
        }
        const existingPayroll = await this.payrollRepository.findOne({
            where: {
                employeeId: createPayrollDto.employeeId,
                month: createPayrollDto.month,
                year: createPayrollDto.year,
            },
        });
        if (existingPayroll) {
            throw new common_1.BadRequestException('Nhân viên đã có bảng lương trong tháng này');
        }
        const totalBonus = createPayrollDto.totalBonus || 0;
        const totalDeduction = createPayrollDto.totalDeduction || 0;
        const netSalary = createPayrollDto.baseSalary + totalBonus - totalDeduction;
        const payroll = this.payrollRepository.create({
            ...createPayrollDto,
            totalBonus,
            totalDeduction,
            netSalary,
        });
        return await this.payrollRepository.save(payroll);
    }
    async findAll(userId, query) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const where = {
            isActive: true
        };
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee) {
                throw new common_1.NotFoundException('Không tìm thấy thông tin nhân viên');
            }
            where.employeeId = employee.id;
        }
        else if (query.employeeId) {
            where.employeeId = query.employeeId;
        }
        if (query.month) {
            where.month = query.month;
        }
        if (query.year) {
            where.year = query.year;
        }
        if (query.minSalary && query.maxSalary) {
            where.netSalary = (0, typeorm_2.Between)(query.minSalary, query.maxSalary);
        }
        const payrolls = await this.payrollRepository.find({
            where,
            relations: ['employee'],
            order: {
                year: 'DESC',
                month: 'DESC',
            },
        });
        return payrolls;
    }
    async findOne(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const payroll = await this.payrollRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!payroll) {
            throw new common_1.NotFoundException('Không tìm thấy bảng lương');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee || employee.id !== payroll.employeeId) {
                throw new common_1.BadRequestException('Bạn không có quyền xem bảng lương này');
            }
        }
        return payroll;
    }
    async update(id, updatePayrollDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền cập nhật bảng lương');
        }
        const payroll = await this.payrollRepository.findOne({
            where: { id },
        });
        if (!payroll) {
            throw new common_1.NotFoundException('Không tìm thấy bảng lương');
        }
        Object.assign(payroll, updatePayrollDto);
        payroll.netSalary = payroll.baseSalary + payroll.totalBonus - payroll.totalDeduction;
        return await this.payrollRepository.save(payroll);
    }
    async remove(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền xóa bảng lương');
        }
        const payroll = await this.payrollRepository.findOne({
            where: { id },
        });
        if (!payroll) {
            throw new common_1.NotFoundException('Không tìm thấy bảng lương');
        }
        await this.payrollRepository.softDelete(id);
        await this.payrollRepository.update(id, { isActive: false });
    }
    async generateMonthlyPayrolls(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền tạo bảng lương hàng loạt');
        }
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const employees = await this.employeeRepository.find();
        const results = [];
        for (const employee of employees) {
            const existingPayroll = await this.payrollRepository.findOne({
                where: {
                    employeeId: employee.id,
                    month,
                    year,
                },
            });
            if (!existingPayroll) {
                const baseSalary = employee.salary;
                const totalBonus = 0;
                const socialInsurance = baseSalary * 0.08;
                const healthInsurance = baseSalary * 0.015;
                const unemploymentInsurance = baseSalary * 0.01;
                const personalIncomeTax = baseSalary * 0.05;
                const totalDeduction = socialInsurance + healthInsurance + unemploymentInsurance + personalIncomeTax;
                const netSalary = baseSalary + totalBonus - totalDeduction;
                const payroll = this.payrollRepository.create({
                    employeeId: employee.id,
                    month,
                    year,
                    baseSalary,
                    totalBonus,
                    socialInsurance,
                    healthInsurance,
                    unemploymentInsurance,
                    personalIncomeTax,
                    totalDeduction,
                    netSalary,
                    note: 'Tự động tạo',
                });
                const savedPayroll = await this.payrollRepository.save(payroll);
                results.push(savedPayroll);
            }
        }
        return results;
    }
    async calculateAttendanceBonus(employeeId, month, year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Không tìm thấy nhân viên');
        }
        const workingDays = this.calculateWorkingDaysInMonth(startDate, endDate);
        const attendances = await this.attendanceRepository.find({
            where: {
                employeeId,
                date: (0, typeorm_2.Between)(startDate, endDate),
            },
        });
        const approvedLeaves = await this.leaveRepository.find({
            where: {
                employeeId,
                status: enums_type_2.LeaveStatus.APPROVED,
                startDate: (0, typeorm_2.LessThanOrEqual)(endDate),
                endDate: (0, typeorm_2.MoreThanOrEqual)(startDate),
            },
        });
        const presentDays = attendances.filter(att => att.status === enums_type_2.AttendanceStatus.PRESENT && !att.isLate && !att.isEarlyLeave).length;
        let approvedLeaveDays = 0;
        for (const leave of approvedLeaves) {
            const leaveStartDate = leave.startDate < startDate ? startDate : leave.startDate;
            const leaveEndDate = leave.endDate > endDate ? endDate : leave.endDate;
            let currentDate = new Date(leaveStartDate);
            while (currentDate <= leaveEndDate) {
                if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                    approvedLeaveDays++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
        const validAttendanceDays = presentDays + approvedLeaveDays;
        if (validAttendanceDays >= workingDays) {
            return employee.salary * 0.1;
        }
        return 0;
    }
    calculateWorkingDaysInMonth(startDate, endDate) {
        let workingDays = 0;
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                workingDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return workingDays;
    }
    async generatePayroll(createPayrollDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền tạo bảng lương');
        }
        const employee = await this.employeeRepository.findOne({
            where: { id: createPayrollDto.employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException('Không tìm thấy nhân viên');
        }
        const existingPayroll = await this.payrollRepository.findOne({
            where: {
                employeeId: createPayrollDto.employeeId,
                month: createPayrollDto.month,
                year: createPayrollDto.year,
            },
        });
        if (existingPayroll) {
            throw new common_1.BadRequestException('Bảng lương đã tồn tại cho nhân viên trong tháng này');
        }
        const attendanceBonus = await this.calculateAttendanceBonus(createPayrollDto.employeeId, createPayrollDto.month, createPayrollDto.year);
        const payroll = this.payrollRepository.create({
            employeeId: createPayrollDto.employeeId,
            month: createPayrollDto.month,
            year: createPayrollDto.year,
            baseSalary: employee.salary,
            workingDays: createPayrollDto.workingDays || 0,
            standardWorkingDays: createPayrollDto.standardWorkingDays || 22,
            overtimeHours: createPayrollDto.overtimeHours || 0,
            overtimePay: createPayrollDto.overtimePay || 0,
            totalAllowance: createPayrollDto.totalAllowance || 0,
            totalBonus: attendanceBonus + (createPayrollDto.totalBonus || 0),
            totalDeduction: createPayrollDto.totalDeduction || 0,
            socialInsurance: createPayrollDto.socialInsurance || 0,
            healthInsurance: createPayrollDto.healthInsurance || 0,
            unemploymentInsurance: createPayrollDto.unemploymentInsurance || 0,
            personalIncomeTax: createPayrollDto.personalIncomeTax || 0,
            note: createPayrollDto.note,
            grossSalary: 0,
            netSalary: 0,
            isPaid: false,
        });
        payroll.grossSalary = payroll.baseSalary + payroll.totalAllowance + payroll.totalBonus + payroll.overtimePay;
        payroll.netSalary = payroll.grossSalary - payroll.totalDeduction -
            payroll.socialInsurance - payroll.healthInsurance -
            payroll.unemploymentInsurance - payroll.personalIncomeTax;
        const savedPayroll = await this.payrollRepository.save(payroll);
        if (attendanceBonus > 0) {
            const bonusEntity = new payroll_bonus_entity_1.PayrollBonus();
            bonusEntity.payrollId = savedPayroll.id;
            bonusEntity.name = 'Thưởng chuyên cần';
            bonusEntity.description = 'Thưởng cho việc đi làm đầy đủ trong tháng';
            bonusEntity.amount = attendanceBonus;
            bonusEntity.taxable = true;
            await this.payrollBonusRepository.save(bonusEntity);
        }
        return savedPayroll;
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_entity_1.Payroll)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __param(4, (0, typeorm_1.InjectRepository)(leave_entity_1.Leave)),
    __param(5, (0, typeorm_1.InjectRepository)(payroll_bonus_entity_1.PayrollBonus)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map