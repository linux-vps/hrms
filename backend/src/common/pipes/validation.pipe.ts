import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(ValidationPipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Log request body trước khi xử lý
    this.logger.log(`Request body trước khi xử lý: ${JSON.stringify(value)}`);

    // Xử lý chuỗi rỗng thành null
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(key => {
        if (value[key] === '') {
          this.logger.log(`Chuyển giá trị rỗng thành null cho trường: ${key}`);
          value[key] = null;
        }
      });
    }

    // Log sau khi xử lý
    this.logger.log(`Request body sau khi xử lý: ${JSON.stringify(value)}`);

    const object = plainToInstance(metatype, value, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    });
    
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: true, // Bỏ qua các trường không có trong request
      forbidUnknownValues: false, // Cho phép các giá trị không xác định
      stopAtFirstError: false, // Kiểm tra tất cả các lỗi, không dừng lại ở lỗi đầu tiên
    });

    if (errors.length > 0) {
      const messages = errors.map(error => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        const message = {
          field: error.property,
          message: constraints.length > 0 ? constraints[0] : 'Validation error',
          value: error.value,
          constraints: error.constraints
        };
        this.logger.error(`Validation error: ${JSON.stringify(message)}`);
        return message;
      });

      throw new BadRequestException({
        success: false,
        message: 'Validation failed',
        errors: messages
      });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: (Function)[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype as any);
  }
}
