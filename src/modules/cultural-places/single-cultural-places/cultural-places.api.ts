import { API_BASE_URL } from '../../../core/config/api.config';

export const getCulturalPlaceById = (id: string) =>
  `${API_BASE_URL}/api/v1/cultural-places/${id}`;

export const getEventsByCulturalPlace = (id: string) =>
  `${API_BASE_URL}/api/v1/events/cultural-place/${id}`;
