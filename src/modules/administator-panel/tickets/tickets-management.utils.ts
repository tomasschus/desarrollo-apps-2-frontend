import type { Ticket, TicketStats } from './tickets-management.api';

// Utilidades para el estado de los tickets
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'green';
    case 'used':
      return 'green';
    case 'cancelled':
      return 'red';
    case 'refunded':
      return 'orange';
    default:
      return 'gray';
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return 'Activo';
    case 'used':
      return 'Utilizado';
    case 'cancelled':
      return 'Cancelado';
    case 'refunded':
      return 'Reembolsado';
    default:
      return 'Desconocido';
  }
};

// Utilidades para tipos de ticket
export const getTicketTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return 'green';
    case 'vip':
      return 'purple';
    case 'jubilados':
      return 'green';
    case 'estudiantes':
      return 'orange';
    case 'niños':
      return 'pink';
    default:
      return 'gray';
  }
};

export const getTicketTypeLabel = (type: string) => {
  switch (type.toLowerCase()) {
    case 'general':
      return 'General';
    case 'vip':
      return 'VIP';
    case 'jubilados':
      return 'Jubilados';
    case 'estudiantes':
      return 'Estudiantes';
    case 'niños':
      return 'Niños';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

// Función para calcular estadísticas de tickets (ya no es necesaria, la API la hace)
export const calculateTicketStats = (tickets: Ticket[]): TicketStats => {
  const stats: TicketStats = {
    totalTickets: tickets.length,
    activeTickets: 0,
    usedTickets: 0,
    cancelledTickets: 0,
    refundedTickets: 0,
    totalRevenue: 0,
  };

  tickets.forEach((ticket) => {
    switch (ticket.status) {
      case 'active':
        stats.activeTickets++;
        break;
      case 'used':
        stats.usedTickets++;
        break;
      case 'cancelled':
        stats.cancelledTickets++;
        break;
      case 'refunded':
        stats.refundedTickets++;
        break;
    }

    // Solo contar revenue de tickets activos y usados
    if (ticket.status === 'active' || ticket.status === 'used') {
      stats.totalRevenue += ticket.price;
    }
  });

  return stats;
};

// Función para filtrar tickets (ahora se puede hacer en el backend)
export const filterTickets = (
  tickets: Ticket[],
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    eventId?: string;
  }
): Ticket[] => {
  return tickets.filter((ticket) => {
    if (filters.status && ticket.status !== filters.status) {
      return false;
    }

    if (filters.eventId && ticket.eventId !== filters.eventId) {
      return false;
    }

    if (
      filters.dateFrom &&
      new Date(ticket.createdAt) < new Date(filters.dateFrom)
    ) {
      return false;
    }

    if (
      filters.dateTo &&
      new Date(ticket.createdAt) > new Date(filters.dateTo)
    ) {
      return false;
    }

    return true;
  });
};

// Función para ordenar tickets
export const sortTickets = (
  tickets: Ticket[],
  sortBy: 'date' | 'price' | 'status' | 'type',
  order: 'asc' | 'desc' = 'desc'
): Ticket[] => {
  return [...tickets].sort((a, b) => {
    let valueA, valueB;

    switch (sortBy) {
      case 'date':
        valueA = new Date(a.createdAt).getTime();
        valueB = new Date(b.createdAt).getTime();
        break;
      case 'price':
        valueA = a.price;
        valueB = b.price;
        break;
      case 'status':
        valueA = a.status;
        valueB = b.status;
        break;
      case 'type':
        valueA = a.ticketType;
        valueB = b.ticketType;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Función para exportar tickets a CSV
export const exportTicketsToCSV = (tickets: Ticket[]): string => {
  const headers = [
    'ID',
    'Evento ID',
    'Usuario ID',
    'Tipo',
    'Precio',
    'Estado',
    'Fecha Compra',
    'Última Actualización',
  ];

  const csvContent = [
    headers.join(','),
    ...tickets.map((ticket) =>
      [
        ticket._id,
        ticket.eventId,
        ticket.userId,
        ticket.ticketType,
        ticket.price,
        getStatusLabel(ticket.status),
        new Date(ticket.createdAt).toLocaleDateString(),
        new Date(ticket.updatedAt).toLocaleDateString(),
      ].join(',')
    ),
  ].join('\n');

  return csvContent;
};

// Función para validar si un ticket se puede cancelar
export const canCancelTicket = (ticket: Ticket): boolean => {
  return ticket.status === 'active';
};

// Función para validar si un ticket se puede usar/marcar como usado
export const canUseTicket = (ticket: Ticket): boolean => {
  return ticket.status === 'active';
};
