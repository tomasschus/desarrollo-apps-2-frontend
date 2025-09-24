import {
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import {
  FiBarChart,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiHome,
  FiMapPin,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { Link } from 'react-router';
import { version } from '../../../package.json';

interface AdminSidebarProps {
  activeSection?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}
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
    label: 'Espacios Culturales',
    icon: FiMapPin,
    path: '/admin/espacios-culturales',
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

export const AdminSidebar = ({
  activeSection = 'dashboard',
  isCollapsed = false,
  onToggle,
}: AdminSidebarProps) => {
  return (
    <Box
      w={{ base: isCollapsed ? '60px' : '250px' }}
      bg="white"
      shadow="md"
      position="fixed"
      h="100vh"
      zIndex={10}
      display="flex"
      flexDirection="column"
      transition="width 0.3s ease"
      left={0}
      top={0}
    >
      <VStack align="stretch" p={4} gap={2} flex={1}>
        <HStack justify="space-between" mb={6}>
          {!isCollapsed && (
            <Link to="/admin/dashboard">
              <Text fontSize="xl" fontWeight="bold" color="brand.700">
                Admin Panel
              </Text>
            </Link>
          )}
          <IconButton
            aria-label="Toggle sidebar"
            onClick={onToggle}
            variant="ghost"
            size="sm"
          >
            <Icon as={isCollapsed ? FiChevronRight : FiChevronLeft} />
          </IconButton>
        </HStack>

        {menuItems.map((item) => (
          <Link key={item.id} to={item.path} style={{ textDecoration: 'none' }}>
            {isCollapsed ? (
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <IconButton
                    aria-label={item.label}
                    variant={activeSection === item.id ? 'solid' : 'ghost'}
                    colorPalette={activeSection === item.id ? 'green' : 'gray'}
                    width="full"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Icon as={item.icon} />
                  </IconButton>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>{item.label}</Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>
            ) : (
              <Button
                variant={activeSection === item.id ? 'solid' : 'ghost'}
                colorPalette={activeSection === item.id ? 'green' : 'gray'}
                justifyContent="flex-start"
                width="full"
                _hover={{ textDecoration: 'none' }}
              >
                <Icon as={item.icon} mr={2} />
                {item.label}
              </Button>
            )}
          </Link>
        ))}
      </VStack>
      {!isCollapsed && (
        <HStack py={3} px={4} justifyContent={'center'} borderTop="1px">
          <Badge colorPalette="green" borderRadius="md">
            Versión {version}
          </Badge>
        </HStack>
      )}
    </Box>
  );
};
