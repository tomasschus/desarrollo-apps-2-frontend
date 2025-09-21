import {
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FiBarChart,
  FiCalendar,
  FiFileText,
  FiHome,
  FiMapPin,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { Link } from 'react-router';
import { version } from '../../package.json';

interface AdminSidebarProps {
  activeSection?: string;
}

export const AdminSidebar = ({
  activeSection = 'dashboard',
}: AdminSidebarProps) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FiHome,
      path: '/admin/dashboard',
    },
    {
      id: 'events',
      label: 'Eventos',
      icon: FiCalendar,
      path: '/admin/eventos',
    },
    {
      id: 'places',
      label: 'Lugares Culturales',
      icon: FiMapPin,
      path: '/admin/lugares',
    },
    {
      id: 'tickets',
      label: 'Tickets',
      icon: FiFileText,
      path: '/admin/tickets',
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: FiUsers,
      path: '/admin/usuarios',
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: FiBarChart,
      path: '/admin/reportes',
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: FiSettings,
      path: '/admin/configuracion',
    },
  ];

  return (
    <Box
      w={{ base: 'full', md: '250px' }}
      bg="white"
      shadow="md"
      position={{ base: 'relative', md: 'fixed' }}
      h={{ base: 'auto', md: '100vh' }}
      zIndex={10}
      display="flex"
      flexDirection="column"
    >
      <VStack align="stretch" p={4} gap={2} flex={1}>
        <Text fontSize="xl" fontWeight="bold" color="brand.700" mb={6}>
          Admin Panel
        </Text>

        {menuItems.map((item) => (
          <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
            <Button
              variant={activeSection === item.id ? 'solid' : 'ghost'}
              colorScheme={activeSection === item.id ? 'blue' : 'gray'}
              justifyContent="flex-start"
              width="full"
              _hover={{ textDecoration: 'none' }}
            >
              <Icon as={item.icon} mr={2} />
              {item.label}
            </Button>
          </Link>
        ))}
      </VStack>
      <HStack py={3} px={4} justifyContent={'center'} borderTop="1px">
        <Badge colorPalette="green" borderRadius="md">
          Versión {version}
        </Badge>
      </HStack>
    </Box>
  );
};
