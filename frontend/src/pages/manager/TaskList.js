import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Modal } from 'bootstrap';
import {   getTasks,   getTaskById,   createTask,   updateTask,   deleteTask,  getProjectById,   getEmployees,   addSubtask,   deleteSubtask,  getTaskComments,  addComment,  deleteComment,  markCommentAsSummary,  updateSubtaskContent} from '../../services/api';
import { toast } from 'react-toastify';

const TaskList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 3,
    startDate: '',
    dueDate: '',
    supervisorId: '',
    assigneeIds: []
  });

  // Refs for modals
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const taskDetailsModalRef = useRef(null);

  useEffect(() => {
    // Initialize Bootstrap modals
    addModalRef.current = new Modal(document.getElementById('addTaskModal'));
    editModalRef.current = new Modal(document.getElementById('editTaskModal'));
    deleteModalRef.current = new Modal(document.getElementById('deleteTaskModal'));
    taskDetailsModalRef.current = new Modal(document.getElementById('taskDetailsModal'));

    fetchTasks();
    fetchProject();
    fetchEmployees();
  }, [projectId]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks(projectId);
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách công việc');
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  const fetchProject = async () => {
    try {
      const response = await getProjectById(projectId);
      setProject(response.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải thông tin dự án');
      console.error('Error fetching project:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      // Filter only employees (not admin or manager)
      const employeesList = response.data.data.filter(emp => emp.role === 'user');
      setEmployees(employeesList);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách nhân viên');
      console.error('Error fetching employees:', error);
    }
  };

  const fetchTaskDetails = async (taskId) => {
    try {
      const response = await getTaskById(taskId);
      setSelectedTask(response.data.data);
      fetchComments(taskId);
    } catch (error) {
      toast.error('Lỗi khi tải chi tiết công việc');
      console.error('Error fetching task details:', error);
    }
  };

  const fetchComments = async (taskId) => {
    try {
      const response = await getTaskComments(taskId);
      setComments(response.data.data || []);
    } catch (error) {
      toast.error('Lỗi khi tải bình luận');
      console.error('Error fetching comments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    if (name === 'assigneeIds') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData({ ...formData, [name]: selectedValues });
    } else {
      handleInputChange(e);
    }
  };

  const handleAdd = async () => {
    try {
      const taskData = {
        ...formData,
        projectId: projectId
      };
      
      await createTask(taskData);
      toast.success('Thêm công việc thành công');
      addModalRef.current.hide();
      resetFormData();
      fetchTasks();
    } catch (error) {
      toast.error('Lỗi khi thêm công việc');
      console.error('Error adding task:', error);
    }
  };

  const handleEdit = async () => {
    try {
      await updateTask(selectedTask.id, formData);
      toast.success('Cập nhật công việc thành công');
      editModalRef.current.hide();
      fetchTasks();
    } catch (error) {
      toast.error('Lỗi khi cập nhật công việc');
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(selectedTask.id);
      toast.success('Xóa công việc thành công');
      deleteModalRef.current.hide();
      fetchTasks();
    } catch (error) {
      toast.error('Lỗi khi xóa công việc');
      console.error('Error deleting task:', error);
    }
  };

  const handleStartTask = async (taskId) => {
    try {
      await updateTask(taskId, { status: 'in_progress', startedAt: new Date().toISOString() });
      toast.success('Đã bắt đầu công việc');
      fetchTasks();
      if (selectedTask && selectedTask.id === taskId) {
        fetchTaskDetails(taskId);
      }
    } catch (error) {
      toast.error('Lỗi khi bắt đầu công việc');
      console.error('Error starting task:', error);
    }
  };

  const handleSubmitTask = async (taskId) => {
    try {
      await updateTask(taskId, { status: 'waiting_approval', submittedAt: new Date().toISOString() });
      toast.success('Đã nộp công việc để xem xét');
      fetchTasks();
      if (selectedTask && selectedTask.id === taskId) {
        fetchTaskDetails(taskId);
      }
    } catch (error) {
      toast.error('Lỗi khi nộp công việc');
      console.error('Error submitting task:', error);
    }
  };

  const handleApproveTask = async (taskId) => {
    try {
      await updateTask(taskId, { status: 'completed', completedAt: new Date().toISOString() });
      toast.success('Đã phê duyệt hoàn thành công việc');
      fetchTasks();
      if (selectedTask && selectedTask.id === taskId) {
        fetchTaskDetails(taskId);
      }
    } catch (error) {
      toast.error('Lỗi khi phê duyệt công việc');
      console.error('Error approving task:', error);
    }
  };

  const handleRejectTask = async (taskId) => {
    try {
      await updateTask(taskId, { status: 'in_progress', submittedAt: null });
      toast.info('Đã từ chối công việc, chuyển về trạng thái đang thực hiện');
      fetchTasks();
      if (selectedTask && selectedTask.id === taskId) {
        fetchTaskDetails(taskId);
      }
    } catch (error) {
      toast.error('Lỗi khi từ chối công việc');
      console.error('Error rejecting task:', error);
    }
  };

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;
    
    try {
      await addSubtask(selectedTask.id, { content: newSubtask, completed: false });
      toast.success('Đã thêm công việc con');
      setNewSubtask('');
      fetchTaskDetails(selectedTask.id);
    } catch (error) {
      toast.error('Lỗi khi thêm công việc con');
      console.error('Error adding subtask:', error);
    }
  };

  const handleToggleSubtask = async (subtaskId, currentStatus) => {
    try {
      // Tìm subtask hiện tại để lấy content
      const subtask = selectedTask.subtasks.find(item => item.id === subtaskId);
      if (!subtask) return;

      // Sử dụng updateSubtaskContent với cả content và completed
      await updateSubtaskContent(subtaskId, {
        content: subtask.content,
        completed: !currentStatus
      });
      
      toast.success('Đã cập nhật trạng thái công việc con');
      fetchTaskDetails(selectedTask.id);
    } catch (error) {
      toast.error('Lỗi khi cập nhật trạng thái công việc con');
      console.error('Error updating subtask status:', error);
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    try {
      await deleteSubtask(subtaskId);
      toast.success('Đã xóa công việc con');
      fetchTaskDetails(selectedTask.id);
    } catch (error) {
      toast.error('Lỗi khi xóa công việc con');
      console.error('Error deleting subtask:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    
    try {
      await addComment({
        content: newComment,
        isSummary: false,
        taskId: selectedTask.id
      });
      toast.success('Đã thêm bình luận');
      setNewComment('');
      fetchComments(selectedTask.id);
    } catch (error) {
      toast.error('Lỗi khi thêm bình luận');
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success('Đã xóa bình luận');
      fetchComments(selectedTask.id);
    } catch (error) {
      toast.error('Lỗi khi xóa bình luận');
      console.error('Error deleting comment:', error);
    }
  };

  const handleToggleCommentSummary = async (commentId, isSummary) => {
    try {
      await markCommentAsSummary(commentId, !isSummary);
      toast.success(isSummary ? 'Đã bỏ đánh dấu tóm tắt' : 'Đã đánh dấu là tóm tắt');
      fetchComments(selectedTask.id);
    } catch (error) {
      toast.error('Lỗi khi đánh dấu bình luận');
      console.error('Error marking comment as summary:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      priority: 3,
      startDate: '',
      dueDate: '',
      supervisorId: '',
      assigneeIds: []
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa xác định';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      pending: { label: 'Chờ xử lý', class: 'bg-secondary' },
      in_progress: { label: 'Đang thực hiện', class: 'bg-primary' },
      waiting_approval: { label: 'Chờ phê duyệt', class: 'bg-info' },
      completed: { label: 'Hoàn thành', class: 'bg-success' },
      overdue: { label: 'Quá hạn', class: 'bg-danger' }
    };
    
    const statusInfo = statusMap[status] || { label: 'Không xác định', class: 'bg-secondary' };
    
    return (
      <span className={`badge ${statusInfo.class}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getPriorityLabel = (priority) => {
    const priorityMap = {
      1: { label: 'Thấp', class: 'bg-success' },
      2: { label: 'Trung bình', class: 'bg-info' },
      3: { label: 'Cao', class: 'bg-warning' },
      4: { label: 'Khẩn cấp', class: 'bg-danger' }
    };
    
    const priorityInfo = priorityMap[priority] || { label: 'Không xác định', class: 'bg-secondary' };
    
    return (
      <span className={`badge ${priorityInfo.class}`}>
        {priorityInfo.label}
      </span>
    );
  };

  const isTaskOverdue = (task) => {
    if (task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now;
  };

  const columns = [
    {
      name: 'Tên công việc',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Trạng thái',
      cell: row => getStatusLabel(isTaskOverdue(row) ? 'overdue' : row.status),
      sortable: true,
    },
    {
      name: 'Ưu tiên',
      cell: row => getPriorityLabel(row.priority),
      sortable: true,
    },
    {
      name: 'Ngày bắt đầu',
      selector: row => formatDate(row.startDate),
      sortable: true,
    },
    {
      name: 'Hạn hoàn thành',
      selector: row => formatDate(row.dueDate),
      sortable: true,
    },
    {
      name: 'Người thực hiện',
      cell: row => (
        <span>{row.assignees?.length || 0} người thực hiện</span>
      ),
    },
    {
      name: 'Thao tác',
      cell: row => (
        <>
          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => {
              fetchTaskDetails(row.id);
              taskDetailsModalRef.current.show();
            }}
            title="Xem chi tiết"
          >
            <i className="bi bi-eye"></i>
          </button>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => {
              setSelectedTask(row);
              setFormData({
                title: row.title,
                description: row.description,
                priority: row.priority,
                startDate: row.startDate ? row.startDate.substring(0, 16) : '',
                dueDate: row.dueDate ? row.dueDate.substring(0, 16) : '',
                supervisorId: row.supervisorId,
                assigneeIds: row.assignees?.map(assignee => assignee.id) || []
              });
              editModalRef.current.show();
            }}
            title="Chỉnh sửa"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              setSelectedTask(row);
              deleteModalRef.current.show();
            }}
            title="Xóa công việc"
          >
            <i className="bi bi-trash"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="card-title">
              Danh sách công việc - Dự án: {project?.name || '...'}
            </h5>
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => navigate('/manager/projects')}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Quay lại danh sách dự án
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetFormData();
              addModalRef.current.show();
            }}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Thêm công việc
          </button>
        </div>

        <DataTable
          columns={columns}
          data={tasks}
          pagination
          progressPending={loading}
          responsive
          highlightOnHover
          striped
          pointerOnHover
          onRowClicked={(row) => {
            fetchTaskDetails(row.id);
            taskDetailsModalRef.current.show();
          }}
        />

        {/* Add Task Modal */}
        <div className="modal fade" id="addTaskModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm công việc mới</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label className="form-label">Tên công việc</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label className="form-label">Mô tả</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Mức độ ưu tiên</label>
                      <select
                        className="form-select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        <option value="1">Thấp</option>
                        <option value="2">Trung bình</option>
                        <option value="3">Cao</option>
                        <option value="4">Khẩn cấp</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Người giám sát</label>
                      <select
                        className="form-select"
                        name="supervisorId"
                        value={formData.supervisorId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Chọn người giám sát --</option>
                        {employees.map(employee => (
                          <option key={employee.id} value={employee.id}>
                            {employee.fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Ngày bắt đầu</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Hạn hoàn thành</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label className="form-label">Người thực hiện (có thể chọn nhiều)</label>
                      <select
                        className="form-select"
                        name="assigneeIds"
                        multiple
                        size="5"
                        value={formData.assigneeIds}
                        onChange={handleSelectChange}
                        required
                      >
                        {employees.map(employee => (
                          <option key={employee.id} value={employee.id}>
                            {employee.fullName}
                          </option>
                        ))}
                      </select>
                      <small className="form-text text-muted">
                        Giữ phím Ctrl để chọn nhiều người thực hiện
                      </small>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-primary" onClick={handleAdd}>Thêm công việc</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Task Modal */}
        <div className="modal fade" id="editTaskModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chỉnh sửa công việc</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label className="form-label">Tên công việc</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label className="form-label">Mô tả</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Mức độ ưu tiên</label>
                      <select
                        className="form-select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        <option value="1">Thấp</option>
                        <option value="2">Trung bình</option>
                        <option value="3">Cao</option>
                        <option value="4">Khẩn cấp</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Người giám sát</label>
                      <select
                        className="form-select"
                        name="supervisorId"
                        value={formData.supervisorId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Chọn người giám sát --</option>
                        {employees.map(employee => (
                          <option key={employee.id} value={employee.id}>
                            {employee.fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Ngày bắt đầu</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Hạn hoàn thành</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <label className="form-label">Người thực hiện (có thể chọn nhiều)</label>
                      <select
                        className="form-select"
                        name="assigneeIds"
                        multiple
                        size="5"
                        value={formData.assigneeIds}
                        onChange={handleSelectChange}
                        required
                      >
                        {employees.map(employee => (
                          <option key={employee.id} value={employee.id}>
                            {employee.fullName}
                          </option>
                        ))}
                      </select>
                      <small className="form-text text-muted">
                        Giữ phím Ctrl để chọn nhiều người thực hiện
                      </small>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-primary" onClick={handleEdit}>Lưu thay đổi</button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <div className="modal fade" id="deleteTaskModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xác nhận xóa</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Bạn có chắc chắn muốn xóa công việc <strong>{selectedTask?.title}</strong>?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa</button>
              </div>
            </div>
          </div>
        </div>

        {/* Task Details Modal */}
        <div className="modal fade" id="taskDetailsModal" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết công việc</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedTask && (
                  <div className="row">
                    <div className="col-md-8">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{selectedTask.title}</h5>
                          <div className="d-flex gap-2 mb-3">
                            {getStatusLabel(isTaskOverdue(selectedTask) ? 'overdue' : selectedTask.status)}
                            {getPriorityLabel(selectedTask.priority)}
                          </div>
                          <div className="mb-3">
                            <h6>Mô tả</h6>
                            <p>{selectedTask.description}</p>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6">
                              <h6>Thông tin cơ bản</h6>
                              <dl className="row">
                                <dt className="col-sm-5">Ngày bắt đầu:</dt>
                                <dd className="col-sm-7">{formatDate(selectedTask.startDate)}</dd>
                                
                                <dt className="col-sm-5">Hạn hoàn thành:</dt>
                                <dd className="col-sm-7">{formatDate(selectedTask.dueDate)}</dd>
                                
                                <dt className="col-sm-5">Bắt đầu làm:</dt>
                                <dd className="col-sm-7">{selectedTask.startedAt ? formatDate(selectedTask.startedAt) : 'Chưa bắt đầu'}</dd>
                                
                                <dt className="col-sm-5">Đã nộp:</dt>
                                <dd className="col-sm-7">{selectedTask.submittedAt ? formatDate(selectedTask.submittedAt) : 'Chưa nộp'}</dd>
                                
                                <dt className="col-sm-5">Hoàn thành:</dt>
                                <dd className="col-sm-7">{selectedTask.completedAt ? formatDate(selectedTask.completedAt) : 'Chưa hoàn thành'}</dd>
                              </dl>
                            </div>
                            <div className="col-md-6">
                              <h6>Người tham gia</h6>
                              <dl className="row">
                                <dt className="col-sm-5">Người giao việc:</dt>
                                <dd className="col-sm-7">{selectedTask.assigner?.fullName}</dd>
                                
                                <dt className="col-sm-5">Người giám sát:</dt>
                                <dd className="col-sm-7">{selectedTask.supervisor?.fullName}</dd>
                              </dl>
                              
                              <h6 className="mt-3">Người thực hiện</h6>
                              {selectedTask.assignees && selectedTask.assignees.length > 0 ? (
                                <ul className="list-group">
                                  {selectedTask.assignees.map(assignee => (
                                    <li key={assignee.id} className="list-group-item d-flex justify-content-between align-items-center">
                                      <div>
                                        <span>{assignee.fullName}</span>
                                        <br />
                                        <small className="text-muted">{assignee.email}</small>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-muted">Chưa có người thực hiện</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h6>Các công việc con</h6>
                              <div className="d-flex gap-2">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Thêm công việc con mới"
                                  value={newSubtask}
                                  onChange={(e) => setNewSubtask(e.target.value)}
                                />
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={handleAddSubtask}
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                            </div>
                            {selectedTask.subtasks && selectedTask.subtasks.length > 0 ? (
                              <ul className="list-group">
                                {selectedTask.subtasks.map(subtask => (
                                  <li key={subtask.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center" style={{ flexGrow: 1, marginRight: '10px' }}>
                                      <button 
                                        className={`btn btn-sm me-2 ${subtask.completed ? 'btn-success' : 'btn-outline-secondary'}`}
                                        onClick={() => handleToggleSubtask(subtask.id, subtask.completed)}
                                        style={{ minWidth: '34px', height: '34px' }}
                                      >
                                        {subtask.completed ? <i className="bi bi-check-lg"></i> : <i className="bi bi-circle"></i>}
                                      </button>
                                      <span className={subtask.completed ? 'text-decoration-line-through' : ''}>
                                        {subtask.content}
                                      </span>
                                    </div>
                                    <button
                                      className="btn btn-sm btn-danger"
                                      onClick={() => handleDeleteSubtask(subtask.id)}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted">Chưa có công việc con nào</p>
                            )}
                          </div>
                          
                          <div className="d-flex justify-content-center gap-2 mt-4">
                            {selectedTask.status === 'pending' && (
                              <button
                                className="btn btn-primary"
                                onClick={() => handleStartTask(selectedTask.id)}
                              >
                                <i className="bi bi-play-fill me-1"></i>
                                Bắt đầu công việc
                              </button>
                            )}
                            
                            {selectedTask.status === 'in_progress' && (
                              <button
                                className="btn btn-success"
                                onClick={() => handleSubmitTask(selectedTask.id)}
                              >
                                <i className="bi bi-check-circle me-1"></i>
                                Nộp công việc
                              </button>
                            )}
                            
                            {selectedTask.status === 'waiting_approval' && selectedTask.supervisor?.id === (JSON.parse(localStorage.getItem('user'))?.id) && (
                              <>
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleApproveTask(selectedTask.id)}
                                >
                                  <i className="bi bi-check-all me-1"></i>
                                  Phê duyệt
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleRejectTask(selectedTask.id)}
                                >
                                  <i className="bi bi-x-circle me-1"></i>
                                  Từ chối
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-title">Bình luận và thảo luận</h6>
                          <div className="comments-container mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {comments.length > 0 ? (
                              comments.map(comment => (
                                <div key={comment.id} className={`comment-item mb-3 p-2 ${comment.isSummary ? 'border-start border-warning border-4' : ''}`}>
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                    <div className="d-flex align-items-center">
                                      <strong>{comment.employee?.fullName}</strong>
                                      {comment.isSummary && (
                                        <span className="badge bg-warning ms-2">Tóm tắt</span>
                                      )}
                                    </div>
                                    <small className="text-muted">{formatDate(comment.createdAt)}</small>
                                  </div>
                                  <p className="mb-1">{comment.content}</p>
                                  <div className="d-flex justify-content-end gap-1">
                                    <button
                                      className="btn btn-sm btn-outline-warning"
                                      onClick={() => handleToggleCommentSummary(comment.id, comment.isSummary)}
                                      title={comment.isSummary ? "Bỏ đánh dấu tóm tắt" : "Đánh dấu là tóm tắt"}
                                    >
                                      <i className={`bi ${comment.isSummary ? 'bi-star-fill' : 'bi-star'}`}></i>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-danger"
                                      onClick={() => handleDeleteComment(comment.id)}
                                      title="Xóa bình luận"
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-muted">Chưa có bình luận nào</p>
                            )}
                          </div>
                          
                          <div className="add-comment">
                            <div className="input-group">
                              <textarea
                                className="form-control"
                                placeholder="Thêm bình luận..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows="2"
                              ></textarea>
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleAddComment}
                              >
                                <i className="bi bi-send"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                <button type="button" className="btn btn-warning me-2" onClick={() => {
                  taskDetailsModalRef.current.hide();
                  setTimeout(() => {
                    setFormData({
                      title: selectedTask.title,
                      description: selectedTask.description,
                      priority: selectedTask.priority,
                      startDate: selectedTask.startDate ? selectedTask.startDate.substring(0, 16) : '',
                      dueDate: selectedTask.dueDate ? selectedTask.dueDate.substring(0, 16) : '',
                      supervisorId: selectedTask.supervisorId,
                      assigneeIds: selectedTask.assignees?.map(assignee => assignee.id) || []
                    });
                    editModalRef.current.show();
                  }, 500);
                }}>Chỉnh sửa</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;  