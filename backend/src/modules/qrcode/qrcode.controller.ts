import { Controller, Get, Post, Param, Query, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { GenerateQRDto, QRCodeType } from './dto/generate-qr.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiSecurity } from '@nestjs/swagger';

@ApiTags('Mã QR')
@ApiBearerAuth()
@ApiSecurity('bearer')
@Controller('qrcode')
@UseGuards(JwtAuthGuard)
export class QRCodeController {
  constructor(private readonly qrCodeService: QRCodeService) {}

  @Post('generate')
  @UseGuards(RolesGuard)
  @Roles(Role.MANAGER)
  @ApiOperation({ summary: 'Tạo mã QR điểm danh', description: 'Manager tạo mã QR dùng cho việc điểm danh trong phòng ban của mình' })
  @ApiBody({
    type: GenerateQRDto,
    examples: {
      example1: {
        summary: 'Tạo QR chấm công vào ca',
        description: 'Tạo mã QR cho việc chấm công vào ca sáng',
        value: {
          departmentId: '123e4567-e89b-12d3-a456-426614174001',
          shiftId: '123e4567-e89b-12d3-a456-426614174002',
          type: QRCodeType.CHECKIN,
          validityPeriod: 30
        }
      },
      example2: {
        summary: 'Tạo QR chấm công ra ca',
        description: 'Tạo mã QR cho việc chấm công ra ca chiều',
        value: {
          departmentId: '123e4567-e89b-12d3-a456-426614174001',
          shiftId: '123e4567-e89b-12d3-a456-426614174003',
          type: QRCodeType.CHECKOUT,
          validityPeriod: 30
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Tạo mã QR thành công',
    schema: {
      type: 'object',
      properties: {
        qrToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        qrImageUrl: { type: 'string', example: 'data:image/png;base64,iVBORw0KGgoAAA...' },
        expiresAt: { type: 'string', format: 'date-time', example: '2023-10-15T15:30:00Z' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 403, description: 'Manager chỉ có thể tạo mã QR cho phòng ban của mình' })
  async generateAttendanceQR(
    @Body() generateQRDto: GenerateQRDto,
    @CurrentUser() user: any,
  ) {
    // Kiểm tra xem manager có quyền tạo QR cho phòng ban này không
    if (user.departmentId !== generateQRDto.departmentId) {
      throw new UnauthorizedException('You can only generate QR codes for your department');
    }

    return this.qrCodeService.generateAttendanceQR(generateQRDto);
  }
}
