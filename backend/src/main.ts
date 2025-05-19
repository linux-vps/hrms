import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Middleware để ghi log chi tiết các request
  app.use((req, res, next) => {
    logger.log(`Request: ${req.method} ${req.path}`);
    logger.log(`Headers: ${JSON.stringify({
      authorization: req.headers.authorization ? 'Bearer ...' : 'none',
      'content-type': req.headers['content-type'],
    })}`);
    
    if (req.body && Object.keys(req.body).length > 0) {
      logger.log(`Body: ${JSON.stringify(req.body)}`);
    }
    
    next();
  });
  
  // Security
  app.use(helmet());
  app.enableCors();

  // // Compression
  // app.use(compression());

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Global filters
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('HRMS API API')
    .setDescription('API documentation for the HRMS API System')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Nhập JWT token của bạn vào đây',
        in: 'header',
      },
      'bearer',
    )
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
