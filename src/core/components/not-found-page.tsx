import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router';
import error404Animation from '../../animations/Error404.lottie';

interface NotFoundPageProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

export const NotFoundPage = ({
  title = '404 - Página no encontrada',
  message = 'La página que buscas no existe o ha sido movida.',
  showBackButton = true,
}: NotFoundPageProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Box maxW="2xl" mx="auto" px={6}>
        <VStack gap={8} align="center" textAlign="center">
          {/* Animación Lottie */}
          <Box w="300px" h="300px">
            <DotLottieReact
              src={error404Animation}
              loop
              autoplay
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Box>

          {/* Contenido */}
          <VStack gap={4}>
            <Heading size="2xl" color="gray.800">
              {title}
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="md">
              {message}
            </Text>
          </VStack>

          {/* Botones */}
          <VStack gap={3} w="full" maxW="sm">
            <Button
              colorPalette="blue"
              size="lg"
              onClick={handleGoHome}
              w="full"
            >
              Ir al Inicio
            </Button>

            {showBackButton && (
              <Button
                variant="outline"
                size="md"
                onClick={handleGoBack}
                w="full"
              >
                Volver Atrás
              </Button>
            )}
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};
