import { Injectable, NotFoundException, BadRequestException, Logger, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { SubTask } from './entities/subtask.entity';
import { Comment } from './entities/comment.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { MailService } from '../mail/mail.service';
import { Employee } from '../employee/entities/employee.entity';
import { Project } from '../project/entities/project.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(SubTask)
    private subtaskRepository: Repository<SubTask>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private mailService: MailService,
  ) {}

  /**
   * Tạo công việc mới
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { assigneeIds, subtasks, ...taskData } = createTaskDto;
    
    // Kiểm tra dự án có tồn tại không
    const project = await this.projectRepository.findOne({
      where: { id: createTaskDto.projectId },
    });
    
    if (!project) {
      throw new NotFoundException(`Dự án với ID ${createTaskDto.projectId} không tồn tại`);
    }
    
    // Kiểm tra người giao việc có tồn tại không
    const assigner = await this.employeeRepository.findOne({
      where: { id: createTaskDto.assignerId },
    });
    
    if (!assigner) {
      throw new NotFoundException(`Người giao việc với ID ${createTaskDto.assignerId} không tồn tại`);
    }
    
    // Kiểm tra người giám sát có tồn tại không
    const supervisor = await this.employeeRepository.findOne({
      where: { id: createTaskDto.supervisorId },
    });
    
    if (!supervisor) {
      throw new NotFoundException(`Người giám sát với ID ${createTaskDto.supervisorId} không tồn tại`);
    }
    
    // Kiểm tra và lấy danh sách người được giao việc
    let assignees = [];
    if (assigneeIds && assigneeIds.length > 0) {
      assignees = await this.employeeRepository.find({
        where: { id: In(assigneeIds) },
      });
      
      if (assignees.length !== assigneeIds.length) {
        throw new BadRequestException('Một số người được giao việc không tồn tại');
      }
    }
    
    // Tạo công việc mới
    const task = this.taskRepository.create(taskData);
    task.status = TaskStatus.PENDING;
    task.assignees = assignees;
    
    // Lưu công việc vào database
    const savedTask = await this.taskRepository.save(task);
    
    // Tạo các subtask nếu có
    if (subtasks && subtasks.length > 0) {
      for (const subtaskDto of subtasks) {
        const subtask = new SubTask();
        subtask.content = subtaskDto.content;
        subtask.completed = subtaskDto.completed || false;
        subtask.taskId = savedTask.id;
        await this.subtaskRepository.save(subtask);
      }
    }
    
    // Gửi email thông báo
    try {
      // Gửi email cho người giám sát
      await this.mailService.sendMail(
        supervisor.email,
        `Bạn được chỉ định giám sát công việc: ${task.title}`,
        'task-supervisor-assigned',
        {
          fullName: supervisor.fullName || 'Người dùng',
          taskTitle: task.title,
          taskId: savedTask.id,
          projectName: project.name,
          assignerName: assigner.fullName || 'Người giao việc',
        }
      );
      
      // Gửi email cho những người được giao việc
      if (assignees.length > 0) {
        for (const assignee of assignees) {
          await this.mailService.sendMail(
            assignee.email,
            `Bạn được giao công việc mới: ${task.title}`,
            'task-assigned',
            {
              fullName: assignee.fullName || 'Người dùng',
              taskTitle: task.title,
              taskId: savedTask.id,
              projectName: project.name,
              assignerName: assigner.fullName || 'Người giao việc',
              supervisorName: supervisor.fullName || 'Người giám sát',
              dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString('vi-VN') : 'Không có hạn',
            }
          );
        }
      }
    } catch (error) {
      this.logger.error(`Lỗi khi gửi email thông báo: ${error.message}`);
      // Không throw exception vì công việc đã được tạo thành công
    }
    
    return this.findOne(savedTask.id);
  }

  /**
   * Lấy danh sách công việc
   */
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['project', 'assigner', 'supervisor', 'assignees', 'subtasks'],
    });
  }

  /**
   * Lấy công việc theo ID
   */
  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'assigner', 'supervisor', 'assignees', 'subtasks', 'comments', 'comments.employee'],
    });
    
    if (!task) {
      throw new NotFoundException(`Công việc với ID ${id} không tồn tại`);
    }
    
    return task;
  }

  /**
   * Lấy danh sách công việc theo dự án
   */
  async findByProject(projectId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { projectId },
      relations: ['assigner', 'supervisor', 'assignees', 'subtasks'],
    });
  }

  /**
   * Lấy danh sách công việc theo phòng ban
   */
  async findByDepartment(departmentId: string): Promise<Task[]> {
    // Lấy tất cả dự án trong phòng ban
    const projects = await this.projectRepository.find({
      where: { departmentId },
      select: ['id']
    });
    
    if (projects.length === 0) {
      return [];
    }
    
    const projectIds = projects.map(project => project.id);
    
    // Lấy tất cả công việc thuộc các dự án trong phòng ban
    return this.taskRepository.find({
      where: { projectId: In(projectIds) },
      relations: ['project', 'assigner', 'supervisor', 'assignees', 'subtasks'],
    });
  }

  /**
   * Lấy danh sách công việc của nhân viên
   */
  async findByAssignee(employeeId: string): Promise<Task[]> {
    return this.taskRepository
      .createQueryBuilder('task')
      .innerJoinAndSelect('task.assignees', 'assignee', 'assignee.id = :employeeId', { employeeId })
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.assigner', 'assigner')
      .leftJoinAndSelect('task.supervisor', 'supervisor')
      .leftJoinAndSelect('task.assignees', 'assignees')
      .leftJoinAndSelect('task.subtasks', 'subtasks')
      .getMany();
  }

  /**
   * Lấy danh sách công việc do nhân viên giám sát
   */
  async findBySupervisor(employeeId: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: { supervisorId: employeeId },
      relations: ['project', 'assigner', 'assignees', 'subtasks'],
    });
  }

  /**
   * Lấy danh sách công việc quá hạn
   */
  async findOverdueTasks(): Promise<Task[]> {
    const now = new Date();
    return this.taskRepository.find({
      where: {
        dueDate: LessThanOrEqual(now),
        status: In([TaskStatus.PENDING, TaskStatus.IN_PROGRESS])
      },
      relations: ['project', 'assigner', 'supervisor', 'assignees'],
    });
  }

  /**
   * Cập nhật trạng thái công việc
   */
  async updateStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto, employeeId: string): Promise<Task> {
    const task = await this.findOne(id);
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    
    // Kiểm tra quyền cập nhật trạng thái
    const isAssignee = task.assignees.some(assignee => assignee.id === employeeId);
    const isSupervisor = task.supervisorId === employeeId;
    const isAssigner = task.assignerId === employeeId;
    
    // Chỉ người được giao việc, người giám sát và người giao việc mới có quyền cập nhật
    if (!isAssignee && !isSupervisor && !isAssigner) {
      throw new ForbiddenException('Bạn không có quyền cập nhật trạng thái công việc này');
    }
    
    // Kiểm tra logic chuyển trạng thái
    const { status, comment } = updateTaskStatusDto;
    const oldStatus = task.status;
    
    // Chuyển từ PENDING sang IN_PROGRESS (chỉ assignee)
    if (oldStatus === TaskStatus.PENDING && status === TaskStatus.IN_PROGRESS) {
      if (!isAssignee) {
        throw new ForbiddenException('Chỉ người được giao việc mới có thể bắt đầu công việc');
      }
      task.startedAt = new Date();
    }
    
    // Chuyển từ IN_PROGRESS sang WAITING_REVIEW (chỉ assignee)
    else if (oldStatus === TaskStatus.IN_PROGRESS && status === TaskStatus.WAITING_REVIEW) {
      if (!isAssignee) {
        throw new ForbiddenException('Chỉ người được giao việc mới có thể nộp công việc để xét duyệt');
      }
      task.submittedAt = new Date();
    }
    
    // Chuyển từ WAITING_REVIEW sang COMPLETED hoặc REJECTED (chỉ supervisor)
    else if (oldStatus === TaskStatus.WAITING_REVIEW && (status === TaskStatus.COMPLETED || status === TaskStatus.REJECTED)) {
      if (!isSupervisor) {
        throw new ForbiddenException('Chỉ người giám sát mới có thể xác nhận hoàn thành hoặc từ chối công việc');
      }
      
      if (status === TaskStatus.COMPLETED) {
        task.completedAt = new Date();
      }
    }
    
    // Các trường hợp khác không được phép
    else {
      throw new BadRequestException(`Không thể chuyển trạng thái từ ${oldStatus} sang ${status}`);
    }
    
    // Cập nhật trạng thái
    task.status = status;
    
    // Lưu vào database
    const updatedTask = await this.taskRepository.save(task);
    
    // Tạo comment nếu có
    if (comment) {
      const commentEntity = new Comment();
      commentEntity.content = comment;
      commentEntity.taskId = task.id;
      commentEntity.employeeId = employeeId;
      commentEntity.isSummary = true;
      
      await this.taskRepository.manager.save(Comment, commentEntity);
    }
    
    // Gửi email thông báo
    try {
      // Thông báo cho supervisor khi assignee nộp công việc
      if (oldStatus === TaskStatus.IN_PROGRESS && status === TaskStatus.WAITING_REVIEW) {
        await this.mailService.sendMail(
          task.supervisor.email,
          `Công việc cần xét duyệt: ${task.title}`,
          'task-submitted-for-review',
          {
            fullName: task.supervisor.fullName || 'Người dùng',
            taskTitle: task.title,
            taskId: task.id,
            submitterName: employee.fullName || 'Người thực hiện',
            projectName: task.project.name,
            comment: comment || 'Không có ghi chú',
          }
        );
      }
      
      // Thông báo cho assignees khi supervisor xác nhận hoàn thành hoặc từ chối
      else if (oldStatus === TaskStatus.WAITING_REVIEW && (status === TaskStatus.COMPLETED || status === TaskStatus.REJECTED)) {
        for (const assignee of task.assignees) {
          await this.mailService.sendMail(
            assignee.email,
            `Công việc ${status === TaskStatus.COMPLETED ? 'đã được xác nhận hoàn thành' : 'bị từ chối'}: ${task.title}`,
            'task-review-result',
            {
              fullName: assignee.fullName || 'Người dùng',
              taskTitle: task.title,
              taskId: task.id,
              supervisorName: employee.fullName || 'Người giám sát',
              isCompleted: status === TaskStatus.COMPLETED,
              comment: comment || 'Không có ghi chú',
            }
          );
        }
      }
    } catch (error) {
      this.logger.error(`Lỗi khi gửi email thông báo: ${error.message}`);
    }
    
    return this.findOne(id);
  }

  /**
   * Thêm subtask vào công việc
   */
  async addSubtask(taskId: string, createSubtaskDto: CreateSubTaskDto): Promise<SubTask> {
    const task = await this.findOne(taskId);
    
    const subtask = this.subtaskRepository.create(createSubtaskDto);
    subtask.taskId = taskId;
    
    return this.subtaskRepository.save(subtask);
  }

  /**
   * Tìm thông tin của một subtask
   */
  async findSubtask(subtaskId: string): Promise<SubTask> {
    const subtask = await this.subtaskRepository.findOne({
      where: { id: subtaskId },
    });
    
    if (!subtask) {
      throw new NotFoundException(`Subtask với ID ${subtaskId} không tồn tại`);
    }
    
    return subtask;
  }

  /**
   * Cập nhật subtask
   */
  async updateSubtask(subtaskId: string, completed: boolean): Promise<SubTask> {
    const subtask = await this.findSubtask(subtaskId);
    
    subtask.completed = completed;
    
    return this.subtaskRepository.save(subtask);
  }

  /**
   * Cập nhật thông tin công việc
   */
  async update(id: string, updateTaskDto: UpdateTaskDto, employeeId: string): Promise<Task> {
    const task = await this.findOne(id);
    
    // Kiểm tra quyền cập nhật
    const isAssigner = task.assignerId === employeeId;
    const isSupervisor = task.supervisorId === employeeId;
    
    // Chỉ người giao việc hoặc người giám sát mới có quyền cập nhật thông tin
    if (!isAssigner && !isSupervisor) {
      throw new ForbiddenException('Bạn không có quyền cập nhật thông tin công việc này');
    }
    
    // Xử lý cập nhật người giám sát
    if (updateTaskDto.supervisorId && updateTaskDto.supervisorId !== task.supervisorId) {
      // Kiểm tra người giám sát mới có tồn tại không
      const newSupervisor = await this.employeeRepository.findOne({
        where: { id: updateTaskDto.supervisorId },
      });
      
      if (!newSupervisor) {
        throw new NotFoundException(`Người giám sát với ID ${updateTaskDto.supervisorId} không tồn tại`);
      }
      
      // Gửi email thông báo cho người giám sát mới
      try {
        await this.mailService.sendMail(
          newSupervisor.email,
          `Bạn được chỉ định giám sát công việc: ${task.title}`,
          'task-supervisor-assigned',
          {
            fullName: newSupervisor.fullName || 'Người dùng',
            taskTitle: task.title,
            taskId: task.id,
            projectName: task.project.name,
            assignerName: task.assigner.fullName || 'Người giao việc',
          }
        );
      } catch (error) {
        this.logger.error(`Lỗi khi gửi email thông báo: ${error.message}`);
      }
    }
    
    // Xử lý cập nhật người được giao việc
    if (updateTaskDto.assigneeIds && updateTaskDto.assigneeIds.length > 0) {
      // Kiểm tra và lấy danh sách người được giao việc
      const assignees = await this.employeeRepository.find({
        where: { id: In(updateTaskDto.assigneeIds) },
      });
      
      if (assignees.length !== updateTaskDto.assigneeIds.length) {
        throw new BadRequestException('Một số người được giao việc không tồn tại');
      }
      
      // Tìm những người được thêm mới
      const currentAssigneeIds = task.assignees.map(a => a.id);
      const newAssigneeIds = updateTaskDto.assigneeIds.filter(id => !currentAssigneeIds.includes(id));
      
      // Gửi email thông báo cho những người được thêm mới
      if (newAssigneeIds.length > 0) {
        try {
          const newAssignees = assignees.filter(a => newAssigneeIds.includes(a.id));
          for (const assignee of newAssignees) {
            await this.mailService.sendMail(
              assignee.email,
              `Bạn được giao công việc mới: ${task.title}`,
              'task-assigned',
              {
                fullName: assignee.fullName || 'Người dùng',
                taskTitle: task.title,
                taskId: task.id,
                projectName: task.project.name,
                assignerName: task.assigner.fullName || 'Người giao việc',
                supervisorName: task.supervisor.fullName || 'Người giám sát',
                dueDate: task.dueDate ? new Date(task.dueDate).toLocaleDateString('vi-VN') : 'Không có hạn',
              }
            );
          }
        } catch (error) {
          this.logger.error(`Lỗi khi gửi email thông báo: ${error.message}`);
        }
      }
      
      // Cập nhật danh sách người được giao việc
      task.assignees = assignees;
    }
    
    // Cập nhật các trường thông tin khác
    const { assigneeIds, ...updateData } = updateTaskDto;
    Object.assign(task, updateData);
    
    // Lưu vào database
    return this.taskRepository.save(task);
  }

  /**
   * Xóa công việc
   */
  async remove(id: string, employeeId: string): Promise<void> {
    const task = await this.findOne(id);
    
    // Kiểm tra quyền xóa
    const isAssigner = task.assignerId === employeeId;
    
    // Chỉ người giao việc mới có quyền xóa công việc
    if (!isAssigner) {
      throw new ForbiddenException('Bạn không có quyền xóa công việc này. Chỉ người giao việc mới có quyền xóa.');
    }
    
    // Chỉ cho phép xóa các công việc chưa hoàn thành
    if (task.status === TaskStatus.COMPLETED) {
      throw new BadRequestException('Không thể xóa công việc đã hoàn thành');
    }
    
    // Xóa các công việc con trước
    if (task.subtasks && task.subtasks.length > 0) {
      await this.subtaskRepository.remove(task.subtasks);
    }
    
    // Xóa các bình luận nếu có
    if (task.comments && task.comments.length > 0) {
      await this.taskRepository.manager.remove(Comment, task.comments);
    }
    
    // Xóa công việc
    await this.taskRepository.remove(task);
  }

  /**
   * Cập nhật thông tin công việc con
   */
  async updateSubTaskContent(subtaskId: string, updateSubTaskDto: UpdateSubTaskDto): Promise<SubTask> {
    const subtask = await this.findSubtask(subtaskId);
    
    // Cập nhật thông tin công việc con
    if (updateSubTaskDto.content !== undefined) {
      subtask.content = updateSubTaskDto.content;
    }
    
    if (updateSubTaskDto.completed !== undefined) {
      subtask.completed = updateSubTaskDto.completed;
    }
    
    return this.subtaskRepository.save(subtask);
  }

  /**
   * Xóa công việc con
   */
  async removeSubtask(subtaskId: string): Promise<void> {
    const subtask = await this.findSubtask(subtaskId);
    await this.subtaskRepository.remove(subtask);
  }
} 