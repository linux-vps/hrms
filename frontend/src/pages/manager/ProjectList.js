import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { Modal } from 'bootstrap';
import { getProjects, createProject, getProjectById, deleteProject, getEmployees, addProjectMember, removeProjectMember, updateProject } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    memberIds: []
  });

  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const membersModalRef = useRef(null);
  const detailsModalRef = useRef(null);

  useEffect(() => {
    // Khởi tạo Bootstrap modals
    addModalRef.current = new Modal(document.getElementById('addProjectModal'));
    editModalRef.current = new Modal(document.getElementById('editProjectModal'));
    deleteModalRef.current = new Modal(document.getElementById('deleteProjectModal'));
    membersModalRef.current = new Modal(document.getElementById('manageMembersModal'));
    detailsModalRef.current = new Modal(document.getElementById('projectDetailsModal'));

    fetchProjects();
    fetchEmployees();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách dự án');
      console.error('Error fetching projects:', error);
    }
    setLoading(false);
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      // Lọc chỉ lấy nhân viên (không phải admin hoặc manager)
      const employeesList = response.data.data.filter(emp => emp.role === 'user');
      setEmployees(employeesList);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách nhân viên');
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await createProject(formData);
      toast.success('Thêm dự án thành công');
      addModalRef.current.hide();
      resetFormData();
      fetchProjects();
    } catch (error) {
      toast.error('Lỗi khi thêm dự án');
      console.error('Error adding project:', error);
    }
  };

  const handleEdit = async () => {
    try {
      // Chỉ gửi các trường cần thiết
      const updateData = {
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate
      };
      
      await updateProject(selectedProject.id, updateData);
      toast.success('Cập nhật dự án thành công');
      editModalRef.current.hide();
      fetchProjects();
    } catch (error) {
      toast.error('Lỗi khi cập nhật dự án');
      console.error('Error updating project:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(selectedProject.id);
      toast.success('Xóa dự án thành công');
      deleteModalRef.current.hide();
      fetchProjects();
    } catch (error) {
      toast.error('Lỗi khi xóa dự án');
      console.error('Error deleting project:', error);
    }
  };

  const handleViewDetails = async (projectId) => {
    try {
      const response = await getProjectById(projectId);
      setSelectedProject(response.data.data);
      detailsModalRef.current.show();
    } catch (error) {
      toast.error('Lỗi khi tải thông tin dự án');
      console.error('Error fetching project details:', error);
    }
  };

  const handleManageMembers = async (projectId) => {
    try {
      const response = await getProjectById(projectId);
      const project = response.data.data;
      setSelectedProject(project);
      
      // Lấy danh sách thành viên hiện tại của dự án
      const currentMembers = project.members.map(member => member.id);
      setSelectedMembers(currentMembers);
      
      // Lọc ra các nhân viên chưa tham gia dự án
      const projectMemberIds = new Set(currentMembers);
      const available = employees.filter(emp => !projectMemberIds.has(emp.id));
      setAvailableEmployees(available);
      
      membersModalRef.current.show();
    } catch (error) {
      toast.error('Lỗi khi tải thông tin dự án');
      console.error('Error fetching project details:', error);
    }
  };

  const handleAddMember = async (employeeId) => {
    try {
      await addProjectMember(selectedProject.id, employeeId);
      toast.success('Thêm thành viên vào dự án thành công');
      
      // Cập nhật danh sách thành viên đã chọn
      setSelectedMembers([...selectedMembers, employeeId]);
      
      // Cập nhật danh sách thành viên có thể thêm
      setAvailableEmployees(availableEmployees.filter(emp => emp.id !== employeeId));
      
      // Refresh dự án
      fetchProjects();
    } catch (error) {
      toast.error('Lỗi khi thêm thành viên');
      console.error('Error adding project member:', error);
    }
  };

  const handleRemoveMember = async (employeeId) => {
    try {
      await removeProjectMember(selectedProject.id, employeeId);
      toast.success('Xóa thành viên khỏi dự án thành công');
      
      // Cập nhật danh sách thành viên đã chọn
      setSelectedMembers(selectedMembers.filter(id => id !== employeeId));
      
      // Tìm employee bị xóa và thêm lại vào danh sách có thể thêm
      const removedEmployee = employees.find(emp => emp.id === employeeId);
      if (removedEmployee) {
        setAvailableEmployees([...availableEmployees, removedEmployee]);
      }
      
      // Refresh dự án
      fetchProjects();
    } catch (error) {
      toast.error('Lỗi khi xóa thành viên');
      console.error('Error removing project member:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      memberIds: []
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      draft: { label: 'Bản nháp', class: 'bg-secondary' },
      in_progress: { label: 'Đang thực hiện', class: 'bg-primary' },
      completed: { label: 'Hoàn thành', class: 'bg-success' },
      cancelled: { label: 'Đã hủy', class: 'bg-danger' }
    };
    
    const statusInfo = statusMap[status] || { label: 'Không xác định', class: 'bg-info' };
    
    return (
      <span className={`badge ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  const columns = [
    {
      name: 'Tên dự án',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Trạng thái',
      cell: row => getStatusLabel(row.status),
      sortable: true,
    },
    {
      name: 'Ngày bắt đầu',
      selector: row => formatDate(row.startDate),
      sortable: true,
    },
    {
      name: 'Ngày kết thúc',
      selector: row => formatDate(row.endDate),
      sortable: true,
    },
    {
      name: 'Thành viên',
      cell: row => (
        <span>{row.members?.length || 0} thành viên</span>
      ),
    },
    {
      name: 'Thao tác',
      cell: row => (
        <>
          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => handleViewDetails(row.id)}
            title="Xem chi tiết"
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => {
              setSelectedProject(row);
              // Đặt dữ liệu cho form chỉnh sửa
              setFormData({
                name: row.name,
                description: row.description,
                startDate: row.startDate ? row.startDate.substring(0, 10) : '',
                endDate: row.endDate ? row.endDate.substring(0, 10) : '',
                memberIds: row.members?.map(member => member.id) || []
              });
              editModalRef.current.show();
            }}
            title="Chỉnh sửa"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => handleManageMembers(row.id)}
            title="Quản lý thành viên"
          >
            <i className="bi bi-people"></i>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              setSelectedProject(row);
              deleteModalRef.current.show();
            }}
            title="Xóa dự án"
          >
            <i className="bi bi-trash"></i>
          </button>
        </>
      ),
    },
  ];

  // Xử lý khi nhấp vào dòng dự án
  const handleProjectClick = (row) => {
    navigate(`/manager/projects/${row.id}/tasks`);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">Danh sách dự án</h5>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetFormData();
              addModalRef.current.show();
            }}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Thêm dự án
          </button>
        </div>

        <DataTable
          columns={columns}
          data={projects}
          pagination
          progressPending={loading}
          responsive
          highlightOnHover
          striped
          pointerOnHover
          onRowClicked={handleProjectClick}
        />

        {/* Add Project Modal */}
        <div className="modal fade" id="addProjectModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm dự án mới</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Tên dự án</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ngày bắt đầu</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ngày kết thúc</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-primary" onClick={handleAdd}>Thêm</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Project Modal */}
        <div className="modal fade" id="editProjectModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chỉnh sửa dự án</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Tên dự án</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ngày bắt đầu</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ngày kết thúc</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-primary" onClick={handleEdit}>Lưu thay đổi</button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <div className="modal fade" id="deleteProjectModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận xóa</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Bạn có chắc chắn muốn xóa dự án <strong>{selectedProject?.name}</strong>?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Modal */}
        <div className="modal fade" id="projectDetailsModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết dự án</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedProject && (
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Thông tin cơ bản</h6>
                      <dl className="row">
                        <dt className="col-sm-4">Tên dự án:</dt>
                        <dd className="col-sm-8">{selectedProject.name}</dd>
                        
                        <dt className="col-sm-4">Trạng thái:</dt>
                        <dd className="col-sm-8">{getStatusLabel(selectedProject.status)}</dd>
                        
                        <dt className="col-sm-4">Ngày bắt đầu:</dt>
                        <dd className="col-sm-8">{formatDate(selectedProject.startDate)}</dd>
                        
                        <dt className="col-sm-4">Ngày kết thúc:</dt>
                        <dd className="col-sm-8">{formatDate(selectedProject.endDate)}</dd>
                        
                        <dt className="col-sm-4">Phòng ban:</dt>
                        <dd className="col-sm-8">{selectedProject.department?.departmentName}</dd>
                        
                        <dt className="col-sm-4">Quản lý:</dt>
                        <dd className="col-sm-8">{selectedProject.manager?.fullName}</dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <h6>Mô tả</h6>
                      <p>{selectedProject.description}</p>
                    </div>
                    <div className="col-12 mt-3">
                      <h6>Thành viên dự án ({selectedProject.members?.length || 0})</h6>
                      {selectedProject.members && selectedProject.members.length > 0 ? (
                        <ul className="list-group">
                          {selectedProject.members.map(member => (
                            <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <span className="fw-bold">{member.fullName}</span>
                                <br />
                                <small className="text-muted">{member.email}</small>
                              </div>
                              <div>
                                <small className="text-muted">{member.phoneNumber || 'Chưa có SĐT'}</small>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">Chưa có thành viên trong dự án này.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="button" className="btn btn-warning me-2" onClick={() => {
                  detailsModalRef.current.hide();
                  // Đặt dữ liệu cho form chỉnh sửa
                  setFormData({
                    name: selectedProject.name,
                    description: selectedProject.description,
                    startDate: selectedProject.startDate ? selectedProject.startDate.substring(0, 10) : '',
                    endDate: selectedProject.endDate ? selectedProject.endDate.substring(0, 10) : '',
                    memberIds: selectedProject.members?.map(member => member.id) || []
                  });
                  setTimeout(() => {
                    editModalRef.current.show();
                  }, 500);
                }}>Chỉnh sửa</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  detailsModalRef.current.hide();
                  handleManageMembers(selectedProject.id);
                }}>Quản lý thành viên</button>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Members Modal */}
        <div className="modal fade" id="manageMembersModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Quản lý thành viên dự án</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedProject && (
                  <div className="row">
                    <div className="col-12 mb-3">
                      <h6>Dự án: {selectedProject.name}</h6>
                    </div>
                    <div className="col-md-6">
                      <h6>Thành viên hiện tại</h6>
                      {selectedProject.members && selectedProject.members.length > 0 ? (
                        <ul className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          {selectedProject.members.map(member => (
                            <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <span>{member.fullName}</span>
                                <br />
                                <small className="text-muted">{member.email}</small>
                              </div>
                              <button 
                                className="btn btn-sm btn-danger" 
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">Chưa có thành viên trong dự án này.</p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <h6>Thêm thành viên mới</h6>
                      {availableEmployees.length > 0 ? (
                        <ul className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                          {availableEmployees.map(employee => (
                            <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <span>{employee.fullName}</span>
                                <br />
                                <small className="text-muted">{employee.email}</small>
                              </div>
                              <button 
                                className="btn btn-sm btn-success" 
                                onClick={() => handleAddMember(employee.id)}
                              >
                                <i className="bi bi-plus-circle"></i>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">Không có nhân viên khả dụng để thêm vào dự án.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList; 