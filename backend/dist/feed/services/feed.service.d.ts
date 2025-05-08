import { Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';
import { CreateFeedDto, UpdateFeedDto } from '../dtos/feed.dto';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/auth/entities/user.entity';
import { Employee } from 'src/employees/entities/employee.entity';
export declare class FeedService {
    private readonly feedRepository;
    private readonly departmentRepository;
    private readonly userRepository;
    private readonly employeeRepository;
    constructor(feedRepository: Repository<Feed>, departmentRepository: Repository<Department>, userRepository: Repository<User>, employeeRepository: Repository<Employee>);
    create(createFeedDto: CreateFeedDto, userId: string): Promise<Feed>;
    findAll(userId: string): Promise<Feed[]>;
    findByDepartment(departmentId: string, userId: string): Promise<Feed[]>;
    findOne(id: string, userId: string): Promise<Feed>;
    update(id: string, updateFeedDto: UpdateFeedDto, userId: string): Promise<Feed>;
    remove(id: string, userId: string): Promise<void>;
}
