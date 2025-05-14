import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, HttpStatus, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Comment } from './entities/comment.entity';
import { CurrentUser, CurrentUserInfo } from '../../common/decorators/current-user.decorator';

@ApiTags('Quản lý bình luận')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
@ApiExtraModels(Comment, CreateCommentDto)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo bình luận mới',
    description: 'Tạo một bình luận mới cho công việc. Người dùng hiện tại sẽ được ghi nhận là người tạo bình luận.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Bình luận đã được tạo thành công',
    type: Comment
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy công việc'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền bình luận trong công việc này'
  })
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: CurrentUserInfo) {
    return this.commentService.create(createCommentDto, user.id);
  }

  @Get('task/:taskId')
  @ApiOperation({
    summary: 'Lấy danh sách bình luận theo công việc',
    description: 'Trả về danh sách tất cả các bình luận của một công việc, sắp xếp theo thời gian'
  })
  @ApiParam({
    name: 'taskId',
    description: 'ID công việc'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách bình luận của công việc',
    type: [Comment]
  })
  async findByTask(@Param('taskId') taskId: string) {
    return this.commentService.findByTask(taskId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy chi tiết bình luận',
    description: 'Trả về thông tin chi tiết của một bình luận theo ID'
  })
  @ApiParam({
    name: 'id',
    description: 'ID bình luận'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Chi tiết bình luận',
    type: Comment
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy bình luận'
  })
  async findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id/mark-as-summary')
  @ApiOperation({
    summary: 'Đánh dấu bình luận là tóm tắt',
    description: 'Đánh dấu hoặc bỏ đánh dấu một bình luận là tóm tắt công việc. Chỉ người tạo bình luận, người giao việc hoặc người giám sát mới có quyền thực hiện.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID bình luận'
  })
  @ApiQuery({
    name: 'isSummary',
    description: 'Trạng thái đánh dấu tóm tắt (true/false)',
    type: 'boolean'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trạng thái tóm tắt đã được cập nhật thành công',
    type: Comment
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy bình luận'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền đánh dấu bình luận này là tóm tắt'
  })
  async markAsSummary(
    @Param('id') id: string,
    @Query('isSummary') isSummary: boolean,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return this.commentService.markAsSummary(id, isSummary === true, user.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa bình luận',
    description: 'Xóa một bình luận. Chỉ người tạo bình luận mới có quyền xóa.'
  })
  @ApiParam({
    name: 'id',
    description: 'ID bình luận cần xóa'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bình luận đã được xóa thành công'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Không tìm thấy bình luận'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Không có quyền xóa bình luận này'
  })
  async remove(@Param('id') id: string, @CurrentUser() user: CurrentUserInfo) {
    return this.commentService.remove(id, user.id);
  }
} 