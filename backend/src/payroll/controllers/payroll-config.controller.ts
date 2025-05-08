import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { PayrollConfigService } from '../services/payroll-config.service';
import { CreatePayrollConfigDto, PayrollConfigResponseDto, UpdatePayrollConfigDto } from '../dtos';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { LogActivity } from 'src/common/interceptors/activity-logger.interceptor';
import { Roles } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/types/enums.type';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

/**
 * Controller xử lý cấu hình tính lương
 */
@ApiTags('PayrollConfig')
@ApiBearerAuth('JWT-auth')
@Controller('payroll-config')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class PayrollConfigController {
  constructor(private readonly payrollConfigService: PayrollConfigService) {}

  /**
   * Tạo cấu hình mới
   * @param createPayrollConfigDto Thông tin cấu hình
   * @returns Thông tin cấu hình đã tạo
   */
  @Post()
  @LogActivity('Tạo cấu hình lương', 'PayrollConfig')
  @ApiOperation({ 
    summary: 'Tạo cấu hình mới',
    description: 'Tạo mới một tham số cấu hình tính lương trong hệ thống. Chỉ admin có quyền thực hiện.'
  })
  @ApiBody({ 
    type: CreatePayrollConfigDto,
    description: 'Dữ liệu cấu hình cần tạo'
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo cấu hình thành công',
    type: PayrollConfigResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu không hợp lệ hoặc khóa đã tồn tại',
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  async create(@Body() createPayrollConfigDto: CreatePayrollConfigDto) {
    const config = await this.payrollConfigService.create(createPayrollConfigDto);
    return createSuccessResponse('Tạo cấu hình thành công', config);
  }

  /**
   * Lấy danh sách cấu hình
   * @returns Danh sách cấu hình
   */
  @Get()
  @ApiOperation({ 
    summary: 'Lấy danh sách cấu hình',
    description: 'Lấy tất cả các tham số cấu hình tính lương trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách cấu hình thành công',
    type: [PayrollConfigResponseDto],
  })
  async findAll() {
    const configs = await this.payrollConfigService.findAll();
    return createSuccessResponse('Lấy danh sách cấu hình thành công', configs);
  }

  /**
   * Lấy thông tin cấu hình theo ID
   * @param id ID cấu hình
   * @returns Thông tin cấu hình
   */
  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin cấu hình theo ID',
    description: 'Lấy chi tiết một tham số cấu hình tính lương theo ID'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của cấu hình cần lấy thông tin',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin cấu hình thành công',
    type: PayrollConfigResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy cấu hình',
  })
  async findOne(@Param('id') id: string) {
    const config = await this.payrollConfigService.findOne(id);
    return createSuccessResponse('Lấy thông tin cấu hình thành công', config);
  }

  /**
   * Lấy thông tin cấu hình theo khóa
   * @param key Khóa cấu hình
   * @returns Thông tin cấu hình
   */
  @Get('key/:key')
  @ApiOperation({ 
    summary: 'Lấy thông tin cấu hình theo khóa',
    description: 'Lấy chi tiết một tham số cấu hình tính lương theo khóa (key)'
  })
  @ApiParam({
    name: 'key',
    description: 'Khóa của cấu hình cần lấy thông tin',
    type: String,
    example: 'social_insurance_rate'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin cấu hình thành công',
    type: PayrollConfigResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy cấu hình với khóa đã cung cấp',
  })
  async findByKey(@Param('key') key: string) {
    const config = await this.payrollConfigService.findByKey(key);
    return createSuccessResponse('Lấy thông tin cấu hình thành công', config);
  }

  /**
   * Cập nhật thông tin cấu hình
   * @param id ID cấu hình
   * @param updatePayrollConfigDto Thông tin cập nhật
   * @returns Thông tin cấu hình đã cập nhật
   */
  @Put(':id')
  @LogActivity('Cập nhật cấu hình lương', 'PayrollConfig')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin cấu hình',
    description: 'Cập nhật thông tin tham số cấu hình tính lương. Chỉ admin có quyền thực hiện.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của cấu hình cần cập nhật',
    type: String
  })
  @ApiBody({ 
    type: UpdatePayrollConfigDto,
    description: 'Dữ liệu cấu hình cần cập nhật'
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin cấu hình thành công',
    type: PayrollConfigResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy cấu hình',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  async update(
    @Param('id') id: string,
    @Body() updatePayrollConfigDto: UpdatePayrollConfigDto,
  ) {
    const config = await this.payrollConfigService.update(id, updatePayrollConfigDto);
    return createSuccessResponse('Cập nhật thông tin cấu hình thành công', config);
  }

  /**
   * Xóa cấu hình
   * @param id ID cấu hình
   * @returns Thông báo xóa thành công
   */
  @Delete(':id')
  @LogActivity('Xóa cấu hình lương', 'PayrollConfig')
  @ApiOperation({ 
    summary: 'Xóa cấu hình',
    description: 'Xóa một tham số cấu hình tính lương khỏi hệ thống. Chỉ admin có quyền thực hiện.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của cấu hình cần xóa',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa cấu hình thành công',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy cấu hình',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  async remove(@Param('id') id: string) {
    await this.payrollConfigService.remove(id);
    return createSuccessResponse('Xóa cấu hình thành công');
  }

  /**
   * Khởi tạo dữ liệu mặc định
   * @returns Thông báo khởi tạo thành công
   */
  @Post('init-defaults')
  @LogActivity('Khởi tạo cấu hình mặc định', 'PayrollConfig')
  @ApiOperation({ 
    summary: 'Khởi tạo dữ liệu cấu hình mặc định',
    description: 'Tạo các tham số cấu hình mặc định cho hệ thống tính lương (BHXH, BHYT, giảm trừ gia cảnh...)'
  })
  @ApiResponse({
    status: 200,
    description: 'Khởi tạo dữ liệu cấu hình mặc định thành công',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  async initDefaults() {
    await this.payrollConfigService.initDefaultConfigs();
    return createSuccessResponse('Khởi tạo dữ liệu cấu hình mặc định thành công');
  }
} 