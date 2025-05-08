import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * Tạo cấu hình kết nối database với TypeORM
 * @param configService Dịch vụ cấu hình để truy cập biến môi trường
 * @returns Cấu hình TypeORM
 */
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 5432),
    username: configService.get<string>('DB_USERNAME', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    database: configService.get<string>('DB_DATABASE', 'quanlynhansu'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
    // synchronize: false,
    logging: configService.get<boolean>('DB_LOGGING', false),
    ssl: {
      rejectUnauthorized: true,
    },
  };
}; 