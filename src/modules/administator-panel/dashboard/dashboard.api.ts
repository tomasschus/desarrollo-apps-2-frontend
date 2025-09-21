import { API_BASE_URL } from '../../../config/api.config';

export const getEvents = () => `${API_BASE_URL}/api/v1/events`;
export const getActiveEvents = () => `${API_BASE_URL}/api/v1/events/active`;
export const getCulturalPlaces = () => `${API_BASE_URL}/api/v1/cultural-places`;
