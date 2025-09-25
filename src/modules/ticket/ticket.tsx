import { useParams } from 'react-router';
import { useGetDataFromBackend } from '../../core/hooks/useGetDataFromBackend';

import { ErrorState } from './components/ErrorState';
import { LoadingState } from './components/LoadingState';
import { NotFoundState } from './components/NotFoundState';
import { ValidTicketState } from './components/ValidTicketState';
import { ValidatingTicketState } from './components/ValidatingTicketState';
import type { TicketData } from './ticket.api';
import { getTicket, useTicket } from './ticket.api';

export const TicketPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: ticket,
    loading,
    error,
    callback: fetchTicketInfo,
  } = useGetDataFromBackend<TicketData>({
    url: getTicket(id!),
    options: {
      method: 'GET',
    },
    executeAutomatically: !!id,
  });

  useGetDataFromBackend<TicketData>({
    url: useTicket(id!),
    options: {
      method: 'PATCH',
    },
    executeAutomatically: Boolean(ticket && ticket.status === 'active'),
    onSuccess: () => {
      fetchTicketInfo();
    },
  });

  if (loading) return <LoadingState />;

  if (error) return <ErrorState error={error} />;

  if (!ticket) return <NotFoundState />;

  return ticket.status === 'used' ? (
    <ValidTicketState ticket={ticket} />
  ) : (
    <ValidatingTicketState ticket={ticket} />
  );
};
