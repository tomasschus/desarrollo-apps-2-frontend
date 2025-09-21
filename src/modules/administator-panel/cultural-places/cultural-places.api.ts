import { API_BASE_URL } from '../../../config/api.config';

export interface CulturalPlace {
  _id: string;
  name: string;
  description: string;
  category: string;
  characteristics: string[];
  contact: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    phone: string;
    website: string;
    email: string;
  };
  image: string;
  rating: number;
  isActive?: boolean;
}

export const getCulturalPlaces = () => `${API_BASE_URL}/api/v1/cultural-places`;
export const deleteCulturalPlace = (placeId: string) =>
  `${API_BASE_URL}/api/v1/cultural-places/${placeId}`;

export const updateCulturalPlace = (placeId: string) =>
  `${API_BASE_URL}/api/v1/cultural-places/${placeId}`;
