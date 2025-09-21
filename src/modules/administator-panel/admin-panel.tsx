import { Box, Text } from '@chakra-ui/react';
import { AdminCulturalPlaces } from './cultural-places/cultural-places-management';
import { AdminDashboard } from './dashboard/dashboard';
import { AdminEvents } from './events/events-management';
import { AdminTickets } from './tickets/tickets-management';

interface AdminPanelProps {
  activeSection?: string;
}

// Componente temporal para secciones no implementadas
const ComingSoon = ({ title }: { title: string }) => (
  <Box textAlign="center" py={10}>
    <Text fontSize="xl" fontWeight="bold" color="gray.600" mb={2}>
      {title}
    </Text>
    <Text color="gray.500">Esta sección está en desarrollo</Text>
  </Box>
);

export const AdminPanel = ({
  activeSection = 'dashboard',
}: AdminPanelProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'events':
        return <AdminEvents />;
      case 'places':
        return <AdminCulturalPlaces />;
      case 'tickets':
        return <AdminTickets />;
      case 'users':
        return <ComingSoon title="Gestión de Usuarios" />;
      case 'reports':
        return <ComingSoon title="Reportes" />;
      case 'settings':
        return <ComingSoon title="Configuración" />;
      default:
        return <AdminDashboard />;
    }
  };

  return <>{renderSection()}</>;
};
