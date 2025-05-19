import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Modal } from 'bootstrap';
import { toast } from 'react-toastify';
import { 
  getProjectById, 
  getTasksInProject, 
  getTaskById, 
  updateTaskStatus, 
  addSubtask, 
  updateSubtaskContent, 
  deleteSubtask, 
  getTaskComments, 
  addComment, 
  deleteComment 
} from '../../services/api';

const EmployeeTaskList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  // Refs cho modal
  const taskDetailsModalRef = useRef(null);

  useEffect(() => {
    // Khởi tạo Bootstrap modals
    taskDetailsModalRef.current = new Modal(document.getElementById('taskDetailsModal'));

    fetchTasks();
    fetchProject();
  }, [projectId]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasksInProject(projectId);
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

  const handleStartTask = async (taskId) => {
    try {
      await updateTaskStatus(taskId, { 
        status: 'in_progress', 
        comment: 'Đã bắt đầu thực hiện công việc' 
      });
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
      await updateTaskStatus(taskId, { 
        status: 'waiting_review', 
        comment: 'Đã hoàn thành và nộp công việc để xem xét'
      });
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
      waiting_review: { label: 'Chờ phê duyệt', class: 'bg-info' },
      completed: { label: 'Hoàn thành', class: 'bg-success' },
      overdue: { label: 'Quá hạn', class: 'bg-danger' },
      rejected: { label: 'Bị từ chối', class: 'bg-warning' }
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

  const amIAssignee = (task) => {
    return task.assignees?.some(assignee => assignee.email === localStorage.getItem('userEmail'));
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
      name: 'Thao tác',
      cell: row => (
        <>
          <button
            className="btn btn-sm btn-info me-2"
            onClick={(e) => {
              e.stopPropagation();
              fetchTaskDetails(row.id);
              taskDetailsModalRef.current.show();
            }}
            title="Xem chi tiết"
          >
            <i className="bi bi-eye"></i>
          </button>
          {amIAssignee(row) && row.status === 'pending' && (
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={(e) => {
                e.stopPropagation();
                handleStartTask(row.id);
              }}
              title="Bắt đầu công việc"
            >
              <i className="bi bi-play-fill"></i>
            </button>
          )}
          {amIAssignee(row) && row.status === 'in_progress' && (
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => {
                e.stopPropagation();
                handleSubmitTask(row.id);
              }}
              title="Nộp công việc"
            >
              <i className="bi bi-check2-circle"></i>
            </button>
          )}
          {amIAssignee(row) && row.status === 'rejected' && (
            <button
              className="btn btn-sm btn-warning"
              onClick={(e) => {
                e.stopPropagation();
                handleSubmitTask(row.id);
              }}
              title="Nộp lại"
            >
              <i className="bi bi-arrow-repeat"></i>
            </button>
          )}
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
              onClick={() => navigate('/employee/projects')}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Quay lại danh sách dự án
            </button>
          </div>
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
          noDataComponent={
            <div className="p-4 text-center">
              <p>Chưa có công việc nào trong dự án này</p>
            </div>
          }
        />

        {/* Task Details Modal */}
        <div className="modal fade" id="taskDetailsModal" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết công việc</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedTask && (
                  <div className="row">
                    <div className="col-md-6">
                      <h6>Thông tin cơ bản</h6>
                      <dl className="row">
                        <dt className="col-sm-4">Tên công việc:</dt>
                        <dd className="col-sm-8">{selectedTask.title}</dd>
                        
                        <dt className="col-sm-4">Trạng thái:</dt>
                        <dd className="col-sm-8">{getStatusLabel(isTaskOverdue(selectedTask) ? 'overdue' : selectedTask.status)}</dd>
                        
                        <dt className="col-sm-4">Ưu tiên:</dt>
                        <dd className="col-sm-8">{getPriorityLabel(selectedTask.priority)}</dd>
                        
                        <dt className="col-sm-4">Ngày bắt đầu:</dt>
                        <dd className="col-sm-8">{formatDate(selectedTask.startDate)}</dd>
                        
                        <dt className="col-sm-4">Hạn hoàn thành:</dt>
                        <dd className="col-sm-8">{formatDate(selectedTask.dueDate)}</dd>
                        
                        <dt className="col-sm-4">Người giao việc:</dt>
                        <dd className="col-sm-8">{selectedTask.assigner?.fullName}</dd>
                        
                        <dt className="col-sm-4">Người giám sát:</dt>
                        <dd className="col-sm-8">{selectedTask.supervisor?.fullName}</dd>
                      </dl>
                    </div>
                    <div className="col-md-6">
                      <h6>Mô tả</h6>
                      <p>{selectedTask.description}</p>
                      
                      <h6 className="mt-3">Người thực hiện</h6>
                      <ul className="list-group">
                        {selectedTask.assignees?.map(assignee => (
                          <li key={assignee.id} className="list-group-item">
                            {assignee.fullName}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="col-12 mt-4">
                      <ul className="nav nav-tabs" id="taskDetailTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="subtasks-tab" data-bs-toggle="tab" data-bs-target="#subtasks" type="button" role="tab" aria-controls="subtasks" aria-selected="true">
                            Công việc con
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" id="comments-tab" data-bs-toggle="tab" data-bs-target="#comments" type="button" role="tab" aria-controls="comments" aria-selected="false">
                            Bình luận
                          </button>
                        </li>
                      </ul>
                      
                      <div className="tab-content p-3 border border-top-0 rounded-bottom" id="taskDetailTabsContent">
                        {/* Subtasks */}
                        <div className="tab-pane fade show active" id="subtasks" role="tabpanel" aria-labelledby="subtasks-tab">
                          {amIAssignee(selectedTask) && (
                            <div className="mb-3">
                              <div className="input-group">
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder="Thêm công việc con mới..." 
                                  value={newSubtask}
                                  onChange={(e) => setNewSubtask(e.target.value)}
                                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                                />
                                <button 
                                  className="btn btn-primary" 
                                  type="button"
                                  onClick={handleAddSubtask}
                                >
                                  <i className="bi bi-plus-lg"></i>
                                </button>
                              </div>
                            </div>
                          )}
                          
                          <ul className="list-group">
                            {selectedTask.subtasks && selectedTask.subtasks.length > 0 ? (
                              selectedTask.subtasks.map(subtask => (
                                <li key={subtask.id} className="list-group-item d-flex justify-content-between align-items-center">
                                  <div className="form-check">
                                    <input 
                                      className="form-check-input" 
                                      type="checkbox" 
                                      checked={subtask.completed} 
                                      onChange={() => amIAssignee(selectedTask) && handleToggleSubtask(subtask.id, subtask.completed)}
                                      disabled={!amIAssignee(selectedTask)}
                                    />
                                    <label className={`form-check-label ${subtask.completed ? 'text-decoration-line-through' : ''}`}>
                                      {subtask.content}
                                    </label>
                                  </div>
                                  {amIAssignee(selectedTask) && (
                                    <button 
                                      className="btn btn-sm btn-danger" 
                                      onClick={() => handleDeleteSubtask(subtask.id)}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  )}
                                </li>
                              ))
                            ) : (
                              <li className="list-group-item text-center text-muted">
                                Chưa có công việc con nào
                              </li>
                            )}
                          </ul>
                        </div>
                        
                        {/* Comments */}
                        <div className="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                          <div className="mb-3">
                            <div className="input-group">
                              <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Thêm bình luận..." 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                              />
                              <button 
                                className="btn btn-primary" 
                                type="button"
                                onClick={handleAddComment}
                              >
                                <i className="bi bi-chat-dots"></i>
                              </button>
                            </div>
                          </div>
                          
                          <div className="comments-list">
                            {comments.length > 0 ? (
                              comments.map(comment => (
                                <div 
                                  key={comment.id} 
                                  className={`card mb-2 ${comment.isSummary ? 'border-primary' : ''}`}
                                >
                                  <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                      <strong>{comment.employee?.fullName}</strong>
                                      <small className="text-muted ms-2">
                                        {formatDate(comment.createdAt)}
                                      </small>
                                    </div>
                                    {comment.employee?.email === localStorage.getItem('userEmail') && (
                                      <button 
                                        className="btn btn-sm btn-outline-danger" 
                                        onClick={() => handleDeleteComment(comment.id)}
                                        title="Xóa bình luận"
                                      >
                                        <i className="bi bi-trash"></i>
                                      </button>
                                    )}
                                  </div>
                                  <div className="card-body">
                                    <p className="mb-0">{comment.content}</p>
                                  </div>
                                  {comment.isSummary && (
                                    <div className="card-footer bg-primary bg-opacity-10">
                                      <small><i className="bi bi-info-circle"></i> Thông tin tóm tắt</small>
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p className="text-center text-muted">Chưa có bình luận nào</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                {selectedTask && amIAssignee(selectedTask) && selectedTask.status === 'pending' && (
                  <button type="button" className="btn btn-primary" onClick={() => handleStartTask(selectedTask.id)}>
                    <i className="bi bi-play-fill me-1"></i>
                    Bắt đầu
                  </button>
                )}
                {selectedTask && amIAssignee(selectedTask) && selectedTask.status === 'in_progress' && (
                  <button type="button" className="btn btn-success" onClick={() => handleSubmitTask(selectedTask.id)}>
                    <i className="bi bi-check2-circle me-1"></i>
                    Hoàn thành
                  </button>
                )}
                {selectedTask && amIAssignee(selectedTask) && selectedTask.status === 'rejected' && (
                  <button type="button" className="btn btn-warning" onClick={() => handleSubmitTask(selectedTask.id)}>
                    <i className="bi bi-arrow-repeat me-1"></i>
                    Nộp lại
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTaskList; 