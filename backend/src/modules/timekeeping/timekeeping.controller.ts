import { Controller, Post, Body, Get, Param, Query, UseGuards, ParseUUIDPipe, ForbiddenException } from '@nestjs/common';
import { TimekeepingService } from './timekeeping.service';
import { CreateTimekeepingDto } from './dto/create-timekeeping.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { exec } from 'child_process';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { Timekeeping } from './entities/timekeeping.entity';

@ApiTags('Chấm công')
@ApiBearerAuth()
@ApiSecurity('bearer')
@Controller('timekeeping')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TimekeepingController {
  constructor(private readonly timekeepingService: TimekeepingService) {}

  @Post('check-in')
  @ApiOperation({ summary: 'Chấm công vào ca', description: 'Ghi nhận thời gian vào ca làm việc của nhân viên' })
  @ApiBody({
    type: CreateTimekeepingDto,
    examples: {
      example1: {
        summary: 'Chấm công vào ca sáng',
        description: 'Nhân viên chấm công vào ca sáng',
        value: {
          employeeId: '123e4567-e89b-12d3-a456-426614174000',
          checkInTime: '08:00',
          shiftId: '123e4567-e89b-12d3-a456-426614174001',
          note: 'Đúng giờ'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Chấm công thành công',
    type: Timekeeping
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ hoặc đã chấm công hôm nay' })
  @ApiResponse({ status: 403, description: 'Không có quyền chấm công cho người khác' })
  checkIn(
    @Body() createTimekeepingDto: CreateTimekeepingDto,
    @CurrentUser() user: any,
  ) {

    if (createTimekeepingDto.employeeId !== user.id && !user.isAdmin) {
      throw new ForbiddenException('You can only check in for yourself');
    }
    
    return this.timekeepingService.checkIn(createTimekeepingDto);
  }

  @Post('check-out/:id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Chấm công ra ca', description: 'Ghi nhận thời gian ra ca làm việc của nhân viên' })
  @ApiParam({ name: 'id', description: 'ID bản ghi chấm công', type: 'string', format: 'uuid' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        checkOutTime: { type: 'string', example: '17:30' }
      }
    },
    examples: {
      example1: {
        summary: 'Chấm công ra ca',
        description: 'Nhân viên chấm công kết thúc ca làm việc',
        value: {
          checkOutTime: '17:30'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Chấm công ra ca thành công',
    type: Timekeeping
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 403, description: 'Không có quyền chấm công cho người khác' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bản ghi chấm công' })
  async checkOut(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('checkOutTime') checkOutTime: string,
    @CurrentUser() user: any,
  ) {
    return this.timekeepingService.checkOut(id, checkOutTime, user.id);
  }

  @Post('checkin/qr')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Chấm công vào ca bằng QR code', description: 'Ghi nhận thời gian vào ca làm việc của nhân viên bằng QR code' })
  @ApiQuery({ name: 'token', description: 'Token từ mã QR code', type: 'string', required: true })
  @ApiResponse({ 
    status: 201, 
    description: 'Chấm công vào ca thành công',
    type: Timekeeping
  })
  @ApiResponse({ status: 400, description: 'Token không hợp lệ hoặc đã chấm công hôm nay' })
  @ApiResponse({ status: 401, description: 'Không được phép chấm công cho phòng ban khác' })
  async checkInWithQR(
    @Query('token') token: string,
    @CurrentUser() user: any,
  ) {
    return this.timekeepingService.checkInWithQR(token, user.id);
  }

  @Post('checkout/qr')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Chấm công ra ca bằng QR code', description: 'Ghi nhận thời gian ra ca làm việc của nhân viên bằng QR code' })
  @ApiQuery({ name: 'token', description: 'Token từ mã QR code', type: 'string', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Chấm công ra ca thành công',
    type: Timekeeping
  })
  @ApiResponse({ status: 400, description: 'Token không hợp lệ hoặc chưa chấm công vào ca' })
  @ApiResponse({ status: 401, description: 'Không được phép chấm công cho phòng ban khác' })
  async checkOutWithQR(
    @Query('token') token: string,
    @CurrentUser() user: any,
  ) {
    return this.timekeepingService.checkOutWithQR(token, user.id);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Lấy lịch sử chấm công của nhân viên', description: 'Lấy danh sách chấm công của một nhân viên trong khoảng thời gian' })
  @ApiParam({ name: 'employeeId', description: 'ID của nhân viên', type: 'string', format: 'uuid' })
  @ApiQuery({ name: 'startDate', description: 'Ngày bắt đầu (YYYY-MM-DD)', type: 'string', required: true })
  @ApiQuery({ name: 'endDate', description: 'Ngày kết thúc (YYYY-MM-DD)', type: 'string', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách chấm công',
    type: [Timekeeping]
  })
  findByEmployee(
    @Param('employeeId', ParseUUIDPipe) employeeId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.timekeepingService.findByEmployeeAndDateRange(
      employeeId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('department/:departmentId')
  @ApiOperation({ summary: 'Lấy lịch sử chấm công của phòng ban', description: 'Lấy danh sách chấm công của tất cả nhân viên trong một phòng ban' })
  @ApiParam({ name: 'departmentId', description: 'ID của phòng ban', type: 'string', format: 'uuid' })
  @ApiQuery({ name: 'startDate', description: 'Ngày bắt đầu (YYYY-MM-DD)', type: 'string', required: true })
  @ApiQuery({ name: 'endDate', description: 'Ngày kết thúc (YYYY-MM-DD)', type: 'string', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách chấm công của phòng ban',
    type: [Timekeeping]
  })
  findByDepartment(
    @Param('departmentId', ParseUUIDPipe) departmentId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.timekeepingService.findByDepartmentAndDateRange(
      departmentId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('department')
  @Roles(Role.MANAGER)
  @ApiOperation({ summary: 'Lấy lịch sử chấm công của phòng ban của manager', description: 'Manager lấy danh sách chấm công của phòng ban mình quản lý' })
  @ApiQuery({ name: 'startDate', description: 'Ngày bắt đầu (YYYY-MM-DD)', type: 'string', required: false })
  @ApiQuery({ name: 'endDate', description: 'Ngày kết thúc (YYYY-MM-DD)', type: 'string', required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách chấm công của phòng ban',
    type: [Timekeeping]
  })
  async getDepartmentHistory(
    @CurrentUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.timekeepingService.getDepartmentHistory(user.departmentId, startDate, endDate);
  }

  @Get('employee/:employeeId')
  @Roles(Role.MANAGER)
  @ApiOperation({ summary: 'Manager lấy lịch sử chấm công của một nhân viên', description: 'Manager lấy danh sách chấm công của một nhân viên trong phòng ban của mình' })
  @ApiParam({ name: 'employeeId', description: 'ID của nhân viên', type: 'string', format: 'uuid' })
  @ApiQuery({ name: 'startDate', description: 'Ngày bắt đầu (YYYY-MM-DD)', type: 'string', required: false })
  @ApiQuery({ name: 'endDate', description: 'Ngày kết thúc (YYYY-MM-DD)', type: 'string', required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách chấm công của nhân viên',
    type: [Timekeeping]
  })
  @ApiResponse({ status: 403, description: 'Nhân viên không thuộc phòng ban của manager' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async getEmployeeHistory(
    @CurrentUser() user: any,
    @Param('employeeId', ParseUUIDPipe) employeeId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.timekeepingService.getEmployeeHistory(employeeId, user.departmentId, startDate, endDate);
  }

  @Get('history')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Lấy lịch sử chấm công cá nhân', description: 'Nhân viên xem lịch sử chấm công của chính mình' })
  @ApiQuery({ name: 'startDate', description: 'Ngày bắt đầu (YYYY-MM-DD)', type: 'string', required: false })
  @ApiQuery({ name: 'endDate', description: 'Ngày kết thúc (YYYY-MM-DD)', type: 'string', required: false })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách chấm công cá nhân',
    type: [Timekeeping]
  })
  async getPersonalHistory(
    @CurrentUser() user: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.timekeepingService.getPersonalHistory(user.id, startDate, endDate);
  }
}
