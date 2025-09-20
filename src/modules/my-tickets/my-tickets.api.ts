import { API_BASE_URL } from "../../config/api.config";

export const getUserTickets = (userId: string) => 
  `${API_BASE_URL}/api/v1/tickets/user/${userId}`;
