import React, { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Modal } from 'bootstrap';
import { toast } from 'react-toastify';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, refreshUserProfile, updateProfile } = useAuth();
  console.log("Current user:", user);
  
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const isEmployee = user?.role === 'user';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Refs cho modal
  const profileModalRef = useRef(null);
  const editProfileModalRef = useRef(null);

  useEffect(() => {
    // Khởi tạo Bootstrap modal
    profileModalRef.current = new Modal(document.getElementById('profileModal'));
    editProfileModalRef.current = new Modal(document.getElementById('editProfileModal'));
    
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.dropdown-menu');
      const profileButton = document.querySelector('.nav-profile');
      
      if (dropdown && !dropdown.contains(event.target) && !profileButton.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
        identityCard: user.identityCard || '',
        education: user.education || '',
        workExperience: user.workExperience || '',
        bankAccount: user.bankAccount || '',
        bankName: user.bankName || '',
        taxCode: user.taxCode || '',
        insuranceCode: user.insuranceCode || ''
      });
    }
  }, [user]);

  // Mở modal profile
  const openProfileModal = () => {
    setIsDropdownOpen(false);
    profileModalRef.current.show();
  };

  // Mở modal chỉnh sửa profile
  const openEditProfileModal = () => {
    profileModalRef.current.hide();
    setTimeout(() => {
      editProfileModalRef.current.show();
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Cập nhật thông tin thành công');
        editProfileModalRef.current.hide();
        setTimeout(() => {
          profileModalRef.current.show();
        }, 500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      toast.error('Đã xảy ra lỗi khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Đăng xuất...');
    try {
      // Triển khai trực tiếp phương thức đăng xuất
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
      console.log('Đã xóa localStorage, chuyển hướng về login');
      navigate('/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  // Để test
  const testDirectLogout = () => {
    console.log('Test đăng xuất trực tiếp');
    handleLogout();
  };

  // Format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">HRMS</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" 
             onClick={() => document.body.classList.toggle('toggle-sidebar')}></i>
        </div>


        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" 
                 href="#" 
                 onClick={toggleDropdown}>
                <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                <div className="profile-info">
                  <span className="d-none d-md-block">
                    {user?.fullName || (isAdmin ? 'Admin' : 'Manager')}
                  </span>
                  <small className="role-label">
                    {isAdmin ? 'Administrator' : isManager ? 'Manager' : 'User'}
                  </small>
                </div>
              </a>

              <ul className={`dropdown-menu dropdown-menu-arrow profile ${isDropdownOpen ? 'show' : ''}`}>
                <li className="dropdown-header">
                  <h6>{user?.fullName || (isAdmin ? 'Admin' : 'Manager')}</h6>
                  <span>{isAdmin ? 'Administrator' : isManager ? 'Manager' : 'User'}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <div className="dropdown-item d-flex align-items-center" style={{cursor: 'pointer'}} onClick={openProfileModal}>
                    <i className="bi bi-person"></i>
                    <span style={{marginLeft: '10px'}}>Thông tin cá nhân</span>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    to={isAdmin ? '/admin/change-password' : isManager ? '/manager/change-password' : '/employee/change-password'}
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <i className="bi bi-key"></i>
                    <span style={{marginLeft: '10px'}}>Đổi mật khẩu</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <div className="dropdown-item d-flex align-items-center" style={{cursor: 'pointer'}}>
                    <button 
                      onClick={handleLogout}
                      style={{ 
                        border: 'none', 
                        background: 'none', 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        padding: 0,
                        cursor: 'pointer'
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span style={{marginLeft: '10px'}}>Đăng xuất</span>
                    </button>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === (isAdmin ? '/admin' : isManager ? '/manager' : '/employee') ? '' : 'collapsed'}`}
              to={isAdmin ? '/admin' : isManager ? '/manager' : '/employee'}
            >
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          {isAdmin && (
            <>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/admin/managers' ? '' : 'collapsed'}`}
                  to="/admin/managers"
                >
                  <i className="bi bi-person"></i>
                  <span>Quản lý Manager</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/admin/departments' ? '' : 'collapsed'}`}
                  to="/admin/departments"
                >
                  <i className="bi bi-building"></i>
                  <span>Quản lý phòng ban</span>
                </Link>
              </li>
            </>
          )}

          {isManager && (
            <>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/employees' ? '' : 'collapsed'}`}
                  to="/manager/employees"
                >
                  <i className="bi bi-people"></i>
                  <span>Quản lý nhân viên</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/projects' ? '' : 'collapsed'}`}
                  to="/manager/projects"
                >
                  <i className="bi bi-kanban"></i>
                  <span>Quản lý dự án</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/shifts' ? '' : 'collapsed'}`}
                  to="/manager/shifts"
                >
                  <i className="bi bi-calendar3"></i>
                  <span>Quản lý ca làm việc</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/attendance' ? '' : 'collapsed'}`}
                  to="/manager/attendance"
                >
                  <i className="bi bi-qr-code"></i>
                  <span>Điểm danh QR</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/timekeeping-records' ? '' : 'collapsed'}`}
                  to="/manager/timekeeping-records"
                >
                  <i className="bi bi-clock-history"></i>
                  <span>Bảng ghi chấm công</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/salary' ? '' : 'collapsed'}`}
                  to="/manager/salary"
                >
                  <i className="bi bi-calendar-check"></i>
                  <span>Bảng công</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/manager/payroll' ? '' : 'collapsed'}`}
                  to="/manager/payroll"
                >
                  <i className="bi bi-cash-coin"></i>
                  <span>Bảng lương</span>
                </Link>
              </li>
            </>
          )}

          {isEmployee && (
            <>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/employee/projects' ? '' : 'collapsed'}`}
                  to="/employee/projects"
                >
                  <i className="bi bi-kanban"></i>
                  <span>Dự án tham gia</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/employee/overdue-tasks' ? '' : 'collapsed'}`}
                  to="/employee/overdue-tasks"
                >
                  <i className="bi bi-exclamation-triangle"></i>
                  <span>Công việc quá hạn</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/employee/payroll' ? '' : 'collapsed'}`}
                  to="/employee/payroll"
                >
                  <i className="bi bi-cash-coin"></i>
                  <span>Bảng lương</span>
                </Link>
              </li>
            </>
          )}

          {/* Thêm nút đăng xuất ở sidebar */}
          <li className="nav-item" style={{marginTop: '30px'}}>
            <button 
              className="nav-link collapsed w-100 d-flex"
              onClick={testDirectLogout}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '10px 15px',
                color: '#012970',
              }}
            >
              <i className="bi bi-box-arrow-right"></i>
              <span style={{marginLeft: '5px'}}>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </aside>

      <main id="main" className="main">
        <Outlet />
      </main>

      {/* Profile Modal */}
      <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="profileModalLabel">Thông tin cá nhân</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {user && (
                <div className="row">
                  <div className="col-md-4 text-center mb-4">
                    <img 
                      src="assets/img/profile-img.jpg" 
                      alt="Profile" 
                      className="rounded-circle profile-img" 
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <h4 className="mt-3">{user.fullName}</h4>
                    <p className="text-muted">{isAdmin ? 'Administrator' : isManager ? 'Manager' : 'Nhân viên'}</p>
                  </div>
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Thông tin chi tiết</h5>
                        <div className="profile-detail">
                          <dl className="row">
                            <dt className="col-sm-4">Họ và tên:</dt>
                            <dd className="col-sm-8">{user.fullName}</dd>
                            
                            <dt className="col-sm-4">Email:</dt>
                            <dd className="col-sm-8">{user.email}</dd>
                            
                            <dt className="col-sm-4">Phòng ban:</dt>
                            <dd className="col-sm-8">{user.department?.departmentName || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Chức vụ:</dt>
                            <dd className="col-sm-8">
                              {isAdmin ? 'Quản trị viên' : isManager ? 'Quản lý' : 'Nhân viên'}
                            </dd>
                            
                            <dt className="col-sm-4">Số điện thoại:</dt>
                            <dd className="col-sm-8">{user.phoneNumber || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Ngày sinh:</dt>
                            <dd className="col-sm-8">{formatDate(user.birthDate)}</dd>
                            
                            <dt className="col-sm-4">Ngày vào làm:</dt>
                            <dd className="col-sm-8">{formatDate(user.joinDate)}</dd>
                            
                            <dt className="col-sm-4">Địa chỉ:</dt>
                            <dd className="col-sm-8">{user.address || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">CMND/CCCD:</dt>
                            <dd className="col-sm-8">{user.identityCard || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Học vấn:</dt>
                            <dd className="col-sm-8">{user.education || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Kinh nghiệm:</dt>
                            <dd className="col-sm-8">{user.workExperience || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Lương cơ bản:</dt>
                            <dd className="col-sm-8">
                              {user.baseSalary 
                                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(user.baseSalary)
                                : 'Chưa cập nhật'}
                            </dd>
                            
                            <dt className="col-sm-4">Tài khoản ngân hàng:</dt>
                            <dd className="col-sm-8">{user.bankAccount || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Tên ngân hàng:</dt>
                            <dd className="col-sm-8">{user.bankName || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Mã số thuế:</dt>
                            <dd className="col-sm-8">{user.taxCode || 'Chưa cập nhật'}</dd>
                            
                            <dt className="col-sm-4">Mã số BHXH:</dt>
                            <dd className="col-sm-8">{user.insuranceCode || 'Chưa cập nhật'}</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-success" onClick={openEditProfileModal}>
                <i className="bi bi-pencil-square me-1"></i>
                Chỉnh sửa thông tin
              </button>
              <button type="button" className="btn btn-primary" onClick={refreshUserProfile}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProfileModalLabel">Chỉnh sửa thông tin cá nhân</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitProfile}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">Họ và tên</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="fullName" 
                      name="fullName" 
                      value={formData.fullName || ''} 
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={user?.email || ''} 
                      disabled 
                      title="Email không thể thay đổi"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      value={formData.phoneNumber || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="birthDate" className="form-label">Ngày sinh</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="birthDate" 
                      name="birthDate" 
                      value={formData.birthDate || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="address" className="form-label">Địa chỉ</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="address" 
                      name="address" 
                      value={formData.address || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="identityCard" className="form-label">CMND/CCCD</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="identityCard" 
                      name="identityCard" 
                      value={formData.identityCard || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="department" className="form-label">Phòng ban</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="department" 
                      value={user?.department?.departmentName || ''} 
                      disabled 
                      title="Phòng ban không thể thay đổi"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="position" className="form-label">Chức vụ</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="position" 
                      value={isAdmin ? 'Quản trị viên' : isManager ? 'Quản lý' : 'Nhân viên'} 
                      disabled 
                      title="Chức vụ không thể thay đổi"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="baseSalary" className="form-label">Lương cơ bản</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="baseSalary" 
                      value={user?.baseSalary 
                        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(user.baseSalary)
                        : ''} 
                      disabled 
                      title="Lương cơ bản không thể thay đổi"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="education" className="form-label">Học vấn</label>
                    <textarea 
                      className="form-control" 
                      id="education" 
                      name="education" 
                      rows="2" 
                      value={formData.education || ''} 
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="workExperience" className="form-label">Kinh nghiệm làm việc</label>
                    <textarea 
                      className="form-control" 
                      id="workExperience" 
                      name="workExperience" 
                      rows="2" 
                      value={formData.workExperience || ''} 
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="bankAccount" className="form-label">Số tài khoản ngân hàng</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="bankAccount" 
                      name="bankAccount" 
                      value={formData.bankAccount || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="bankName" className="form-label">Tên ngân hàng</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="bankName" 
                      name="bankName" 
                      value={formData.bankName || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="taxCode" className="form-label">Mã số thuế</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="taxCode" 
                      name="taxCode" 
                      value={formData.taxCode || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="insuranceCode" className="form-label">Mã số BHXH</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="insuranceCode" 
                      name="insuranceCode" 
                      value={formData.insuranceCode || ''} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang lưu...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-1"></i>
                        Lưu thay đổi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;