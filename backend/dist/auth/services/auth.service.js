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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const enums_type_1 = require("../../common/types/enums.type");
let AuthService = class AuthService {
    userRepository;
    employeeRepository;
    jwtService;
    constructor(userRepository, employeeRepository, jwtService) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng.');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            employeeId: user.employeeId,
        };
        return {
            userId: user.id,
            employeeId: user.employeeId,
            role: user.role,
            token: this.jwtService.sign(payload),
        };
    }
    async register(registerDto) {
        const { email, password } = registerDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.BadRequestException('Email đã được sử dụng');
        }
        const existingEmployee = await this.employeeRepository.findOne({ where: { email } });
        if (existingEmployee) {
            return this.createUserForEmployee(existingEmployee.id, email, password, enums_type_1.UserRole.EMPLOYEE);
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const employee = this.employeeRepository.create({
                email,
                firstName: '',
                lastName: '',
            });
            await this.employeeRepository.save(employee);
            const user = this.userRepository.create({
                email,
                password: hashedPassword,
                role: enums_type_1.UserRole.EMPLOYEE,
                employeeId: employee.id,
            });
            await this.userRepository.save(user);
            return {
                message: 'Đăng ký tài khoản thành công',
                userId: user.id,
                employeeId: employee.id,
            };
        }
    }
    async createUserForEmployee(employeeId, email, password, role = enums_type_1.UserRole.EMPLOYEE) {
        const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
        if (!employee) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID ${employeeId}`);
        }
        const existingUser = await this.userRepository.findOne({ where: { employeeId } });
        if (existingUser) {
            throw new common_1.BadRequestException(`Nhân viên đã có tài khoản`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role,
            employeeId,
        });
        await this.userRepository.save(user);
        return {
            message: 'Tạo tài khoản cho nhân viên thành công',
            userId: user.id,
            employeeId,
        };
    }
    async createAdminUser(email, password, employeeId) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.BadRequestException('Email đã được sử dụng');
        }
        if (employeeId) {
            const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
            if (!employee) {
                throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID ${employeeId}`);
            }
            const existingUserForEmployee = await this.userRepository.findOne({ where: { employeeId } });
            if (existingUserForEmployee) {
                throw new common_1.BadRequestException(`Nhân viên đã có tài khoản`);
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            role: enums_type_1.UserRole.ADMIN,
            employeeId,
        });
        await this.userRepository.save(user);
        return {
            message: 'Tạo tài khoản Admin thành công',
            userId: user.id,
            employeeId,
        };
    }
    async getUserProfile(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['employee'],
        });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map