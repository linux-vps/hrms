import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, Query, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Task, TaskStatus } from './entities/task.entity';
import { SubTask } from './entities/subtask.entity';
import { CurrentUser, CurrentUserInfo } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { ProjectService } from '../project/project.service';
import { Logger } from '@nestjs/common';
  
@ApiTags('Quản lý công việc')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
@ApiExtraModels(Task, SubTask, CreateTaskDto, CreateSubTaskDto, UpdateTaskDto, UpdateSubTaskDto, UpdateTaskStatusDto)
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo công việc mới',
    description: 'Tạo công việc mới trong dự án. Người dùng sẽ tự động được gán là người giao việc. Chỉ admin, quản lý phòng ban hoặc thành viên dự án mới có quyền tạo công việc.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Công việc đã được tạo thành công',
    type: Task
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền tạo công việc trong dự án này'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy dự án hoặc người liên quan'
  })
  @ApiBody({ type: CreateTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: CurrentUserInfo) {
    // Lấy thông tin dự án để kiểm tra quyền
    const project = await this.projectService.findOne(createTaskDto.projectId);
    
    // Kiểm tra quyền: Admin, quản lý phòng ban hoặc thành viên dự án mới được tạo công việc
    const isProjectMember = await this.projectService.isProjectMember(createTaskDto.projectId, user.id);
    
    if (
      user.role !== Role.ADMIN &&
      (user.role !== Role.MANAGER || project.departmentId !== user.departmentId) &&
      !isProjectMember
    ) {
      throw new ForbiddenException('Bạn không có quyền tạo công việc trong dự án này');
    }
    
    // Tự động gán người giao việc là người đang đăng nhập
    createTaskDto.assignerId = user.id;
    
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách công việc',
    description: 'Lấy danh sách công việc dựa trên quyền hạn của người dùng và tham số truy vấn. Kết quả trả về sẽ khác nhau tùy theo vai trò của người dùng.'
  })
  @ApiQuery({
    name: 'projectId',
    required: false,
    description: 'ID dự án (nếu muốn lấy công việc của một dự án cụ thể)'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách công việc',
    type: [Task]
  })
  async findAll(
    @Query('projectId') projectId?: string,
    @CurrentUser() user?: CurrentUserInfo,
  ) {
    // Nếu có projectId thì lấy theo dự án
    if (projectId) {
      return this.taskService.findByProject(projectId);
    }
    
    // Nếu là admin thì lấy tất cả
    if (user.role === Role.ADMIN) {
      return this.taskService.findAll();
    }
    
    // Nếu là quản lý thì lấy công việc theo phòng ban
    if (user.role === Role.MANAGER) {
      return this.taskService.findByDepartment(user.departmentId);
    }
    
    // Người dùng thông thường thì lấy công việc được giao cho họ
    return this.taskService.findByAssignee(user.id);
  }

  @Get('assigned-to-me')
  @ApiOperation({
    summary: 'Lấy danh sách công việc được giao cho người dùng hiện tại',
    description: 'Trả về danh sách các công việc mà người dùng đang đăng nhập được giao làm'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách công việc được giao',
    type: [Task]
  })
  async findMyTasks(@CurrentUser() user: CurrentUserInfo) {
    this.logger.log(`Người dùng ${user.id} đang tìm các task được giao`);
    return this.taskService.findByAssignee(user.id);
  }

  @Get('in-my-projects')
  @ApiOperation({
    summary: 'Lấy danh sách công việc trong các dự án của người dùng',
    description: 'Trả về danh sách tất cả các công việc trong dự án mà người dùng đang tham gia, bao gồm cả những công việc không được giao cho họ'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách công việc trong dự án',
    type: [Task]
  })
  async findTasksInMyProjects(@CurrentUser() user: CurrentUserInfo) {
    this.logger.log(`Người dùng ${user.id} đang tìm các task trong dự án tham gia`);
    return this.taskService.findTasksInEmployeeProjects(user.id);
  }

  @Get('supervised-by-me')
  @ApiOperation({
    summary: 'Lấy danh sách công việc do người dùng hiện tại giám sát',
    description: 'Trả về danh sách các công việc mà người dùng đang đăng nhập là người giám sát'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách công việc giám sát',
    type: [Task]
  })
  async findTasksISupervise(@CurrentUser() user: CurrentUserInfo) {
    return this.taskService.findBySupervisor(user.id);
  }

  @Get('overdue')
  @ApiOperation({
    summary: 'Lấy danh sách công việc quá hạn',
    description: 'Trả về danh sách các công việc đã quá hạn nhưng chưa hoàn thành'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách công việc quá hạn',
    type: [Task]
  })
  async findOverdueTasks() {
    return this.taskService.findOverdueTasks();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin chi tiết của công việc',
    description: 'Lấy thông tin chi tiết của một công việc theo ID'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc cần xem chi tiết'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin chi tiết công việc',
    type: Task
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc với ID đã cung cấp'
  })
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Cập nhật trạng thái công việc',
    description: 'Cập nhật trạng thái công việc theo quy trình làm việc. Các chuyển trạng thái chỉ được thực hiện theo quy trình và bởi người có quyền tương ứng.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc cần cập nhật trạng thái'
  })
  @ApiBody({
    type: UpdateTaskStatusDto,
    description: 'Thông tin trạng thái mới và ghi chú kèm theo'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trạng thái đã được cập nhật thành công',
    type: Task
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền cập nhật hoặc chuyển trạng thái không hợp lệ'
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return this.taskService.updateStatus(id, updateTaskStatusDto, user.id);
  }

  @Post(':id/subtasks')
  @ApiOperation({
    summary: 'Thêm công việc con',
    description: 'Thêm một công việc con (subtask) vào công việc chính. Chỉ người liên quan đến công việc mới có quyền thêm công việc con.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc chính'
  })
  @ApiBody({
    type: CreateSubTaskDto,
    description: 'Thông tin công việc con cần thêm'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Công việc con đã được tạo thành công',
    type: SubTask
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc chính'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền thêm công việc con'
  })
  async addSubtask(
    @Param('id') id: string,
    @Body() createSubtaskDto: CreateSubTaskDto,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    // Trước tiên lấy task để kiểm tra quyền
    const task = await this.taskService.findOne(id);
    
    // Kiểm tra quyền: người được giao việc, người giám sát hoặc người giao việc mới được thêm subtask
    const isAssignee = task.assignees.some(assignee => assignee.id === user.id);
    if (
      user.role !== Role.ADMIN &&
      task.assignerId !== user.id &&
      task.supervisorId !== user.id &&
      !isAssignee
    ) {
      throw new ForbiddenException('Bạn không có quyền thêm công việc con');
    }
    
    return this.taskService.addSubtask(id, createSubtaskDto);
  }

  @Patch('subtasks/:id')
  @ApiOperation({
    summary: 'Cập nhật trạng thái công việc con',
    description: 'Cập nhật trạng thái hoàn thành của công việc con. Chỉ người liên quan đến công việc mới có quyền cập nhật.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc con'
  })
  @ApiQuery({
    name: 'completed',
    description: 'Trạng thái hoàn thành (true/false)',
    type: 'boolean'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Công việc con đã được cập nhật thành công',
    type: SubTask
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc con'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền cập nhật công việc con này'
  })
  async updateSubtask(
    @Param('id') id: string,
    @Query('completed') completed: boolean,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    // Lấy subtask để kiểm tra quyền
    const subtask = await this.taskService.findSubtask(id);
    const task = await this.taskService.findOne(subtask.taskId);
    
    // Kiểm tra quyền: người được giao việc, người giám sát hoặc người giao việc mới được cập nhật subtask
    const isAssignee = task.assignees.some(assignee => assignee.id === user.id);
    if (
      user.role !== Role.ADMIN &&
      task.assignerId !== user.id &&
      task.supervisorId !== user.id &&
      !isAssignee
    ) {
      throw new ForbiddenException('Bạn không có quyền cập nhật công việc con này');
    }
    
    return this.taskService.updateSubtask(id, completed === true);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật thông tin công việc',
    description: 'Cập nhật thông tin chi tiết của công việc như tiêu đề, mô tả, ngày hết hạn, người giám sát, v.v. Chỉ người giao việc hoặc người giám sát mới có quyền cập nhật.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc cần cập nhật'
  })
  @ApiBody({
    type: UpdateTaskDto,
    description: 'Thông tin cập nhật của công việc'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Công việc đã được cập nhật thành công',
    type: Task
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền cập nhật thông tin công việc này'
  })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return this.taskService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa công việc',
    description: 'Xóa một công việc và tất cả các công việc con, bình luận liên quan. Chỉ người giao việc mới có quyền xóa công việc.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc cần xóa'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Công việc đã được xóa thành công'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền xóa công việc này'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Không thể xóa công việc đã hoàn thành'
  })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    await this.taskService.remove(id, user.id);
    return { message: 'Công việc đã được xóa thành công' };
  }

  @Patch('subtasks/:id/content')
  @ApiOperation({
    summary: 'Cập nhật nội dung công việc con',
    description: 'Cập nhật nội dung và trạng thái của công việc con. Chỉ người liên quan đến công việc mới có quyền cập nhật.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc con'
  })
  @ApiBody({
    type: UpdateSubTaskDto,
    description: 'Thông tin cập nhật của công việc con'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Công việc con đã được cập nhật thành công',
    type: SubTask
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc con'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền cập nhật công việc con này'
  })
  async updateSubTaskContent(
    @Param('id') id: string,
    @Body() updateSubTaskDto: UpdateSubTaskDto,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    // Lấy subtask để kiểm tra quyền
    const subtask = await this.taskService.findSubtask(id);
    const task = await this.taskService.findOne(subtask.taskId);
    
    // Kiểm tra quyền: người được giao việc, người giám sát hoặc người giao việc mới được cập nhật subtask
    const isAssignee = task.assignees.some(assignee => assignee.id === user.id);
    if (
      user.role !== Role.ADMIN &&
      task.assignerId !== user.id &&
      task.supervisorId !== user.id &&
      !isAssignee
    ) {
      throw new ForbiddenException('Bạn không có quyền cập nhật công việc con này');
    }
    
    return this.taskService.updateSubTaskContent(id, updateSubTaskDto);
  }

  @Delete('subtasks/:id')
  @ApiOperation({
    summary: 'Xóa công việc con',
    description: 'Xóa một công việc con. Chỉ người giao việc hoặc người giám sát mới có quyền xóa công việc con.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID công việc con cần xóa'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Công việc con đã được xóa thành công'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc con'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền xóa công việc con này'
  })
  async removeSubtask(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    // Lấy subtask để kiểm tra quyền
    const subtask = await this.taskService.findSubtask(id);
    const task = await this.taskService.findOne(subtask.taskId);
    
    // Kiểm tra quyền: chỉ người giao việc hoặc người giám sát mới được xóa subtask
    if (
      user.role !== Role.ADMIN &&
      task.assignerId !== user.id &&
      task.supervisorId !== user.id
    ) {
      throw new ForbiddenException('Bạn không có quyền xóa công việc con này');
    }
    
    await this.taskService.removeSubtask(id);
    return { message: 'Công việc con đã được xóa thành công' };
  }

  @Get('debug/employee-project-relation')
  @ApiOperation({
    summary: 'Kiểm tra mối quan hệ giữa nhân viên và dự án',
    description: 'Endpoint này để debug khi có vấn đề với việc xem các task trong dự án'
  })
  @ApiQuery({
    name: 'projectId',
    required: true,
    description: 'ID của dự án cần kiểm tra'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin về mối quan hệ giữa người dùng hiện tại và dự án'
  })
  async debugEmployeeProjectRelation(
    @Query('projectId') projectId: string,
    @CurrentUser() user: CurrentUserInfo
  ) {
    this.logger.log(`Đang kiểm tra mối quan hệ giữa nhân viên ${user.id} và dự án ${projectId}`);
    
    // Lấy thông tin dự án
    const project = await this.projectService.findOne(projectId);
    
    // Kiểm tra xem nhân viên có phải là thành viên của dự án không
    const isProjectMember = await this.projectService.isProjectMember(projectId, user.id);
    
    // Lấy danh sách tất cả thành viên trong dự án
    const projectWithMembers = await this.projectService.findOne(projectId);
    
    // Tạo đối tượng debug
    const debugInfo = {
      project: {
        id: project.id,
        name: project.name,
        departmentId: project.departmentId,
        managerId: project.managerId
      },
      employee: {
        id: user.id,
        role: user.role,
        departmentId: user.departmentId
      },
      relation: {
        isProjectMember: isProjectMember,
        isManager: project.managerId === user.id,
        isDepartmentManager: user.role === Role.MANAGER && project.departmentId === user.departmentId
      },
      projectMembers: projectWithMembers.members.map(member => ({
        id: member.id,
        fullName: member.fullName,
        email: member.email
      }))
    };
    
    return debugInfo;
  }
} 