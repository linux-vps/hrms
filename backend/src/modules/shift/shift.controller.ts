import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiSecurity } from '@nestjs/swagger';
import { Shift } from './entities/shift.entity';

@ApiTags('Ca làm việc')
@ApiBearerAuth()
@ApiSecurity('bearer')
@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Tạo ca làm việc mới', description: 'Admin có thể tạo ca làm việc chung, Manager chỉ có thể tạo ca cho phòng ban của mình' })
  @ApiBody({
    type: CreateShiftDto,
    examples: {
      example1: {
        summary: 'Ca sáng',
        description: 'Tạo ca sáng từ 8:00 đến 12:00',
        value: {
          shiftName: 'Ca sáng',
          startTime: '08:00',
          endTime: '12:00',
          departmentId: '123e4567-e89b-12d3-a456-426614174001'
        }
      },
      example2: {
        summary: 'Ca chiều',
        description: 'Tạo ca chiều từ 13:30 đến 17:30',
        value: {
          shiftName: 'Ca chiều',
          startTime: '13:30',
          endTime: '17:30',
          departmentId: '123e4567-e89b-12d3-a456-426614174001'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Tạo ca làm việc thành công', type: Shift })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  create(@Body() createShiftDto: CreateShiftDto, @CurrentUser() user: any) {
    if (user.role === Role.MANAGER) {
      return this.shiftService.createForDepartment(createShiftDto, user.departmentId);
    }
    return this.shiftService.create(createShiftDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách ca làm việc', description: 'Admin thấy tất cả ca làm việc, Manager chỉ thấy ca của phòng ban mình' })
  @ApiResponse({ status: 200, description: 'Trả về danh sách ca làm việc', type: [Shift] })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  async findAll(@CurrentUser() user: any) {
    if (user.role === Role.MANAGER) {
      return this.shiftService.findByDepartment(user.departmentId);
    }
    return this.shiftService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @ApiOperation({ summary: 'Lấy thông tin một ca làm việc', description: 'Lấy chi tiết một ca làm việc theo ID' })
  @ApiParam({ name: 'id', description: 'ID của ca làm việc', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin ca làm việc', type: Shift })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 403, description: 'Manager không có quyền truy cập ca làm việc của phòng ban khác' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca làm việc' })
  async findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    const shift = await this.shiftService.findOne(id);
    if (user.role === Role.MANAGER && shift.departmentId !== user.departmentId) {
      throw new ForbiddenException('You do not have access to this shift');
    }
    return shift;
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Cập nhật ca làm việc', description: 'Cập nhật thông tin của một ca làm việc' })
  @ApiParam({ name: 'id', description: 'ID của ca làm việc', type: 'string', format: 'uuid' })
  @ApiBody({
    type: UpdateShiftDto,
    examples: {
      example1: {
        summary: 'Cập nhật thời gian ca làm việc',
        description: 'Thay đổi thời gian bắt đầu và kết thúc ca làm việc',
        value: {
          startTime: '09:00',
          endTime: '13:00'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Cập nhật ca làm việc thành công', type: Shift })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 403, description: 'Manager không có quyền cập nhật ca làm việc của phòng ban khác' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca làm việc' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateShiftDto: UpdateShiftDto,
    @CurrentUser() user: any
  ) {
    if (user.role === Role.MANAGER) {
      const shift = await this.shiftService.findOne(id);
      if (shift.departmentId !== user.departmentId) {
        throw new ForbiddenException('You do not have access to this shift');
      }
    }
    return this.shiftService.update(id, updateShiftDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Xóa ca làm việc', description: 'Xóa một ca làm việc khỏi hệ thống' })
  @ApiParam({ name: 'id', description: 'ID của ca làm việc', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Xóa ca làm việc thành công' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 403, description: 'Manager không có quyền xóa ca làm việc của phòng ban khác' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca làm việc' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    if (user.role === Role.MANAGER) {
      const shift = await this.shiftService.findOne(id);
      if (shift.departmentId !== user.departmentId) {
        throw new ForbiddenException('You do not have access to this shift');
      }
    }
    return this.shiftService.remove(id);
  }
}
