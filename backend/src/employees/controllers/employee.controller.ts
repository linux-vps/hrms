import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ParseUUIDPipe,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto, UpdateEmployeeDto, UpdateSalaryDto } from '../dtos/employee.dto';
import { UserRole } from 'src/common/types/enums.type';
import { Roles } from 'src/common/guards/roles.guard';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';
import { Request } from 'express';

// Khai báo kiểu cho Express.Multer.File
declare global {
  namespace Express {
    namespace Multer {
      interface File {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
      }
    }
  }
}

/**
 * Controller quản lý nhân viên
 */
@ApiTags('employees')
@Controller('employees')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  /**
   * Lấy danh sách nhân viên
   * @param paginationDto Thông tin phân trang
   * @param search Từ khóa tìm kiếm
   * @returns Danh sách nhân viên
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách nhân viên' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Danh sách nhân viên với phân trang' })
  @Roles(UserRole.ADMIN)
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string,
  ): Promise<PaginatedResultDto<Employee>> {
    return this.employeeService.findAll(paginationDto, search);
  }

  /**
   * Lấy thông tin nhân viên theo ID
   * @param id ID nhân viên
   * @returns Thông tin nhân viên
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin nhân viên theo ID' })
  @ApiParam({ name: 'id', description: 'ID của nhân viên' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin nhân viên',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhân viên',
  })
  @Roles(UserRole.ADMIN)
  async findById(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findById(id);
  }

  /**
   * Tạo nhân viên mới
   * @param createEmployeeDto Thông tin nhân viên mới
   * @returns Nhân viên đã tạo
   */
  @Post()
  @ApiOperation({ summary: 'Tạo nhân viên mới' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({
    status: 201,
    description: 'Nhân viên đã được tạo',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
  })
  @ApiQuery({ 
    name: 'createAccount', 
    required: false, 
    type: Boolean, 
    description: 'Tạo tài khoản cho nhân viên' 
  })
  @Roles(UserRole.ADMIN)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Query('createAccount') createAccount?: boolean,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto, createAccount);
  }

  /**
   * Cập nhật thông tin nhân viên
   * @param id ID nhân viên
   * @param updateEmployeeDto Thông tin cập nhật
   * @returns Nhân viên đã cập nhật
   */
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin nhân viên' })
  @ApiParam({ name: 'id', description: 'ID của nhân viên' })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({
    status: 200,
    description: 'Thông tin nhân viên đã được cập nhật',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhân viên',
  })
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  /**
   * Cập nhật lương nhân viên
   * @param id ID nhân viên
   * @param updateSalaryDto Thông tin lương mới
   * @returns Nhân viên đã cập nhật
   */
  @Patch(':id/salary')
  @ApiOperation({ 
    summary: 'Cập nhật lương nhân viên',
    description: 'Cập nhật mức lương mới cho nhân viên và lưu lịch sử thay đổi lương'
  })
  @ApiParam({ 
    name: 'id', 
    type: String, 
    format: 'uuid',
    description: 'ID của nhân viên cần cập nhật lương'
  })
  @ApiBody({ 
    type: UpdateSalaryDto,
    description: 'Thông tin lương mới và lý do thay đổi'
  })
  @ApiResponse({
    status: 200,
    description: 'Lương nhân viên đã được cập nhật',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Cập nhật lương thành công' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string', example: 'Nguyễn' },
            lastName: { type: 'string', example: 'Văn A' },
            salary: { type: 'number', example: 15000000 },
            email: { type: 'string', example: 'nguyenvana@example.com' },
            position: { type: 'string', example: 'Nhân viên' }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhân viên',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ',
  })
  @Roles(UserRole.ADMIN)
  async updateSalary(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSalaryDto: UpdateSalaryDto,
    @Req() req: Request,
  ): Promise<Employee> {
    const userId = (req as any).user.id;
    return this.employeeService.updateSalary(
      id,
      updateSalaryDto.salary,
      updateSalaryDto.reason,
      userId,
    );
  }

  /**
   * Lấy lịch sử thay đổi lương
   * @param id ID nhân viên
   * @returns Lịch sử thay đổi lương
   */
  @Get(':id/salary-history')
  @ApiOperation({ 
    summary: 'Lấy lịch sử thay đổi lương',
    description: 'Lấy danh sách các lần thay đổi lương của nhân viên theo thứ tự thời gian'
  })
  @ApiParam({ 
    name: 'id', 
    type: String, 
    format: 'uuid',
    description: 'ID của nhân viên cần xem lịch sử lương'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy lịch sử thay đổi lương thành công',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Lấy lịch sử thay đổi lương thành công' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              employeeId: { type: 'string', format: 'uuid' },
              previousSalary: { type: 'number', example: 10000000 },
              newSalary: { type: 'number', example: 12000000 },
              effectiveDate: { type: 'string', format: 'date-time' },
              reason: { type: 'string', example: 'Tăng lương do đánh giá hiệu suất tốt' },
              changedById: { type: 'string', format: 'uuid' },
              changedBy: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  email: { type: 'string', example: 'admin@example.com' }
                }
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhân viên',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  @Roles(UserRole.ADMIN)
  async getSalaryHistory(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.getSalaryHistory(id);
  }

  /**
   * Xóa nhân viên
   * @param id ID nhân viên
   * @returns Kết quả xóa
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xóa nhân viên' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Nhân viên đã được xóa',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy nhân viên',
  })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<{ id: string; success: boolean }> {
    return this.employeeService.delete(id);
  }

  /**
   * Cập nhật ảnh đại diện
   * @param id ID nhân viên
   * @param file File ảnh
   * @returns Nhân viên đã cập nhật
   */
  @Post(':id/avatar')
  @ApiOperation({ summary: 'Upload ảnh đại diện nhân viên' })
  @ApiParam({ name: 'id', description: 'ID nhân viên' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Upload ảnh thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Employee> {
    if (!file) {
      throw new BadRequestException('Không có file được tải lên');
    }
    
    // Trong thực tế, lưu file vào storage và lấy URL
    const avatarUrl = `uploads/avatars/${file.filename}`;
    
    return this.employeeService.updateAvatar(id, avatarUrl);
  }
} 