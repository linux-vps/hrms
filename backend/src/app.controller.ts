import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Hệ thống')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Thông tin hệ thống', description: 'Kiểm tra trạng thái hoạt động của hệ thống' })
  @ApiResponse({ status: 200, description: 'Hệ thống đang hoạt động', schema: { type: 'string', example: 'Hello World!' } })
  getHello(): string {
    return this.appService.getHello();
  }
}
