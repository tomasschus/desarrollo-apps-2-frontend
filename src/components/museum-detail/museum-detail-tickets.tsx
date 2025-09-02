import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaChild,
  FaGraduationCap,
  FaTicketAlt,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { useAuth } from "../../contexts/auth-context";
import { formatMoney } from "../../utils/money.utils";
import { Tooltip } from "../ui/tooltip";

interface MuseumDetailTicketsProps {
  ticketPrices: {
    general: number;
    students: number;
    seniors: number;
  };
}

export const MuseumDetailTickets = ({
  ticketPrices,
}: MuseumDetailTicketsProps) => {
  const { isLogged } = useAuth();
  return (
    <Card.Root>
      <Card.Body>
        <VStack align="start" gap={3}>
          <HStack gap={2}>
            <Box as={FaTicketAlt} color="brand.500" />
            <Text fontSize="lg" fontWeight="semibold" color="brand.600">
              Precios de entrada
            </Text>
          </HStack>
          <VStack align="stretch" gap={2} w="100%">
            <HStack
              justify="space-between"
              p={2}
              borderRadius="md"
              bg="gray.50"
            >
              <HStack gap={2}>
                <Box as={FaUsers} color="gray.500" />
                <Text fontSize="md">General</Text>
              </HStack>
              <Text fontWeight="bold" color="brand.600" fontSize="md">
                {formatMoney(ticketPrices.general)}
              </Text>
            </HStack>
            <HStack
              justify="space-between"
              p={2}
              borderRadius="md"
              bg="gray.50"
            >
              <HStack gap={2}>
                <Box as={FaGraduationCap} color="gray.500" />
                <Text fontSize="md">Estudiantes</Text>
              </HStack>
              <Text fontWeight="bold" color="brand.600" fontSize="md">
                {formatMoney(ticketPrices.students)}
              </Text>
            </HStack>
            <HStack
              justify="space-between"
              p={2}
              borderRadius="md"
              bg="gray.50"
            >
              <HStack gap={2}>
                <Box as={FaUserTie} color="gray.500" />
                <Text fontSize="md">Jubilados</Text>
              </HStack>
              <Text fontWeight="bold" color="brand.600" fontSize="md">
                {formatMoney(ticketPrices.seniors)}
              </Text>
            </HStack>
            <HStack
              justify="space-between"
              p={2}
              borderRadius="md"
              bg="gray.50"
            >
              <HStack gap={2}>
                <Box as={FaChild} color="gray.500" />
                <Text fontSize="md">Niños</Text>
              </HStack>
              <Badge colorScheme="green" fontSize="sm" px={2} py={1}>
                GRATIS
              </Badge>
            </HStack>
          </VStack>
          <Box w="100%" h="1px" bg="gray.200" my={2} />
          <Tooltip
            content={
              !isLogged
                ? "Inicia sesión para comprar entradas"
                : "Tocá acá para comprar entradas"
            }
            openDelay={10}
          >
            <Button
              colorScheme="brand"
              size="lg"
              w="100%"
              h={10}
              disabled={!isLogged}
            >
              <HStack gap={2}>
                <Box as={FaTicketAlt} />
                <Text fontSize="md">Comprar entradas</Text>
              </HStack>
            </Button>
          </Tooltip>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
