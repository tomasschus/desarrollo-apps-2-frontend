import { API_BASE_URL } from '../../config/api.config';

export interface TicketPurchaseData {
  eventId: string;
  userId: string;
  type: string;
  quantity: number;
}

export interface TicketPurchaseResponse {
  _id: string;
  eventId: string;
  userId: string;
  ticketType: string;
  price: number;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

export const createTicketUrl = () => `${API_BASE_URL}/api/v1/tickets`;
export const purchaseTicketUrl = () =>
  `${API_BASE_URL}/api/v1/tickets/purchase`;
