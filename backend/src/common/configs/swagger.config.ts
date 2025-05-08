import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Cấu hình và thiết lập Swagger documentation cho ứng dụng
 * @param app Ứng dụng NestJS
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Hệ thống Quản lý Nhân sự API')
    .setDescription(`
      API cho hệ thống quản lý nhân sự
      
      ## Các tính năng chính:
      - **Quản lý Nhân viên**: Quản lý thông tin nhân viên, phòng ban, chức vụ
      - **Quản lý Chấm công**: Quản lý dữ liệu chấm công, ca làm việc, nghỉ phép
      - **Quản lý Lương**: Tính lương, phụ cấp, thưởng, khấu trừ, thuế TNCN
      - **Báo cáo & Thống kê**: Báo cáo lương theo phòng ban, xuất phiếu lương
      - **Cấu hình Hệ thống**: Tham số tính lương, thuế, bảo hiểm
    `)
    .setVersion('1.0')
    .addTag('Auth', 'API xác thực và phân quyền')
    .addTag('Employees', 'API quản lý nhân viên')
    .addTag('Departments', 'API quản lý phòng ban')
    .addTag('Attendance', 'API quản lý chấm công')
    .addTag('Leaves', 'API quản lý nghỉ phép')
    .addTag('Payroll', 'API quản lý bảng lương')
    .addTag('PayrollConfig', 'API quản lý cấu hình tham số tính lương')
    .addTag('Reports', 'API báo cáo và thống kê')
    .addTag('ActivityLog', 'API ghi nhật ký hoạt động')
    .addTag('Feed', 'API quản lý bảng tin')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  
  // Tùy chỉnh cho Swagger UI
  const customOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
    customSiteTitle: 'HRMS API Documentation',
  };
  
  SwaggerModule.setup('api/docs', app, document, customOptions);
} 