import { UserRole } from 'src/common/types/enums.type';
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto {
    email: string;
    password: string;
}
export declare class CreateUserForEmployeeDto {
    email: string;
    password: string;
    role?: UserRole;
}
export declare class CreateAdminDto {
    email: string;
    password: string;
    employeeId?: string;
}
export declare class LoginResponseDto {
    token: string;
    userId: string;
    employeeId?: string;
    role: UserRole;
}
