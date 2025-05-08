import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseUUIDPipe,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/types/enums.type';
import { WorkShiftService } from '../services/work-shift.service';
import { CreateWorkShiftDto, UpdateWorkShiftDto, WorkShiftResponseDto } from '../dtos/work-shift.dto';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';

/**
 * Controller quản lý ca làm việc
 */
@ApiTags('Ca làm việc')
@Controller('work-shifts')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class WorkShiftController {
  constructor(private readonly workShiftService: WorkShiftService) {}

  /**
   * Tạo ca làm việc mới
   * @param createWorkShiftDto Thông tin ca làm việc
   * @returns Kết quả tạo ca làm việc
   */
  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Tạo ca làm việc mới' })
  @ApiResponse({ 
    status: 201, 
    description: 'Tạo ca làm việc thành công',
    type: WorkShiftResponseDto,
  })
  async create(@Body() createWorkShiftDto: CreateWorkShiftDto) {
    const workShift = await this.workShiftService.create(createWorkShiftDto);
    return createSuccessResponse('Tạo ca làm việc thành công', workShift);
  }

  /**
   * Lấy danh sách ca làm việc
   * @param active Lọc theo trạng thái hoạt động
   * @returns Danh sách ca làm việc
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách ca làm việc' })
  @ApiQuery({ name: 'active', required: false, type: Boolean })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách ca làm việc',
    type: [WorkShiftResponseDto],
  })
  async findAll(@Query('active') active?: string) {
    let isActive: boolean | undefined = undefined;
    
    if (active !== undefined) {
      isActive = active === 'true';
    }
    
    const workShifts = await this.workShiftService.findAll(isActive);
    return createSuccessResponse('Lấy danh sách ca làm việc thành công', workShifts);
  }

  /**
   * Lấy thông tin ca làm việc theo ID
   * @param id ID ca làm việc
   * @returns Thông tin ca làm việc
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin ca làm việc theo ID' })
  @ApiParam({ name: 'id', description: 'ID ca làm việc' })
  @ApiResponse({ 
    status: 200, 
    description: 'Thông tin ca làm việc',
    type: WorkShiftResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca làm việc' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const workShift = await this.workShiftService.findOne(id);
    return createSuccessResponse('Lấy thông tin ca làm việc thành công', workShift);
  }

  /**
   * Cập nhật thông tin ca làm việc
   * @param id ID ca làm việc
   * @param updateWorkShiftDto Thông tin cần cập nhật
   * @returns Kết quả cập nhật
   */
  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Cập nhật thông tin ca làm việc' })
  @ApiParam({ name: 'id', description: 'ID ca làm việc' })
  @ApiResponse({ 
    status: 200, 
    description: 'Cập nhật ca làm việc thành công',
    type: WorkShiftResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca làm việc' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWorkShiftDto: UpdateWorkShiftDto,
  ) {
    const workShift = await this.workShiftService.update(id, updateWorkShiftDto);
    return createSuccessResponse('Cập nhật ca làm việc thành công', workShift);
  }

  /**
   * Xóa ca làm việc
   * @param id ID ca làm việc
   * @returns Kết quả xóa
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xóa ca làm việc' })
  @ApiParam({ name: 'id', description: 'ID ca làm việc' })
  @ApiResponse({ status: 200, description: 'Xóa ca làm việc thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy ca làm việc' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.workShiftService.remove(id);
    return createSuccessResponse(result.message, { id, success: result.success });
  }
} 