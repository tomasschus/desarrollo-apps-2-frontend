import { API_BASE_URL } from '../../../config/api.config';

export interface CulturalPlace {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export interface TicketType {
  type: string;
  price: number;
  initialQuantity: number;
  soldQuantity: number;
  isActive: boolean;
}

export interface EventFormData {
  culturalPlaceId: string;
  name: string;
  description: string;
  date: string;
  time: string;
  isActive: boolean;
  ticketTypes: TicketType[];
}

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
  ticketTypes: TicketType[];
  isActive: boolean;
}

export const getEvents = () => `${API_BASE_URL}/api/v1/events`;
export const updateEvent = (eventId: string) =>
  `${API_BASE_URL}/api/v1/events/${eventId}`;
export const deleteEvent = (eventId: string) =>
  `${API_BASE_URL}/api/v1/events/${eventId}`;
export const getCulturalPlaces = () => `${API_BASE_URL}/api/v1/cultural-places`;
