import { BaseEntity } from 'src/common/types/base-entity.type';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/auth/entities/user.entity';
export declare class Feed extends BaseEntity {
    title: string;
    content: string;
    createdBy: User;
    createdById: string;
    department: Department;
    departmentId: string;
    timestamp: Date;
    isImportant: boolean;
}
