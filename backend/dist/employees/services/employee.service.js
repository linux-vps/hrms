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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("../entities/employee.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const pagination_dto_1 = require("../../common/dtos/pagination.dto");
const user_entity_1 = require("../../auth/entities/user.entity");
const bcrypt = require("bcrypt");
const enums_type_1 = require("../../common/types/enums.type");
let EmployeeService = class EmployeeService {
    employeeRepository;
    departmentRepository;
    userRepository;
    constructor(employeeRepository, departmentRepository, userRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }
    async findAll(paginationDto, search) {
        const whereClause = search
            ? [
                { firstName: (0, typeorm_2.ILike)(`%${search}%`) },
                { lastName: (0, typeorm_2.ILike)(`%${search}%`) },
                { email: (0, typeorm_2.ILike)(`%${search}%`) },
            ]
            : {};
        const offset = paginationDto.offset();
        const [employees, totalItems] = await this.employeeRepository.findAndCount({
            where: whereClause,
            relations: ['department'],
            skip: offset,
            take: paginationDto.limit,
        });
        return new pagination_dto_1.PaginatedResultDto(employees, totalItems, paginationDto);
    }
    async findById(id) {
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: ['department'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID ${id}`);
        }
        return employee;
    }
    async create(createEmployeeDto, createAccount = false) {
        const { email, departmentId, ...employeeData } = createEmployeeDto;
        const existingEmployee = await this.employeeRepository.findOne({
            where: { email },
        });
        if (existingEmployee) {
            throw new common_1.BadRequestException(`Email ${email} đã được sử dụng`);
        }
        if (departmentId) {
            const department = await this.departmentRepository.findOne({
                where: { id: departmentId },
            });
            if (!department) {
                throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID ${departmentId}`);
            }
        }
        const employee = this.employeeRepository.create({
            ...employeeData,
            email,
            departmentId,
        });
        const savedEmployee = await this.employeeRepository.save(employee);
        if (createAccount && email) {
            const defaultPassword = `${email.split('@')[0]}${savedEmployee.firstName}${savedEmployee.lastName}`;
            await this.createUserAccountForEmployee(savedEmployee.id, email, defaultPassword);
        }
        return savedEmployee;
    }
    async update(id, updateEmployeeDto) {
        const { departmentId, ...updateData } = updateEmployeeDto;
        const employee = await this.findById(id);
        if (departmentId) {
            const department = await this.departmentRepository.findOne({
                where: { id: departmentId },
            });
            if (!department) {
                throw new common_1.NotFoundException(`Không tìm thấy phòng ban với ID ${departmentId}`);
            }
        }
        const updatedEmployee = {
            ...employee,
            ...updateData,
            departmentId: departmentId || employee.departmentId,
        };
        if (updateData.dateOfBirth && typeof updateData.dateOfBirth === 'string') {
            updatedEmployee.dateOfBirth = updateData.dateOfBirth;
        }
        if (updateData.hireDate && typeof updateData.hireDate === 'string') {
            updatedEmployee.hireDate = new Date(updateData.hireDate);
        }
        if (updateData.salary !== undefined) {
            updatedEmployee.salary = Number(updateData.salary);
        }
        if (updateData.leaveDaysPerMonth !== undefined) {
            updatedEmployee.leaveDaysPerMonth = Number(updateData.leaveDaysPerMonth);
        }
        if (updateData.remainingLeaveDays !== undefined) {
            updatedEmployee.remainingLeaveDays = Number(updateData.remainingLeaveDays);
        }
        return this.employeeRepository.save(updatedEmployee);
    }
    async updateSalary(id, updateSalaryDto) {
        const { salary } = updateSalaryDto;
        const employee = await this.findById(id);
        employee.salary = salary;
        return this.employeeRepository.save(employee);
    }
    async delete(id) {
        const employee = await this.findById(id);
        const user = await this.userRepository.findOne({ where: { employeeId: id } });
        if (user) {
            await this.userRepository.remove(user);
        }
        await this.employeeRepository.softDelete(id);
        return { id, success: true };
    }
    async updateAvatar(id, avatar) {
        const employee = await this.findById(id);
        employee.avatar = avatar;
        return this.employeeRepository.save(employee);
    }
    async createUserAccountForEmployee(employeeId, email, password, role = enums_type_1.UserRole.EMPLOYEE) {
        const employee = await this.findById(employeeId);
        const existingUser = await this.userRepository.findOne({ where: { employeeId } });
        if (existingUser) {
            throw new common_1.BadRequestException(`Nhân viên đã có tài khoản`);
        }
        const userWithEmail = await this.userRepository.findOne({ where: { email } });
        if (userWithEmail) {
            throw new common_1.BadRequestException(`Email ${email} đã được sử dụng cho tài khoản khác`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role,
            employeeId,
        });
        return this.userRepository.save(user);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map