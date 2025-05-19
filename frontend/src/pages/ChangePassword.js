import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Toast } from '../components/Toast';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user, changePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Kiểm tra người dùng đã đăng nhập chưa
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Xóa thông báo lỗi khi người dùng thay đổi input
    if (error[name]) {
      setError({ ...error, [name]: '' });
    }
  };

  // Kiểm tra form trước khi submit
  const validateForm = () => {
    let isValid = true;
    const newError = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    // Kiểm tra mật khẩu hiện tại
    if (!formData.currentPassword) {
      newError.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
      isValid = false;
    }

    // Kiểm tra mật khẩu mới
    if (!formData.newPassword) {
      newError.newPassword = 'Vui lòng nhập mật khẩu mới';
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newError.newPassword = 'Mật khẩu mới phải có ít nhất 6 ký tự';
      isValid = false;
    }

    // Kiểm tra xác nhận mật khẩu
    if (!formData.confirmPassword) {
      newError.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newError.confirmPassword = 'Xác nhận mật khẩu không khớp';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await changePassword(
        formData.currentPassword,
        formData.newPassword
      );
      
      if (result.success) {
        Toast.success('Đổi mật khẩu thành công');
        
        // Reset form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        if (result.message && result.message.includes('current password')) {
          setError({ ...error, currentPassword: 'Mật khẩu hiện tại không đúng' });
        } else {
          Toast.error(result.message || 'Đổi mật khẩu thất bại');
        }
      }
    } catch (error) {
      console.error('Change password error:', error);
      Toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Đổi mật khẩu</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Trang chủ</a></li>
            <li className="breadcrumb-item">Tài khoản</li>
            <li className="breadcrumb-item active">Đổi mật khẩu</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Đổi mật khẩu</h5>

                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label htmlFor="currentPassword" className="form-label">Mật khẩu hiện tại</label>
                    <input
                      type="password"
                      className={`form-control ${error.currentPassword ? 'is-invalid' : ''}`}
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      required
                    />
                    {error.currentPassword && (
                      <div className="invalid-feedback">
                        {error.currentPassword}
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                    <input
                      type="password"
                      className={`form-control ${error.newPassword ? 'is-invalid' : ''}`}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      required
                    />
                    {error.newPassword && (
                      <div className="invalid-feedback">
                        {error.newPassword}
                      </div>
                    )}
                    <div className="form-text">Mật khẩu phải có ít nhất 6 ký tự</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      className={`form-control ${error.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    {error.confirmPassword && (
                      <div className="invalid-feedback">
                        {error.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Đang xử lý...
                        </>
                      ) : (
                        'Đổi mật khẩu'
                      )}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChangePassword; 