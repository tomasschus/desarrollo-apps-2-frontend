import { API_BASE_URL } from "../../../config/api.config";

export const getEvents = () => `${API_BASE_URL}/api/v1/events`;

export const updateEvent = (eventId: string) =>
  `${API_BASE_URL}/api/v1/events/${eventId}`;

export const deleteEvent = (eventId: string) =>
  `${API_BASE_URL}/api/v1/events/${eventId}`;

export const getActiveEvents = () => `${API_BASE_URL}/api/v1/events/active`;

export const getCulturalPlaces = () => `${API_BASE_URL}/api/v1/cultural-places`;

export const getEventsByCulturalPlace = (placeId: string) =>
  `${API_BASE_URL}/api/v1/events/cultural-place/${placeId}`;

export const getTicketsByUser = (userId: string) =>
  `${API_BASE_URL}/api/v1/tickets/user/${userId}`;

export const getTicketsByEvent = (eventId: string) =>
  `${API_BASE_URL}/api/v1/tickets/event/${eventId}`;

export const deleteCulturalPlace = (placeId: string) =>
  `${API_BASE_URL}/api/v1/cultural-places/${placeId}`;

export const updateCulturalPlace = (placeId: string) =>
  `${API_BASE_URL}/api/v1/cultural-places/${placeId}`;
