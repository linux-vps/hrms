import { Controller, Get, Post, Body, Param, Delete, UseGuards, Logger, Patch, ParseUUIDPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiSecurity } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { Position } from '../../common/enums/position.enum';
import { Education } from '../../common/enums/education.enum';

@ApiTags('Nhân viên')
@ApiBearerAuth()
@ApiSecurity('bearer')
@Controller('employees')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name);

  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Tạo nhân viên mới', description: 'Admin có thể tạo mọi loại nhân viên. Manager chỉ có thể tạo USER trong phòng ban của mình.' })
  @ApiBody({
    type: CreateEmployeeDto,
    examples: {
      example1: {
        summary: 'Tạo nhân viên thông thường',
        description: 'Admin tạo nhân viên USER trong một phòng ban',
        value: {
          fullName: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          password: 'Password123!',
          phoneNumber: '+84987654321',
          birthDate: '1990-01-01',
          departmentId: '123e4567-e89b-12d3-a456-426614174001',
          role: Role.USER,
          position: Position.JUNIOR,
          education: Education.BACHELOR,
          address: 'Số 1, Đường ABC, Quận 1, TP.HCM',
          joinDate: '2023-01-15',
          baseSalary: 10000000
        }
      },
      example2: {
        summary: 'Tạo quản lý phòng ban',
        description: 'Admin tạo quản lý (MANAGER) cho một phòng ban',
        value: {
          fullName: 'Trần Thị B',
          email: 'tranthib@example.com',
          password: 'Manager456!',
          phoneNumber: '+84123456789',
          birthDate: '1985-05-15',
          departmentId: '123e4567-e89b-12d3-a456-426614174002',
          role: Role.MANAGER,
          position: Position.SENIOR,
          education: Education.MASTER,
          address: 'Số 2, Đường XYZ, Quận 2, TP.HCM',
          joinDate: '2022-06-01',
          baseSalary: 20000000
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Tạo nhân viên thành công', 
    type: Employee,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174123',
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        role: Role.USER,
        departmentId: '123e4567-e89b-12d3-a456-426614174001',
        phoneNumber: '+84987654321',
        birthDate: '1990-01-01',
        isActive: true,
        position: Position.JUNIOR,
        education: Education.BACHELOR,
        joinDate: '2023-01-15',
        baseSalary: 10000000
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 409, description: 'Email đã tồn tại' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @CurrentUser() user: any) {
    this.logger.log('Bắt đầu tạo nhân viên mới');
    this.logger.log(`User hiện tại: ${JSON.stringify(user)}`);
    this.logger.log(`Data nhận được: ${JSON.stringify(createEmployeeDto)}`);

    // Admin có thể tạo mọi nhân viên và phải chỉ định departmentId
    if (user.role === Role.ADMIN) {
      this.logger.log('Người dùng là ADMIN, cho phép tạo mọi loại nhân viên');
      return this.employeeService.create(createEmployeeDto);
    }
    
    // Manager chỉ có thể tạo USER trong phòng ban của mình
    if (user.role === Role.MANAGER) {
      this.logger.log('Người dùng là MANAGER');
      this.logger.log(`Department của manager: ${user.departmentId}`);

      if (createEmployeeDto.role && createEmployeeDto.role !== Role.USER) {
        this.logger.warn(`Manager cố gắng tạo tài khoản ${createEmployeeDto.role}`);
        throw new UnauthorizedException('Quản lý chỉ có thể tạo tài khoản USER');
      }
      
      // Tự động gán department của manager cho user mới
      const modifiedDto = {
        ...createEmployeeDto,
        departmentId: user.departmentId,
        role: Role.USER
      };
      
      this.logger.log(`Data sau khi modify: ${JSON.stringify(modifiedDto)}`);
      return this.employeeService.create(modifiedDto);
    }
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Lấy danh sách nhân viên', description: 'Admin sẽ thấy tất cả các Manager, Manager sẽ thấy tất cả User trong phòng ban của họ.' })
  @ApiResponse({ 
    status: 200, 
    description: 'Trả về danh sách nhân viên', 
    type: [Employee],
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174123',
          fullName: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          role: Role.USER,
          departmentId: '123e4567-e89b-12d3-a456-426614174001',
          isActive: true,
          position: Position.JUNIOR
        },
        {
          id: '123e4567-e89b-12d3-a456-426614174124',
          fullName: 'Trần Thị B',
          email: 'tranthib@example.com',
          role: Role.MANAGER,
          departmentId: '123e4567-e89b-12d3-a456-426614174002',
          isActive: true,
          position: Position.SENIOR
        }
      ]
    }
  })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  findAll(@CurrentUser() user: any) {
    if(user.role === Role.ADMIN) {
      return this.employeeService.findByRole(Role.MANAGER);
    }
    if (user.role === Role.MANAGER) {
      return this.employeeService.findByRoleInDepartment(Role.USER, user.departmentId);
    }
    return this.employeeService.findByRole(Role.USER);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Lấy thông tin một nhân viên', description: 'Admin có thể xem bất kỳ nhân viên nào. Manager chỉ có thể xem nhân viên trong phòng ban của họ.' })
  @ApiParam({ name: 'id', description: 'ID của nhân viên', type: 'string', format: 'uuid' })
  @ApiResponse({ 
    status: 200, 
    description: 'Trả về thông tin nhân viên', 
    type: Employee,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174123',
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phoneNumber: '+84987654321',
        birthDate: '1990-01-01',
        role: Role.USER,
        departmentId: '123e4567-e89b-12d3-a456-426614174001',
        isActive: true,
        position: Position.JUNIOR,
        education: Education.BACHELOR,
        address: 'Số 1, Đường ABC, Quận 1, TP.HCM',
        joinDate: '2023-01-15',
        baseSalary: 10000000,
        bankAccount: '9876543210',
        bankName: 'Vietcombank',
        identityCard: '123456789012',
        workExperience: '2 năm kinh nghiệm phát triển phần mềm'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    if (user.role === Role.MANAGER && user.departmentId) {
      return this.employeeService.findOneInDepartment(id, user.departmentId);
    }
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @ApiOperation({ summary: 'Cập nhật thông tin nhân viên', description: 'Admin có thể cập nhật bất kỳ nhân viên nào. Manager chỉ có thể cập nhật nhân viên trong phòng ban của họ.' })
  @ApiParam({ name: 'id', description: 'ID của nhân viên', type: 'string', format: 'uuid' })
  @ApiBody({
    type: UpdateEmployeeDto,
    examples: {
      example1: {
        summary: 'Cập nhật thông tin cá nhân',
        description: 'Cập nhật thông tin liên hệ của nhân viên',
        value: {
          fullName: 'Nguyễn Văn A Cập Nhật',
          phoneNumber: '+84987654322',
          address: 'Số 10, Đường DEF, Quận 3, TP.HCM'
        }
      },
      example2: {
        summary: 'Cập nhật thông tin công việc',
        description: 'Cập nhật vị trí và lương của nhân viên',
        value: {
          position: Position.SENIOR,
          baseSalary: 15000000,
          workExperience: '3 năm kinh nghiệm phát triển phần mềm'
        }
      },
      example3: {
        summary: 'Cập nhật thông tin ngân hàng',
        description: 'Cập nhật tài khoản ngân hàng của nhân viên',
        value: {
          bankAccount: '0123456789',
          bankName: 'Techcombank'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cập nhật nhân viên thành công', 
    type: Employee,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174123',
        fullName: 'Nguyễn Văn A Cập Nhật',
        phoneNumber: '+84987654322',
        address: 'Số 10, Đường DEF, Quận 3, TP.HCM',
        position: Position.SENIOR,
        baseSalary: 15000000,
        isActive: true
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @CurrentUser() user: any,
  ) {
    if (user.role === Role.MANAGER) {
      return this.employeeService.updateInDepartment(id, updateEmployeeDto, user.departmentId);
    }
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Xóa nhân viên', description: 'Xóa hoàn toàn thông tin nhân viên khỏi hệ thống.' })
  @ApiParam({ name: 'id', description: 'ID của nhân viên', type: 'string', format: 'uuid' })
  @ApiResponse({ 
    status: 200, 
    description: 'Xóa nhân viên thành công',
    schema: {
      example: {
        message: 'Nhân viên đã được xóa thành công'
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.remove(id);
  }

  @Patch(':id/deactivate')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Vô hiệu hóa nhân viên', description: 'Đặt trạng thái nhân viên thành không hoạt động thay vì xóa hoàn toàn.' })
  @ApiParam({ name: 'id', description: 'ID của nhân viên', type: 'string', format: 'uuid' })
  @ApiResponse({ 
    status: 200, 
    description: 'Vô hiệu hóa nhân viên thành công', 
    type: Employee,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174123',
        fullName: 'Nguyễn Văn A',
        isActive: false
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async deactivate(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    if (user.role === Role.MANAGER) {
      return this.employeeService.deactivateInDepartment(id, user.departmentId);
    }
    return this.employeeService.deactivate(id);
  }

  @Patch(':id/activate')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Kích hoạt nhân viên', description: 'Đặt trạng thái nhân viên thành hoạt động.' })
  @ApiParam({ name: 'id', description: 'ID của nhân viên', type: 'string', format: 'uuid' })
  @ApiResponse({ 
    status: 200, 
    description: 'Kích hoạt nhân viên thành công', 
    type: Employee,
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174123',
        fullName: 'Nguyễn Văn A',
        isActive: true
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async activate(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: any) {
    if (user.role === Role.MANAGER) {
      return this.employeeService.activateInDepartment(id, user.departmentId);
    }
    return this.employeeService.activate(id);
  }
}
