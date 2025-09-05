export const getCulturalPlaceById = (id: string) =>
  `/api/v1/cultural-places/${id}`;

export const getEventsByCulturalPlace = (id: string) =>
  `/api/v1/events/cultural-place/${id}`;
