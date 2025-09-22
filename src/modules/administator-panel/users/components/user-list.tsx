import { Box, Text, VStack } from '@chakra-ui/react';
import type { User } from '../users-management.api';
import { UserCard } from './user-card';

interface UserListProps {
  users: User[];
  onUserUpdate: () => void;
}

export const UserList = ({ users, onUserUpdate }: UserListProps) => {
  if (!users || users.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500" fontSize="lg">
          No se encontraron usuarios
        </Text>
      </Box>
    );
  }

  return (
    <VStack gap={4} align="stretch">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onUserUpdate={onUserUpdate} />
      ))}
    </VStack>
  );
};
