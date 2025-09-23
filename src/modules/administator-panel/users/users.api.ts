import { API_BASE_URL } from '../../../config/api.config';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profileImage?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  regularUsers: number;
}

export interface UserFilters {
  role?: string;
  isActive?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
  isActive?: boolean;
}

export const getUsers = (filters?: UserFilters) => {
  const params = new URLSearchParams();
  if (filters?.role) params.append('role', filters.role);
  if (filters?.isActive !== undefined)
    params.append('isActive', filters.isActive.toString());

  return `${API_BASE_URL}/api/v1/users${params.toString() ? `?${params.toString()}` : ''}`;
};

export const getUserById = (id: string) => `${API_BASE_URL}/api/v1/users/${id}`;

export const createUser = () => `${API_BASE_URL}/api/v1/users`;

export const updateUser = (id: string) => `${API_BASE_URL}/api/v1/users/${id}`;

export const deleteUser = (id: string) => `${API_BASE_URL}/api/v1/users/${id}`;

export const toggleUserActive = (id: string) =>
  `${API_BASE_URL}/api/v1/users/${id}/toggle-active`;
