import {
  Alert,
  Button,
  Dialog,
  Field,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../contexts/auth-context';
import { useGetDataFromBackend } from '../hooks/useGetDataFromBackend';
import { loginUser, type User } from './login.api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { callback: loginCallback } = useGetDataFromBackend<User>({
    url: loginUser(),
    options: {
      method: 'POST',
      body: { email },
    },
    onSuccess: (user) => {
      login(user);
      onClose();
    },
  });

  const handleSubmit = async () => {
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Ingresa un email válido');
      return;
    }

    setLoading(true);
    try {
      await loginCallback();
    } catch (err: any) {
      setError(err?.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
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
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  type="email"
                />
              </Field.Root>

              <Button
                variant="solid"
                colorPalette="brand"
                w="full"
                size="lg"
                loading={loading}
                loadingText="Ingresando..."
                onClick={handleSubmit}
              >
                Ingresar
              </Button>

              {error && (
                <Alert.Root status="error">
                  <Text>{error}</Text>
                </Alert.Root>
              )}
            </Stack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
