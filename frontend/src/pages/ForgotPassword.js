import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Toast } from '../components/Toast';

const ForgotPassword = () => {
  const { forgotPassword, verifyOtp } = useAuth();
  const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập OTP, 3: Thành công
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 phút = 900 giây
  const [timerActive, setTimerActive] = useState(false);

  // Xử lý đếm ngược
  React.useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Format thời gian từ giây sang mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Xử lý gửi email
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setStep(2);
        setTimerActive(true);
        Toast.success('Mã OTP đã được gửi đến email của bạn');
      } else {
        Toast.error(result.message || 'Email không tồn tại trong hệ thống');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý gửi lại OTP
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        setTimeLeft(900); // Reset thời gian đếm ngược
        setTimerActive(true);
        Toast.success('Mã OTP mới đã được gửi đến email của bạn');
      } else {
        Toast.error(result.message || 'Không thể gửi lại mã OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      Toast.error('Có lỗi xảy ra khi gửi lại mã OTP');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xác thực OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await verifyOtp(email, otp);
      if (result.success) {
        setStep(3);
        Toast.success('Xác thực thành công. Mật khẩu mới đã được gửi đến email của bạn.');
      } else {
        Toast.error(result.message || 'Mã OTP không hợp lệ hoặc đã hết hạn');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      Toast.error('Có lỗi xảy ra khi xác thực OTP');
    } finally {
      setLoading(false);
    }
  };

  // Nội dung hiển thị dựa theo bước
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form className="row g-3" onSubmit={handleSubmitEmail}>
            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text" id="inputGroupPrepend">@</span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-text">Nhập email đã đăng ký để nhận mã OTP</div>
            </div>

            <div className="col-12">
              <button 
                className="btn btn-primary w-100" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang gửi...
                  </>
                ) : (
                  'Gửi mã OTP'
                )}
              </button>
            </div>
            
            <div className="col-12 text-center">
              <p className="small mb-0">
                <Link to="/login">Quay lại đăng nhập</Link>
              </p>
            </div>
          </form>
        );
      
      case 2:
        return (
          <form className="row g-3" onSubmit={handleVerifyOtp}>
            <div className="col-12">
              <label htmlFor="email-display" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email-display"
                value={email}
                disabled
              />
            </div>

            <div className="col-12">
              <label htmlFor="otp" className="form-label">Mã OTP</label>
              <input
                type="text"
                name="otp"
                className="form-control"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                pattern="[0-9]{6}"
                maxLength="6"
                required
              />
              <div className="form-text">
                Nhập mã OTP 6 số đã gửi đến email của bạn. 
                Thời gian còn lại: <span className="text-danger">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <div className="col-12">
              <button 
                className="btn btn-primary w-100" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang xác thực...
                  </>
                ) : (
                  'Xác thực'
                )}
              </button>
            </div>
            
            <div className="col-12 text-center">
              <button 
                type="button" 
                className="btn btn-link p-0"
                onClick={handleResendOtp}
                disabled={loading || timerActive && timeLeft > 870} // Chỉ cho phép gửi lại sau 30s
              >
                Gửi lại mã OTP
              </button>
            </div>
            
            <div className="col-12 text-center">
              <p className="small mb-0">
                <Link to="/login">Quay lại đăng nhập</Link>
              </p>
            </div>
          </form>
        );
      
      case 3:
        return (
          <div className="text-center">
            <div className="mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
            </div>
            <h5 className="mb-3">Đặt lại mật khẩu thành công!</h5>
            <p>Mật khẩu mới đã được gửi đến email của bạn.</p>
            <p>Vui lòng kiểm tra email và đăng nhập bằng mật khẩu mới.</p>
            <div className="mt-4">
              <Link to="/login" className="btn btn-primary">
                Đăng nhập
              </Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a href="/" className="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">HRMS</span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Quên mật khẩu</h5>
                      <p className="text-center small">
                        {step === 1 && 'Vui lòng nhập email đã đăng ký để lấy lại mật khẩu'}
                        {step === 2 && 'Nhập mã OTP đã được gửi đến email của bạn'}
                        {step === 3 && 'Đặt lại mật khẩu thành công'}
                      </p>
                    </div>

                    {renderStepContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForgotPassword; 