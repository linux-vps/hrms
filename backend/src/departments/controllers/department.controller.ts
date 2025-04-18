import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';
import { Roles } from 'src/common/guards/roles.guard';
import { LogActivity } from 'src/common/interceptors/activity-logger.interceptor';
import { UserRole } from 'src/common/types/enums.type';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { Department } from '../entities/department.entity';

/**
 * Controller quản lý phòng ban
 */
@ApiTags('Phòng ban')
@Controller('departments')
@ApiBearerAuth('JWT-auth')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  /**
   * Lấy danh sách phòng ban
   * @param paginationDto Thông tin phân trang
   * @returns Danh sách phòng ban
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách phòng ban' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách phòng ban',
  })
  @LogActivity('Xem danh sách phòng ban', 'department')
  async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto<Department>> {
    return this.departmentService.findAll(paginationDto);
  }

  /**
   * Lấy thông tin phòng ban theo ID
   * @param id ID phòng ban
   * @returns Thông tin phòng ban
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin phòng ban theo ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin phòng ban',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phòng ban',
  })
  @LogActivity('Xem thông tin phòng ban', 'department')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const department = await this.departmentService.findById(id);
    return createSuccessResponse('Lấy thông tin phòng ban thành công', department);
  }

  /**
   * Tạo phòng ban mới
   * @param createDepartmentDto Thông tin phòng ban mới
   * @returns Phòng ban đã tạo
   */
  @Post('create')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Tạo phòng ban mới' })
  @ApiResponse({
    status: 201,
    description: 'Phòng ban đã được tạo',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
  })
  @LogActivity('Tạo phòng ban mới', 'department')
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentService.create(createDepartmentDto);
    return createSuccessResponse('Tạo phòng ban thành công', department);
  }

  /**
   * Cập nhật thông tin phòng ban
   * @param id ID phòng ban
   * @param updateDepartmentDto Thông tin cập nhật
   * @returns Phòng ban đã cập nhật
   */
  @Put(':id/update')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Cập nhật thông tin phòng ban' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin phòng ban đã được cập nhật',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phòng ban',
  })
  @LogActivity('Cập nhật thông tin phòng ban', 'department')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const department = await this.departmentService.update(id, updateDepartmentDto);
    return createSuccessResponse('Cập nhật thông tin phòng ban thành công', department);
  }

  /**
   * Xóa phòng ban
   * @param id ID phòng ban
   * @returns Kết quả xóa
   */
  @Delete(':id/delete')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xóa phòng ban' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Phòng ban đã được xóa',
  })
  @ApiResponse({
    status: 400,
    description: 'Không thể xóa phòng ban có nhân viên',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phòng ban',
  })
  @LogActivity('Xóa phòng ban', 'department')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.departmentService.delete(id);
    return createSuccessResponse('Xóa phòng ban thành công', result);
  }
} 