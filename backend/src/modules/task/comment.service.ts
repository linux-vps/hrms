import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from './entities/task.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  /**
   * Tạo bình luận mới
   */
  async create(createCommentDto: CreateCommentDto, employeeId: string): Promise<Comment> {
    // Kiểm tra công việc có tồn tại không
    const task = await this.taskRepository.findOne({
      where: { id: createCommentDto.taskId },
      relations: ['assignees', 'supervisor', 'assigner'],
    });
    
    if (!task) {
      throw new NotFoundException(`Công việc với ID ${createCommentDto.taskId} không tồn tại`);
    }
    
    // Kiểm tra nhân viên
    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    
    if (!employee) {
      throw new NotFoundException(`Nhân viên với ID ${employeeId} không tồn tại`);
    }
    
    // Kiểm tra quyền bình luận
    const isAssignee = task.assignees.some(assignee => assignee.id === employeeId);
    const isSupervisor = task.supervisorId === employeeId;
    const isAssigner = task.assignerId === employeeId;
    
    if (!isAssignee && !isSupervisor && !isAssigner) {
      throw new ForbiddenException('Bạn không có quyền bình luận trong công việc này');
    }
    
    // Tạo bình luận mới
    const comment = this.commentRepository.create({
      ...createCommentDto,
      employeeId,
    });
    
    return this.commentRepository.save(comment);
  }

  /**
   * Lấy tất cả bình luận của một công việc
   */
  async findByTask(taskId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { taskId },
      relations: ['employee'],
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * Lấy thông tin chi tiết của một bình luận
   */
  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['employee', 'task'],
    });
    
    if (!comment) {
      throw new NotFoundException(`Bình luận với ID ${id} không tồn tại`);
    }
    
    return comment;
  }

  /**
   * Xóa bình luận
   */
  async remove(id: string, employeeId: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    
    if (!comment) {
      throw new NotFoundException(`Bình luận với ID ${id} không tồn tại`);
    }
    
    // Chỉ người tạo bình luận mới có quyền xóa
    if (comment.employeeId !== employeeId) {
      throw new ForbiddenException('Bạn không có quyền xóa bình luận này');
    }
    
    await this.commentRepository.remove(comment);
  }

  /**
   * Đánh dấu bình luận là tóm tắt công việc
   */
  async markAsSummary(id: string, isSummary: boolean, employeeId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['employee', 'task'],
    });
    
    if (!comment) {
      throw new NotFoundException(`Bình luận với ID ${id} không tồn tại`);
    }
    
    // Kiểm tra quyền cập nhật (chỉ người tạo bình luận hoặc người giao việc/giám sát có quyền)
    const task = await this.taskRepository.findOne({
      where: { id: comment.taskId },
      relations: ['supervisor', 'assigner'],
    });
    
    const isAuthor = comment.employeeId === employeeId;
    const isSupervisor = task.supervisorId === employeeId;
    const isAssigner = task.assignerId === employeeId;
    
    if (!isAuthor && !isSupervisor && !isAssigner) {
      throw new ForbiddenException('Bạn không có quyền đánh dấu bình luận này là tóm tắt');
    }
    
    // Cập nhật trạng thái isSummary
    comment.isSummary = isSummary;
    
    return this.commentRepository.save(comment);
  }

  /**
   * Đảo trạng thái tóm tắt của bình luận
   * @deprecated Thay thế bằng markAsSummary
   */
  async toggleSummary(id: string, employeeId: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    
    if (!comment) {
      throw new NotFoundException(`Bình luận với ID ${id} không tồn tại`);
    }
    
    // Kiểm tra quyền cập nhật
    if (comment.employeeId !== employeeId) {
      throw new ForbiddenException('Bạn không có quyền cập nhật bình luận này');
    }
    
    // Đảo trạng thái isSummary
    comment.isSummary = !comment.isSummary;
    
    return this.commentRepository.save(comment);
  }
} 