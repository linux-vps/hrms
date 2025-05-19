import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import * as XLSX from 'xlsx';

const SalaryCalculation = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [timekeepingRecords, setTimekeepingRecords] = useState([]);

  const handleMonthChange = (event) => {
    const [year, month] = event.target.value.split('-');
    setCurrentMonth(new Date(year, month - 1));
    calculateSalaryData(new Date(year, month - 1));
  };

  useEffect(() => {
    calculateSalaryData(currentMonth);
  }, []);

  const calculateSalaryData = async (date) => {
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

      // Lấy ngày đầu và cuối của tháng được chọn
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];

      // Lấy dữ liệu chấm công
      const response = await axios.get(`/timekeeping/department/${departmentId}`, {
        params: {
          startDate,
          endDate
        }
      });

      // Lưu lại dữ liệu gốc từ API
      setTimekeepingRecords(response.data.data);

      // Xử lý và tính toán dữ liệu lương
      const processedData = processTimekeepingData(response.data.data);
      setSalaryData(processedData);

    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu lương');
      console.error('Error calculating salary data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processTimekeepingData = (records) => {
    // Nhóm dữ liệu theo nhân viên
    const employeeData = records.reduce((acc, record) => {
      const employeeId = record.employee?.id;
      if (!employeeId) return acc;

      if (!acc[employeeId]) {
        acc[employeeId] = {
          id: employeeId,
          fullName: record.employee?.fullName || 'N/A',
          totalWorkDays: 0,
          lateDays: 0,
          earlyLeaveDays: 0,
          missingCheckoutDays: 0
        };
      }

      // Tính số công và số ngày đi muộn
      acc[employeeId].totalWorkDays += 1;
      
      // Sử dụng thông tin isLate từ API
      if (record.isLate) {
        acc[employeeId].lateDays += 1;
      }

      // Sử dụng thông tin isEarlyLeave từ API
      if (record.isEarlyLeave) {
        acc[employeeId].earlyLeaveDays += 1;
      }

      // Đếm số ngày không có checkout
      if (!record.checkOutTime) {
        acc[employeeId].missingCheckoutDays += 1;
      }

      return acc;
    }, {});

    return Object.values(employeeData);
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
      selector: row => row.fullName,
      sortable: true,
    },
    {
      name: 'Số công',
      selector: row => row.totalWorkDays,
      sortable: true,
    },
    {
      name: 'Đi muộn',
      selector: row => row.lateDays,
      sortable: true,
    },
    {
      name: 'Về sớm',
      selector: row => row.earlyLeaveDays,
      sortable: true,
    },
    {
      name: 'Vắng',
      selector: row => row.missingCheckoutDays,
      sortable: true,
    }
  ];

  const expandedComponent = ({ data }) => {
    // Lọc các bản ghi chấm công của nhân viên này
    const employeeRecords = timekeepingRecords.filter(
      record => record.employee?.id === data.id
    );

    return (
      <div className="p-3">
        <h6>Chi tiết chấm công</h6>
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Giờ vào</th>
              <th>Giờ ra</th>
              <th>Ca làm việc</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {employeeRecords.map(record => (
              <tr key={record.id}>
                <td>{new Date(record.date).toLocaleDateString('vi-VN')}</td>
                <td>{record.checkInTime || 'N/A'}</td>
                <td>{record.checkOutTime || 'N/A'}</td>
                <td>{record.shift?.shiftName} ({record.shift?.startTime} - {record.shift?.endTime})</td>
                <td>
                  {record.isLate && <span className="badge bg-warning me-1">Đi muộn</span>}
                  {record.isEarlyLeave && <span className="badge bg-warning me-1">Về sớm</span>}
                  {!record.checkOutTime && <span className="badge bg-danger">Vắng</span>}
                  {!record.isLate && !record.isEarlyLeave && record.checkOutTime && 
                    <span className="badge bg-success">Đúng giờ</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const exportToExcel = () => {
    try {
      // Tạo dữ liệu để xuất
      const exportData = salaryData.map(item => ({
        'ID': item.id,
        'Tên nhân viên': item.fullName,
        'Số công': item.totalWorkDays,
        'Đi muộn': item.lateDays,
        'Về sớm': item.earlyLeaveDays,
        'Vắng': item.missingCheckoutDays
      }));

      // Tạo sheet chi tiết cho từng nhân viên
      const detailsData = [];
      salaryData.forEach(employee => {
        const employeeRecords = timekeepingRecords.filter(
          record => record.employee?.id === employee.id
        );

        employeeRecords.forEach(record => {
          detailsData.push({
            'ID nhân viên': employee.id,
            'Tên nhân viên': employee.fullName,
            'Ngày': new Date(record.date).toLocaleDateString('vi-VN'),
            'Giờ vào': record.checkInTime || 'N/A',
            'Giờ ra': record.checkOutTime || 'N/A',
            'Ca làm việc': `${record.shift?.shiftName} (${record.shift?.startTime} - ${record.shift?.endTime})`,
            'Đi muộn': record.isLate ? 'Có' : 'Không',
            'Về sớm': record.isEarlyLeave ? 'Có' : 'Không',
            'Vắng': record.checkOutTime ? 'Không' : 'Có'
          });
        });
      });

      // Tạo workbook mới
      const wb = XLSX.utils.book_new();
      
      // Sheet tổng hợp
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // Tùy chỉnh độ rộng cột cho sheet tổng hợp
      const columnWidths = [
        { wch: 15 },  // ID
        { wch: 30 },  // Tên nhân viên
        { wch: 15 },  // Số công
        { wch: 20 },  // Số ngày đi muộn
        { wch: 20 },  // Số ngày về sớm
        { wch: 20 },  // Vắng
      ];
      ws['!cols'] = columnWidths;

      // Sheet chi tiết
      const detailsWs = XLSX.utils.json_to_sheet(detailsData);
      
      // Tùy chỉnh độ rộng cột cho sheet chi tiết
      const detailColumnWidths = [
        { wch: 15 },  // ID nhân viên
        { wch: 30 },  // Tên nhân viên
        { wch: 15 },  // Ngày
        { wch: 15 },  // Giờ vào
        { wch: 15 },  // Giờ ra
        { wch: 30 },  // Ca làm việc
        { wch: 15 },  // Đi muộn
        { wch: 15 },  // Về sớm
        { wch: 15 },  // Vắng
      ];
      detailsWs['!cols'] = detailColumnWidths;

      // Thêm các worksheet vào workbook
      XLSX.utils.book_append_sheet(
        wb, 
        ws, 
        `Tổng hợp tháng ${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`
      );
      
      XLSX.utils.book_append_sheet(
        wb,
        detailsWs,
        `Chi tiết tháng ${currentMonth.getMonth() + 1}/${currentMonth.getFullYear()}`
      );

      // Tạo tên file với tháng và năm
      const fileName = `Bang_Cong_${currentMonth.getMonth() + 1}_${currentMonth.getFullYear()}.xlsx`;

      // Xuất file
      XLSX.writeFile(wb, fileName);

      toast.success('Xuất file Excel thành công!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Lỗi khi xuất file Excel');
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">
            Bảng công tháng {currentMonth.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
          </h5>
          <div className="d-flex gap-2">
            <input
              type="month"
              className="form-control"
              style={{ width: 'auto' }}
              value={`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`}
              onChange={handleMonthChange}
            />
            <button 
              className="btn btn-success"
              onClick={exportToExcel}
              disabled={loading || salaryData.length === 0}
            >
              <i className="bi bi-file-earmark-excel me-1"></i>
              Xuất Excel
            </button>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={salaryData}
          pagination
          progressPending={loading}
          expandableRows
          expandableRowsComponent={expandedComponent}
          progressComponent={
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
          noDataComponent={
            <div className="text-center my-3">
              Không có dữ liệu bảng công
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SalaryCalculation;