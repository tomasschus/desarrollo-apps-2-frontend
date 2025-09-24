import {
  Box,
  Button,
  Card,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import noDataAnimation from '../../animations/NoDataFound.lottie';

interface NoDataFoundProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const NoDataFound = ({
  title = 'No hay datos disponibles',
  message = 'No se encontraron elementos para mostrar.',
  actionLabel,
  onAction,
  size = 'md',
}: NoDataFoundProps) => {
  const sizeConfig = {
    sm: { animation: '120px', card: 'sm', heading: 'lg' },
    md: { animation: '150px', card: 'md', heading: 'xl' },
    lg: { animation: '200px', card: 'lg', heading: '2xl' },
  };

  const config = sizeConfig[size];

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      p={4}
      minH={size === 'lg' ? '60vh' : '40vh'}
    >
      <Card.Root
        maxW={size === 'lg' ? 'xl' : size === 'md' ? 'lg' : 'md'}
        w="full"
        shadow="lg"
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor="blue.100"
        bg="white"
      >
        <Card.Body p={size === 'lg' ? 10 : size === 'md' ? 8 : 6}>
          <VStack gap={size === 'lg' ? 6 : size === 'md' ? 5 : 4} align="center">
            {/* Animación */}
            <Box
              w={config.animation}
              h={config.animation}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <DotLottieReact
                src={noDataAnimation}
                loop
                autoplay
                style={{ 
                  width: '100%', 
                  height: '100%'
                }}
              />
            </Box>

            {/* Contenido */}
            <VStack gap={3} align="center" textAlign="center">
              <Heading 
                size={config.heading as any} 
                color="blue.600" 
                fontWeight="bold"
              >
                {title}
              </Heading>
              
              <Text
                color="gray.600"
                fontSize={size === 'lg' ? 'lg' : 'md'}
                maxW={size === 'lg' ? '500px' : '400px'}
                lineHeight="1.6"
              >
                {message}
              </Text>
            </VStack>

            {/* Botón de acción opcional */}
            {actionLabel && onAction && (
              <>
                <Box borderTop="1px solid" borderColor="gray.200" w="full" my={2} />
                <Button
                  colorPalette="blue"
                  size={size === 'lg' ? 'lg' : 'md'}
                  onClick={onAction}
                  px={size === 'lg' ? 8 : 6}
                  borderRadius="full"
                  fontWeight="semibold"
                  _hover={{
                    transform: 'translateY(-1px)',
                    shadow: 'md',
                  }}
                  transition="all 0.2s"
                >
                  {actionLabel}
                </Button>
              </>
            )}
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};