import axios, { type AxiosResponse } from "axios";
import { API_BASE_URL } from "../../config/api.config";

export interface TicketPurchaseData {
  eventId: string;
  userId: string;
  ticketType: string;
  price: number;
}

export interface TicketPurchaseResponse {
  _id: string;
  eventId: string;
  userId: string;
  ticketType: string;
  price: number;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
}

// Endpoints URL generators (siguiendo el patrón de otros módulos)
export const createTicketUrl = () => `${API_BASE_URL}/api/v1/tickets`;
export const purchaseTicketUrl = () =>
  `${API_BASE_URL}/api/v1/tickets/purchase`;

// Función para comprar ticket usando axios (compatible con useGetDataFromBackend)
export const purchaseTicketWithAxios = async (
  ticketData: TicketPurchaseData,
  endpoint: string
): Promise<TicketPurchaseResponse> => {
  try {
    const response: AxiosResponse<ApiResponse<TicketPurchaseResponse>> =
      await axios({
        method: "POST",
        url: endpoint,
        data: ticketData,
        headers: {
          "Content-Type": "application/json",
        },
      });

    return response.data.data;
  } catch (error: any) {
    // Manejar errores de axios
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Error en la compra del ticket");
  }
};

export const purchaseTicket = async (
  ticketData: TicketPurchaseData
): Promise<TicketPurchaseResponse> => {
  const endpoints = [purchaseTicketUrl(), createTicketUrl()];

  let lastError: Error | null = null;

  for (const endpoint of endpoints) {
    try {
      return await purchaseTicketWithAxios(ticketData, endpoint);
    } catch (error: any) {
      // Si es error 404, intentar con el siguiente endpoint
      if (error.response?.status === 404) {
        console.warn(
          `Endpoint ${endpoint} devolvió 404, intentando con el siguiente...`
        );
        lastError = error;
        continue;
      }

      // Para otros errores, lanzar inmediatamente
      throw error;
    }
  }

  // Si llegamos aquí, ningún endpoint funcionó
  throw (
    lastError || new Error("No se pudo conectar con ningún endpoint de tickets")
  );
};

export const purchaseMultipleTickets = async (
  ticketsData: TicketPurchaseData[]
): Promise<TicketPurchaseResponse[]> => {
  const purchasePromises = ticketsData.map((ticketData) =>
    purchaseTicket(ticketData)
  );

  try {
    const results = await Promise.allSettled(purchasePromises);

    const successful: TicketPurchaseResponse[] = [];
    const failed: string[] = [];

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successful.push(result.value);
      } else {
        failed.push(`Ticket ${index + 1}: ${result.reason.message}`);
      }
    });

    if (failed.length > 0) {
      throw new Error(
        `Se procesaron ${successful.length} tickets correctamente, pero ${
          failed.length
        } fallaron: ${failed.join(", ")}`
      );
    }

    return successful;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Error desconocido en la compra múltiple");
  }
};
