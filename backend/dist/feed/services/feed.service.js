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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feed_entity_1 = require("../entities/feed.entity");
const department_entity_1 = require("../../departments/entities/department.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const employee_entity_1 = require("../../employees/entities/employee.entity");
const enums_type_1 = require("../../common/types/enums.type");
let FeedService = class FeedService {
    feedRepository;
    departmentRepository;
    userRepository;
    employeeRepository;
    constructor(feedRepository, departmentRepository, userRepository, employeeRepository) {
        this.feedRepository = feedRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
    }
    async create(createFeedDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền tạo thông báo');
        }
        if (createFeedDto.departmentId) {
            const department = await this.departmentRepository.findOne({
                where: { id: createFeedDto.departmentId },
            });
            if (!department) {
                throw new common_1.NotFoundException('Không tìm thấy phòng ban');
            }
        }
        const feed = this.feedRepository.create({
            ...createFeedDto,
            createdById: userId,
        });
        return await this.feedRepository.save(feed);
    }
    async findAll(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        let feeds;
        if (user.role === enums_type_1.UserRole.ADMIN) {
            feeds = await this.feedRepository.find({
                where: { isActive: true },
                relations: ['createdBy', 'department'],
                order: {
                    isImportant: 'DESC',
                    timestamp: 'DESC',
                },
            });
        }
        else {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee) {
                throw new common_1.NotFoundException('Không tìm thấy thông tin nhân viên');
            }
            feeds = await this.feedRepository
                .createQueryBuilder('feed')
                .leftJoinAndSelect('feed.createdBy', 'createdBy')
                .leftJoinAndSelect('feed.department', 'department')
                .where('(feed.departmentId IS NULL OR feed.departmentId = :departmentId) AND feed.isActive = :isActive', {
                departmentId: employee.departmentId,
                isActive: true
            })
                .orderBy('feed.isImportant', 'DESC')
                .addOrderBy('feed.timestamp', 'DESC')
                .getMany();
        }
        return feeds;
    }
    async findByDepartment(departmentId, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
        });
        if (!department) {
            throw new common_1.NotFoundException('Không tìm thấy phòng ban');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee || employee.departmentId !== departmentId) {
                throw new common_1.BadRequestException('Bạn không có quyền xem thông báo của phòng ban này');
            }
        }
        const feeds = await this.feedRepository.find({
            where: {
                departmentId,
                isActive: true
            },
            relations: ['createdBy', 'department'],
            order: {
                isImportant: 'DESC',
                timestamp: 'DESC',
            },
        });
        return feeds;
    }
    async findOne(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        const feed = await this.feedRepository.findOne({
            where: { id },
            relations: ['createdBy', 'department'],
        });
        if (!feed) {
            throw new common_1.NotFoundException('Không tìm thấy thông báo');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN && feed.departmentId) {
            const employee = await this.employeeRepository.findOne({
                where: { email: user.email },
            });
            if (!employee || employee.departmentId !== feed.departmentId) {
                throw new common_1.BadRequestException('Bạn không có quyền xem thông báo này');
            }
        }
        return feed;
    }
    async update(id, updateFeedDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền cập nhật thông báo');
        }
        const feed = await this.feedRepository.findOne({
            where: { id },
        });
        if (!feed) {
            throw new common_1.NotFoundException('Không tìm thấy thông báo');
        }
        if (updateFeedDto.departmentId) {
            const department = await this.departmentRepository.findOne({
                where: { id: updateFeedDto.departmentId },
            });
            if (!department) {
                throw new common_1.NotFoundException('Không tìm thấy phòng ban');
            }
        }
        Object.assign(feed, updateFeedDto);
        return await this.feedRepository.save(feed);
    }
    async remove(id, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy người dùng');
        }
        if (user.role !== enums_type_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Bạn không có quyền xóa thông báo');
        }
        const feed = await this.feedRepository.findOne({
            where: { id },
        });
        if (!feed) {
            throw new common_1.NotFoundException('Không tìm thấy thông báo');
        }
        await this.feedRepository.softDelete(id);
        await this.feedRepository.update(id, { isActive: false });
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feed_entity_1.Feed)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FeedService);
//# sourceMappingURL=feed.service.js.map