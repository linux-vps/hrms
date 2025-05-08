import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, LoginResponseDto, CreateUserForEmployeeDto, CreateAdminDto } from '../dtos/auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Request } from 'express';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';
import { Roles } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/common/types/enums.type';

// Định nghĩa interface cho Request đã có thông tin user được thêm bởi JWT strategy
interface RequestWithUser extends Request {
  user: {
    sub: string;
    email: string;
    role: string;
    employeeId?: string;
  };
}

/**
 * Controller xử lý xác thực
 */
@ApiTags('Xác thực')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Đăng nhập
   * @param loginDto Thông tin đăng nhập
   * @returns Token JWT và thông tin người dùng
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập vào hệ thống' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đăng nhập thành công',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Email hoặc mật khẩu không đúng',
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return createSuccessResponse('Đăng nhập thành công', user);
  }

  /**
   * Đăng ký tài khoản
   * @param registerDto Thông tin đăng ký
   * @returns Thông báo và ID người dùng
   */
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Đăng ký thành công',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email đã được sử dụng',
  })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return createSuccessResponse('Đăng ký thành công', result);
  }

  /**
   * Tạo tài khoản cho nhân viên đã tồn tại
   * @param employeeId ID nhân viên
   * @param createUserDto Thông tin tạo tài khoản
   * @returns Thông báo và ID người dùng
   */
  @Post('create-user-for-employee/:employeeId')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Tạo tài khoản cho nhân viên đã tồn tại' })
  @ApiParam({ name: 'employeeId', type: String, format: 'uuid' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tạo tài khoản thành công',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nhân viên đã có tài khoản hoặc dữ liệu không hợp lệ',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy nhân viên',
  })
  async createUserForEmployee(
    @Param('employeeId', ParseUUIDPipe) employeeId: string,
    @Body() createUserDto: CreateUserForEmployeeDto
  ) {
    const { email, password, role } = createUserDto;
    const result = await this.authService.createUserForEmployee(employeeId, email, password, role);
    return createSuccessResponse('Tạo tài khoản cho nhân viên thành công', result);
  }

  /**
   * Tạo tài khoản admin
   * @param createAdminDto Thông tin tạo tài khoản admin
   * @returns Thông báo và ID người dùng
   */
  @Post('create-admin')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Tạo tài khoản admin mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tạo tài khoản admin thành công',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Email đã được sử dụng hoặc dữ liệu không hợp lệ',
  })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const { email, password, employeeId } = createAdminDto;
    const result = await this.authService.createAdminUser(email, password, employeeId);
    return createSuccessResponse('Tạo tài khoản admin thành công', result);
  }

  /**
   * Lấy thông tin người dùng
   * @param req Request chứa thông tin người dùng
   * @returns Thông tin người dùng
   */
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lấy thông tin thành công',
  })
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const user = await this.authService.getUserProfile(userId);
    return createSuccessResponse('Lấy thông tin người dùng thành công', user);
  }
} 