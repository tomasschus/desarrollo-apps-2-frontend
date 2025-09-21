import { Grid, Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../../../components/ui/loading-indicator';
import { useGetDataFromBackend } from '../../../hooks/useGetDataFromBackend';
import { QuickActions } from './components/quick-actions';
import { RecentActivity } from './components/recent-activity';
import { StatsCards } from './components/stats-cards';
import { getActiveEvents, getCulturalPlaces, getEvents } from './dashboard.api';
import type { DashboardStats } from './dashboard.utils';
import { calculateDashboardStats } from './dashboard.utils';

export const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    activeEvents: 0,
    totalCulturalPlaces: 0,
    totalTicketsSold: 0,
    totalRevenue: 0,
    recentActivity: [],
  });

  const { data: events, loading: eventsLoading } = useGetDataFromBackend<any[]>(
    {
      url: getEvents(),
      options: { method: 'GET' },
      executeAutomatically: true,
    }
  );

  const { data: activeEvents, loading: activeEventsLoading } =
    useGetDataFromBackend<any[]>({
      url: getActiveEvents(),
      options: { method: 'GET' },
      executeAutomatically: true,
    });

  const { data: culturalPlaces, loading: placesLoading } =
    useGetDataFromBackend<any[]>({
      url: getCulturalPlaces(),
      options: { method: 'GET' },
      executeAutomatically: true,
    });

  const loading = eventsLoading || activeEventsLoading || placesLoading;

  useEffect(() => {
    // Calcular estadísticas cuando los datos estén disponibles
    if (events && activeEvents && culturalPlaces) {
      setStats(calculateDashboardStats(events, activeEvents, culturalPlaces));
    }
  }, [events, activeEvents, culturalPlaces]);

  return (
    <Stack gap={6}>
      <Heading size="lg" color="gray.800">
        Dashboard de Administración
      </Heading>

      {loading ? (
        <LoadingIndicator text="Cargando información..." />
      ) : (
        <>
          <StatsCards stats={stats} />

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
            <QuickActions />
            <RecentActivity recentActivity={stats.recentActivity} />
          </Grid>
        </>
      )}
    </Stack>
  );
};
