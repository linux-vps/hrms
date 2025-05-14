import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);
export const impersonateUser = (email) => api.post('/auth/impersonate', { email });

// Manager APIs
export const getManagers = () => api.get('/employees');
export const createManager = (data) => api.post('/auth/register', data);
export const updateManager = (id, data) => api.patch(`/employees/${id}`, data);
export const deleteManager = (id) => api.delete(`/employees/${id}`);

// Department APIs
export const getDepartments = () => api.get('/departments');
export const createDepartment = (data) => api.post('/departments', data);
export const updateDepartment = (id, data) => api.patch(`/departments/${id}`, data);
export const deleteDepartment = (id) => api.delete(`/departments/${id}`);

// Employee APIs
export const getEmployees = () => api.get('/employees');
export const createEmployee = (data) => api.post('/employees', data);
export const updateEmployee = (id, data) => api.patch(`/employees/${id}`, data);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

// Shift APIs
export const getShifts = () => api.get('/shifts');
export const createShift = (data) => api.post('/shifts', data);
export const getShiftById = (id) => api.get(`/shifts/${id}`);
export const updateShift = (id, data) => api.patch(`/shifts/${id}`, data);
export const deleteShift = (id) => api.delete(`/shifts/${id}`);

// Timekeeping APIs
export const generateQRCode = (data) => api.post('/qrcode/generate', data);
export const checkIn = (data) => api.post('/timekeeping/check-in', data);
export const checkOut = (id, data) => api.post(`/timekeeping/check-out/${id}`, data);

// Project APIs
export const getProjects = () => api.get('/projects');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.patch(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);
export const addProjectMember = (projectId, memberId) => 
  api.patch(`/projects/${projectId}/members/add/${memberId}`);
export const removeProjectMember = (projectId, memberId) => 
  api.patch(`/projects/${projectId}/members/remove/${memberId}`);

// Task APIs
export const getTasks = (projectId) => api.get(`/tasks${projectId ? `?projectId=${projectId}` : ''}`);
export const getTaskById = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post('/tasks', data);
export const updateTask = (id, data) => api.patch(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const getOverdueTasks = () => api.get('/tasks/overdue');

// Subtask APIs
export const addSubtask = (taskId, data) => api.post(`/tasks/${taskId}/subtasks`, data);
export const updateSubtaskStatus = (subtaskId, completed) => 
  api.patch(`/tasks/subtasks/${subtaskId}?completed=${completed}`);
export const updateSubtaskContent = (subtaskId, data) => 
  api.patch(`/tasks/subtasks/${subtaskId}/content`, data);
export const deleteSubtask = (subtaskId) => api.delete(`/tasks/subtasks/${subtaskId}`);

// Comment APIs
export const getTaskComments = (taskId) => api.get(`/comments/task/${taskId}`);
export const addComment = (data) => api.post('/comments', data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
export const markCommentAsSummary = (id, isSummary) => 
  api.patch(`/comments/${id}/mark-as-summary?isSummary=${isSummary}`);

export default api;
