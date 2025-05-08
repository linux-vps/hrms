import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PayrollService } from '../services/payroll.service';
import { CreatePayrollDto, UpdatePayrollDto, PayrollResponseDto } from '../dtos/payroll.dto';
import { Request } from 'express';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { LogActivity } from 'src/common/interceptors/activity-logger.interceptor';
import { UserRole } from 'src/common/types/enums.type';
import { Roles } from 'src/common/guards/roles.guard';

/**
 * Controller xử lý bảng lương
 */
@ApiTags('Bảng lương')
@ApiBearerAuth('JWT-auth')
@Controller('payroll')
@Roles(UserRole.ADMIN)
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  /**
   * Tạo bảng lương mới
   * @param createPayrollDto Thông tin bảng lương
   * @param req Request object
   * @returns Thông tin bảng lương đã tạo
   */
  @Post()
  @LogActivity('Tạo bảng lương', 'Payroll')
  @ApiOperation({ summary: 'Tạo bảng lương mới' })
  @ApiResponse({
    status: 201,
    description: 'Tạo bảng lương thành công',
    type: PayrollResponseDto,
  })
  async create(@Body() createPayrollDto: CreatePayrollDto, @Req() req: Request) {
    const userId = (req as any).user.id;
    const payroll = await this.payrollService.create(createPayrollDto, userId);
    return createSuccessResponse('Tạo bảng lương thành công', payroll);
  }

  /**
   * Lấy danh sách bảng lương
   * @param req Request object
   * @param query Tham số truy vấn
   * @returns Danh sách bảng lương
   */
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách bảng lương' })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bảng lương thành công',
    type: [PayrollResponseDto],
  })
  async findAll(@Req() req: Request, @Query() query: any) {
    const userId = (req as any).user.id;
    const payrolls = await this.payrollService.findAll(userId, query);
    return createSuccessResponse('Lấy danh sách bảng lương thành công', payrolls);
  }

  /**
   * Lấy thông tin bảng lương theo ID
   * @param id ID bảng lương
   * @param req Request object
   * @returns Thông tin bảng lương
   */
  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin bảng lương theo ID' })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin bảng lương thành công',
    type: PayrollResponseDto,
  })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    const payroll = await this.payrollService.findOne(id, userId);
    return createSuccessResponse('Lấy thông tin bảng lương thành công', payroll);
  }

  /**
   * Cập nhật thông tin bảng lương
   * @param id ID bảng lương
   * @param updatePayrollDto Thông tin cập nhật
   * @param req Request object
   * @returns Thông tin bảng lương đã cập nhật
   */
  @Put(':id')
  @LogActivity('Cập nhật bảng lương', 'Payroll')
  @ApiOperation({ summary: 'Cập nhật thông tin bảng lương' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin bảng lương thành công',
    type: PayrollResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePayrollDto: UpdatePayrollDto,
    @Req() req: Request,
  ) {
    const userId = (req as any).user.id;
    const payroll = await this.payrollService.update(id, updatePayrollDto, userId);
    return createSuccessResponse('Cập nhật thông tin bảng lương thành công', payroll);
  }

  /**
   * Xóa bảng lương
   * @param id ID bảng lương
   * @param req Request object
   * @returns Thông báo xóa thành công
   */
  @Delete(':id')
  @LogActivity('Xóa bảng lương', 'Payroll')
  @ApiOperation({ summary: 'Xóa bảng lương' })
  @ApiResponse({
    status: 200,
    description: 'Xóa bảng lương thành công',
  })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    await this.payrollService.remove(id, userId);
    return createSuccessResponse('Xóa bảng lương thành công');
  }

  /**
   * Tạo tất cả bảng lương cho tháng hiện tại
   * @param req Request object
   * @returns Danh sách bảng lương đã tạo
   */
  @Post('generate-monthly')
  @LogActivity('Tạo bảng lương tháng', 'Payroll')
  @ApiOperation({ summary: 'Tạo tất cả bảng lương cho tháng hiện tại' })
  @ApiResponse({
    status: 201,
    description: 'Tạo bảng lương hàng loạt thành công',
    type: [PayrollResponseDto],
  })
  async generateMonthlyPayrolls(@Req() req: Request) {
    const userId = (req as any).user.id;
    const payrolls = await this.payrollService.generateMonthlyPayrolls(userId);
    return createSuccessResponse('Tạo bảng lương hàng loạt thành công', payrolls);
  }
} 