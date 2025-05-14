import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MailService } from '../mail/mail.service';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private mailService: MailService,
  ) {}

  /**
   * Tạo dự án mới
   */
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { memberIds, ...projectData } = createProjectDto;
    
    // Kiểm tra người quản lý dự án có tồn tại không
    const manager = await this.employeeRepository.findOne({
      where: { id: createProjectDto.managerId },
    });
    
    if (!manager) {
      throw new NotFoundException(`Không tìm thấy người quản lý với ID: ${createProjectDto.managerId}`);
    }
    
    // Tạo dự án mới
    const project = this.projectRepository.create(projectData);
    
    // Thêm thành viên nếu có
    if (memberIds && memberIds.length > 0) {
      const members = await this.employeeRepository.find({
        where: { id: In(memberIds) },
      });
      
      if (members.length !== memberIds.length) {
        throw new BadRequestException('Một số thành viên không tồn tại');
      }
      
      project.members = members;
    } else {
      project.members = [];
    }
    
    // Lưu dự án vào database
    const savedProject = await this.projectRepository.save(project);
    
    // Gửi email thông báo cho manager và các thành viên
    try {
      // Gửi email cho người quản lý
      await this.mailService.sendMail(
        manager.email,
        `Bạn đã được giao quản lý dự án: ${project.name}`,
        'project-manager-assigned',
        {
          fullName: manager.fullName || 'Người dùng',
          projectName: project.name,
          projectId: savedProject.id,
        }
      );
      
      // Gửi email cho các thành viên
      if (project.members && project.members.length > 0) {
        for (const member of project.members) {
          await this.mailService.sendMail(
            member.email,
            `Bạn đã được thêm vào dự án: ${project.name}`,
            'project-member-added',
            {
              fullName: member.fullName || 'Người dùng',
              projectName: project.name,
              projectId: savedProject.id,
              managerName: manager.fullName || 'Người quản lý',
            }
          );
        }
      }
    } catch (error) {
      this.logger.error(`Lỗi khi gửi email thông báo: ${error.message}`);
      // Không throw exception vì dự án đã được tạo thành công
    }
    
    return savedProject;
  }

  /**
   * Lấy tất cả dự án
   */
  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['department', 'manager', 'members'],
    });
  }

  /**
   * Lấy dự án theo ID
   */
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['department', 'manager', 'members', 'tasks'],
    });
    
    if (!project) {
      throw new NotFoundException(`Dự án với ID ${id} không tồn tại`);
    }
    
    return project;
  }

  /**
   * Lấy danh sách dự án theo phòng ban
   */
  async findByDepartment(departmentId: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { departmentId },
      relations: ['manager', 'members'],
    });
  }

  /**
   * Lấy danh sách dự án của nhân viên (là thành viên hoặc người quản lý)
   */
  async findByEmployee(employeeId: string): Promise<Project[]> {
    // Lấy dự án mà nhân viên là người quản lý
    const managedProjects = await this.projectRepository.find({
      where: { managerId: employeeId },
      relations: ['department', 'manager', 'members'],
    });
    
    // Lấy dự án mà nhân viên là thành viên
    const memberProjects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoinAndSelect('project.members', 'member', 'member.id = :employeeId', { employeeId })
      .leftJoinAndSelect('project.department', 'department')
      .leftJoinAndSelect('project.manager', 'manager')
      .leftJoinAndSelect('project.members', 'members')
      .getMany();
    
    // Kết hợp và loại bỏ trùng lặp
    const allProjects = [...managedProjects, ...memberProjects];
    const uniqueProjects = Array.from(new Map(allProjects.map(project => [project.id, project])).values());
    
    return uniqueProjects;
  }

  /**
   * Kiểm tra một nhân viên có phải là thành viên của dự án hay không
   */
  async isProjectMember(projectId: string, employeeId: string): Promise<boolean> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['members'],
    });
    
    if (!project) {
      throw new NotFoundException(`Dự án với ID ${projectId} không tồn tại`);
    }
    
    // Kiểm tra xem employeeId có phải là manager hoặc member không
    if (project.managerId === employeeId) {
      return true;
    }
    
    return project.members.some(member => member.id === employeeId);
  }

  /**
   * Cập nhật thông tin dự án
   */
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    
    // Nếu đổi manager, kiểm tra manager mới có tồn tại không
    if (updateProjectDto.managerId && updateProjectDto.managerId !== project.managerId) {
      const manager = await this.employeeRepository.findOne({
        where: { id: updateProjectDto.managerId },
      });
      
      if (!manager) {
        throw new NotFoundException(`Không tìm thấy người quản lý với ID: ${updateProjectDto.managerId}`);
      }
    }
    
    // Cập nhật thông tin dự án
    Object.assign(project, updateProjectDto);
    
    // Lưu vào database
    return this.projectRepository.save(project);
  }

  /**
   * Xóa dự án
   */
  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  /**
   * Thêm thành viên vào dự án
   */
  async addMember(projectId: string, employeeId: string): Promise<Project> {
    const project = await this.findOne(projectId);
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    
    if (!employee) {
      throw new NotFoundException(`Nhân viên với ID ${employeeId} không tồn tại`);
    }
    
    // Kiểm tra nhân viên đã là thành viên chưa
    const isMember = project.members.some(member => member.id === employeeId);
    if (isMember) {
      throw new BadRequestException(`Nhân viên đã là thành viên của dự án`);
    }
    
    // Thêm nhân viên vào dự án
    project.members.push(employee);
    
    // Lưu vào database
    const updatedProject = await this.projectRepository.save(project);
    
    // Gửi email thông báo
    try {
      await this.mailService.sendMail(
        employee.email,
        `Bạn đã được thêm vào dự án: ${project.name}`,
        'project-member-added',
        {
          fullName: employee.fullName || 'Người dùng',
          projectName: project.name,
          projectId: projectId,
        }
      );
    } catch (error) {
      this.logger.error(`Lỗi khi gửi email thông báo: ${error.message}`);
    }
    
    return updatedProject;
  }

  /**
   * Xóa thành viên khỏi dự án
   */
  async removeMember(projectId: string, employeeId: string): Promise<Project> {
    const project = await this.findOne(projectId);
    
    // Kiểm tra nhân viên có phải là thành viên không
    const memberIndex = project.members.findIndex(member => member.id === employeeId);
    if (memberIndex === -1) {
      throw new BadRequestException(`Nhân viên không phải là thành viên của dự án`);
    }
    
    // Xóa nhân viên khỏi dự án
    project.members.splice(memberIndex, 1);
    
    // Lưu vào database
    return this.projectRepository.save(project);
  }
} 