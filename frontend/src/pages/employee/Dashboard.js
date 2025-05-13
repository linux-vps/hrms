import React, { useState, useEffect, useRef } from 'react';
import { Button, message, Space, DatePicker, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useAuth } from '../../contexts/AuthContext';
import dayjs from 'dayjs';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [workingTime, setWorkingTime] = useState(null);
  const [checkinTime, setCheckinTime] = useState(null);
  const scannerRef = useRef(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const convertTimeToMinutes = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const checkAttendanceStatus = (record) => {
    const checkInTime = record.checkInTime;
    const checkOutTime = record.checkOutTime;
    const shiftStartTime = record.shift?.startTime;
    const shiftEndTime = record.shift?.endTime;

    // Nếu không có thông tin chấm công hoặc ca làm việc, trả về không xác định
    if (!checkInTime || !shiftStartTime) {
      return { status: 'unknown', message: 'Không xác định' };
    }

    const checkInMinutes = convertTimeToMinutes(checkInTime);
    const checkOutMinutes = convertTimeToMinutes(checkOutTime);
    const shiftStartMinutes = convertTimeToMinutes(shiftStartTime);
    const shiftEndMinutes = convertTimeToMinutes(shiftEndTime);

    // Kiểm tra nếu giờ vào sau giờ kết thúc ca hoặc giờ vào trước giờ bắt đầu ca quá 1 giờ
    if (checkInMinutes >= shiftEndMinutes || checkInMinutes < (shiftStartMinutes - 60)) {
      return { 
        status: 'out-of-shift', 
        message: 'Chấm công ngoài giờ ca' 
      };
    }

    // Kiểm tra đi muộn
    const LATE_THRESHOLD = 5; // 5 phút
    const isLate = checkInMinutes > (shiftStartMinutes + LATE_THRESHOLD);
    
    // Kiểm tra về sớm (chỉ khi có check out)
    const EARLY_LEAVE_THRESHOLD = 5; // 5 phút
    const isEarlyLeave = checkOutMinutes && shiftEndMinutes && 
                        checkOutMinutes < (shiftEndMinutes - EARLY_LEAVE_THRESHOLD);
    
    // Kiểm tra đúng giờ (không đi muộn và không về sớm)
    const isOnTime = !isLate && (!checkOutMinutes || !isEarlyLeave);

    if (isLate && isEarlyLeave) {
      return { status: 'late-early', message: 'Đi muộn & Về sớm' };
    } else if (isLate) {
      return { status: 'late', message: 'Đi muộn' };
    } else if (isEarlyLeave) {
      return { status: 'early', message: 'Về sớm' };
    } else if (isOnTime) {
      return { status: 'on-time', message: 'Đúng giờ' };
    }

    return { status: 'unknown', message: 'Không xác định' };
  };

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Ca làm việc',
      dataIndex: 'shift',
      key: 'shiftName',
      render: (shift) => shift.shiftName,
    },
    {
      title: 'Giờ ca',
      dataIndex: 'shift',
      key: 'shiftTime',
      render: (shift) => `${shift.startTime} - ${shift.endTime}`,
    },
    {
      title: 'Giờ vào',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
    },
    {
      title: 'Giờ ra',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      render: (text) => text || '---',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => {
        const { status, message } = checkAttendanceStatus(record);
        
        const statusColors = {
          'unknown': 'default',
          'out-of-shift': 'error',
          'late': 'warning',
          'early': 'warning',
          'late-early': 'warning',
          'on-time': 'success'
        };
        
        return <Tag color={statusColors[status]}>{message}</Tag>;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (text) => text || '-',
    },
  ];

  const fetchAttendanceData = async (startDate, endDate) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Vui lòng đăng nhập lại');
        navigate('/login');
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/timekeeping/employee/${user.id}`,
        {
          params: {
            startDate: dayjs(startDate).format('YYYY-MM-DD'),
            endDate: dayjs(endDate).format('YYYY-MM-DD'),
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setAttendanceData(response.data.data);
      }
    } catch (error) {
      message.error('Không thể tải dữ liệu chấm công');
    }
  };

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      fetchAttendanceData(dates[0], dates[1]);
    } else {
      setDateRange([]);
      setAttendanceData([]);
    }
  };

  const handleQRScan = async (decodedText, type) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Vui lòng đăng nhập lại');
        navigate('/login');
        return;
      }

      if (!decodedText || !decodedText.includes('qr')) {
        message.error('Mã QR không hợp lệ. Vui lòng thử lại.');
        return;
      }

      const qrParts = decodedText.split('qr');
      if (qrParts.length < 2 || !qrParts[1]) {
        message.error('Định dạng mã QR không đúng');
        return;
      }

      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/timekeeping/${type}/qr${qrParts[1]}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      console.log('Sending request to:', config.url);
      const response = await axios(config);
      
      if (response.data.success) {
        if (type === 'checkin') {
          message.success('Điểm danh vào thành công!');
          setCheckinTime(new Date());
        } else {
          message.success('Điểm danh ra thành công!');
          setCheckinTime(null);
          setWorkingTime(null);
        }
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
        setIsScanning(false);
      } else {
        message.error(response.data.message || 'Điểm danh thất bại');
      }
    } catch (error) {
      console.error('QR Scan Error:', error);
      message.error(
        error.response?.data?.message || 
        'Có lỗi xảy ra khi điểm danh. Vui lòng thử lại.'
      );
    }
  };

  const startQRScanner = (type) => {
    setIsScanning(true);
    
    setTimeout(() => {
      try {
        if (scannerRef.current) {
          scannerRef.current.clear();
        }
        
        const scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 10,
          rememberLastUsedCamera: true,
          aspectRatio: 1.0,
          disableFlip: false,
          formatsToSupport: [0],
        });
        
        scannerRef.current = scanner;
        
        scanner.render(
          (decodedText) => handleQRScan(decodedText, type),
          (error) => {
            if (error) {
              console.warn('QR code scanning warning:', error);
            }
          }
        );
      } catch (error) {
        console.error('Error starting scanner:', error);
        message.error('Không thể khởi động máy quét QR. Vui lòng kiểm tra quyền truy cập camera.');
        setIsScanning(false);
      }
    }, 300);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (checkinTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = now - checkinTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setWorkingTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [checkinTime]);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Trang Nhân Viên</h1>
      
      {workingTime && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Thời gian làm việc: {workingTime}</h2>
        </div>
      )}

      <Space>
        {!isScanning ? (
          <>
            <Button type="primary" onClick={() => startQRScanner('checkin')}>
              Điểm Danh Vào
            </Button>
            <Button type="primary" danger onClick={() => startQRScanner('checkout')}>
              Điểm Danh Ra
            </Button>
          </>
        ) : (
          <>
            <div id="reader" style={{ width: '100%', maxWidth: '600px' }}></div>
            <Button onClick={stopScanner}>Hủy quét</Button>
          </>
        )}
      </Space>

      <div style={{ marginTop: '40px' }}>
        <h2>Bảng Chấm Công</h2>
        <Space direction="vertical" style={{ width: '100%' }}>
          <DatePicker.RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            format="YYYY-MM-DD"
            style={{ marginBottom: '20px' }}
          />
          <Table
            columns={columns}
            dataSource={attendanceData}
            rowKey="id"
            pagination={false}
          />
        </Space>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
