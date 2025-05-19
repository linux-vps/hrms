// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { getCurrentUserProfile, updateUserProfile, forgotPassword as forgotPasswordApi, verifyOtp as verifyOtpApi, changePassword as changePasswordApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const userData = localStorage.getItem('user');
    if (token && userRole && userData) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ ...JSON.parse(userData), token });
      // Cập nhật thông tin người dùng từ server
      refreshUserProfile();
    }
    setLoading(false);
  }, []);

  const refreshUserProfile = async () => {
    try {
      const response = await getCurrentUserProfile();
      if (response.data && response.data.data) {
        const updatedUserData = response.data.data;
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        setUser(prev => ({ ...updatedUserData, token: prev.token }));
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await updateUserProfile(profileData);
      if (response.data && response.data.data) {
        const updatedUserData = response.data.data;
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        setUser(prev => ({ ...updatedUserData, token: prev.token }));
        return { success: true, message: 'Cập nhật thông tin thành công' };
      }
      return { success: false, message: 'Cập nhật thông tin thất bại' };
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Cập nhật thông tin thất bại' 
      };
    }
  };

  const login = async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    
    if (!response.data.data || !response.data.data.access_token) {
      console.error('Invalid response structure:', response.data);
      return { success: false };
    }

    const { access_token, employee } = response.data.data;
    const { role } = employee;

    if (!role) {
      console.error('Role not found in response');
      return { success: false };
    }

    localStorage.setItem('token', access_token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify(employee));

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    setUser({ ...employee, token: access_token });
    return { success: true, role };
  };

  const forgotPassword = async (email) => {
    try {
      const response = await forgotPasswordApi(email);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Lỗi quên mật khẩu:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Không thể gửi yêu cầu quên mật khẩu' 
      };
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await verifyOtpApi(email, otp);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Lỗi xác thực OTP:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Không thể xác thực OTP' 
      };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await changePasswordApi(currentPassword, newPassword);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Lỗi đổi mật khẩu:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Không thể đổi mật khẩu' 
      };
    }
  };

  const logout = () => {
    console.log('AuthContext: Đang đăng xuất...');
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('user');
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
      console.log('AuthContext: Đã đăng xuất thành công');
      return true;
    } catch (error) {
      console.error('AuthContext: Lỗi khi đăng xuất', error);
      return false;
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    refreshUserProfile,
    updateProfile,
    forgotPassword,
    verifyOtp,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};