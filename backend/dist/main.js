"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_config_1 = require("./common/configs/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const apiPrefix = configService.get('API_PREFIX', 'api');
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableCors();
    (0, swagger_config_1.setupSwagger)(app);
    const port = configService.get('PORT', 3000);
    await app.listen(port);
    console.log(`Ứng dụng đang chạy tại: http://localhost:${port}/${apiPrefix}`);
    console.log(`Swagger UI: http://localhost:${port}/${apiPrefix}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map