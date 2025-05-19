import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMyProjects } from '../../services/api';

const EmployeeProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getMyProjects();
      setProjects(response.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách dự án');
      console.error('Error fetching projects:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      draft: { label: 'Bản nháp', class: 'bg-secondary' },
      in_progress: { label: 'Đang thực hiện', class: 'bg-primary' },
      completed: { label: 'Hoàn thành', class: 'bg-success' },
      cancelled: { label: 'Đã hủy', class: 'bg-danger' }
    };
    
    const statusInfo = statusMap[status] || { label: 'Không xác định', class: 'bg-info' };
    
    return (
      <span className={`badge ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  const columns = [
    {
      name: 'Tên dự án',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Trạng thái',
      cell: row => getStatusLabel(row.status),
      sortable: true,
    },
    {
      name: 'Ngày bắt đầu',
      selector: row => formatDate(row.startDate),
      sortable: true,
    },
    {
      name: 'Ngày kết thúc',
      selector: row => formatDate(row.endDate),
      sortable: true,
    },
    {
      name: 'Phòng ban',
      selector: row => row.department?.departmentName,
      sortable: true,
    },
    {
      name: 'Quản lý',
      selector: row => row.manager?.fullName,
      sortable: true,
    },
  ];

  const handleProjectClick = (row) => {
    navigate(`/employee/projects/${row.id}/tasks`);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title">Dự án tôi tham gia</h5>
        </div>

        <DataTable
          columns={columns}
          data={projects}
          pagination
          progressPending={loading}
          responsive
          highlightOnHover
          striped
          pointerOnHover
          onRowClicked={handleProjectClick}
          noDataComponent={
            <div className="p-4 text-center">
              <p>Bạn chưa được phân công vào dự án nào</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default EmployeeProjectList; 