import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto, RegisterDto, LoginResponseDto } from '../dtos/auth.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { UserRole } from 'src/common/types/enums.type';
export declare class AuthService {
    private readonly userRepository;
    private readonly employeeRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, employeeRepository: Repository<Employee>, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userId: string;
        employeeId?: string;
    }>;
    createUserForEmployee(employeeId: string, email: string, password: string, role?: UserRole): Promise<{
        message: string;
        userId: string;
        employeeId: string;
    }>;
    createAdminUser(email: string, password: string, employeeId?: string): Promise<{
        message: string;
        userId: string;
        employeeId?: string;
    }>;
    getUserProfile(userId: string): Promise<User>;
}
