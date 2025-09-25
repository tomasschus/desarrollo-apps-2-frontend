import {
  Alert,
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import boyStudyingAnimation from '../../animations/BoyStudyingScience.lottie';
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
        <Dialog.Content maxW={{ base: '400px', md: '900px' }} p={4}>
          <Dialog.Header>
            <Dialog.Title>
              <Text
                fontWeight="bold"
                fontSize={{
                  base: 'md',
                  md: 'xl',
                }}
                color="brand.600"
              >
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
            <Box
              display={{ base: 'block', md: 'grid' }}
              gridTemplateColumns={{ md: '1fr 1fr' }}
              gap={6}
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box w="100%" h={{ base: '200px', md: '320px' }}>
                  <DotLottieReact
                    src={boyStudyingAnimation}
                    autoplay
                    loop
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              </Box>

              <VStack
                gap={{
                  base: 2,
                  md: 4,
                }}
                align="center"
                justify="center"
                h="100%"
              >
                <Flex
                  align="center"
                  display={{
                    base: 'none',
                    md: 'flex',
                  }}
                >
                  <Flex direction="column" gap={2} textAlign={'center'}>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      letterSpacing="tight"
                      color={'brand.600'}
                    >
                      Cultura
                    </Text>
                    <Text fontSize="xs" color="brand.600" letterSpacing="wider">
                      DESCUBRE • CONECTA • INSPIRA
                    </Text>
                  </Flex>
                </Flex>

                <Field.Root>
                  <Field.Label>Email</Field.Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    type="email"
                    w="100%"
                    h={{ base: '40px', md: '52px' }}
                    fontSize={{ base: 'md', md: 'lg' }}
                    px={4}
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

                <Text fontSize="sm" color="gray.600" textAlign="center">
                  No es necesario registrarse. Solo ingresa tu email y nosotros
                  hacemos el resto.
                </Text>

                {error && (
                  <Alert.Root status="error">
                    <Text>{error}</Text>
                  </Alert.Root>
                )}
              </VStack>
            </Box>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
