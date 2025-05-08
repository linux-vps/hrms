import { PayrollService } from '../services/payroll.service';
import { CreatePayrollDto, UpdatePayrollDto } from '../dtos/payroll.dto';
import { Request } from 'express';
export declare class PayrollController {
    private readonly payrollService;
    constructor(payrollService: PayrollService);
    create(createPayrollDto: CreatePayrollDto, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/payroll.entity").Payroll>>;
    findAll(req: Request, query: any): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/payroll.entity").Payroll[]>>;
    findOne(id: string, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/payroll.entity").Payroll>>;
    update(id: string, updatePayrollDto: UpdatePayrollDto, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<import("../entities/payroll.entity").Payroll>>;
    remove(id: string, req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<unknown>>;
    generateMonthlyPayrolls(req: Request): Promise<import("src/common/dtos/api-response.dto").ApiResponseDto<any[]>>;
}
