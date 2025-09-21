import { API_BASE_URL } from '../../../config/api.config';

export const getEvents = () => `${API_BASE_URL}/api/v1/events`;
export const updateEvent = (eventId: string) =>
  `${API_BASE_URL}/api/v1/events/${eventId}`;
export const deleteEvent = (eventId: string) =>
  `${API_BASE_URL}/api/v1/events/${eventId}`;
export const getCulturalPlaces = () => `${API_BASE_URL}/api/v1/cultural-places`;
