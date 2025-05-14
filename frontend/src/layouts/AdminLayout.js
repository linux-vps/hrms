import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminLayout.css';


const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("Current user:", user);
  
  const isAdmin = user?.role === 'admin';
  const isManager = user?.role === 'manager';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
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

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Quản lý chấm công</span>
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

          {!isAdmin && !isManager && (
            <>
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
    </>
  );
};

export default AdminLayout;