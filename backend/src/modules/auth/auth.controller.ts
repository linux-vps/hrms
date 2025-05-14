import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ImpersonateManagerDto } from './dto/impersonate-manager.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';
import { Role } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

interface RequestWithUser extends Request {
  user: {
    sub: string;
    role: string;
    departmentId?: string;
  };
}

@ApiTags('Xác thực')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới', description: 'Tạo một tài khoản người dùng mới trong hệ thống' })
  @ApiBody({
    type: RegisterDto,
    examples: {
      example1: {
        summary: 'Đăng ký người dùng',
        description: 'Đăng ký một tài khoản người dùng với thông tin cơ bản',
        value: {
          fullName: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          password: 'Password123!',
          phoneNumber: '+84987654321',
          birthDate: '1990-01-01',
          role: 'user',
        }
      },
      example2: {
        summary: 'Đăng ký quản lý',
        description: 'Đăng ký một tài khoản quản lý',
        value: {
          fullName: 'Trần Thị B',
          email: 'tranthib@example.com',
          password: 'Manager456!',
          phoneNumber: '+84123456789',
          birthDate: '1985-05-15',
          role: 'manager',
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Đăng ký thành công',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
        fullName: { type: 'string', example: 'Nguyễn Văn A' },
        email: { type: 'string', example: 'nguyenvana@example.com' },
        role: { type: 'string', example: 'user' },
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 409, description: 'Email đã tồn tại trong hệ thống' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập', description: 'Đăng nhập vào hệ thống và nhận token xác thực' })
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Đăng nhập người dùng',
        description: 'Đăng nhập với tài khoản người dùng',
        value: {
          email: 'nguyenvana@example.com',
          password: 'Password123!'
        }
      },
      example2: {
        summary: 'Đăng nhập quản trị viên',
        description: 'Đăng nhập với tài khoản quản trị viên',
        value: {
          email: 'admin@example.com',
          password: 'Admin123!'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Đăng nhập thành công',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        employee: { 
          type: 'object', 
          properties: {
            id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
            fullName: { type: 'string', example: 'Nguyễn Văn A' },
            email: { type: 'string', example: 'nguyenvana@example.com' },
            role: { type: 'string', example: 'user' },
            departmentId: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174001' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Email hoặc mật khẩu không đúng' })
  async login(@Body() loginDto: LoginDto) {
    const employee = await this.authService.validateEmployee(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(employee);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiOperation({ summary: 'Quên mật khẩu', description: 'Yêu cầu mã OTP để đặt lại mật khẩu' })
  @ApiBody({
    type: RequestPasswordResetDto,
    examples: {
      example1: {
        summary: 'Yêu cầu đặt lại mật khẩu',
        value: {
          email: 'nguyenvana@example.com'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Đã gửi mã OTP đến email',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Mã OTP đã được gửi đến email của bạn' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Email không tồn tại trong hệ thống' })
  async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDto) {
    return await this.authService.requestPasswordReset(requestPasswordResetDto.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  @ApiOperation({ summary: 'Xác thực OTP', description: 'Xác thực mã OTP và đặt lại mật khẩu' })
  @ApiBody({
    type: VerifyOtpDto,
    examples: {
      example1: {
        summary: 'Xác thực OTP',
        value: {
          email: 'nguyenvana@example.com',
          otp: '123456'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Xác thực OTP thành công và đặt lại mật khẩu',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Mật khẩu mới đã được gửi đến email của bạn' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Mã OTP không hợp lệ hoặc đã hết hạn' })
  @ApiResponse({ status: 404, description: 'Email không tồn tại trong hệ thống' })
  async verifyOtpAndResetPassword(@Body() verifyOtpDto: VerifyOtpDto) {
    return await this.authService.verifyOtpAndResetPassword(
      verifyOtpDto.email, 
      verifyOtpDto.otp
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  @HttpCode(HttpStatus.OK)
  @Post('change-password')
  @ApiOperation({ summary: 'Đổi mật khẩu', description: 'Đổi mật khẩu người dùng hiện tại (yêu cầu đăng nhập)' })
  @ApiBody({
    type: ChangePasswordDto,
    examples: {
      example1: {
        summary: 'Đổi mật khẩu',
        value: {
          currentPassword: 'OldPassword123',
          newPassword: 'NewPassword456'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Đổi mật khẩu thành công',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Đổi mật khẩu thành công' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Mật khẩu hiện tại không chính xác' })
  @ApiResponse({ status: 401, description: 'Chưa đăng nhập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy nhân viên' })
  async changePassword(@Req() req: RequestWithUser, @Body() changePasswordDto: ChangePasswordDto) {
    const employeeId = req.user.sub;
    return await this.authService.changePassword(
      employeeId,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiSecurity('bearer')
  @HttpCode(HttpStatus.OK)
  @Post('impersonate')
  @ApiOperation({ summary: 'Admin đăng nhập với quyền của quản lý', description: 'Cho phép admin đăng nhập với quyền của một quản lý bất kỳ (chỉ admin mới dùng được)' })
  @ApiBody({
    type: ImpersonateManagerDto,
    examples: {
      example1: {
        summary: 'Admin đăng nhập với quyền của quản lý',
        value: {
          email: 'manager@example.com'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Đăng nhập với quyền của quản lý thành công',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        employee: { 
          type: 'object', 
          properties: {
            id: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' },
            fullName: { type: 'string', example: 'Nguyễn Văn A' },
            email: { type: 'string', example: 'manager@example.com' },
            role: { type: 'string', example: 'manager' },
            departmentId: { type: 'string', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174001' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quản lý' })
  async impersonateManager(@Req() req: RequestWithUser, @Body() impersonateDto: ImpersonateManagerDto) {
    // Kiểm tra người dùng hiện tại là admin
    if (req.user.role !== Role.ADMIN) {
      throw new UnauthorizedException('Chỉ admin mới có quyền sử dụng tính năng này');
    }
    
    return this.authService.impersonateManager(impersonateDto.email);
  }
}
