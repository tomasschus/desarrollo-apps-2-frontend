import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../core/contexts/auth-context';
import { AdminSidebar } from './admin-sidebar';

export const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/dashboard') return 'dashboard';
    if (path.includes('/admin/eventos')) return 'events';
    if (path.includes('/admin/espacios-culturales')) return 'places';
    if (path.includes('/admin/tickets')) return 'tickets';
    if (path.includes('/admin/usuarios')) return 'users';
    if (path.includes('/admin/reportes')) return 'reports';
    if (path.includes('/admin/configuracion')) return 'settings';
    return 'dashboard';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser]);

  return (
    <Flex minH="100vh" bg="gray.50" overflow="hidden">
      <AdminSidebar
        activeSection={getActiveSection()}
        isCollapsed={!sidebarOpen}
        onToggle={toggleSidebar}
      />
      <Box
        flex="1"
        ml={{ base: sidebarOpen ? '250px' : '60px' }}
        transition="margin-left 0.3s ease"
        overflow="auto"
        p={6}
        maxW="100%"
      >
        <Box
          w="full"
          maxW="100%"
          px={{
            base: 4,
            md: 6,
          }}
          pb={6}
        >
          {children || <Outlet />}
        </Box>
      </Box>
    </Flex>
  );
};
