import { API_BASE_URL } from '../../core/config/api.config';

export const getEventById = (id: string) =>
  `${API_BASE_URL}/api/v1/events/${id}`;
