import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { Modal } from 'bootstrap';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../services/api';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    identityCard: '',
    birthDate: '',
    position: '',
    education: '',
    workExperience: '',
    baseSalary: '',
    bankAccount: '',
    bankName: '',
    taxCode: '',
    insuranceCode: '',
    isActive: true
  });
  
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const viewModalRef = useRef(null);

  // Hàm helper để hiển thị tên tiếng Việt của trình độ học vấn
  const getEducationLabel = (educationValue) => {
    const educationMap = {
      'phd': 'Tiến sĩ',
      'master': 'Thạc sĩ',
      'bachelor': 'Cử nhân/Kỹ sư',
      'associate': 'Cao đẳng',
      'high_school': 'Trung học phổ thông',
      'other': 'Khác'
    };
    return educationValue ? (educationMap[educationValue] || educationValue) : 'Chưa cập nhật';
  };

  // Hàm helper để hiển thị tên tiếng Việt của vị trí
  const getPositionLabel = (positionValue) => {
    const positionMap = {
      'ceo': 'Giám đốc điều hành (CEO)',
      'cto': 'Giám đốc công nghệ (CTO)',
      'cfo': 'Giám đốc tài chính (CFO)',
      'director': 'Giám đốc',
      'manager': 'Quản lý',
      'team_leader': 'Trưởng nhóm',
      'senior': 'Nhân viên cao cấp',
      'junior': 'Nhân viên',
      'intern': 'Thực tập sinh',
      'other': 'Khác'
    };
    return positionValue ? (positionMap[positionValue] || positionValue) : 'Chưa cập nhật';
  };

  useEffect(() => {
    // Initialize Bootstrap modals
    addModalRef.current = new Modal(document.getElementById('addEmployeeModal'));
    editModalRef.current = new Modal(document.getElementById('editEmployeeModal'));
    deleteModalRef.current = new Modal(document.getElementById('deleteEmployeeModal'));
    viewModalRef.current = new Modal(document.getElementById('viewEmployeeModal'));
    
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees();
      setEmployees(response.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách nhân viên');
      console.error('Error fetching employees:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleAdd = async () => {
    try {
      await createEmployee(formData);
      toast.success('Thêm nhân viên thành công');
      addModalRef.current.hide();
      resetForm();
      fetchEmployees();
    } catch (error) {
      toast.error('Lỗi khi thêm nhân viên: ' + (error.response?.data?.message || error.message));
      console.error('Error adding employee:', error);
    }
  };

  const handleEdit = async () => {
    try {
      // Tạo một bản sao của formData mà không có trường password và email
      // để tuân thủ UpdateEmployeeDto và không cho phép sửa email
      const updateData = { ...formData };
      delete updateData.password;
      delete updateData.email; // Loại bỏ email khỏi dữ liệu gửi đi
      
      await updateEmployee(selectedEmployee.id, updateData);
      toast.success('Cập nhật nhân viên thành công');
      editModalRef.current.hide();
      fetchEmployees();
    } catch (error) {
      toast.error('Lỗi khi cập nhật nhân viên: ' + (error.response?.data?.message || error.message));
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedEmployee || !selectedEmployee.id) {
        toast.error('Không tìm thấy ID nhân viên');
        return;
      }
      
      await deleteEmployee(selectedEmployee.id);
      toast.success('Xóa nhân viên thành công');
      deleteModalRef.current.hide();
      fetchEmployees();
    } catch (error) {
      toast.error('Lỗi khi xóa nhân viên: ' + (error.response?.data?.message || error.message));
      console.error('Error deleting employee:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      address: '',
      identityCard: '',
      birthDate: '',
      position: '',
      education: '',
      workExperience: '',
      baseSalary: '',
      bankAccount: '',
      bankName: '',
      taxCode: '',
      insuranceCode: '',
      isActive: true
    });
  };

  const prepareEmployeeForEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      email: employee.email || '',
      fullName: employee.fullName || '',
      phoneNumber: employee.phoneNumber || '',
      address: employee.address || '',
      identityCard: employee.identityCard || '',
      birthDate: employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : '',
      position: employee.position || '',
      education: employee.education || '',
      workExperience: employee.workExperience || '',
      baseSalary: employee.baseSalary || '',
      bankAccount: employee.bankAccount || '',
      bankName: employee.bankName || '',
      taxCode: employee.taxCode || '',
      insuranceCode: employee.insuranceCode || '',
      isActive: employee.isActive
    });
  };

  const columns = [
    {
      name: 'Họ và tên',
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Số điện thoại',
      selector: row => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Phòng ban',
      selector: row => row.department?.departmentName || 'N/A',
      sortable: true,
    },
    {
      name: 'Trạng thái',
      cell: row => (
        <span className={`badge ${row.isActive ? 'bg-success' : 'bg-danger'}`}>
          {row.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'Thao tác',
      cell: row => (
        <>
          <button
            className="btn btn-sm btn-info me-1"
            onClick={() => {
              setSelectedEmployee(row);
              viewModalRef.current.show();
            }}
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className="btn btn-sm btn-primary me-1"
            onClick={() => {
              prepareEmployeeForEdit(row);
              editModalRef.current.show();
            }}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              setSelectedEmployee(row);
              deleteModalRef.current.show();
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">Danh sách nhân viên</h5>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              addModalRef.current.show();
            }}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Thêm nhân viên
          </button>
        </div>

        <DataTable
          columns={columns}
          data={employees}
          pagination
          progressPending={loading}
          responsive
          highlightOnHover
          striped
        />

        {/* Add Employee Modal */}
        <div className="modal fade" id="addEmployeeModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm nhân viên mới</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Mật khẩu <span className="text-danger">*</span></label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Họ và tên <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Số điện thoại <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CMND/CCCD</label>
                      <input
                        type="text"
                        className="form-control"
                        name="identityCard"
                        value={formData.identityCard}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ngày sinh</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Vị trí</label>
                      <select
                        className="form-select"
                        name="position"
                        value={formData.position || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Chọn vị trí --</option>
                        <option value="ceo">Giám đốc điều hành (CEO)</option>
                        <option value="cto">Giám đốc công nghệ (CTO)</option>
                        <option value="cfo">Giám đốc tài chính (CFO)</option>
                        <option value="director">Giám đốc</option>
                        <option value="manager">Quản lý</option>
                        <option value="team_leader">Trưởng nhóm</option>
                        <option value="senior">Nhân viên cao cấp</option>
                        <option value="junior">Nhân viên</option>
                        <option value="intern">Thực tập sinh</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Lương cơ bản</label>
                      <input
                        type="number"
                        className="form-control"
                        name="baseSalary"
                        value={formData.baseSalary}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      id="isActiveCheckbox"
                    />
                    <label className="form-check-label" htmlFor="isActiveCheckbox">
                      Kích hoạt tài khoản
                    </label>
                  </div>

                  <div className="accordion" id="accordionAddMore">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAddMore">
                          Thông tin thêm
                        </button>
                      </h2>
                      <div id="collapseAddMore" className="accordion-collapse collapse" data-bs-parent="#accordionAddMore">
                        <div className="accordion-body">
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Trình độ học vấn</label>
                              <select
                                className="form-select"
                                name="education"
                                value={formData.education || ''}
                                onChange={handleInputChange}
                              >
                                <option value="">-- Chọn trình độ --</option>
                                <option value="phd">Tiến sĩ (PhD)</option>
                                <option value="master">Thạc sĩ (Master)</option>
                                <option value="bachelor">Cử nhân/Kỹ sư (Bachelor)</option>
                                <option value="associate">Cao đẳng (Associate)</option>
                                <option value="high_school">Trung học phổ thông (High School)</option>
                                <option value="other">Khác (Other)</option>
                              </select>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Kinh nghiệm làm việc</label>
                              <input
                                type="text"
                                className="form-control"
                                name="workExperience"
                                value={formData.workExperience}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Số tài khoản ngân hàng</label>
                              <input
                                type="text"
                                className="form-control"
                                name="bankAccount"
                                value={formData.bankAccount}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Ngân hàng</label>
                              <input
                                type="text"
                                className="form-control"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Mã số thuế</label>
                              <input
                                type="text"
                                className="form-control"
                                name="taxCode"
                                value={formData.taxCode}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Mã bảo hiểm</label>
                              <input
                                type="text"
                                className="form-control"
                                name="insuranceCode"
                                value={formData.insuranceCode}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

        {/* Edit Employee Modal */}
        <div className="modal fade" id="editEmployeeModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sửa thông tin nhân viên</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email <span className="text-danger">*</span></label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={true} // Vô hiệu hóa chỉnh sửa email
                        required
                      />
                      <small className="form-text text-muted">Email không thể thay đổi</small>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Họ và tên <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Số điện thoại <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CMND/CCCD</label>
                      <input
                        type="text"
                        className="form-control"
                        name="identityCard"
                        value={formData.identityCard}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ngày sinh</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Vị trí</label>
                      <select
                        className="form-select"
                        name="position"
                        value={formData.position || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Chọn vị trí --</option>
                        <option value="ceo">Giám đốc điều hành (CEO)</option>
                        <option value="cto">Giám đốc công nghệ (CTO)</option>
                        <option value="cfo">Giám đốc tài chính (CFO)</option>
                        <option value="director">Giám đốc</option>
                        <option value="manager">Quản lý</option>
                        <option value="team_leader">Trưởng nhóm</option>
                        <option value="senior">Nhân viên cao cấp</option>
                        <option value="junior">Nhân viên</option>
                        <option value="intern">Thực tập sinh</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      id="isActiveEditCheckbox"
                    />
                    <label className="form-check-label" htmlFor="isActiveEditCheckbox">
                      Kích hoạt tài khoản
                    </label>
                  </div>

                  <div className="accordion" id="accordionEditMore">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEditMore">
                          Thông tin thêm
                        </button>
                      </h2>
                      <div id="collapseEditMore" className="accordion-collapse collapse" data-bs-parent="#accordionEditMore">
                        <div className="accordion-body">
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Lương cơ bản</label>
                              <input
                                type="number"
                                className="form-control"
                                name="baseSalary"
                                value={formData.baseSalary}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Trình độ học vấn</label>
                              <select
                                className="form-select"
                                name="education"
                                value={formData.education || ''}
                                onChange={handleInputChange}
                              >
                                <option value="">-- Chọn trình độ --</option>
                                <option value="phd">Tiến sĩ (PhD)</option>
                                <option value="master">Thạc sĩ (Master)</option>
                                <option value="bachelor">Cử nhân/Kỹ sư (Bachelor)</option>
                                <option value="associate">Cao đẳng (Associate)</option>
                                <option value="high_school">Trung học phổ thông (High School)</option>
                                <option value="other">Khác (Other)</option>
                              </select>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Kinh nghiệm làm việc</label>
                              <input
                                type="text"
                                className="form-control"
                                name="workExperience"
                                value={formData.workExperience}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Số tài khoản ngân hàng</label>
                              <input
                                type="text"
                                className="form-control"
                                name="bankAccount"
                                value={formData.bankAccount}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Ngân hàng</label>
                              <input
                                type="text"
                                className="form-control"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 mb-3">
                              <label className="form-label">Mã số thuế</label>
                              <input
                                type="text"
                                className="form-control"
                                name="taxCode"
                                value={formData.taxCode}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Mã bảo hiểm</label>
                            <input
                              type="text"
                              className="form-control"
                              name="insuranceCode"
                              value={formData.insuranceCode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-primary" onClick={handleEdit}>Lưu</button>
              </div>
            </div>
          </div>
        </div>

        {/* View Employee Modal */}
        <div className="modal fade" id="viewEmployeeModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thông tin nhân viên</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedEmployee && (
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Họ và tên:</strong> {selectedEmployee.fullName}</p>
                      <p><strong>Email:</strong> {selectedEmployee.email}</p>
                      <p><strong>Số điện thoại:</strong> {selectedEmployee.phoneNumber}</p>
                      <p><strong>Phòng ban:</strong> {selectedEmployee.department?.departmentName}</p>
                      <p><strong>Trạng thái:</strong> {selectedEmployee.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}</p>
                      <p><strong>CMND/CCCD:</strong> {selectedEmployee.identityCard || 'Chưa cập nhật'}</p>
                      <p><strong>Ngày sinh:</strong> {selectedEmployee.birthDate ? new Date(selectedEmployee.birthDate).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}</p>
                      <p><strong>Địa chỉ:</strong> {selectedEmployee.address || 'Chưa cập nhật'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Vị trí:</strong> {getPositionLabel(selectedEmployee.position)}</p>
                      <p><strong>Lương cơ bản:</strong> {selectedEmployee.baseSalary ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedEmployee.baseSalary) : 'Chưa cập nhật'}</p>
                      <p><strong>Trình độ học vấn:</strong> {getEducationLabel(selectedEmployee.education)}</p>
                      <p><strong>Kinh nghiệm làm việc:</strong> {selectedEmployee.workExperience || 'Chưa cập nhật'}</p>
                      <p><strong>Số tài khoản:</strong> {selectedEmployee.bankAccount || 'Chưa cập nhật'}</p>
                      <p><strong>Ngân hàng:</strong> {selectedEmployee.bankName || 'Chưa cập nhật'}</p>
                      <p><strong>Mã số thuế:</strong> {selectedEmployee.taxCode || 'Chưa cập nhật'}</p>
                      <p><strong>Mã bảo hiểm:</strong> {selectedEmployee.insuranceCode || 'Chưa cập nhật'}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => {
                    viewModalRef.current.hide();
                    prepareEmployeeForEdit(selectedEmployee);
                    editModalRef.current.show();
                  }}
                >
                  Sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <div className="modal fade" id="deleteEmployeeModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận xóa</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Bạn có chắc chắn muốn xóa nhân viên <strong>{selectedEmployee?.fullName}</strong>?</p>
                <p className="text-danger"><small>Hành động này không thể hoàn tác.</small></p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
