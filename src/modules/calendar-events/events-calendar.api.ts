import { API_BASE_URL } from '../../core/config/api.config';

export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  culturalPlaceId: {
    _id: string;
    name: string;
    image: string;
  };
  isActive: boolean;
}

export const getEvents = () => `${API_BASE_URL}/api/v1/events`;

export const getActiveEvents = () => `${API_BASE_URL}/api/v1/events/active`;
