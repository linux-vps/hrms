import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EmployeeService } from '../../employee/employee.service';
import { JwtPayload } from '../../../common/interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private employeeService: EmployeeService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'), // Use environment variable in production
    });
  }

  async validate(payload: JwtPayload) {
    try {
      console.log('JWT Payload:', payload);
      
      const employee = await this.employeeService.findOne(payload.sub);
      
      console.log('Found employee:', {
        id: employee.id,
        email: employee.email,
        role: employee.role
      });

      if (!employee || !employee.isActive) {
        console.log('Employee validation failed:', {
          found: !!employee,
          isActive: employee?.isActive
        });
        throw new UnauthorizedException('Employee not found or deactivated');
      }
      
      const result = {
        id: employee.id,
        role: employee.role.toLowerCase(),
        departmentId: employee.departmentId ?? undefined,
      };

      console.log('JWT validation result:', result);
      
      return result;
    } catch (error) {
      console.error('JWT validation error:', error);
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }
}
