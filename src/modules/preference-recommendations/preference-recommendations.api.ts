import { N8N_API_BASE_URL } from '../../core/config/api.config';

export type RecomendationModalData = {
  activity: string;
  peopleCount: number;
  date: string;
  hasMinors: boolean;
  activityCount: string;
  hasCar: string;
};

export interface FormFieldProps {
  register?: any;
  control: any;
  errors: any;
}

export interface RecomendationRequest {
  category: string;
  peopleQuantity: number;
  placesQuantity: number;
  hasCar: boolean;
  eventDate: string;
}

export interface RecomendationResponse {
  events: Event[];
}

export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  ticketTypes: TicketType[];
  culturalPlaceId: CulturalPlace;
  isActive: boolean;
}

export interface CulturalPlace {
  _id: string;
  name: string;
  description: string;
  category: string;
  characteristics: string[];
  contact: Contact;
  image: string;
  rating: number;
}

export interface Contact {
  address: string;
  coordinates: Coordinates;
  phone: string;
  website: string;
  email: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TicketType {
  type: string;
  price: number;
  initialQuantity: number;
  soldQuantity: number;
  isActive: boolean;
}

export const getRecomendations = () => {
  return `${N8N_API_BASE_URL}/webhook/0ed2f40a-911e-4e2d-877c-76844bfd4c92`;
};
