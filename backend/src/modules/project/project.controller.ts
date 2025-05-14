import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Patch, Query, HttpStatus, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Project } from './entities/project.entity';
import { CurrentUser, CurrentUserInfo } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';

@ApiTags('Quản lý dự án')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
@ApiExtraModels(Project)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo dự án mới',
    description: 'Tạo một dự án mới. Chỉ quản lý hoặc admin mới có thể tạo dự án. Quản lý chỉ được tạo dự án trong phòng ban của mình.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Dự án đã được tạo thành công',
    type: Project
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền tạo dự án hoặc tạo dự án ngoài phòng ban'
  })
  @ApiBody({ type: CreateProjectDto })
  async create(@Body() createProjectDto: CreateProjectDto, @CurrentUser() user: CurrentUserInfo) {
    // Chỉ quản lý hoặc admin mới có thể tạo dự án
    if (user.role !== Role.ADMIN && user.role !== Role.MANAGER) {
      throw new ForbiddenException('Chỉ quản lý hoặc admin mới có quyền tạo dự án');
    }
    
    // Nếu người dùng là quản lý và không cung cấp departmentId, tự động sử dụng departmentId của người dùng
    if (user.role === Role.MANAGER && !createProjectDto.departmentId) {
      createProjectDto.departmentId = user.departmentId;
    }
    
    // Nếu không cung cấp managerId, tự động sử dụng ID của người dùng hiện tại nếu người dùng là quản lý
    if (!createProjectDto.managerId && user.role === Role.MANAGER) {
      createProjectDto.managerId = user.id;
    }
    
    // Nếu người dùng là quản lý, chỉ được tạo dự án trong phòng ban của mình
    if (user.role === Role.MANAGER && createProjectDto.departmentId !== user.departmentId) {
      throw new ForbiddenException('Bạn chỉ có thể tạo dự án trong phòng ban của mình');
    }
    
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách dự án',
    description: 'Lấy danh sách dự án dựa trên quyền hạn của người dùng. Admin có thể xem tất cả, quản lý chỉ xem được trong phòng ban, nhân viên xem được dự án họ tham gia.'
  })
  @ApiQuery({
    name: 'departmentId',
    required: false,
    description: 'ID phòng ban (tùy chọn, mặc định lấy theo phòng ban của người dùng hiện tại)'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách dự án',
    type: [Project]
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền xem dự án ngoài phòng ban'
  })
  async findAll(
    @Query('departmentId') departmentId?: string,
    @CurrentUser() user?: CurrentUserInfo,
  ) {
    // Nếu là admin và có truyền departmentId thì lấy theo departmentId đó
    if (user.role === Role.ADMIN && departmentId) {
      return this.projectService.findByDepartment(departmentId);
    }
    
    // Nếu là admin và không truyền departmentId thì lấy tất cả
    if (user.role === Role.ADMIN && !departmentId) {
      return this.projectService.findAll();
    }
    
    // Nếu là quản lý và không truyền departmentId thì lấy theo phòng ban của họ
    if (user.role === Role.MANAGER && !departmentId) {
      return this.projectService.findByDepartment(user.departmentId);
    }
    
    // Nếu là quản lý và có truyền departmentId thì kiểm tra quyền
    if (user.role === Role.MANAGER && departmentId !== user.departmentId) {
      throw new ForbiddenException('Bạn chỉ có thể xem dự án trong phòng ban của mình');
    }
    
    // Nếu là nhân viên thì lấy các dự án mà họ tham gia
    if (user.role === Role.USER) {
      return this.projectService.findByEmployee(user.id);
    }
    
    // Trường hợp còn lại (quản lý xem phòng ban của mình)
    return this.projectService.findByDepartment(departmentId || user.departmentId);
  }

  @Get('my-projects')
  @ApiOperation({
    summary: 'Lấy danh sách dự án của người dùng hiện tại',
    description: 'Lấy danh sách dự án mà người dùng đang đăng nhập tham gia hoặc quản lý'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách dự án của người dùng hiện tại',
    type: [Project]
  })
  async findMyProjects(@CurrentUser() user: CurrentUserInfo) {
    return this.projectService.findByEmployee(user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin chi tiết của dự án',
    description: 'Lấy thông tin chi tiết của dự án theo ID'
  })
  @ApiParam({
    name: 'id',
    description: 'ID dự án cần xem chi tiết'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin chi tiết dự án',
    type: Project
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy dự án với ID đã cung cấp'
  })
  async findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id/members/add/:employeeId')
  @ApiOperation({
    summary: 'Thêm thành viên vào dự án',
    description: 'Thêm một nhân viên vào dự án. Chỉ admin, quản lý phòng ban hoặc quản lý dự án mới có quyền thực hiện.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID dự án'
  })
  @ApiParam({
    name: 'employeeId',
    description: 'ID nhân viên cần thêm vào dự án'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đã thêm thành viên thành công',
    type: Project
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy dự án hoặc nhân viên'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nhân viên đã là thành viên của dự án'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền thêm thành viên vào dự án này'
  })
  async addMember(
    @Param('id') id: string,
    @Param('employeeId') employeeId: string,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    // Trước tiên lấy thông tin dự án để kiểm tra quyền
    const project = await this.projectService.findOne(id);
    
    // Kiểm tra quyền: admin, quản lý dự án, hoặc quản lý phòng ban
    if (
      user.role !== Role.ADMIN && 
      project.managerId !== user.id &&
      (user.role !== Role.MANAGER || project.departmentId !== user.departmentId)
    ) {
      throw new ForbiddenException('Bạn không có quyền thêm thành viên vào dự án này');
    }
    
    return this.projectService.addMember(id, employeeId);
  }

  @Patch(':id/members/remove/:employeeId')
  @ApiOperation({
    summary: 'Xóa thành viên khỏi dự án',
    description: 'Xóa một nhân viên khỏi dự án. Chỉ admin, quản lý phòng ban hoặc quản lý dự án mới có quyền thực hiện.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID dự án'
  })
  @ApiParam({
    name: 'employeeId',
    description: 'ID nhân viên cần xóa khỏi dự án'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Đã xóa thành viên thành công',
    type: Project
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy dự án'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nhân viên không phải là thành viên của dự án'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền xóa thành viên khỏi dự án này'
  })
  async removeMember(
    @Param('id') id: string,
    @Param('employeeId') employeeId: string,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    // Trước tiên lấy thông tin dự án để kiểm tra quyền
    const project = await this.projectService.findOne(id);
    
    // Kiểm tra quyền: admin, quản lý dự án, hoặc quản lý phòng ban
    if (
      user.role !== Role.ADMIN && 
      project.managerId !== user.id &&
      (user.role !== Role.MANAGER || project.departmentId !== user.departmentId)
    ) {
      throw new ForbiddenException('Bạn không có quyền xóa thành viên khỏi dự án này');
    }
    
    return this.projectService.removeMember(id, employeeId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa dự án',
    description: 'Xóa một dự án. Chỉ admin hoặc quản lý phòng ban mới có quyền thực hiện.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID dự án cần xóa'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dự án đã được xóa thành công'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy dự án với ID đã cung cấp'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền xóa dự án này'
  })
  async remove(@Param('id') id: string, @CurrentUser() user: CurrentUserInfo) {
    // Trước tiên lấy thông tin dự án để kiểm tra quyền
    const project = await this.projectService.findOne(id);
    
    // Kiểm tra quyền: admin hoặc quản lý phòng ban
    if (
      user.role !== Role.ADMIN && 
      (user.role !== Role.MANAGER || project.departmentId !== user.departmentId)
    ) {
      throw new ForbiddenException('Bạn không có quyền xóa dự án này');
    }
    
    return this.projectService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật thông tin dự án',
    description: 'Cập nhật thông tin chi tiết của dự án. Chỉ admin, quản lý phòng ban hoặc quản lý dự án mới có quyền thực hiện.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID dự án cần cập nhật'
  })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Dự án đã được cập nhật thành công',
    type: Project
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy dự án với ID đã cung cấp'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền cập nhật dự án này'
  })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    // Trước tiên lấy thông tin dự án để kiểm tra quyền
    const project = await this.projectService.findOne(id);
    
    // Kiểm tra quyền: admin, quản lý dự án, hoặc quản lý phòng ban
    if (
      user.role !== Role.ADMIN && 
      project.managerId !== user.id &&
      (user.role !== Role.MANAGER || project.departmentId !== user.departmentId)
    ) {
      throw new ForbiddenException('Bạn không có quyền cập nhật dự án này');
    }
    
    return this.projectService.update(id, updateProjectDto);
  }
} 