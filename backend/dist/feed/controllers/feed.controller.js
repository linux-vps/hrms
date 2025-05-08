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
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const feed_service_1 = require("../services/feed.service");
const feed_dto_1 = require("../dtos/feed.dto");
const api_response_dto_1 = require("../../common/dtos/api-response.dto");
const activity_logger_interceptor_1 = require("../../common/interceptors/activity-logger.interceptor");
let FeedController = class FeedController {
    feedService;
    constructor(feedService) {
        this.feedService = feedService;
    }
    async create(createFeedDto, req) {
        const userId = req.user.id;
        const feed = await this.feedService.create(createFeedDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Tạo thông báo thành công', feed);
    }
    async findAll(req) {
        const userId = req.user.id;
        const feeds = await this.feedService.findAll(userId);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách thông báo thành công', feeds);
    }
    async findByDepartment(departmentId, req) {
        const userId = req.user.id;
        const feeds = await this.feedService.findByDepartment(departmentId, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy danh sách thông báo theo phòng ban thành công', feeds);
    }
    async findOne(id, req) {
        const userId = req.user.id;
        const feed = await this.feedService.findOne(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Lấy thông tin thông báo thành công', feed);
    }
    async update(id, updateFeedDto, req) {
        const userId = req.user.id;
        const feed = await this.feedService.update(id, updateFeedDto, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Cập nhật thông tin thông báo thành công', feed);
    }
    async remove(id, req) {
        const userId = req.user.id;
        await this.feedService.remove(id, userId);
        return (0, api_response_dto_1.createSuccessResponse)('Xóa thông báo thành công');
    }
};
exports.FeedController = FeedController;
__decorate([
    (0, common_1.Post)(),
    (0, activity_logger_interceptor_1.LogActivity)('Tạo thông báo', 'Feed'),
    (0, swagger_1.ApiOperation)({ summary: 'Tạo thông báo mới' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Tạo thông báo thành công',
        type: feed_dto_1.FeedResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [feed_dto_1.CreateFeedDto, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách thông báo' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách thông báo thành công',
        type: [feed_dto_1.FeedResponseDto],
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('department/:departmentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách thông báo theo phòng ban' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy danh sách thông báo theo phòng ban thành công',
        type: [feed_dto_1.FeedResponseDto],
    }),
    __param(0, (0, common_1.Param)('departmentId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "findByDepartment", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy thông tin thông báo theo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lấy thông tin thông báo thành công',
        type: feed_dto_1.FeedResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, activity_logger_interceptor_1.LogActivity)('Cập nhật thông báo', 'Feed'),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật thông tin thông báo' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cập nhật thông tin thông báo thành công',
        type: feed_dto_1.FeedResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, feed_dto_1.UpdateFeedDto, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, activity_logger_interceptor_1.LogActivity)('Xóa thông báo', 'Feed'),
    (0, swagger_1.ApiOperation)({ summary: 'Xóa thông báo' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Xóa thông báo thành công',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "remove", null);
exports.FeedController = FeedController = __decorate([
    (0, swagger_1.ApiTags)('Bảng thông báo'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('feed'),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedController);
//# sourceMappingURL=feed.controller.js.map