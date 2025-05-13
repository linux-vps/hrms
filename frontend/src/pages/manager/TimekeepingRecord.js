import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const TimekeepingRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departmentName, setDepartmentName] = useState('N/A'); // State mới để lưu departmentName

  useEffect(() => {
    fetchTimekeepingRecords();
  }, []);

  const fetchTimekeepingRecords = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Vui lòng đăng nhập lại');
        return;
      }
  
      const decodedToken = jwtDecode(token);
      const departmentId = decodedToken.departmentId;
  
      if (!departmentId) {
        toast.error('Không tìm thấy thông tin phòng ban');
        return;
      }

      // Gọi API để lấy departmentName
      const departmentsResponse = await axios.get('/departments');
      const departmentName = departmentsResponse.data.data.departmentName;
      setDepartmentName(departmentName); // Lưu departmentName vào state
      
      console.log("Danh sách departments:", departmentsResponse.data);

      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  
      const response = await axios.get(`/timekeeping/department/${departmentId}`, {
        params: {
          startDate,
          endDate
        }
      });
      
      setRecords(response.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu chấm công');
      console.error('Error fetching timekeeping records:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertTimeToMinutes = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const checkAttendanceStatus = (row) => {
    const checkInTime = row.checkInTime;
    const checkOutTime = row.checkOutTime;
    const shiftStartTime = row.shift?.startTime;
    const shiftEndTime = row.shift?.endTime;

    // Nếu không có thông tin chấm công hoặc ca làm việc, trả về không xác định
    if (!checkInTime || !shiftStartTime) {
      return { status: 'unknown', message: 'Không xác định' };
    }

    const checkInMinutes = convertTimeToMinutes(checkInTime);
    const checkOutMinutes = convertTimeToMinutes(checkOutTime);
    const shiftStartMinutes = convertTimeToMinutes(shiftStartTime);
    const shiftEndMinutes = convertTimeToMinutes(shiftEndTime);

    // Debug - Thêm log để kiểm tra giá trị thời gian
    console.log('Check-in time:', checkInTime, '=', checkInMinutes, 'minutes');
    console.log('Shift start time:', shiftStartTime, '=', shiftStartMinutes, 'minutes');
    console.log('Shift end time:', shiftEndTime, '=', shiftEndMinutes, 'minutes');

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
      name: 'ID',
      selector: row => row.id || 'N/A',
      sortable: true,
      width: '180px'
    },
    {
      name: 'Tên nhân viên',
      selector: row => row.employee?.fullName || 'N/A',
      sortable: true,
    },
    {
      name: 'Tên Phòng ban',
      selector: row => departmentName || row.employee?.department?.departmentName || 'N/A', // Ưu tiên lấy từ departmentName state
      sortable: true,
    },
    {
      name: 'Ngày',
      selector: row => {
        try {
          return new Date(row.date).toLocaleDateString('vi-VN');
        } catch (error) {
          return 'N/A';
        }
      },
      sortable: true,
    },
    {
      name: 'Ca làm việc',
      selector: row => row.shift ? `${row.shift.startTime} - ${row.shift.endTime}` : 'N/A',
      sortable: true,
    },
    {
      name: 'Giờ vào',
      selector: row => row.checkInTime || 'N/A',
      sortable: true,
    },
    {
      name: 'Giờ ra',
      selector: row => row.checkOutTime || '---',
      sortable: true,
    },
    {
      name: 'Trạng thái',
      cell: row => {
        const { status, message } = checkAttendanceStatus(row);
        
        return (
          <div>
            {status === 'unknown' && (
              <span className="badge bg-secondary">{message}</span>
            )}
            {status === 'out-of-shift' && (
              <span className="badge bg-danger">{message}</span>
            )}
            {status === 'late' && (
              <span className="badge bg-warning">{message}</span>
            )}
            {status === 'early' && (
              <span className="badge bg-warning">{message}</span>
            )}
            {status === 'late-early' && (
              <span className="badge bg-warning">{message}</span>
            )}
            {status === 'on-time' && (
              <span className="badge bg-success">{message}</span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Bảng ghi chấm công</h5>
        
        <DataTable
          columns={columns}
          data={records}
          pagination
          progressPending={loading}
          progressComponent={
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
          noDataComponent={
            <div className="text-center my-3">
              Không có dữ liệu chấm công
            </div>
          }
        />
      </div>
    </div>
  );
};

export default TimekeepingRecords;
