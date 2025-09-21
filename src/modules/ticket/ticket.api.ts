import { API_BASE_URL } from '../../config/api.config';

export interface TicketData {
  _id: string;
  eventId: string;
  userId: string;
  ticketType: string;
  price: number;
  status: string;
  isActive: boolean;
  qrCode: string;
  validationURL: string;
  createdAt: string;
  updatedAt: string;
}

export const getTicket = (id: string) => `${API_BASE_URL}/api/v1/tickets/${id}`;

export const useTicket = (id: string) =>
  `${API_BASE_URL}/api/v1/tickets/${id}/use`;
