import { N8N_API_BASE_URL } from '../../config/api.config';

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
  summary: string;
  recommendations: Event[];
}

export interface Event {
  _id: string;
  culturalPlaceId: CulturalPlace;
  name: string;
  description: string;
  date: string;
  time: string;
  ticketTypes: TicketType[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  image: string[];
  availableQuantity: number;
  id: string;
}

export interface CulturalPlace {
  _id: string;
  name: string;
  category: string;
  characteristics: string[];
  contact: Contact;
  image: string;
  rating: number;
  description?: string;
}

export interface Contact {
  coordinates: Coordinates;
  address: string;
  phone: string;
  website: string;
  email: string;
  _id: string;
  type?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
  type?: string;
  coordinates?: number[];
}

export interface TicketType {
  type: string;
  price: number;
  initialQuantity: number;
  soldQuantity: number;
  isActive: boolean;
  _id: string;
  id: string;
}

export const getRecomendations = () => {
  return `${N8N_API_BASE_URL}/webhook/0ed2f40a-911e-4e2d-877c-76844bfd4c92`;
};
