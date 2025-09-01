import museosImg from "../../assets/museos.jpg";

export const MuseumId = {
  MUSEO_CINE: "museo-cine",
  BUENOS_AIRES_MUSEO: "buenos-aires-museo",
  MUSEO_LARRETA: "museo-larreta",
  MUSEO_HISTORICO_SAAVEDRA: "museo-historico-saavedra",
  MUSEO_CASA_GARDEL: "museo-casa-gardel",
  MUSEO_ARTE_POPULAR: "museo-arte-popular",
  MUSEO_FERNANDEZ_BLANCO: "museo-fernandez-blanco",
  MUSEO_ESCULTURAS_PERLOTTI: "museo-esculturas-perlotti",
  MUSEO_SIVORI: "museo-sivori",
  MUSEO_ARTE_MODERNO: "museo-arte-moderno",
  MUSEO_IMAGINACION_JUEGO: "museo-imaginacion-juego",
} as const;

export type MuseumId = (typeof MuseumId)[keyof typeof MuseumId];

export type Museum = {
  id: MuseumId;
  name: string;
  description: string;
  image: string;
  icon: string;
  color: string;
};

export const museumsMock: Museum[] = [
  {
    id: MuseumId.MUSEO_CINE,
    name: "Museo del Cine Pablo C. Ducrós Hicken",
    description:
      "Preserva, difunde e investiga el patrimonio audiovisual argentino.",
    image: museosImg,
    icon: "🎬",
    color: "#e74c3c",
  },
  {
    id: MuseumId.BUENOS_AIRES_MUSEO,
    name: "Buenos Aires Museo",
    description: "Recopila la historia y cultura de la Ciudad de Buenos Aires.",
    image: museosImg,
    icon: "📖",
    color: "#3498db",
  },
  {
    id: MuseumId.MUSEO_LARRETA,
    name: "Museo Larreta",
    description: "Arte, teatro, literatura y cultura española en un solo lugar",
    image: museosImg,
    icon: "L",
    color: "#8e44ad",
  },
  {
    id: MuseumId.MUSEO_HISTORICO_SAAVEDRA,
    name: "Museo Histórico Cornelio Saavedra",
    description:
      "Se propone reflexionar sobre la historia y la sociedad argentina",
    image: museosImg,
    icon: "🏛️",
    color: "#2980b9",
  },
  {
    id: MuseumId.MUSEO_CASA_GARDEL,
    name: "Museo Casa Carlos Gardel",
    description: "Preserva y difunde el patrimonio vinculado con Carlos Gardel",
    image: museosImg,
    icon: "🎵",
    color: "#f39c12",
  },
  {
    id: MuseumId.MUSEO_ARTE_POPULAR,
    name: "Museo de Arte Popular José Hernández",
    description: "Colecciona, promueve e investiga el arte popular argentino",
    image: museosImg,
    icon: "MAP",
    color: "#27ae60",
  },
  {
    id: MuseumId.MUSEO_FERNANDEZ_BLANCO,
    name: "Museo Fernández Blanco",
    description:
      "Dos sedes y dos períodos del desarrollo creativo hispanoamericano",
    image: museosImg,
    icon: "🏛️",
    color: "#e67e22",
  },
  {
    id: MuseumId.MUSEO_ESCULTURAS_PERLOTTI,
    name: "Museos de Esculturas Luis Perlotti",
    description:
      "Difunde la producción de la escultura nacional e internacional",
    image: museosImg,
    icon: "🗿",
    color: "#d35400",
  },
  {
    id: MuseumId.MUSEO_SIVORI,
    name: "Museo Sívori",
    description: "Preserva y difunde el arte argentino de los Siglos XX y XXI",
    image: museosImg,
    icon: "S",
    color: "#c0392b",
  },
  {
    id: MuseumId.MUSEO_ARTE_MODERNO,
    name: "Museo de Arte Moderno",
    description: "Exhibe obras de arte argentino e internacional",
    image: museosImg,
    icon: "MUNI",
    color: "#34495e",
  },
  {
    id: MuseumId.MUSEO_IMAGINACION_JUEGO,
    name: "Museo de la Imaginación y el Juego",
    description: "Un espacio pensado para chicas y chicos de 0 a 12 años",
    image: museosImg,
    icon: "miju",
    color: "#f1c40f",
  },
];
