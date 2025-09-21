export interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalCulturalPlaces: number;
  totalTicketsSold: number;
  totalRevenue: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export const calculateDashboardStats = (
  events: any[],
  activeEvents: any[],
  culturalPlaces: any[]
): DashboardStats => {
  let totalTicketsSold = 0;
  let totalRevenue = 0;

  events.forEach((event: any) => {
    event.ticketTypes?.forEach((ticketType: any) => {
      totalTicketsSold += ticketType.soldQuantity || 0;
      totalRevenue += (ticketType.soldQuantity || 0) * ticketType.price;
    });
  });

  return {
    totalEvents: events.length,
    activeEvents: activeEvents.length,
    totalCulturalPlaces: culturalPlaces.length,
    totalTicketsSold,
    totalRevenue,
    recentActivity: [
      {
        id: '1',
        type: 'event',
        description: 'Nuevo evento creado',
        timestamp: 'Hace 2 horas',
      },
      {
        id: '2',
        type: 'ticket',
        description: '10 entradas vendidas',
        timestamp: 'Hace 4 horas',
      },
      {
        id: '3',
        type: 'place',
        description: 'Centro cultural actualizado',
        timestamp: 'Hace 1 día',
      },
    ],
  };
};
