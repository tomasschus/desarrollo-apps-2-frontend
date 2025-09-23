import type { User, UserStats } from './users.api';

// Utilidades para el rol de usuarios
export const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'red';
    case 'user':
      return 'blue';
    default:
      return 'gray';
  }
};

export const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'user':
      return 'Usuario';
    default:
      return 'Desconocido';
  }
};

export const getStatusColor = (isActive: boolean) => {
  return isActive ? 'green' : 'red';
};

export const getStatusLabel = (isActive: boolean) => {
  return isActive ? 'Activo' : 'Inactivo';
};

// Función para calcular estadísticas de usuarios
export const calculateUserStats = (users: User[]): UserStats => {
  const stats: UserStats = {
    totalUsers: users.length,
    activeUsers: 0,
    inactiveUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
  };

  users.forEach((user) => {
    if (user.isActive) {
      stats.activeUsers++;
    } else {
      stats.inactiveUsers++;
    }

    if (user.role === 'admin') {
      stats.adminUsers++;
    } else {
      stats.regularUsers++;
    }
  });

  return stats;
};

// Función para filtrar usuarios
export const filterUsers = (
  users: User[],
  filters: {
    role?: string;
    isActive?: boolean;
    dateFrom?: string;
    dateTo?: string;
  }
): User[] => {
  return users.filter((user) => {
    if (filters.role && user.role !== filters.role) {
      return false;
    }

    if (filters.isActive !== undefined && user.isActive !== filters.isActive) {
      return false;
    }

    if (
      filters.dateFrom &&
      new Date(user.createdAt) < new Date(filters.dateFrom)
    ) {
      return false;
    }

    if (filters.dateTo && new Date(user.createdAt) > new Date(filters.dateTo)) {
      return false;
    }

    return true;
  });
};

// Función para ordenar usuarios
export const sortUsers = (
  users: User[],
  sortBy: 'name' | 'email' | 'role' | 'createdAt' | 'lastLogin',
  order: 'asc' | 'desc' = 'desc'
): User[] => {
  return [...users].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case 'name':
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        break;
      case 'email':
        valueA = a.email.toLowerCase();
        valueB = b.email.toLowerCase();
        break;
      case 'role':
        valueA = a.role;
        valueB = b.role;
        break;
      case 'createdAt':
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      case 'lastLogin':
        valueA = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
        valueB = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Función para validar si un usuario se puede eliminar
export const canDeleteUser = (user: User): boolean => {
  // No permitir eliminar al último admin
  return user.role !== 'admin'; // Simplificado, en producción verificar si hay otros admins
};

// Función para formatear fecha de último login
export const formatLastLogin = (lastLogin?: string): string => {
  if (!lastLogin) return 'Nunca';

  const date = new Date(lastLogin);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Hoy';
  if (diffDays === 2) return 'Ayer';
  if (diffDays <= 7) return `Hace ${diffDays - 1} días`;

  return date.toLocaleDateString();
};
