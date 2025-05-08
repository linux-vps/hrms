import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, LoginResponseDto, CreateUserForEmployeeDto, CreateAdminDto } from '../dtos/auth.dto';
import { Request } from 'express';
interface RequestWithUser extends Request {
    user: {
        sub: string;
        email: string;
        role: string;
        employeeId?: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<LoginResponseDto>>;
    register(registerDto: RegisterDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<{
        message: string;
        userId: string;
        employeeId?: string;
    }>>;
    createUserForEmployee(employeeId: string, createUserDto: CreateUserForEmployeeDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<{
        message: string;
        userId: string;
        employeeId: string;
    }>>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<{
        message: string;
        userId: string;
        employeeId?: string;
    }>>;
    getProfile(req: RequestWithUser): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/user.entity").User>>;
}
export {};
