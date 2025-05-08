export declare class CreatePayrollDto {
    employeeId: string;
    month: number;
    year: number;
    baseSalary: number;
    workingDays?: number;
    standardWorkingDays?: number;
    overtimeHours?: number;
    overtimePay?: number;
    totalAllowance?: number;
    totalBonus?: number;
    totalDeduction?: number;
    socialInsurance?: number;
    healthInsurance?: number;
    unemploymentInsurance?: number;
    personalIncomeTax?: number;
    note?: string;
}
export declare class UpdatePayrollDto {
    baseSalary?: number;
    workingDays?: number;
    standardWorkingDays?: number;
    overtimeHours?: number;
    overtimePay?: number;
    totalAllowance?: number;
    totalBonus?: number;
    totalDeduction?: number;
    socialInsurance?: number;
    healthInsurance?: number;
    unemploymentInsurance?: number;
    personalIncomeTax?: number;
    note?: string;
}
export declare class PayrollResponseDto {
    id: string;
    employeeId: string;
    employeeName: string;
    month: number;
    year: number;
    baseSalary: number;
    workingDays: number;
    overtimeHours: number;
    overtimePay: number;
    totalAllowance: number;
    totalBonus: number;
    totalDeduction: number;
    socialInsurance: number;
    healthInsurance: number;
    unemploymentInsurance: number;
    personalIncomeTax: number;
    netSalary: number;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}
