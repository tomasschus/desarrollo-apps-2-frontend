import { Box, Button, Container, Flex, Stack, Text } from "@chakra-ui/react";
import { FiHeart, FiSearch, FiUser } from "react-icons/fi";

export const Topbar = () => {
  const culturalCategories = ["Arte", "Música", "Cine", "Teatro", "Eventos"];

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex as="nav" align="center" justify="space-between" py={4} px={2}>
          {/* Logo y Brand */}
          <Flex align="center" gap={3}>
            <Box
              p={2}
              borderRadius="lg"
              bg="orange.500"
              color="white"
              fontSize="xl"
              fontWeight="bold"
            >
              C
            </Box>
            <Flex direction="column" gap={0}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                letterSpacing="tight"
              >
                Cultura
              </Text>
              <Text fontSize="xs" color="gray.600" letterSpacing="wider">
                DESCUBRE • CONECTA • INSPIRA
              </Text>
            </Flex>
          </Flex>

          {/* Acciones del Usuario */}
          <Flex gap={3}>
            {/* Botón de Búsqueda */}
            <Button
              variant="ghost"
              size="md"
              color="gray.700"
              _hover={{
                bg: "gray.100",
              }}
            >
              <FiSearch /> Buscar
            </Button>

            {/* Botón de Favoritos */}
            <Button
              variant="ghost"
              size="md"
              color="gray.700"
              _hover={{
                bg: "gray.100",
              }}
            >
              <FiHeart /> Lugares Favoritos
            </Button>

            {/* Botón de Iniciar Sesión */}
            <Button
              colorScheme="orange"
              variant="solid"
              size="md"
              borderRadius="full"
              px={6}
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              <FiUser />
              Iniciar Sesión
            </Button>

            {/* Menú Móvil */}
            <Button
              variant="ghost"
              size="md"
              display={{ base: "flex", md: "none" }}
              color="gray.700"
              _hover={{
                bg: "gray.100",
              }}
            >
              ☰
            </Button>
          </Flex>
        </Flex>

        <Stack>
          <Flex
            gap={8}
            display={{ base: "none", md: "flex" }}
            width={"full"}
            justifyContent={"center"}
          >
            {culturalCategories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="md"
                color="gray.700"
                _hover={{
                  bg: "gray.100",
                  color: "orange.600",
                }}
                transition="all 0.2s"
              >
                {category}
              </Button>
            ))}
          </Flex>

          <Box
            bg="orange.50"
            borderTop="1px"
            borderColor="gray.200"
            py={2}
            px={4}
          >
            <Flex
              align="center"
              justify="center"
              gap={3}
              fontSize="sm"
              color="orange.700"
            >
              <Box
                bg="orange.500"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="bold"
              >
                ¡NUEVO!
              </Box>
              <Text fontWeight="medium">
                Festival de Arte Contemporáneo - Próximamente
              </Text>
              <Button
                size="xs"
                colorScheme="orange"
                variant="outline"
                borderRadius="full"
              >
                Más Info
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
