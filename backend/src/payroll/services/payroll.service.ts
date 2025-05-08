import { BadRequestException, Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Payroll } from '../entities/payroll.entity';
import { CreatePayrollDto, UpdatePayrollDto } from '../dtos/payroll.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/common/types/enums.type';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Leave } from 'src/leaves/entities/leave.entity';
import { LeaveStatus, AttendanceStatus } from 'src/common/types/enums.type';
import { PayrollBonus } from '../entities/payroll-bonus.entity';
import { PayrollAllowance } from '../entities/payroll-allowance.entity';
import { PayrollDeduction } from '../entities/payroll-deduction.entity';
import { PayrollConfigService } from '../services/payroll-config.service';

/**
 * Service xử lý bảng lương
 */
@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
    @InjectRepository(PayrollBonus)
    private readonly payrollBonusRepository: Repository<PayrollBonus>,
    @InjectRepository(PayrollAllowance)
    private readonly payrollAllowanceRepository: Repository<PayrollAllowance>,
    @InjectRepository(PayrollDeduction)
    private readonly payrollDeductionRepository: Repository<PayrollDeduction>,
    @Inject(forwardRef(() => PayrollConfigService))
    private readonly payrollConfigService: PayrollConfigService,
  ) {}

  /**
   * Tạo bảng lương mới
   * @param createPayrollDto Thông tin bảng lương
   * @param userId ID người dùng
   * @returns Thông tin bảng lương đã tạo
   */
  async create(createPayrollDto: CreatePayrollDto, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền tạo bảng lương');
    }

    // Kiểm tra nhân viên tồn tại
    const employee = await this.employeeRepository.findOne({
      where: { id: createPayrollDto.employeeId },
    });
    if (!employee) {
      throw new NotFoundException('Nhân viên không tồn tại');
    }

    // Kiểm tra đã có bảng lương trong tháng này chưa
    const existingPayroll = await this.payrollRepository.findOne({
      where: {
        employeeId: createPayrollDto.employeeId,
        month: createPayrollDto.month,
        year: createPayrollDto.year,
      },
    });
    if (existingPayroll) {
      throw new BadRequestException('Nhân viên đã có bảng lương trong tháng này');
    }

    // Tính lương thực lãnh
    const totalBonus = createPayrollDto.totalBonus || 0;
    const totalDeduction = createPayrollDto.totalDeduction || 0;
    const netSalary = createPayrollDto.baseSalary + totalBonus - totalDeduction;

    // Tạo bảng lương mới
    const payroll = this.payrollRepository.create({
      ...createPayrollDto,
      totalBonus,
      totalDeduction,
      netSalary,
    });
    
    return await this.payrollRepository.save(payroll);
  }

  /**
   * Lấy danh sách bảng lương
   * @param userId ID người dùng
   * @param query Tham số truy vấn
   * @returns Danh sách bảng lương
   */
  async findAll(userId: string, query: any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Xây dựng điều kiện truy vấn
    const where: any = {
      // Mặc định chỉ lấy bản ghi còn hoạt động
      isActive: true
    };
    
    // Nếu không phải admin, chỉ lấy bảng lương của nhân viên đó
    if (user.role !== UserRole.ADMIN) {
      const employee = await this.employeeRepository.findOne({
        where: { email: user.email },
      });
      if (!employee) {
        throw new NotFoundException('Không tìm thấy thông tin nhân viên');
      }
      where.employeeId = employee.id;
    } else if (query.employeeId) {
      // Nếu là admin và có filter theo employeeId
      where.employeeId = query.employeeId;
    }
    
    // Lọc theo tháng và năm
    if (query.month) {
      where.month = query.month;
    }
    
    if (query.year) {
      where.year = query.year;
    }
    
    // Lọc theo khoảng tiền lương
    if (query.minSalary && query.maxSalary) {
      where.netSalary = Between(query.minSalary, query.maxSalary);
    }
    
    // Thực hiện truy vấn
    const payrolls = await this.payrollRepository.find({
      where,
      relations: ['employee'],
      order: {
        year: 'DESC',
        month: 'DESC',
      },
    });
    
    return payrolls;
  }

  /**
   * Lấy thông tin bảng lương theo ID
   * @param id ID bảng lương
   * @param userId ID người dùng
   * @returns Thông tin bảng lương
   */
  async findOne(id: string, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Lấy thông tin bảng lương
    const payroll = await this.payrollRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra quyền truy cập
    if (user.role !== UserRole.ADMIN) {
      const employee = await this.employeeRepository.findOne({
        where: { email: user.email },
      });
      if (!employee || employee.id !== payroll.employeeId) {
        throw new BadRequestException('Bạn không có quyền xem bảng lương này');
      }
    }
    
    return payroll;
  }

  /**
   * Cập nhật thông tin bảng lương
   * @param id ID bảng lương
   * @param updatePayrollDto Thông tin cập nhật
   * @param userId ID người dùng
   * @returns Thông tin bảng lương đã cập nhật
   */
  async update(id: string, updatePayrollDto: UpdatePayrollDto, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền cập nhật bảng lương');
    }
    
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({
      where: { id },
    });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Cập nhật thông tin
    Object.assign(payroll, updatePayrollDto);
    
    // Tính lại lương thực lãnh
    payroll.netSalary = payroll.baseSalary + payroll.totalBonus - payroll.totalDeduction;
    
    return await this.payrollRepository.save(payroll);
  }

  /**
   * Xóa bảng lương
   * @param id ID bảng lương
   * @param userId ID người dùng
   */
  async remove(id: string, userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền xóa bảng lương');
    }
    
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({
      where: { id },
    });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Sử dụng soft delete thay vì remove
    await this.payrollRepository.softDelete(id);
    
    // Cập nhật trường isActive
    await this.payrollRepository.update(id, { isActive: false });
  }

  /**
   * Tạo tất cả bảng lương cho tháng hiện tại
   * @param userId ID người dùng
   * @returns Danh sách bảng lương đã tạo
   */
  async generateMonthlyPayrolls(userId: string) {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền tạo bảng lương hàng loạt');
    }
    
    // Lấy tháng và năm hiện tại
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // getMonth() trả về 0-11
    const year = currentDate.getFullYear();
    
    // Lấy tất cả nhân viên
    const employees = await this.employeeRepository.find();
    
    // Mảng kết quả
    const results: any[] = [];
    
    // Tạo bảng lương cho từng nhân viên
    for (const employee of employees) {
      // Kiểm tra đã có bảng lương trong tháng này chưa
      const existingPayroll = await this.payrollRepository.findOne({
        where: {
          employeeId: employee.id,
          month,
          year,
        },
      });
      
      if (!existingPayroll) {
        // Tính lương thực lãnh dựa trên lương cơ bản
        const baseSalary = employee.salary;
        const totalBonus = 0; // Có thể tính toán dựa trên hiệu suất
        const socialInsurance = baseSalary * 0.08; // 8% BHXH
        const healthInsurance = baseSalary * 0.015; // 1.5% BHYT
        const unemploymentInsurance = baseSalary * 0.01; // 1% BHTN
        const personalIncomeTax = baseSalary * 0.05; // Giả định thuế 5%
        const totalDeduction = socialInsurance + healthInsurance + unemploymentInsurance + personalIncomeTax;
        const netSalary = baseSalary + totalBonus - totalDeduction;
        
        // Tạo bảng lương mới
        const payroll = this.payrollRepository.create({
          employeeId: employee.id,
          month,
          year,
          baseSalary,
          totalBonus,
          socialInsurance,
          healthInsurance,
          unemploymentInsurance,
          personalIncomeTax,
          totalDeduction,
          netSalary,
          note: 'Tự động tạo',
        });
        
        const savedPayroll = await this.payrollRepository.save(payroll);
        results.push(savedPayroll);
      }
    }
    
    return results;
  }

  /**
   * Tính thưởng chuyên cần cho nhân viên
   * @param employeeId ID nhân viên
   * @param month Tháng tính lương
   * @param year Năm tính lương
   * @returns Số tiền thưởng chuyên cần
   */
  async calculateAttendanceBonus(employeeId: string, month: number, year: number): Promise<number> {
    // Lấy danh sách ngày đi làm trong tháng
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Lấy thông tin nhân viên
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    // Lấy số ngày làm việc trong tháng (loại bỏ thứ 7, chủ nhật)
    const workingDays = this.calculateWorkingDaysInMonth(startDate, endDate);

    // Lấy tất cả bản ghi chấm công của nhân viên trong tháng
    const attendances = await this.attendanceRepository.find({
      where: {
        employeeId,
        date: Between(startDate, endDate),
      },
    });

    // Lấy tất cả ngày nghỉ phép được phép trong tháng
    const approvedLeaves = await this.leaveRepository.find({
      where: {
        employeeId,
        status: LeaveStatus.APPROVED,
        startDate: LessThanOrEqual(endDate),
        endDate: MoreThanOrEqual(startDate),
      },
    });

    // Tính số ngày đi làm đủ (có mặt hoặc nghỉ phép được duyệt)
    const presentDays = attendances.filter(
      att => att.status === AttendanceStatus.PRESENT && !att.isLate && !att.isEarlyLeave
    ).length;

    // Tính số ngày nghỉ phép được phép
    let approvedLeaveDays = 0;
    for (const leave of approvedLeaves) {
      // Tính số ngày nghỉ trong phạm vi tháng
      const leaveStartDate = leave.startDate < startDate ? startDate : leave.startDate;
      const leaveEndDate = leave.endDate > endDate ? endDate : leave.endDate;
      
      let currentDate = new Date(leaveStartDate);
      while (currentDate <= leaveEndDate) {
        // Chỉ tính các ngày làm việc trong tuần (thứ 2 - thứ 6)
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          approvedLeaveDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    // Tổng số ngày đi làm hợp lệ
    const validAttendanceDays = presentDays + approvedLeaveDays;

    // Nếu nhân viên đi làm đủ số ngày làm việc trong tháng, thưởng 10% lương cơ bản
    if (validAttendanceDays >= workingDays) {
      // Thưởng 10% lương cơ bản cho việc chuyên cần
      return employee.salary * 0.1;
    }

    return 0;
  }

  /**
   * Tính số ngày làm việc trong tháng (không tính thứ 7, chủ nhật)
   * @param startDate Ngày bắt đầu tháng
   * @param endDate Ngày kết thúc tháng
   * @returns Số ngày làm việc
   */
  private calculateWorkingDaysInMonth(startDate: Date, endDate: Date): number {
    let workingDays = 0;
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      // Nếu không phải thứ 7 (6) và chủ nhật (0)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return workingDays;
  }

  /**
   * Tạo bảng lương cho nhân viên
   * @param createPayrollDto Thông tin tạo bảng lương
   * @param userId ID người dùng thực hiện
   * @returns Bảng lương đã tạo
   */
  async generatePayroll(createPayrollDto: CreatePayrollDto, userId: string): Promise<Payroll> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền tạo bảng lương');
    }
    
    const employee = await this.employeeRepository.findOne({
      where: { id: createPayrollDto.employeeId },
    });
    
    if (!employee) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }
    
    // Kiểm tra bảng lương đã tồn tại trong tháng/năm chưa
    const existingPayroll = await this.payrollRepository.findOne({
      where: {
        employeeId: createPayrollDto.employeeId,
        month: createPayrollDto.month,
        year: createPayrollDto.year,
      },
    });
    
    if (existingPayroll) {
      throw new BadRequestException('Bảng lương đã tồn tại cho nhân viên trong tháng này');
    }
    
    // Tính thưởng chuyên cần nếu đi làm đầy đủ
    const attendanceBonus = await this.calculateAttendanceBonus(
      createPayrollDto.employeeId,
      createPayrollDto.month,
      createPayrollDto.year
    );
    
    // Tạo bảng lương mới với thưởng chuyên cần
    const payroll = this.payrollRepository.create({
      employeeId: createPayrollDto.employeeId,
      month: createPayrollDto.month,
      year: createPayrollDto.year,
      baseSalary: employee.salary,
      workingDays: createPayrollDto.workingDays || 0,
      standardWorkingDays: createPayrollDto.standardWorkingDays || 22,
      overtimeHours: createPayrollDto.overtimeHours || 0,
      overtimePay: createPayrollDto.overtimePay || 0,
      totalAllowance: createPayrollDto.totalAllowance || 0,
      totalBonus: attendanceBonus + (createPayrollDto.totalBonus || 0),
      totalDeduction: createPayrollDto.totalDeduction || 0,
      socialInsurance: createPayrollDto.socialInsurance || 0,
      healthInsurance: createPayrollDto.healthInsurance || 0,
      unemploymentInsurance: createPayrollDto.unemploymentInsurance || 0,
      personalIncomeTax: createPayrollDto.personalIncomeTax || 0,
      note: createPayrollDto.note,
      grossSalary: 0,
      netSalary: 0,
      isPaid: false,
    });
    
    // Tính tổng lương gộp
    payroll.grossSalary = payroll.baseSalary + payroll.totalAllowance + payroll.totalBonus + payroll.overtimePay;
    
    // Tính lương thực nhận
    payroll.netSalary = payroll.grossSalary - payroll.totalDeduction - 
      payroll.socialInsurance - payroll.healthInsurance - 
      payroll.unemploymentInsurance - payroll.personalIncomeTax;
    
    // Lưu bảng lương
    const savedPayroll = await this.payrollRepository.save(payroll);
    
    // Nếu có thưởng chuyên cần, tạo khoản thưởng
    if (attendanceBonus > 0) {
      const bonusEntity = new PayrollBonus();
      bonusEntity.payrollId = savedPayroll.id;
      bonusEntity.name = 'Thưởng chuyên cần';
      bonusEntity.description = 'Thưởng cho việc đi làm đầy đủ trong tháng';
      bonusEntity.amount = attendanceBonus;
      bonusEntity.taxable = true;
      
      await this.payrollBonusRepository.save(bonusEntity);
      // Cập nhật tổng thưởng
      await this.updateTotalBonus(savedPayroll.id);
    }
    
    return savedPayroll;
  }

  /**
   * Tính thuế thu nhập cá nhân theo biểu thuế lũy tiến
   * @param taxableIncome Thu nhập chịu thuế
   * @param dependents Số người phụ thuộc
   * @returns Thuế TNCN phải nộp
   */
  async calculatePersonalIncomeTax(taxableIncome: number, dependents: number = 0): Promise<number> {
    try {
      // Lấy mức giảm trừ gia cảnh từ cấu hình
      const personalDeduction = await this.payrollConfigService.getNumberValueByKey('personal_deduction', 11000000);
      const dependentDeduction = await this.payrollConfigService.getNumberValueByKey('dependent_deduction', 4400000) * dependents;
      
      // Thu nhập chịu thuế sau giảm trừ
      const taxableAfterDeduction = taxableIncome - personalDeduction - dependentDeduction;
      
      if (taxableAfterDeduction <= 0) return 0;
      
      // Tính thuế theo biểu thuế lũy tiến
      let tax = 0;
      
      if (taxableAfterDeduction <= 5000000) {
        tax = taxableAfterDeduction * 0.05;
      } else if (taxableAfterDeduction <= 10000000) {
        tax = 5000000 * 0.05 + (taxableAfterDeduction - 5000000) * 0.1;
      } else if (taxableAfterDeduction <= 18000000) {
        tax = 5000000 * 0.05 + 5000000 * 0.1 + (taxableAfterDeduction - 10000000) * 0.15;
      } else if (taxableAfterDeduction <= 32000000) {
        tax = 5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + (taxableAfterDeduction - 18000000) * 0.2;
      } else if (taxableAfterDeduction <= 52000000) {
        tax = 5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 * 0.2 + (taxableAfterDeduction - 32000000) * 0.25;
      } else if (taxableAfterDeduction <= 80000000) {
        tax = 5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 * 0.2 + 20000000 * 0.25 + (taxableAfterDeduction - 52000000) * 0.3;
      } else {
        tax = 5000000 * 0.05 + 5000000 * 0.1 + 8000000 * 0.15 + 14000000 * 0.2 + 20000000 * 0.25 + 28000000 * 0.3 + (taxableAfterDeduction - 80000000) * 0.35;
      }
      
      // Làm tròn thuế
      return Math.round(tax);
    } catch (error) {
      console.error('Lỗi khi tính thuế TNCN:', error);
      // Trả về giá trị mặc định nếu có lỗi
      return taxableIncome * 0.05;
    }
  }

  /**
   * Đánh dấu bảng lương đã thanh toán
   * @param id ID bảng lương
   * @param userId ID người dùng thực hiện
   * @returns Thông tin bảng lương đã thanh toán
   */
  async markAsPaid(id: string, userId: string): Promise<Payroll> {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền thanh toán lương');
    }
    
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({
      where: { id },
    });
    
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Cập nhật trạng thái
    payroll.isPaid = true;
    payroll.paymentDate = new Date();
    
    return await this.payrollRepository.save(payroll);
  }

  /**
   * Lấy báo cáo lương theo phòng ban
   * @param query Tham số truy vấn
   * @param userId ID người dùng
   * @returns Báo cáo lương
   */
  async getDepartmentReport(query: any, userId: string): Promise<any> {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền xem báo cáo lương');
    }
    
    // Lấy thông tin tháng, năm
    const now = new Date();
    const month = query.month || now.getMonth() + 1;
    const year = query.year || now.getFullYear();
    
    // Truy vấn tất cả bảng lương trong tháng, năm
    const qb = this.payrollRepository.createQueryBuilder('payroll')
      .innerJoin('payroll.employee', 'employee')
      .innerJoin('employee.department', 'department')
      .where('payroll.month = :month', { month })
      .andWhere('payroll.year = :year', { year })
      .andWhere('payroll.isActive = true');
    
    // Lọc theo phòng ban nếu có
    if (query.departmentId) {
      qb.andWhere('employee.departmentId = :departmentId', { departmentId: query.departmentId });
    }
    
    // Lấy dữ liệu
    const payrolls = await qb.select([
      'department.id as departmentId',
      'department.name as departmentName',
      'COUNT(payroll.id) as totalEmployees',
      'SUM(payroll.netSalary) as totalSalary',
      'AVG(payroll.netSalary) as averageSalary',
      'MAX(payroll.netSalary) as maxSalary',
      'MIN(payroll.netSalary) as minSalary',
    ])
    .groupBy('department.id')
    .addGroupBy('department.name')
    .getRawMany();
    
    // Thêm thông tin tháng, năm
    return payrolls.map(report => ({
      ...report,
      month,
      year,
      totalSalary: parseFloat(report.totalSalary),
      averageSalary: parseFloat(report.averageSalary),
      maxSalary: parseFloat(report.maxSalary),
      minSalary: parseFloat(report.minSalary),
      totalEmployees: parseInt(report.totalEmployees),
    }));
  }

  /**
   * Lấy thống kê tổng hợp chi phí lương
   * @param query Tham số truy vấn
   * @param userId ID người dùng
   * @returns Thống kê tổng hợp chi phí lương
   */
  async getSalarySummary(query: any, userId: string): Promise<any> {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    if (user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Bạn không có quyền xem thống kê lương');
    }
    
    // Lấy thông tin tháng, năm
    const now = new Date();
    const month = query.month || now.getMonth() + 1;
    const year = query.year || now.getFullYear();
    
    // Truy vấn tất cả bảng lương trong tháng, năm
    const result = await this.payrollRepository.createQueryBuilder('payroll')
      .where('payroll.month = :month', { month })
      .andWhere('payroll.year = :year', { year })
      .andWhere('payroll.isActive = true')
      .select([
        'SUM(payroll.baseSalary) as totalBaseSalary',
        'SUM(payroll.overtimePay) as totalOvertimePay',
        'SUM(payroll.totalAllowance) as totalAllowance',
        'SUM(payroll.totalBonus) as totalBonus',
        'SUM(payroll.totalDeduction) as totalDeduction',
        'SUM(payroll.netSalary) as totalNetSalary',
        'SUM(payroll.socialInsurance) as totalSocialInsurance',
        'SUM(payroll.healthInsurance) as totalHealthInsurance',
        'SUM(payroll.unemploymentInsurance) as totalUnemploymentInsurance',
        'SUM(payroll.personalIncomeTax) as totalPersonalIncomeTax',
      ])
      .getRawOne();
    
    // Chuyển đổi kết quả
    const summary = {
      totalBaseSalary: parseFloat(result.totalBaseSalary) || 0,
      totalOvertimePay: parseFloat(result.totalOvertimePay) || 0,
      totalAllowance: parseFloat(result.totalAllowance) || 0,
      totalBonus: parseFloat(result.totalBonus) || 0,
      totalDeduction: parseFloat(result.totalDeduction) || 0,
      totalNetSalary: parseFloat(result.totalNetSalary) || 0,
      totalSocialInsurance: parseFloat(result.totalSocialInsurance) || 0,
      totalHealthInsurance: parseFloat(result.totalHealthInsurance) || 0,
      totalUnemploymentInsurance: parseFloat(result.totalUnemploymentInsurance) || 0,
      totalPersonalIncomeTax: parseFloat(result.totalPersonalIncomeTax) || 0,
      month,
      year,
    };
    
    return summary;
  }

  /**
   * Xuất phiếu lương PDF
   * @param id ID bảng lương
   * @param userId ID người dùng
   * @returns Buffer dữ liệu PDF
   */
  async generatePayslip(id: string, userId: string): Promise<Buffer> {
    // Kiểm tra quyền truy cập
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    
    // Lấy thông tin bảng lương
    const payroll = await this.payrollRepository.findOne({
      where: { id },
      relations: ['employee', 'employee.department', 'allowances', 'bonuses', 'deductions'],
    });
    
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra quyền truy cập, ADMIN hoặc chính nhân viên đó mới xem được
    if (user.role !== UserRole.ADMIN) {
      const employee = await this.employeeRepository.findOne({
        where: { email: user.email },
      });
      
      if (!employee || employee.id !== payroll.employeeId) {
        throw new BadRequestException('Bạn không có quyền xem phiếu lương này');
      }
    }
    
    // Tạo phiếu lương PDF
    // NOTE: Phần này cần triển khai với thư viện tạo PDF
    // Đây là phần giả định, cần thay thế bằng triển khai thực tế
    const pdfBuffer = Buffer.from('Phiếu lương PDF - cần triển khai');
    
    return pdfBuffer;
  }

  /**
   * Cập nhật tổng phụ cấp từ các khoản phụ cấp chi tiết
   * @param payrollId ID bảng lương
   */
  async updateTotalAllowance(payrollId: string): Promise<void> {
    // Tính tổng phụ cấp
    const result = await this.payrollAllowanceRepository
      .createQueryBuilder('allowance')
      .select('SUM(allowance.amount)', 'total')
      .where('allowance.payrollId = :payrollId', { payrollId })
      .getRawOne();
    
    const totalAllowance = result.total ? parseFloat(result.total) : 0;
    
    // Cập nhật bảng lương
    await this.payrollRepository.update(payrollId, { totalAllowance });
    
    // Cập nhật lương thực lãnh
    await this.recalculateSalary(payrollId);
  }

  /**
   * Cập nhật tổng thưởng từ các khoản thưởng chi tiết
   * @param payrollId ID bảng lương
   */
  async updateTotalBonus(payrollId: string): Promise<void> {
    // Tính tổng thưởng
    const result = await this.payrollBonusRepository
      .createQueryBuilder('bonus')
      .select('SUM(bonus.amount)', 'total')
      .where('bonus.payrollId = :payrollId', { payrollId })
      .getRawOne();
    
    const totalBonus = result.total ? parseFloat(result.total) : 0;
    
    // Cập nhật bảng lương
    await this.payrollRepository.update(payrollId, { totalBonus });
    
    // Cập nhật lương thực lãnh
    await this.recalculateSalary(payrollId);
  }

  /**
   * Cập nhật tổng khấu trừ từ các khoản khấu trừ chi tiết
   * @param payrollId ID bảng lương
   */
  async updateTotalDeduction(payrollId: string): Promise<void> {
    // Tính tổng khấu trừ
    const result = await this.payrollDeductionRepository
      .createQueryBuilder('deduction')
      .select('SUM(deduction.amount)', 'total')
      .where('deduction.payrollId = :payrollId', { payrollId })
      .getRawOne();
    
    const totalDeduction = result.total ? parseFloat(result.total) : 0;
    
    // Cập nhật bảng lương
    await this.payrollRepository.update(payrollId, { totalDeduction });
    
    // Cập nhật lương thực lãnh
    await this.recalculateSalary(payrollId);
  }

  /**
   * Tính lại lương thực lãnh và lương gộp
   * @param payrollId ID bảng lương
   */
  private async recalculateSalary(payrollId: string): Promise<void> {
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      return;
    }
    
    // Tính lại lương gộp
    payroll.grossSalary = payroll.baseSalary + payroll.totalAllowance + payroll.totalBonus + payroll.overtimePay;
    
    // Tính lại lương thực lãnh
    payroll.netSalary = payroll.grossSalary - payroll.totalDeduction - 
      payroll.socialInsurance - payroll.healthInsurance - 
      payroll.unemploymentInsurance - payroll.personalIncomeTax;
    
    await this.payrollRepository.save(payroll);
  }

  /**
   * Thêm phụ cấp vào bảng lương
   * @param payrollId ID bảng lương
   * @param name Tên phụ cấp
   * @param amount Số tiền
   * @param description Mô tả
   * @param taxable Có tính thuế hay không
   * @returns Phụ cấp đã tạo
   */
  async addAllowance(payrollId: string, name: string, amount: number, description?: string, taxable: boolean = true): Promise<PayrollAllowance> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Tạo phụ cấp mới
    const allowance = this.payrollAllowanceRepository.create({
      payrollId,
      name,
      amount,
      description,
      taxable
    });
    
    // Lưu phụ cấp
    const savedAllowance = await this.payrollAllowanceRepository.save(allowance);
    
    // Cập nhật tổng phụ cấp trong bảng lương
    await this.updateTotalAllowance(payrollId);
    
    return savedAllowance;
  }

  /**
   * Thêm thưởng vào bảng lương
   * @param payrollId ID bảng lương
   * @param name Tên thưởng
   * @param amount Số tiền
   * @param description Mô tả
   * @param taxable Có tính thuế hay không
   * @returns Thưởng đã tạo
   */
  async addBonus(payrollId: string, name: string, amount: number, description?: string, taxable: boolean = true): Promise<PayrollBonus> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Tạo thưởng mới
    const bonus = this.payrollBonusRepository.create({
      payrollId,
      name,
      amount,
      description,
      taxable
    });
    
    // Lưu thưởng
    const savedBonus = await this.payrollBonusRepository.save(bonus);
    
    // Cập nhật tổng thưởng trong bảng lương
    await this.updateTotalBonus(payrollId);
    
    return savedBonus;
  }

  /**
   * Thêm khấu trừ vào bảng lương
   * @param payrollId ID bảng lương
   * @param name Tên khấu trừ
   * @param amount Số tiền
   * @param description Mô tả
   * @returns Khấu trừ đã tạo
   */
  async addDeduction(payrollId: string, name: string, amount: number, description?: string): Promise<PayrollDeduction> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Tạo khấu trừ mới
    const deduction = this.payrollDeductionRepository.create({
      payrollId,
      name,
      amount,
      description
    });
    
    // Lưu khấu trừ
    const savedDeduction = await this.payrollDeductionRepository.save(deduction);
    
    // Cập nhật tổng khấu trừ trong bảng lương
    await this.updateTotalDeduction(payrollId);
    
    return savedDeduction;
  }

  /**
   * Lấy danh sách phụ cấp của bảng lương
   * @param payrollId ID bảng lương
   * @returns Danh sách phụ cấp
   */
  async getAllowances(payrollId: string): Promise<PayrollAllowance[]> {
    return this.payrollAllowanceRepository.find({
      where: { payrollId, isActive: true },
      order: { createdAt: 'ASC' }
    });
  }

  /**
   * Lấy danh sách thưởng của bảng lương
   * @param payrollId ID bảng lương
   * @returns Danh sách thưởng
   */
  async getBonuses(payrollId: string): Promise<PayrollBonus[]> {
    return this.payrollBonusRepository.find({
      where: { payrollId, isActive: true },
      order: { createdAt: 'ASC' }
    });
  }

  /**
   * Lấy danh sách khấu trừ của bảng lương
   * @param payrollId ID bảng lương
   * @returns Danh sách khấu trừ
   */
  async getDeductions(payrollId: string): Promise<PayrollDeduction[]> {
    return this.payrollDeductionRepository.find({
      where: { payrollId, isActive: true },
      order: { createdAt: 'ASC' }
    });
  }

  async updateAllowance(id: string, payrollId: string, updateData: { name?: string; amount?: number; description?: string; taxable?: boolean }): Promise<PayrollAllowance> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra allowance tồn tại
    const allowance = await this.payrollAllowanceRepository.findOne({ 
      where: { id, payrollId, isActive: true } 
    });
    
    if (!allowance) {
      throw new NotFoundException('Không tìm thấy phụ cấp');
    }
    
    // Cập nhật thông tin
    Object.assign(allowance, updateData);
    
    // Lưu thay đổi
    const updatedAllowance = await this.payrollAllowanceRepository.save(allowance);
    
    // Cập nhật tổng phụ cấp trong bảng lương
    await this.updateTotalAllowance(payrollId);
    
    return updatedAllowance;
  }

  async deleteAllowance(id: string, payrollId: string): Promise<void> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra allowance tồn tại
    const allowance = await this.payrollAllowanceRepository.findOne({ 
      where: { id, payrollId, isActive: true } 
    });
    
    if (!allowance) {
      throw new NotFoundException('Không tìm thấy phụ cấp');
    }
    
    // Xóa mềm và đánh dấu không hoạt động
    await this.payrollAllowanceRepository.update(id, { isActive: false });
    await this.payrollAllowanceRepository.softDelete(id);
    
    // Cập nhật tổng phụ cấp trong bảng lương
    await this.updateTotalAllowance(payrollId);
  }

  async updateBonus(id: string, payrollId: string, updateData: { name?: string; amount?: number; description?: string; taxable?: boolean }): Promise<PayrollBonus> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra bonus tồn tại
    const bonus = await this.payrollBonusRepository.findOne({ 
      where: { id, payrollId, isActive: true } 
    });
    
    if (!bonus) {
      throw new NotFoundException('Không tìm thấy thưởng');
    }
    
    // Cập nhật thông tin
    Object.assign(bonus, updateData);
    
    // Lưu thay đổi
    const updatedBonus = await this.payrollBonusRepository.save(bonus);
    
    // Cập nhật tổng thưởng trong bảng lương
    await this.updateTotalBonus(payrollId);
    
    return updatedBonus;
  }

  async deleteBonus(id: string, payrollId: string): Promise<void> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra bonus tồn tại
    const bonus = await this.payrollBonusRepository.findOne({ 
      where: { id, payrollId, isActive: true } 
    });
    
    if (!bonus) {
      throw new NotFoundException('Không tìm thấy thưởng');
    }
    
    // Xóa mềm và đánh dấu không hoạt động
    await this.payrollBonusRepository.update(id, { isActive: false });
    await this.payrollBonusRepository.softDelete(id);
    
    // Cập nhật tổng thưởng trong bảng lương
    await this.updateTotalBonus(payrollId);
  }

  async updateDeduction(id: string, payrollId: string, updateData: { name?: string; amount?: number; description?: string }): Promise<PayrollDeduction> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra deduction tồn tại
    const deduction = await this.payrollDeductionRepository.findOne({ 
      where: { id, payrollId, isActive: true } 
    });
    
    if (!deduction) {
      throw new NotFoundException('Không tìm thấy khấu trừ');
    }
    
    // Cập nhật thông tin
    Object.assign(deduction, updateData);
    
    // Lưu thay đổi
    const updatedDeduction = await this.payrollDeductionRepository.save(deduction);
    
    // Cập nhật tổng khấu trừ trong bảng lương
    await this.updateTotalDeduction(payrollId);
    
    return updatedDeduction;
  }

  async deleteDeduction(id: string, payrollId: string): Promise<void> {
    // Kiểm tra bảng lương tồn tại
    const payroll = await this.payrollRepository.findOne({ where: { id: payrollId } });
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Kiểm tra deduction tồn tại
    const deduction = await this.payrollDeductionRepository.findOne({ 
      where: { id, payrollId, isActive: true } 
    });
    
    if (!deduction) {
      throw new NotFoundException('Không tìm thấy khấu trừ');
    }
    
    // Xóa mềm và đánh dấu không hoạt động
    await this.payrollDeductionRepository.update(id, { isActive: false });
    await this.payrollDeductionRepository.softDelete(id);
    
    // Cập nhật tổng khấu trừ trong bảng lương
    await this.updateTotalDeduction(payrollId);
  }

  /**
   * Cập nhật lại tất cả các tổng (phụ cấp, thưởng, khấu trừ) cho một bảng lương
   * @param payrollId ID bảng lương
   */
  async recalculateAllTotals(payrollId: string): Promise<void> {
    await this.updateTotalAllowance(payrollId);
    await this.updateTotalBonus(payrollId);
    await this.updateTotalDeduction(payrollId);
  }

  /**
   * Tính toán và cập nhật thuế TNCN cho một bảng lương dựa trên thu nhập chịu thuế
   * @param payrollId ID bảng lương
   */
  async updatePersonalIncomeTax(payrollId: string): Promise<void> {
    // Lấy thông tin bảng lương
    const payroll = await this.payrollRepository.findOne({
      where: { id: payrollId },
      relations: ['employee'],
    });
    
    if (!payroll) {
      throw new NotFoundException('Không tìm thấy bảng lương');
    }
    
    // Lấy danh sách phụ cấp và thưởng có tính thuế
    const taxableAllowances = await this.payrollAllowanceRepository.find({
      where: { payrollId, isActive: true, taxable: true },
    });
    
    const taxableBonuses = await this.payrollBonusRepository.find({
      where: { payrollId, isActive: true, taxable: true },
    });
    
    // Tính tổng thu nhập chịu thuế
    let taxableIncome = payroll.baseSalary;
    
    // Thêm các khoản phụ cấp tính thuế
    taxableAllowances.forEach(item => {
      taxableIncome += item.amount;
    });
    
    // Thêm các khoản thưởng tính thuế
    taxableBonuses.forEach(item => {
      taxableIncome += item.amount;
    });
    
    // Trừ đi các khoản bảo hiểm (không tính thuế)
    taxableIncome -= (payroll.socialInsurance + payroll.healthInsurance + payroll.unemploymentInsurance);
    
    // Lấy số người phụ thuộc của nhân viên (nếu có)
    const dependents = payroll.employee?.dependents || 0;
    
    // Tính thuế TNCN
    const tax = await this.calculatePersonalIncomeTax(taxableIncome, dependents);
    
    // Cập nhật thuế TNCN trong bảng lương
    await this.payrollRepository.update(payrollId, { personalIncomeTax: tax });
    
    // Tính lại lương thực lãnh
    await this.recalculateSalary(payrollId);
  }
} 