import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto, AttendanceResponseDto } from '../dtos/attendance.dto';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { ActivityLoggerInterceptor } from 'src/common/interceptors/activity-logger.interceptor';
import { Roles } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/types/enums.type';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AttendanceStatus } from 'src/common/types/enums.type';

/**
 * Controller xử lý chấm công
 */
@ApiTags('Chấm công')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@UseInterceptors(ActivityLoggerInterceptor)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  /**
   * Tạo bản ghi chấm công mới (dành cho admin)
   * @param createAttendanceDto Thông tin chấm công
   * @param req Request chứa thông tin người dùng
   * @returns Thông tin chấm công đã tạo
   */
  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Tạo bản ghi chấm công mới (admin)' })
  @ApiResponse({
    status: 201,
    description: 'Tạo chấm công thành công',
  })
  async create(@Body() createAttendanceDto: CreateAttendanceDto, @Req() req) {
    const userId = req.user.id;
    const attendance = await this.attendanceService.create(createAttendanceDto, userId);
    return createSuccessResponse('Tạo bản ghi chấm công thành công', attendance);
  }

  /**
   * Lấy danh sách chấm công theo các điều kiện lọc
   * @param paginationDto Thông tin phân trang
   * @param req Request chứa thông tin người dùng
   * @returns Danh sách chấm công
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách chấm công' })
  @ApiQuery({ name: 'employeeId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'status', required: false, enum: AttendanceStatus })
  @ApiQuery({ name: 'workShiftId', required: false })
  @ApiQuery({ name: 'isLate', required: false, type: Boolean })
  @ApiQuery({ name: 'isEarlyLeave', required: false, type: Boolean })
  @ApiResponse({
    status: 200,
    description: 'Danh sách chấm công',
    type: [AttendanceResponseDto],
  })
  async findAll(
    @Query() query: any,
    @Req() req,
  ) {
    const userId = req.user.id;
    const attendances = await this.attendanceService.findAll(userId, query);
    return createSuccessResponse('Lấy danh sách chấm công thành công', attendances);
  }

  /**
   * Lấy thông tin chấm công theo ID
   * @param id ID chấm công
   * @param req Request chứa thông tin người dùng
   * @returns Thông tin chấm công
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết bản ghi chấm công' })
  @ApiParam({ name: 'id', description: 'ID chấm công' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin chấm công',
    type: AttendanceResponseDto,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const userId = req.user.id;
    const attendance = await this.attendanceService.findOne(id, userId);
    return createSuccessResponse('Lấy thông tin chấm công thành công', attendance);
  }

  /**
   * Cập nhật thông tin chấm công
   * @param id ID chấm công
   * @param updateAttendanceDto Thông tin cập nhật
   * @param req Request chứa thông tin người dùng
   * @returns Thông tin chấm công đã cập nhật
   */
  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Cập nhật bản ghi chấm công (admin)' })
  @ApiParam({ name: 'id', description: 'ID chấm công' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật chấm công thành công',
    type: AttendanceResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    const attendance = await this.attendanceService.update(id, updateAttendanceDto, userId);
    return createSuccessResponse('Cập nhật bản ghi chấm công thành công', attendance);
  }

  /**
   * Xóa bản ghi chấm công
   * @param id ID chấm công
   * @param req Request chứa thông tin người dùng
   * @returns Thông báo kết quả
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xóa bản ghi chấm công (admin)' })
  @ApiParam({ name: 'id', description: 'ID chấm công' })
  @ApiResponse({
    status: 200,
    description: 'Xóa chấm công thành công',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const userId = req.user.id;
    await this.attendanceService.remove(id, userId);
    return createSuccessResponse('Xóa bản ghi chấm công thành công', { id });
  }

  /**
   * Chấm công (check-in) cho nhân viên
   * @param req Request chứa thông tin người dùng
   * @returns Thông tin chấm công đã tạo
   */
  @Post('check-in')
  @ApiOperation({ summary: 'Chấm công (check-in)' })
  @ApiResponse({
    status: 201,
    description: 'Chấm công thành công',
    type: AttendanceResponseDto,
  })
  async checkIn(@Req() req) {
    const userId = req.user.id;
    const attendance = await this.attendanceService.checkIn(userId);
    return createSuccessResponse('Chấm công thành công', attendance);
  }

  /**
   * Cập nhật thời gian check-out
   * @param req Request chứa thông tin người dùng
   * @returns Thông tin chấm công đã cập nhật
   */
  @Post('check-out')
  @ApiOperation({ summary: 'Cập nhật thời gian kết thúc (check-out)' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thời gian kết thúc thành công',
    type: AttendanceResponseDto,
  })
  async checkOut(@Req() req) {
    const userId = req.user.id;
    const attendance = await this.attendanceService.checkOut(userId);
    return createSuccessResponse('Cập nhật thời gian kết thúc thành công', attendance);
  }
} 