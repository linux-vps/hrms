import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, ParseUUIDPipe } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiSecurity } from '@nestjs/swagger';
import { Department } from './entities/department.entity';

@ApiTags('Phòng ban')
@ApiBearerAuth()
@ApiSecurity('bearer')
@Controller('departments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Tạo phòng ban mới', description: 'Chỉ Admin mới có thể tạo phòng ban mới' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: 'Tạo phòng ban thành công', type: Department })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ 
    summary: 'Lấy danh sách phòng ban', 
    description: 'Admin sẽ thấy tất cả các phòng ban, Manager sẽ chỉ thấy phòng ban của họ' 
  })
  @ApiResponse({ status: 200, description: 'Trả về danh sách phòng ban', type: [Department] })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  async findAll(@CurrentUser() user: any) {
    if (user.role === Role.MANAGER) {
      return this.departmentService.findOne(user.departmentId);
    }
    return this.departmentService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Lấy thông tin một phòng ban', description: 'Lấy chi tiết một phòng ban theo ID' })
  @ApiParam({ name: 'id', description: 'ID của phòng ban', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Trả về thông tin phòng ban', type: Department })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Cập nhật phòng ban', description: 'Cập nhật thông tin của một phòng ban' })
  @ApiParam({ name: 'id', description: 'ID của phòng ban', type: 'string', format: 'uuid' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: 'Cập nhật phòng ban thành công', type: Department })
  @ApiResponse({ status: 400, description: 'Dữ liệu đầu vào không hợp lệ' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Xóa phòng ban', description: 'Xóa một phòng ban khỏi hệ thống' })
  @ApiParam({ name: 'id', description: 'ID của phòng ban', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Xóa phòng ban thành công' })
  @ApiResponse({ status: 401, description: 'Không có quyền truy cập' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentService.remove(id);
  }
}
