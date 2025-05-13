import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Button, message, Spin, Modal, Space } from 'antd';
import axios from '../../utils/axios';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import locale from 'antd/lib/date-picker/locale/vi_VN';
import { DownloadOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';

const EmployeePayroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPayrollData(selectedMonth);
  }, []);

  const fetchPayrollData = async (date) => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Vui lòng đăng nhập lại');
        return;
      }

      const month = date.month() + 1;
      const year = date.year();

      const response = await axios.get(
        `/payroll/my-payrolls`,
        {
          params: {
            year,
            month
          }
        }
      );

      if (response.data.success) {
        if (response.data.data && Array.isArray(response.data.data)) {
          setPayrolls(response.data.data);
        } else {
          setPayrolls([]);
          message.info('Chưa có dữ liệu bảng lương cho tháng này');
        }
      } else {
        message.error(response.data.message || 'Không thể tải dữ liệu bảng lương');
        setPayrolls([]);
      }
    } catch (error) {
      console.error('Error fetching payroll data:', error);
      message.error('Có lỗi xảy ra khi tải dữ liệu bảng lương');
      setPayrolls([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (date) => {
    if (date) {
      setSelectedMonth(date);
      fetchPayrollData(date);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleViewDetails = (record) => {
    setSelectedPayroll(record);
    setModalVisible(true);
  };

  const exportToExcel = () => {
    try {
      if (payrolls.length === 0) {
        message.warning('Không có dữ liệu bảng lương để xuất');
        return;
      }

      // Chuẩn bị dữ liệu xuất
      const exportData = payrolls.map((item, index) => ({
        'STT': index + 1,
        'Tháng': `${item.month}/${item.year}`,
        'Ngày làm việc': item.workingDays,
        'Tổng ngày trong tháng': item.totalWorkingDays,
        'Lương cơ bản': Number(item.baseSalary),
        'Lương theo ngày công': Number(item.basicSalary),
        'Lương làm thêm giờ': Number(item.overtimeSalary),
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
        { wch: 5 }, // STT
        { wch: 15 }, // Tháng
        { wch: 15 }, // Ngày làm việc
        { wch: 20 }, // Tổng ngày trong tháng
        { wch: 15 }, // Lương cơ bản
        { wch: 20 }, // Lương theo ngày công
        { wch: 20 }, // Lương làm thêm giờ
        { wch: 15 }, // Phụ cấp
        { wch: 15 }, // Thưởng
        { wch: 15 }, // Khấu trừ
        { wch: 15 }, // Phạt
        { wch: 15 }, // Tổng lương
      ];
      ws['!cols'] = columnWidths;

      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(
        wb, 
        ws, 
        `Bảng lương ${selectedMonth.format('MM-YYYY')}`
      );

      // Tạo tên file với tháng và năm
      const fileName = `Bang_Luong_${selectedMonth.format('MM-YYYY')}.xlsx`;

      // Xuất file
      XLSX.writeFile(wb, fileName);

      message.success('Xuất file Excel thành công!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      message.error('Lỗi khi xuất file Excel');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tháng',
      dataIndex: 'month',
      key: 'month',
      render: (text, record) => `${record.month}/${record.year}`,
    },
    {
      title: 'Ngày làm việc',
      dataIndex: 'workingDays',
      key: 'workingDays',
      render: (text, record) => `${record.workingDays}/${record.totalWorkingDays}`,
    },
    {
      title: 'Lương cơ bản',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Phụ cấp',
      dataIndex: 'mandatoryAllowances',
      key: 'mandatoryAllowances',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Thưởng',
      dataIndex: 'optionalBonuses',
      key: 'optionalBonuses',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Tổng lương',
      dataIndex: 'totalSalary',
      key: 'totalSalary',
      render: (text) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {formatCurrency(text)}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={() => handleViewDetails(record)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Bảng lương cá nhân</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <DatePicker
            locale={locale}
            picker="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            format="MM/YYYY"
            placeholder="Chọn tháng"
          />
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            onClick={() => fetchPayrollData(selectedMonth)}
          >
            Xem bảng lương
          </Button>
        </Space>
        
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={exportToExcel}
          disabled={payrolls.length === 0}
        >
          Xuất Excel
        </Button>
      </div>
      
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={payrolls}
          rowKey={(record) => record.id || record._id}
          pagination={false}
          locale={{
            emptyText: 'Không có dữ liệu bảng lương cho tháng này'
          }}
        />
      </Spin>
      
      <Modal
        title="Chi tiết bảng lương"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {selectedPayroll && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3>Thông tin chung</h3>
              <p><strong>Tháng:</strong> {selectedPayroll.month}/{selectedPayroll.year}</p>
              <p><strong>Ngày làm việc:</strong> {selectedPayroll.workingDays}/{selectedPayroll.totalWorkingDays} ngày</p>
              <p><strong>Giờ làm thêm:</strong> {selectedPayroll.overtimeHours || 0} giờ</p>
            </div>
            
            <Table
              bordered
              pagination={false}
              dataSource={[
                {
                  key: '1',
                  item: 'Lương cơ bản',
                  amount: formatCurrency(selectedPayroll.baseSalary),
                  note: 'Lương cơ bản theo hợp đồng'
                },
                {
                  key: '2',
                  item: 'Lương theo ngày công',
                  amount: formatCurrency(selectedPayroll.basicSalary),
                  note: `Tính theo số ngày làm việc thực tế: ${selectedPayroll.workingDays}/${selectedPayroll.totalWorkingDays} ngày`
                },
                {
                  key: '3',
                  item: 'Lương làm thêm giờ',
                  amount: formatCurrency(selectedPayroll.overtimeSalary || 0),
                  note: `Số giờ làm thêm: ${selectedPayroll.overtimeHours || 0} giờ, hệ số: ${selectedPayroll.overtimeRate || 1.5}x`
                },
                {
                  key: '4',
                  item: 'Phụ cấp',
                  amount: formatCurrency(selectedPayroll.mandatoryAllowances),
                  note: 'Các khoản phụ cấp theo quy định'
                },
                {
                  key: '5',
                  item: 'Thưởng',
                  amount: formatCurrency(selectedPayroll.optionalBonuses),
                  note: 'Các khoản thưởng trong tháng'
                },
                {
                  key: '6',
                  item: 'Khấu trừ',
                  amount: `-${formatCurrency(selectedPayroll.mandatoryDeductions)}`,
                  note: 'Các khoản khấu trừ bắt buộc'
                },
                {
                  key: '7',
                  item: 'Phạt',
                  amount: `-${formatCurrency(selectedPayroll.optionalPenalties)}`,
                  note: 'Các khoản phạt trong tháng'
                },
                {
                  key: '8',
                  item: 'TỔNG LƯƠNG',
                  amount: (
                    <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
                      {formatCurrency(selectedPayroll.totalSalary)}
                    </span>
                  ),
                  note: 'Tổng lương thực nhận'
                }
              ]}
              columns={[
                {
                  title: 'Khoản mục',
                  dataIndex: 'item',
                  key: 'item',
                  width: '25%',
                  render: (text, record, index) => 
                    index === 7 ? <strong>{text}</strong> : text
                },
                {
                  title: 'Số tiền',
                  dataIndex: 'amount',
                  key: 'amount',
                  width: '25%',
                  align: 'right'
                },
                {
                  title: 'Ghi chú',
                  dataIndex: 'note',
                  key: 'note',
                  width: '50%'
                }
              ]}
            />
            
            {selectedPayroll.note && (
              <div style={{ marginTop: '20px' }}>
                <h3>Ghi chú</h3>
                <p>{selectedPayroll.note}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EmployeePayroll; 