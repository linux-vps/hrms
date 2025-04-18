import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dtos/department.dto';
import { PaginationDto, PaginatedResultDto } from 'src/common/dtos/pagination.dto';

/**
 * Service xử lý phòng ban
 */
@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  /**
   * Lấy tất cả phòng ban
   * @param paginationDto Thông tin phân trang
   * @returns Danh sách phòng ban và tổng số
   */
  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResultDto<Department>> {
    const offset = paginationDto.offset();
    
    const [departments, totalItems] = await this.departmentRepository.findAndCount({
      skip: offset,
      take: paginationDto.limit,
      relations: ['employees'],
    });
    
    return new PaginatedResultDto<Department>(
      departments,
      totalItems,
      paginationDto
    );
  }

  /**
   * Lấy thông tin chi tiết phòng ban
   * @param id ID phòng ban
   * @returns Thông tin phòng ban
   */
  async findById(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    
    if (!department) {
      throw new NotFoundException(`Không tìm thấy phòng ban với ID ${id}`);
    }
    
    return department;
  }

  /**
   * Tạo phòng ban mới
   * @param createDepartmentDto Thông tin phòng ban mới
   * @returns Phòng ban đã tạo
   */
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const { name } = createDepartmentDto;
    
    // Kiểm tra tên phòng ban đã tồn tại chưa
    const existingDepartment = await this.departmentRepository.findOne({
      where: { name },
    });
    
    if (existingDepartment) {
      throw new BadRequestException(`Phòng ban với tên ${name} đã tồn tại`);
    }
    
    // Tạo phòng ban mới
    const department = this.departmentRepository.create(createDepartmentDto);
    
    return this.departmentRepository.save(department);
  }

  /**
   * Cập nhật thông tin phòng ban
   * @param id ID phòng ban
   * @param updateDepartmentDto Thông tin cập nhật
   * @returns Phòng ban đã cập nhật
   */
  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const { name } = updateDepartmentDto;
    
    // Kiểm tra phòng ban tồn tại
    const department = await this.findById(id);
    
    // Kiểm tra tên phòng ban đã tồn tại chưa (nếu đổi tên)
    if (name && name !== department.name) {
      const existingDepartment = await this.departmentRepository.findOne({
        where: { name },
      });
      
      if (existingDepartment) {
        throw new BadRequestException(`Phòng ban với tên ${name} đã tồn tại`);
      }
    }
    
    // Cập nhật thông tin
    const updatedDepartment = this.departmentRepository.merge(department, updateDepartmentDto);
    
    return this.departmentRepository.save(updatedDepartment);
  }

  /**
   * Xóa phòng ban
   * @param id ID phòng ban
   * @returns Kết quả xóa
   */
  async delete(id: string): Promise<{ id: string; success: boolean }> {
    // Kiểm tra phòng ban tồn tại
    const department = await this.findById(id);
    
    // Nếu phòng ban có nhân viên, không cho phép xóa
    if (department.employees && department.employees.length > 0) {
      throw new BadRequestException('Không thể xóa phòng ban có nhân viên. Hãy chuyển nhân viên sang phòng ban khác trước.');
    }
    
    // Thực hiện soft delete
    await this.departmentRepository.softDelete(id);
    
    return { id, success: true };
  }
} 