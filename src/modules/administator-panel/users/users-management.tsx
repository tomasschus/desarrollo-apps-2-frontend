import { Box, EmptyState, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { LoadingIndicator } from '../../../components/ui/loading-indicator';
import { useGetDataFromBackend } from '../../../hooks/useGetDataFromBackend';
import { UserFilters } from './components/user-filters';
import { UserList } from './components/user-list';
import { UserStatsCards } from './components/user-stats-cards';
import type { User, UserStats } from './users-management.api';
import { getUsers } from './users-management.api';
import { calculateUserStats, filterUsers } from './users-management.utils';

export const AdminUsers = () => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
  });

  const {
    data: allUsers,
    loading,
    callback: refetchUsers,
  } = useGetDataFromBackend<User[]>({
    url: getUsers(),
    options: { method: 'GET' },
    executeAutomatically: true,
  });

  React.useEffect(() => {
    if (allUsers) {
      const newStats = calculateUserStats(allUsers);
      setStats(newStats);
      setFilteredUsers(allUsers);
    }
  }, [allUsers]);

  const handleFilter = (filters: {
    role?: string;
    isActive?: boolean;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    if (!allUsers) return;

    const filtered = filterUsers(allUsers, filters);
    setFilteredUsers(filtered);

    const filteredStats = calculateUserStats(filtered);
    setStats(filteredStats);
  };

  return (
    <Stack gap={8}>
      <Box>
        <Heading size="lg" color="gray.800" mb={2}>
          Gestión de Usuarios
        </Heading>
        <Text color="gray.600" fontSize="md">
          Administra y supervisa todos los usuarios del sistema
        </Text>
      </Box>

      <UserStatsCards stats={stats} />

      <UserFilters onFilter={handleFilter} />

      <Box>
        <Heading size="md" mb={4} color="gray.700">
          Lista de Usuarios ({filteredUsers.length})
        </Heading>

        {loading ? (
          <LoadingIndicator text="Cargando usuarios..." />
        ) : filteredUsers.length === 0 ? (
          <EmptyState.Root>
            <EmptyState.Content>
              <Text>No se encontraron usuarios con los filtros aplicados.</Text>
            </EmptyState.Content>
          </EmptyState.Root>
        ) : (
          <UserList users={filteredUsers} onUserUpdate={refetchUsers} />
        )}
      </Box>
    </Stack>
  );
};
