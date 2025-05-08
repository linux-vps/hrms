import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LeavesService } from '../services/leaves.service';
import { CreateLeaveDto, UpdateLeaveDto, LeaveResponseDto, ApproveLeaveDto } from '../dtos/leaves.dto';
import { Request } from 'express';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { LogActivity } from 'src/common/interceptors/activity-logger.interceptor';

/**
 * Controller xử lý nghỉ phép
 */
@ApiTags('Nghỉ phép')
@ApiBearerAuth('JWT-auth')
@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  /**
   * Tạo yêu cầu nghỉ phép mới
   * @param createLeaveDto Thông tin nghỉ phép
   * @param req Request object
   * @returns Thông tin yêu cầu nghỉ phép đã tạo
   */
  @Post()
  @LogActivity('Tạo yêu cầu nghỉ phép', 'Leave')
  @ApiOperation({ summary: 'Tạo yêu cầu nghỉ phép mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo yêu cầu nghỉ phép thành công',
    type: LeaveResponseDto,
  })
  async create(@Body() createLeaveDto: CreateLeaveDto, @Req() req: Request) {
    const userId = (req as any).user.id;
    const leave = await this.leavesService.create(createLeaveDto, userId);
    return createSuccessResponse('Tạo yêu cầu nghỉ phép thành công', leave);
  }

  /**
   * Lấy danh sách yêu cầu nghỉ phép
   * @param req Request object
   * @param query Tham số truy vấn
   * @returns Danh sách yêu cầu nghỉ phép
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách yêu cầu nghỉ phép' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách yêu cầu nghỉ phép thành công',
    type: [LeaveResponseDto],
  })
  async findAll(@Req() req: Request, @Query() query: any) {
    const userId = (req as any).user.id;
    const leaves = await this.leavesService.findAll(userId, query);
    return createSuccessResponse('Lấy danh sách yêu cầu nghỉ phép thành công', leaves);
  }

  /**
   * Lấy thông tin yêu cầu nghỉ phép theo ID
   * @param id ID yêu cầu nghỉ phép
   * @param req Request object
   * @returns Thông tin yêu cầu nghỉ phép
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin yêu cầu nghỉ phép theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin yêu cầu nghỉ phép thành công',
    type: LeaveResponseDto,
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    const leave = await this.leavesService.findOne(id, userId);
    return createSuccessResponse('Lấy thông tin yêu cầu nghỉ phép thành công', leave);
  }

  /**
   * Cập nhật thông tin yêu cầu nghỉ phép
   * @param id ID yêu cầu nghỉ phép
   * @param updateLeaveDto Thông tin cập nhật
   * @param req Request object
   * @returns Thông tin yêu cầu nghỉ phép đã cập nhật
   */
  @Put(':id')
  @LogActivity('Cập nhật yêu cầu nghỉ phép', 'Leave')
  @ApiOperation({ summary: 'Cập nhật thông tin yêu cầu nghỉ phép' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin yêu cầu nghỉ phép thành công',
    type: LeaveResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateLeaveDto: UpdateLeaveDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    const leave = await this.leavesService.update(id, updateLeaveDto, userId);
    return createSuccessResponse('Cập nhật thông tin yêu cầu nghỉ phép thành công', leave);
  }

  /**
   * Xóa yêu cầu nghỉ phép
   * @param id ID yêu cầu nghỉ phép
   * @param req Request object
   * @returns Thông báo xóa thành công
   */
  @Delete(':id')
  @LogActivity('Xóa yêu cầu nghỉ phép', 'Leave')
  @ApiOperation({ summary: 'Xóa yêu cầu nghỉ phép' })
  @ApiResponse({
    status: 200,
    description: 'Xóa yêu cầu nghỉ phép thành công',
  })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    await this.leavesService.remove(id, userId);
    return createSuccessResponse('Xóa yêu cầu nghỉ phép thành công');
  }

  /**
   * Duyệt yêu cầu nghỉ phép
   * @param id ID yêu cầu nghỉ phép
   * @param approveLeaveDto Thông tin duyệt
   * @param req Request object
   * @returns Thông tin yêu cầu nghỉ phép đã duyệt
   */
  @Post(':id/approve')
  @LogActivity('Duyệt yêu cầu nghỉ phép', 'Leave')
  @ApiOperation({ summary: 'Duyệt yêu cầu nghỉ phép' })
  @ApiResponse({
    status: 200,
    description: 'Duyệt yêu cầu nghỉ phép thành công',
    type: LeaveResponseDto,
  })
  async approve(
    @Param('id') id: string,
    @Body() approveLeaveDto: ApproveLeaveDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    const leave = await this.leavesService.approve(id, approveLeaveDto, userId);
    return createSuccessResponse('Duyệt yêu cầu nghỉ phép thành công', leave);
  }
} 