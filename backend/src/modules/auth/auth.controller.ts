import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

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
}
