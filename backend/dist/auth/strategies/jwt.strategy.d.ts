import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
interface JwtPayload {
    sub: string;
    email: string;
    role: string;
    employeeId?: string;
}
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userRepository;
    constructor(configService: ConfigService, userRepository: Repository<User>);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
