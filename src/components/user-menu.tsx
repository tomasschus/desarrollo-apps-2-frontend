import { Button, Menu, Portal, Text } from '@chakra-ui/react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { MdConfirmationNumber } from 'react-icons/md';
import { Link } from 'react-router';
import { useAuth } from '../contexts/auth-context';

export const UserMenu = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          colorScheme="brand"
          variant="solid"
          size="md"
          borderRadius="full"
          px={6}
          transition="all 0.2s"
        >
          <FiUser />
          {user.name}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="profile" disabled>
              <Text fontSize="sm" color="gray.600">
                {user.email}
              </Text>
            </Menu.Item>
            <Menu.Item value="role" disabled>
              <Text fontSize="sm" color="brand.600" fontWeight="bold">
                {user.role.toUpperCase()}
              </Text>
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item value="my-tickets" asChild>
              <Link to="/mis-tickets">
                <MdConfirmationNumber />
                Mis Tickets
              </Link>
            </Menu.Item>
            <Menu.Item
              value="logout"
              color="fg.error"
              _hover={{ bg: 'bg.error', color: 'fg.error' }}
              onClick={logout}
            >
              <FiLogOut />
              Cerrar Sesión
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
