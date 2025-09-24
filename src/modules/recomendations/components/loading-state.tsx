import { Box, Heading, HStack, Spinner, Stack, Text } from '@chakra-ui/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';

import starLoader from '../../../animations/StarLoader.lottie';

const loadingMessages = [
  '🎭 Analizando tus preferencias culturales...',
  '🤖 Explorando eventos disponibles...',
  '✨ Evaluando compatibilidad con tus gustos...',
  '🎯 Calculando las mejores recomendaciones...',
  '🌟 Finalizando tu selección personalizada...',
];

export const LoadingState = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <Stack
      align="center"
      gap={5}
      textAlign="center"
      py={1}
      px={4}
      w="full"
      maxW="xl"
      mx="auto"
      minH="auto"
    >
      <Box>
        <DotLottieReact
          src={starLoader}
          loop
          autoplay
          style={{
            width: '120px',
            height: '120px',
            filter: 'drop-shadow(0 2px 10px rgba(56, 178, 172, 0.2))',
          }}
        />
      </Box>

      <Stack align="center" gap={2}>
        <Heading size="lg" color="teal.600" fontWeight="bold">
          🎯 Generando Recomendaciones
        </Heading>
        <Text fontSize="md" color="gray.600" maxW="sm">
          Creando tu selección personalizada...
        </Text>
      </Stack>

      <Box bg="teal.100" p={3} borderRadius="lg" w="full" maxW="sm">
        <Text
          fontSize="sm"
          color="teal.700"
          fontWeight="medium"
          key={currentMessageIndex}
        >
          {loadingMessages[currentMessageIndex]}
        </Text>
      </Box>

      <HStack gap={3} align="center">
        <Spinner size="sm" color="teal.500" />
        <Text fontSize="sm" color="gray.600">
          IA procesando • 1-3 min
        </Text>
      </HStack>

      <HStack gap={4} justify="center">
        <Stack align="center" gap={1}>
          <Box
            w="40px"
            h="40px"
            bg="teal.100"
            color="teal.600"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="lg"
            border="2px solid"
            borderColor="teal.300"
            animation="pulse 2s infinite"
          >
            🎭
          </Box>
          <Text fontSize="2xs" color="teal.600" fontWeight="medium">
            Analizando
          </Text>
        </Stack>

        <Box w="20px" h="1px" bg="teal.300" alignSelf="center" />

        <Stack align="center" gap={1}>
          <Box
            w="40px"
            h="40px"
            bg="teal.100"
            color="teal.600"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="lg"
            border="2px solid"
            borderColor="teal.300"
            animation="bounce 1.5s infinite"
          >
            🤖
          </Box>
          <Text fontSize="2xs" color="teal.600" fontWeight="medium">
            Procesando
          </Text>
        </Stack>

        <Box w="20px" h="1px" bg="gray.300" alignSelf="center" />

        <Stack align="center" gap={1}>
          <Box
            w="40px"
            h="40px"
            bg="gray.100"
            color="gray.400"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="lg"
            border="2px solid"
            borderColor="gray.200"
          >
            ✨
          </Box>
          <Text fontSize="2xs" color="gray.400">
            Resultados
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
};
