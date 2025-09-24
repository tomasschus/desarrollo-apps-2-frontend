import { Button, Dialog, Stack, Text } from '@chakra-ui/react';
import { useAuth, UserRole, type UserRoleType } from '../contexts/auth-context';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();

  const handleRoleLogin = (role: UserRoleType) => {
    const mockUsers = {
      [UserRole.OPERATOR]: {
        id: 'operator_789',
        name: 'Carlos Operador',
        email: 'carlos@operador.com',
        role: UserRole.OPERATOR as UserRoleType,
      },
      [UserRole.USER]: {
        id: '68c2dd60fb172823da61eb92',
        name: 'Juan Pérez',
        email: 'juan@usuario.com',
        role: UserRole.USER as UserRoleType,
      },
      [UserRole.ADMIN]: {
        id: 'admin_456',
        name: 'María Admin',
        email: 'maria@admin.com',
        role: UserRole.ADMIN as UserRoleType,
      },
    };

    login(mockUsers[role]);
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="400px" p={3}>
          <Dialog.Header>
            <Dialog.Title>
              <Text fontWeight="bold" fontSize="xl" color="brand.600">
                Iniciar Sesión
              </Text>
            </Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Cerrar modal"
                onClick={onClose}
              >
                ✕
              </Button>
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body>
            <Stack>
              <Text color="gray.600">Selecciona tu rol para continuar:</Text>
              <Button
                variant="outline"
                w="full"
                size="lg"
                onClick={() => handleRoleLogin(UserRole.ADMIN)}
              >
                🛡️ Iniciar como Admin
              </Button>
              <Button
                variant="outline"
                w="full"
                size="lg"
                onClick={() => handleRoleLogin(UserRole.USER)}
              >
                👤 Iniciar como Usuario
              </Button>
              <Button
                variant="outline"
                w="full"
                size="lg"
                onClick={() => handleRoleLogin(UserRole.OPERATOR)}
              >
                👨‍💼 Iniciar como Operador
              </Button>
            </Stack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
