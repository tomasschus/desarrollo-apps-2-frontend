import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { toaster } from '../components/ui/toaster';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from './auth-context';

export interface CartItem {
  eventId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  culturalPlaceName: string;
  ticketType: string;
  price: number;
  quantity: number;
  tempId: string; // ID temporal para identificar el item en el carrito
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: Omit<CartItem, 'tempId' | 'quantity'>) => void;
  removeFromCart: (tempId: string) => void;
  updateQuantity: (tempId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (eventId: string, ticketType: string) => boolean;
  getItemQuantity: (eventId: string, ticketType: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { user } = useAuth();

  const cartKey = user?.id ? `${user.id}_cart_items` : 'guest_cart_items';

  const [items, setItems] = useState<CartItem[]>([]);
  const [lastUserId, setLastUserId] = useState<string | null>(null);

  const { value: storedItems, setValue: setStoredItems } = useLocalStorage<
    CartItem[]
  >(cartKey, []);

  useEffect(() => {
    const currentUserId = user?.id || null;

    if (lastUserId !== currentUserId) {
      setLastUserId(currentUserId);

      if (user) {
        setItems(storedItems);
      } else {
        setItems([]);
      }
    }
  }, [user?.id, storedItems, lastUserId]);

  const updateItemsAndStorage = (newItems: CartItem[]) => {
    setItems(newItems);
    if (user) {
      setStoredItems(newItems);
    }
  };

  const generateTempId = () =>
    `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addToCart = (item: Omit<CartItem, 'tempId' | 'quantity'>) => {
    if (!user) {
      toaster.create({
        title: 'Error',
        description: 'Debes iniciar sesión para agregar elementos al carrito',
        type: 'error',
      });
      return;
    }

    const existingItem = items.find(
      (cartItem) =>
        cartItem.eventId === item.eventId &&
        cartItem.ticketType === item.ticketType
    );

    let newItems: CartItem[];

    if (existingItem) {
      newItems = items.map((cartItem) =>
        cartItem.tempId === existingItem.tempId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      const newItem: CartItem = {
        ...item,
        quantity: 1,
        tempId: generateTempId(),
      };
      newItems = [...items, newItem];
      toaster.create({
        title: 'Agregado al carrito',
        description: `${item.eventName} - ${item.ticketType}`,
        type: 'success',
      });
    }

    updateItemsAndStorage(newItems);
  };

  const removeFromCart = (tempId: string) => {
    if (!user) return;

    const itemToRemove = items.find((item) => item.tempId === tempId);
    const newItems = items.filter((item) => item.tempId !== tempId);

    if (itemToRemove) {
      toaster.create({
        title: 'Eliminado del carrito',
        description: `${itemToRemove.eventName} - ${itemToRemove.ticketType}`,
        type: 'success',
      });
    }

    updateItemsAndStorage(newItems);
  };

  const updateQuantity = (tempId: string, quantity: number) => {
    if (!user) return;

    if (quantity <= 0) {
      removeFromCart(tempId);
      return;
    }

    const newItems = items.map((item) =>
      item.tempId === tempId ? { ...item, quantity } : item
    );
    updateItemsAndStorage(newItems);
  };

  const clearCart = () => {
    updateItemsAndStorage([]);
  };

  const isInCart = (eventId: string, ticketType: string) => {
    return items.some(
      (item) => item.eventId === eventId && item.ticketType === ticketType
    );
  };

  const getItemQuantity = (eventId: string, ticketType: string) => {
    const item = items.find(
      (cartItem) =>
        cartItem.eventId === eventId && cartItem.ticketType === ticketType
    );
    return item ? item.quantity : 0;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
