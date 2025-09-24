import { N8N_API_BASE_URL } from '../../core/config/api.config';

export const getRecomendations = () =>
  `${N8N_API_BASE_URL}/webhook/recomendation`;
