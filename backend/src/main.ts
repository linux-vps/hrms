import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './common/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Thiết lập tiền tố API
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix);
  
  // Thiết lập validation pipe toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // Thiết lập CORS
  app.enableCors();
  
  // Thiết lập Swagger
  setupSwagger(app);

  // Khởi động ứng dụng
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  
  console.log(`Ứng dụng đang chạy tại: http://localhost:${port}/${apiPrefix}`);
  console.log(`Swagger UI: http://localhost:${port}/${apiPrefix}/docs`);
}

bootstrap();
