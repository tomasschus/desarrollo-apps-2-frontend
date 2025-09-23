import { Grid, GridItem, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/auth-context';
import { AdminSidebar } from './admin-sidebar';

export const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isUser } = useAuth();

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

  useEffect(() => {
    if (isUser) {
      navigate('/');
    }
  }, [isUser]);

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '250px 1fr' }}
      minH="100vh"
      bg="gray.50"
      w="100%"
      maxW="100vw"
      overflow="hidden"
    >
      <GridItem>
        <AdminSidebar activeSection={getActiveSection()} />
      </GridItem>
      <GridItem
        p={6}
        display="flex"
        justifyContent="center"
        overflow="auto"
        minW={0}
      >
        <Stack
          w="full"
          maxW="100%"
          px={{
            base: 4,
            md: 6,
          }}
          gap={6}
          pb={6}
        >
          {children || <Outlet />}
        </Stack>
      </GridItem>
    </Grid>
  );
};
