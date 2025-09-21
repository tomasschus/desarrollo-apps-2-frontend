import type { PopulatedEvent } from "./my-tickets.api";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "green";
    case "used":
      return "gray";
    case "cancelled":
      return "red";
    default:
      return "gray";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Activo";
    case "used":
      return "Usado";
    case "cancelled":
      return "Cancelado";
    default:
      return "Desconocido";
  }
};

export const getTicketTypeText = (ticketType: string) => {
  switch (ticketType) {
    case "general":
      return "General";
    case "vip":
      return "VIP";
    case "jubilados":
      return "Jubilados";
    case "niños":
      return "Niños";
    default:
      return ticketType;
  }
};

// Type guard para verificar si el eventId está poblado
export const isPopulatedEvent = (
  eventId: string | PopulatedEvent
): eventId is PopulatedEvent => {
  return typeof eventId === "object" && eventId !== null && "_id" in eventId;
};
