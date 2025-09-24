import { API_BASE_URL } from '../../core/config/api.config';

export const getActiveEvents = () => `${API_BASE_URL}/api/v1/events/active`;
