import type { JSX } from 'react';
import { FaTheaterMasks } from 'react-icons/fa';
import { FiCalendar, FiCamera, FiFilm, FiTarget } from 'react-icons/fi';
import { MdOutlineMuseum } from 'react-icons/md';

export interface CulturalCategory {
  name: string;
  filter?: (event: string) => boolean;
  to?: string;
  icon?: JSX.Element;
  requiresAuth?: boolean;
}

export const culturalCategories: CulturalCategory[] = [
  {
    name: 'Centro Cultural',
    filter: (event: string) => event === 'Centro Cultural',
    icon: <MdOutlineMuseum />,
  },
  {
    name: 'Galería',
    filter: (event: string) => event === 'Galería',
    icon: <FiCamera />,
  },
  {
    name: 'Cine',
    filter: (event: string) => event === 'Cine',
    icon: <FiFilm />,
  },
  {
    name: 'Teatro',
    filter: (event: string) => event === 'Teatro',
    icon: <FaTheaterMasks />,
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
    requiresAuth: true,
  },
];
