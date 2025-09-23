export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  culturalPlaceId: {
    _id: string;
    name: string;
    image: string;
  };
  ticketTypes: Array<{
    type: string;
    price: number;
    initialQuantity: number;
    soldQuantity: number;
    isActive: boolean;
  }>;
  isActive: boolean;
}
