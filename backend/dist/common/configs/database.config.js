"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const getDatabaseConfig = (configService) => {
    return {
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'quanlynhansu'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE', false),
        logging: configService.get('DB_LOGGING', false),
        ssl: {
            rejectUnauthorized: true,
        },
    };
};
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map