import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, LoginResponseDto } from '../dtos/auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Request } from 'express';
import { createSuccessResponse } from 'src/common/dtos/api-response.dto';

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
   * Lấy thông tin người dùng
   * @param req Request
   * @returns Thông tin người dùng
   */
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Lấy thông tin người dùng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin người dùng',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Không có quyền truy cập',
  })
  async getProfile(@Req() req: Request) {
    // @ts-ignore - req.user được thêm bởi JWT strategy
    const userId = req.user?.sub;
    const user = await this.authService.getUserProfile(userId);
    return createSuccessResponse('Lấy thông tin người dùng thành công', user);
  }
} 