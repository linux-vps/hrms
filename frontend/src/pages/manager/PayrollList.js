import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import * as XLSX from 'xlsx';

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const handleMonthChange = (event) => {
    const [year, month] = event.target.value.split('-');
    setCurrentMonth(new Date(year, month - 1));
    fetchPayrollData(new Date(year, month - 1), 1);
  };

  useEffect(() => {
    fetchPayrollData(currentMonth, 1);
  }, []);

  const handlePageChange = (page) => {
    fetchPayrollData(currentMonth, page);
  };

  const fetchPayrollData = async (date, page = 1) => {
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

      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const response = await axios.get(`/payroll/department/${departmentId}`, {
        params: {
          month,
          year,
          page,
          limit: 10
        }
      });

      // Kiểm tra cấu trúc dữ liệu trả về
      if (response.data.data && response.data.data.data) {
        // Trường hợp API trả về data.data (mảng dữ liệu nằm trong data.data)
        const payrollsWithEmployeeInfo = await addEmployeeInfoToPayrolls(response.data.data.data);
        setPayrolls(payrollsWithEmployeeInfo);
        
        // Cập nhật thông tin phân trang
        setPagination({
          page: response.data.data.page || 1,
          limit: response.data.data.limit || 10,
          total: response.data.data.total || 0
        });
      } else if (response.data.data && Array.isArray(response.data.data)) {
        // Trường hợp API trả về data là mảng trực tiếp
        const payrollsWithEmployeeInfo = await addEmployeeInfoToPayrolls(response.data.data);
        setPayrolls(payrollsWithEmployeeInfo);
      } else {
        // Không có dữ liệu
        toast.info('Chưa có dữ liệu bảng lương cho tháng này. Bạn có thể tính lương mới.');
        setPayrolls([]);
      }
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu bảng lương');
      console.error('Error fetching payroll data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Loại bỏ các bản ghi trùng lặp dựa trên employeeId
  const removeDuplicatePayrolls = (payrolls) => {
    const uniqueEmployeeIds = new Set();
    const uniquePayrolls = [];
    
    // Sắp xếp theo thời gian tạo mới nhất
    const sortedPayrolls = [...payrolls].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    // Chỉ giữ lại bản ghi mới nhất cho mỗi nhân viên
    for (const payroll of sortedPayrolls) {
      if (!uniqueEmployeeIds.has(payroll.employeeId)) {
        uniqueEmployeeIds.add(payroll.employeeId);
        uniquePayrolls.push(payroll);
      }
    }
    
    return uniquePayrolls;
  };

  const addEmployeeInfoToPayrolls = async (payrolls) => {
    // Loại bỏ các bản ghi trùng lặp
    const uniquePayrolls = removeDuplicatePayrolls(payrolls);
    const payrollsWithInfo = [...uniquePayrolls];
    
    for (let i = 0; i < payrollsWithInfo.length; i++) {
      try {
        const response = await axios.get(`/employees/${payrollsWithInfo[i].employeeId}`);
        payrollsWithInfo[i].employeeInfo = response.data.data;
      } catch (error) {
        console.error(`Error fetching employee info for ${payrollsWithInfo[i].employeeId}:`, error);
        payrollsWithInfo[i].employeeInfo = { fullName: 'N/A', email: 'N/A' };
      }
    }
    
    return payrollsWithInfo;
  };

  const calculateTotalWorkingDays = (month, year) => {
    // Tính số ngày làm việc trong tháng (loại trừ thứ 7, chủ nhật)
    const daysInMonth = new Date(year, month, 0).getDate();
    let workingDays = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();
      
      // 0 là Chủ Nhật, 6 là Thứ Bảy
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++;
      }
    }
    
    return workingDays;
  };

  const calculateSalary = async () => {
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

      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      const totalWorkingDays = calculateTotalWorkingDays(month, year);

      const response = await axios.post(`/payroll/department/${departmentId}/calculate`, {
        month,
        year,
        useTimekeepingData: true,
        totalWorkingDays,
        note: `Lương tháng ${month}/${year}`
      });

      if (response.data.success) {
        toast.success(`Đã tính lương thành công cho ${response.data.data.success} nhân viên`);
        fetchPayrollData(currentMonth, 1);
      } else {
        toast.error('Có lỗi khi tính lương');
      }
    } catch (error) {
      toast.error('Lỗi khi tính lương');
      console.error('Error calculating salary:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleViewDetails = (payroll) => {
    setSelectedPayroll(payroll);
    setShowModal(true);
  };

  const exportToExcel = () => {
    try {
      // Tạo dữ liệu để xuất
      const exportData = payrolls.map((item, index) => ({
        'STT': index + 1,
        'Tên nhân viên': item.employeeInfo?.fullName || 'N/A',
        'Email': item.employeeInfo?.email || 'N/A',
        'Số ngày làm việc': item.workingDays,
        'Số ngày trong tháng': item.totalWorkingDays,
        'Lương cơ bản': Number(item.baseSalary),
        'Phụ cấp': Number(item.mandatoryAllowances),
        'Thưởng': Number(item.optionalBonuses),
        'Khấu trừ': Number(item.mandatoryDeductions),
        'Phạt': Number(item.optionalPenalties),
        'Tổng lương': Number(item.totalSalary)
      }));

      // Tạo workbook mới
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Tùy chỉnh độ rộng cột
      const columnWidths = [
        { wch: 5 },   // STT
        { wch: 30 },  // Tên nhân viên
        { wch: 30 },  // Email
        { wch: 15 },  // Số ngày làm việc
        { wch: 20 },  // Số ngày trong tháng
        { wch: 15 },  // Lương cơ bản
        { wch: 15 },  // Phụ cấp
        { wch: 15 },  // Thưởng
        { wch: 15 },  // Khấu trừ
        { wch: 15 },  // Phạt
        { wch: 15 },  // Tổng lương
      ];
      ws['!cols'] = columnWidths;

      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(
        wb, 
        ws, 
        `Bảng lương ${currentMonth.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}`
      );

      // Tạo tên file với tháng và năm
      const fileName = `Bang_Luong_${currentMonth.getMonth() + 1}_${currentMonth.getFullYear()}.xlsx`;

      // Xuất file
      XLSX.writeFile(wb, fileName);

      toast.success('Xuất file Excel thành công!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Lỗi khi xuất file Excel');
    }
  };

  const columns = [
    {
      name: 'STT',
      cell: (row, index) => index + 1,
      width: '60px',
    },
    {
      name: 'Tên nhân viên',
      selector: row => row.employeeInfo?.fullName || 'N/A',
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.employeeInfo?.email || 'N/A',
      sortable: true,
    },
    {
      name: 'Số ngày làm việc',
      selector: row => row.workingDays,
      sortable: true,
    },
    {
      name: 'Số ngày muộn',
      cell: () => 0, // Sửa thành cell thay vì selector
      sortable: true,
    },
    {
      name: 'Tổng lương',
      selector: row => formatCurrency(row.totalSalary),
      sortable: true,
    },
    {
      name: 'Thao tác',
      cell: row => (
        <button 
          className="btn btn-sm btn-primary"
          onClick={() => handleViewDetails(row)}
        >
          Chi tiết
        </button>
      ),
    }
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">
            Bảng lương tháng {currentMonth.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}
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
              className="btn btn-primary"
              onClick={calculateSalary}
              disabled={loading}
            >
              <i className="bi bi-calculator me-1"></i>
              Tính lương
            </button>
            <button 
              className="btn btn-success"
              onClick={exportToExcel}
              disabled={loading || payrolls.length === 0}
            >
              <i className="bi bi-file-earmark-excel me-1"></i>
              Xuất Excel
            </button>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={payrolls}
          pagination
          paginationServer
          paginationTotalRows={pagination.total}
          onChangePage={handlePageChange}
          paginationPerPage={pagination.limit}
          paginationDefaultPage={pagination.page}
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
              Không có dữ liệu bảng lương
            </div>
          }
        />

        {/* Modal Chi tiết bảng lương */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Chi tiết bảng lương</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {selectedPayroll && (
                    <div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <h6>Thông tin nhân viên</h6>
                          <p><strong>Họ tên:</strong> {selectedPayroll.employeeInfo?.fullName || 'N/A'}</p>
                          <p><strong>Email:</strong> {selectedPayroll.employeeInfo?.email || 'N/A'}</p>
                          <p><strong>Số điện thoại:</strong> {selectedPayroll.employeeInfo?.phoneNumber || 'N/A'}</p>
                        </div>
                        <div className="col-md-6">
                          <h6>Thông tin chấm công</h6>
                          <p><strong>Số ngày làm việc:</strong> {selectedPayroll.workingDays} / {selectedPayroll.totalWorkingDays}</p>
                          <p><strong>Số giờ làm thêm:</strong> {selectedPayroll.overtimeHours} giờ</p>
                          <p><strong>Hệ số làm thêm:</strong> {selectedPayroll.overtimeRate}x</p>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-12">
                          <h6>Chi tiết lương</h6>
                          <table className="table table-bordered">
                            <tbody>
                              <tr>
                                <td>Lương cơ bản</td>
                                <td className="text-end">{formatCurrency(selectedPayroll.baseSalary)}</td>
                              </tr>
                              <tr>
                                <td>Lương theo ngày công</td>
                                <td className="text-end">{formatCurrency(selectedPayroll.basicSalary)}</td>
                              </tr>
                              <tr>
                                <td>Lương làm thêm giờ</td>
                                <td className="text-end">{formatCurrency(selectedPayroll.overtimeSalary)}</td>
                              </tr>
                              <tr>
                                <td>Phụ cấp</td>
                                <td className="text-end">{formatCurrency(selectedPayroll.mandatoryAllowances)}</td>
                              </tr>
                              <tr>
                                <td>Thưởng</td>
                                <td className="text-end">{formatCurrency(selectedPayroll.optionalBonuses)}</td>
                              </tr>
                              <tr>
                                <td>Khấu trừ</td>
                                <td className="text-end">-{formatCurrency(selectedPayroll.mandatoryDeductions)}</td>
                              </tr>
                              <tr>
                                <td>Phạt</td>
                                <td className="text-end">-{formatCurrency(selectedPayroll.optionalPenalties)}</td>
                              </tr>
                              <tr className="table-primary">
                                <td><strong>Tổng lương</strong></td>
                                <td className="text-end"><strong>{formatCurrency(selectedPayroll.totalSalary)}</strong></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {selectedPayroll.note && (
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <h6>Ghi chú</h6>
                            <p>{selectedPayroll.note}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollList; 