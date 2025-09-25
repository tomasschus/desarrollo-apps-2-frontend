import { API_BASE_URL } from '../config/api.config';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'supervisor';
  createdAt?: string;
}

export const loginUser = () =>
  `${API_BASE_URL}/api/v1/users/login-without-password`;
