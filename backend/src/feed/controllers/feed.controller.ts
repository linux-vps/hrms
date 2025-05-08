import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedService } from '../services/feed.service';
import { CreateFeedDto, UpdateFeedDto, FeedResponseDto } from '../dtos/feed.dto';
import { Request } from 'express';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { LogActivity } from 'src/common/interceptors/activity-logger.interceptor';

/**
 * Controller xử lý thông báo (Feed)
 */
@ApiTags('Bảng thông báo')
@ApiBearerAuth('JWT-auth')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  /**
   * Tạo thông báo mới
   * @param createFeedDto Thông tin thông báo
   * @param req Request object
   * @returns Thông tin thông báo đã tạo
   */
  @Post()
  @LogActivity('Tạo thông báo', 'Feed')
  @ApiOperation({ summary: 'Tạo thông báo mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo thông báo thành công',
    type: FeedResponseDto,
  })
  async create(@Body() createFeedDto: CreateFeedDto, @Req() req: Request) {
    const userId = (req as any).user.id;
    const feed = await this.feedService.create(createFeedDto, userId);
    return createSuccessResponse('Tạo thông báo thành công', feed);
  }

  /**
   * Lấy danh sách thông báo
   * @param req Request object
   * @returns Danh sách thông báo
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thông báo' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách thông báo thành công',
    type: [FeedResponseDto],
  })
  async findAll(@Req() req: Request) {
    const userId = (req as any).user.id;
    const feeds = await this.feedService.findAll(userId);
    return createSuccessResponse('Lấy danh sách thông báo thành công', feeds);
  }

  /**
   * Lấy danh sách thông báo theo phòng ban
   * @param departmentId ID phòng ban
   * @param req Request object
   * @returns Danh sách thông báo
   */
  @Get('department/:departmentId')
  @ApiOperation({ summary: 'Lấy danh sách thông báo theo phòng ban' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách thông báo theo phòng ban thành công',
    type: [FeedResponseDto],
  })
  async findByDepartment(@Param('departmentId') departmentId: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    const feeds = await this.feedService.findByDepartment(departmentId, userId);
    return createSuccessResponse('Lấy danh sách thông báo theo phòng ban thành công', feeds);
  }

  /**
   * Lấy thông tin thông báo theo ID
   * @param id ID thông báo
   * @param req Request object
   * @returns Thông tin thông báo
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin thông báo theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin thông báo thành công',
    type: FeedResponseDto,
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    const feed = await this.feedService.findOne(id, userId);
    return createSuccessResponse('Lấy thông tin thông báo thành công', feed);
  }

  /**
   * Cập nhật thông tin thông báo
   * @param id ID thông báo
   * @param updateFeedDto Thông tin cập nhật
   * @param req Request object
   * @returns Thông tin thông báo đã cập nhật
   */
  @Put(':id')
  @LogActivity('Cập nhật thông báo', 'Feed')
  @ApiOperation({ summary: 'Cập nhật thông tin thông báo' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin thông báo thành công',
    type: FeedResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateFeedDto: UpdateFeedDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    const feed = await this.feedService.update(id, updateFeedDto, userId);
    return createSuccessResponse('Cập nhật thông tin thông báo thành công', feed);
  }

  /**
   * Xóa thông báo
   * @param id ID thông báo
   * @param req Request object
   * @returns Thông báo xóa thành công
   */
  @Delete(':id')
  @LogActivity('Xóa thông báo', 'Feed')
  @ApiOperation({ summary: 'Xóa thông báo' })
  @ApiResponse({
    status: 200,
    description: 'Xóa thông báo thành công',
  })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    await this.feedService.remove(id, userId);
    return createSuccessResponse('Xóa thông báo thành công');
  }
} 