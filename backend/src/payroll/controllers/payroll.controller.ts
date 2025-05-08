import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Patch, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { PayrollService } from '../services/payroll.service';
import { 
  CreatePayrollDto, 
  UpdatePayrollDto, 
  PayrollResponseDto, 
  DepartmentReportQueryDto, 
  DepartmentReportResponseDto, 
  SalarySummaryResponseDto,
  CreateAllowanceDto,
  UpdateAllowanceDto,
  AllowanceResponseDto,
  CreateBonusDto,
  UpdateBonusDto,
  BonusResponseDto,
  CreateDeductionDto,
  UpdateDeductionDto,
  DeductionResponseDto
} from '../dtos';
import { Request, Response } from 'express';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { LogActivity } from 'src/common/interceptors/activity-logger.interceptor';
import { UserRole } from 'src/common/types/enums.type';
import { Roles } from 'src/common/guards/roles.guard';

/**
 * Controller xử lý bảng lương
 */
@ApiTags('Payroll')
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

  /**
   * Đánh dấu đã thanh toán lương
   * @param id ID bảng lương
   * @param req Request object
   * @returns Thông báo thanh toán thành công
   */
  @Patch(':id/pay')
  @LogActivity('Thanh toán lương', 'Payroll')
  @ApiOperation({ 
    summary: 'Đánh dấu đã thanh toán lương',
    description: 'Đánh dấu một bảng lương đã được thanh toán và ghi nhận ngày thanh toán'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương cần đánh dấu thanh toán',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Đánh dấu thanh toán thành công',
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương',
  })
  async markAsPaid(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    await this.payrollService.markAsPaid(id, userId);
    return createSuccessResponse('Đánh dấu thanh toán lương thành công');
  }

  /**
   * Xuất phiếu lương PDF
   * @param id ID bảng lương
   * @param req Request object
   * @param res Response object
   */
  @Get(':id/payslip')
  @ApiOperation({ 
    summary: 'Xuất phiếu lương',
    description: 'Tạo và tải về phiếu lương dạng PDF của một nhân viên'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương cần xuất phiếu',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Xuất phiếu lương thành công',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương',
  })
  async generatePayslip(
    @Param('id') id: string, 
    @Req() req: Request, 
    @Res() res: Response
  ) {
    const userId = (req as any).user.id;
    const pdfBuffer = await this.payrollService.generatePayslip(id, userId);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=payslip.pdf',
    });
    
    res.send(pdfBuffer);
  }

  /**
   * Lấy báo cáo lương theo phòng ban
   * @param query Tham số truy vấn
   * @param req Request object
   * @returns Báo cáo lương theo phòng ban
   */
  @Get('reports/department')
  @ApiOperation({ 
    summary: 'Báo cáo lương theo phòng ban',
    description: 'Lấy báo cáo tổng hợp chi phí lương theo phòng ban trong một khoảng thời gian'
  })
  @ApiQuery({
    name: 'departmentId',
    required: false,
    description: 'ID phòng ban (nếu không có sẽ lấy tất cả phòng ban)',
    type: String
  })
  @ApiQuery({
    name: 'month',
    required: false,
    description: 'Tháng (nếu không có sẽ lấy tháng hiện tại)',
    type: Number
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Năm (nếu không có sẽ lấy năm hiện tại)',
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy báo cáo lương theo phòng ban thành công',
    type: [DepartmentReportResponseDto]
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  async getDepartmentReport(@Query() query: DepartmentReportQueryDto, @Req() req: Request) {
    const userId = (req as any).user.id;
    const report = await this.payrollService.getDepartmentReport(query, userId);
    return createSuccessResponse('Lấy báo cáo lương theo phòng ban thành công', report);
  }

  /**
   * Lấy thống kê tổng hợp chi phí lương
   * @param query Tham số truy vấn
   * @param req Request object
   * @returns Thống kê tổng hợp chi phí lương
   */
  @Get('reports/summary')
  @ApiOperation({ 
    summary: 'Thống kê tổng hợp chi phí lương',
    description: 'Lấy thống kê tổng hợp các khoản chi phí lương trong một khoảng thời gian'
  })
  @ApiQuery({
    name: 'month',
    required: false,
    description: 'Tháng (nếu không có sẽ lấy tháng hiện tại)',
    type: Number
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Năm (nếu không có sẽ lấy năm hiện tại)',
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thống kê chi phí lương thành công',
    type: SalarySummaryResponseDto
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập',
  })
  async getSalarySummary(@Query() query: any, @Req() req: Request) {
    const userId = (req as any).user.id;
    const summary = await this.payrollService.getSalarySummary(query, userId);
    return createSuccessResponse('Lấy thống kê chi phí lương thành công', summary);
  }

  /**
   * Lấy danh sách phụ cấp của bảng lương
   * @param id ID bảng lương
   * @param req Request object
   * @returns Danh sách phụ cấp
   */
  @Get(':id/allowances')
  @ApiOperation({ 
    summary: 'Lấy danh sách phụ cấp của bảng lương',
    description: 'Lấy chi tiết tất cả các khoản phụ cấp của một bảng lương'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phụ cấp thành công',
    type: [AllowanceResponseDto]
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương'
  })
  async getAllowances(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    const allowances = await this.payrollService.getAllowances(id);
    return createSuccessResponse('Lấy danh sách phụ cấp thành công', allowances);
  }

  /**
   * Thêm phụ cấp vào bảng lương
   * @param id ID bảng lương
   * @param body Thông tin phụ cấp
   * @param req Request object
   * @returns Phụ cấp đã tạo
   */
  @Post(':id/allowances')
  @LogActivity('Thêm phụ cấp', 'Payroll')
  @ApiOperation({ 
    summary: 'Thêm phụ cấp vào bảng lương',
    description: 'Thêm một khoản phụ cấp mới vào bảng lương và tự động cập nhật tổng phụ cấp'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiBody({ type: CreateAllowanceDto })
  @ApiResponse({
    status: 201,
    description: 'Thêm phụ cấp thành công',
    type: AllowanceResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương'
  })
  async addAllowance(
    @Param('id') id: string, 
    @Body() body: CreateAllowanceDto,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    const allowance = await this.payrollService.addAllowance(id, body.name, body.amount, body.description, body.taxable);
    return createSuccessResponse('Thêm phụ cấp thành công', allowance);
  }

  /**
   * Lấy danh sách thưởng của bảng lương
   * @param id ID bảng lương
   * @param req Request object
   * @returns Danh sách thưởng
   */
  @Get(':id/bonuses')
  @ApiOperation({ 
    summary: 'Lấy danh sách thưởng của bảng lương',
    description: 'Lấy chi tiết tất cả các khoản thưởng của một bảng lương'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách thưởng thành công',
    type: [BonusResponseDto]
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương'
  })
  async getBonuses(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    const bonuses = await this.payrollService.getBonuses(id);
    return createSuccessResponse('Lấy danh sách thưởng thành công', bonuses);
  }

  /**
   * Thêm thưởng vào bảng lương
   * @param id ID bảng lương
   * @param body Thông tin thưởng
   * @param req Request object
   * @returns Thưởng đã tạo
   */
  @Post(':id/bonuses')
  @LogActivity('Thêm thưởng', 'Payroll')
  @ApiOperation({ 
    summary: 'Thêm thưởng vào bảng lương',
    description: 'Thêm một khoản thưởng mới vào bảng lương và tự động cập nhật tổng thưởng'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiBody({ type: CreateBonusDto })
  @ApiResponse({
    status: 201,
    description: 'Thêm thưởng thành công',
    type: BonusResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương'
  })
  async addBonus(
    @Param('id') id: string, 
    @Body() body: CreateBonusDto,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    const bonus = await this.payrollService.addBonus(id, body.name, body.amount, body.description, body.taxable);
    return createSuccessResponse('Thêm thưởng thành công', bonus);
  }

  /**
   * Lấy danh sách khấu trừ của bảng lương
   * @param id ID bảng lương
   * @param req Request object
   * @returns Danh sách khấu trừ
   */
  @Get(':id/deductions')
  @ApiOperation({ 
    summary: 'Lấy danh sách khấu trừ của bảng lương',
    description: 'Lấy chi tiết tất cả các khoản khấu trừ của một bảng lương'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách khấu trừ thành công',
    type: [DeductionResponseDto]
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương'
  })
  async getDeductions(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    const deductions = await this.payrollService.getDeductions(id);
    return createSuccessResponse('Lấy danh sách khấu trừ thành công', deductions);
  }

  /**
   * Thêm khấu trừ vào bảng lương
   * @param id ID bảng lương
   * @param body Thông tin khấu trừ
   * @param req Request object
   * @returns Khấu trừ đã tạo
   */
  @Post(':id/deductions')
  @LogActivity('Thêm khấu trừ', 'Payroll')
  @ApiOperation({ 
    summary: 'Thêm khấu trừ vào bảng lương',
    description: 'Thêm một khoản khấu trừ mới vào bảng lương và tự động cập nhật tổng khấu trừ'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiBody({ type: CreateDeductionDto })
  @ApiResponse({
    status: 201,
    description: 'Thêm khấu trừ thành công',
    type: DeductionResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương'
  })
  async addDeduction(
    @Param('id') id: string, 
    @Body() body: CreateDeductionDto,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    const deduction = await this.payrollService.addDeduction(id, body.name, body.amount, body.description);
    return createSuccessResponse('Thêm khấu trừ thành công', deduction);
  }

  /**
   * Cập nhật thông tin phụ cấp
   * @param id ID bảng lương
   * @param allowanceId ID phụ cấp
   * @param body Thông tin cập nhật
   * @param req Request object
   * @returns Phụ cấp đã cập nhật
   */
  @Put(':id/allowances/:allowanceId')
  @LogActivity('Cập nhật phụ cấp', 'Payroll')
  @ApiOperation({ 
    summary: 'Cập nhật phụ cấp trong bảng lương',
    description: 'Cập nhật thông tin một khoản phụ cấp và tự động cập nhật tổng phụ cấp'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiParam({
    name: 'allowanceId',
    description: 'ID của khoản phụ cấp',
    type: String
  })
  @ApiBody({ type: UpdateAllowanceDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật phụ cấp thành công',
    type: AllowanceResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương hoặc phụ cấp'
  })
  async updateAllowance(
    @Param('id') id: string, 
    @Param('allowanceId') allowanceId: string,
    @Body() body: UpdateAllowanceDto,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    const allowance = await this.payrollService.updateAllowance(allowanceId, id, body);
    return createSuccessResponse('Cập nhật phụ cấp thành công', allowance);
  }

  /**
   * Xóa phụ cấp
   * @param id ID bảng lương
   * @param allowanceId ID phụ cấp
   * @param req Request object
   * @returns Thông báo xóa thành công
   */
  @Delete(':id/allowances/:allowanceId')
  @LogActivity('Xóa phụ cấp', 'Payroll')
  @ApiOperation({ 
    summary: 'Xóa phụ cấp khỏi bảng lương',
    description: 'Xóa một khoản phụ cấp và tự động cập nhật tổng phụ cấp'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiParam({
    name: 'allowanceId',
    description: 'ID của khoản phụ cấp',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa phụ cấp thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương hoặc phụ cấp'
  })
  async deleteAllowance(
    @Param('id') id: string, 
    @Param('allowanceId') allowanceId: string,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    await this.payrollService.deleteAllowance(allowanceId, id);
    return createSuccessResponse('Xóa phụ cấp thành công');
  }

  /**
   * Cập nhật thông tin thưởng
   * @param id ID bảng lương
   * @param bonusId ID thưởng
   * @param body Thông tin cập nhật
   * @param req Request object
   * @returns Thưởng đã cập nhật
   */
  @Put(':id/bonuses/:bonusId')
  @LogActivity('Cập nhật thưởng', 'Payroll')
  @ApiOperation({ 
    summary: 'Cập nhật thưởng trong bảng lương',
    description: 'Cập nhật thông tin một khoản thưởng và tự động cập nhật tổng thưởng'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiParam({
    name: 'bonusId',
    description: 'ID của khoản thưởng',
    type: String
  })
  @ApiBody({ type: UpdateBonusDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thưởng thành công',
    type: BonusResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương hoặc thưởng'
  })
  async updateBonus(
    @Param('id') id: string, 
    @Param('bonusId') bonusId: string,
    @Body() body: UpdateBonusDto,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    const bonus = await this.payrollService.updateBonus(bonusId, id, body);
    return createSuccessResponse('Cập nhật thưởng thành công', bonus);
  }

  /**
   * Xóa thưởng
   * @param id ID bảng lương
   * @param bonusId ID thưởng
   * @param req Request object
   * @returns Thông báo xóa thành công
   */
  @Delete(':id/bonuses/:bonusId')
  @LogActivity('Xóa thưởng', 'Payroll')
  @ApiOperation({ 
    summary: 'Xóa thưởng khỏi bảng lương',
    description: 'Xóa một khoản thưởng và tự động cập nhật tổng thưởng'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiParam({
    name: 'bonusId',
    description: 'ID của khoản thưởng',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa thưởng thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương hoặc thưởng'
  })
  async deleteBonus(
    @Param('id') id: string, 
    @Param('bonusId') bonusId: string,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    await this.payrollService.deleteBonus(bonusId, id);
    return createSuccessResponse('Xóa thưởng thành công');
  }

  /**
   * Cập nhật thông tin khấu trừ
   * @param id ID bảng lương
   * @param deductionId ID khấu trừ
   * @param body Thông tin cập nhật
   * @param req Request object
   * @returns Khấu trừ đã cập nhật
   */
  @Put(':id/deductions/:deductionId')
  @LogActivity('Cập nhật khấu trừ', 'Payroll')
  @ApiOperation({ 
    summary: 'Cập nhật khấu trừ trong bảng lương',
    description: 'Cập nhật thông tin một khoản khấu trừ và tự động cập nhật tổng khấu trừ'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiParam({
    name: 'deductionId',
    description: 'ID của khoản khấu trừ',
    type: String
  })
  @ApiBody({ type: UpdateDeductionDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật khấu trừ thành công',
    type: DeductionResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương hoặc khấu trừ'
  })
  async updateDeduction(
    @Param('id') id: string, 
    @Param('deductionId') deductionId: string,
    @Body() body: UpdateDeductionDto,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    const deduction = await this.payrollService.updateDeduction(deductionId, id, body);
    return createSuccessResponse('Cập nhật khấu trừ thành công', deduction);
  }

  /**
   * Xóa khấu trừ
   * @param id ID bảng lương
   * @param deductionId ID khấu trừ
   * @param req Request object
   * @returns Thông báo xóa thành công
   */
  @Delete(':id/deductions/:deductionId')
  @LogActivity('Xóa khấu trừ', 'Payroll')
  @ApiOperation({ 
    summary: 'Xóa khấu trừ khỏi bảng lương',
    description: 'Xóa một khoản khấu trừ và tự động cập nhật tổng khấu trừ'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiParam({
    name: 'deductionId',
    description: 'ID của khoản khấu trừ',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa khấu trừ thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương hoặc khấu trừ'
  })
  async deleteDeduction(
    @Param('id') id: string, 
    @Param('deductionId') deductionId: string,
    @Req() req: Request
  ) {
    const userId = (req as any).user.id;
    await this.payrollService.deleteDeduction(deductionId, id);
    return createSuccessResponse('Xóa khấu trừ thành công');
  }

  /**
   * Tính toán lại tất cả các tổng và thuế
   * @param id ID bảng lương
   * @param req Request object
   * @returns Thông tin bảng lương đã cập nhật
   */
  @Post(':id/recalculate')
  @LogActivity('Tính toán lại bảng lương', 'Payroll')
  @ApiOperation({ 
    summary: 'Tính toán lại bảng lương',
    description: 'Tính toán lại tất cả các tổng từ chi tiết và cập nhật thuế, lương thực lãnh'
  })
  @ApiParam({
    name: 'id',
    description: 'ID của bảng lương',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Tính toán lại bảng lương thành công',
    type: PayrollResponseDto
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bảng lương'
  })
  async recalculatePayroll(@Param('id') id: string, @Req() req: Request) {
    const userId = (req as any).user.id;
    
    // Tính toán lại tất cả các tổng
    await this.payrollService.recalculateAllTotals(id);
    
    // Tính toán lại thuế TNCN
    await this.payrollService.updatePersonalIncomeTax(id);
    
    // Lấy thông tin bảng lương đã cập nhật
    const payroll = await this.payrollService.findOne(id, userId);
    
    return createSuccessResponse('Tính toán lại bảng lương thành công', payroll);
  }
} 