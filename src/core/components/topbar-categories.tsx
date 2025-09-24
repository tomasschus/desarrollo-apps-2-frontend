import type { JSX } from 'react';
import {
  FiCalendar,
  FiCamera,
  FiMusic,
  FiStar,
  FiTarget,
  FiUsers,
} from 'react-icons/fi';

export interface CulturalCategory {
  name: string;
  filter?: (event: string) => boolean;
  to?: string;
  icon?: JSX.Element;
}

export const culturalCategories: CulturalCategory[] = [
  {
    name: 'Arte',
    filter: (event: string) => event === 'Arte',
    icon: <FiStar />,
  },
  {
    name: 'Música',
    filter: (event: string) => event === 'Música',
    icon: <FiMusic />,
  },
  {
    name: 'Cine',
    filter: (event: string) => event === 'Cine',
    icon: <FiCamera />,
  },
  {
    name: 'Teatro',
    filter: (event: string) => event === 'Teatro',
    icon: <FiUsers />,
  },
  {
    name: 'Eventos',
    to: '/eventos',
    icon: <FiCalendar />,
  },
  {
    name: 'Recomendaciones ✨',
    to: '/recomendaciones',
    icon: <FiTarget />,
  },
];
