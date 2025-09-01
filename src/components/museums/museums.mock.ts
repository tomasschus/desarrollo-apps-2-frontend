import museosImg from "../../assets/museos.jpg";

export type Museum = {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  color: string;
};

export const museumsMock: Museum[] = [
  {
    id: "museo-1",
    name: "Museo del Cine Pablo C. Ducrós Hicken",
    description:
      "Preserva, difunde e investiga el patrimonio audiovisual argentino.",
    image: museosImg,
    icon: "MC",
    color: "red.600",
  },
  {
    id: "museo-2",
    name: "Buenos Aires Museo",
    description: "Recopila la historia y cultura de la Ciudad de Buenos Aires.",
    image: museosImg,
    icon: "MBA",
    color: "blue.800",
  },
  {
    id: "museo-3",
    name: "Museo Larreta",
    description: "Arte, teatro, literatura y cultura española en un solo lugar",
    image: museosImg,
    icon: "ML",
    color: "purple.500",
  },
  {
    id: "museo-4",
    name: "Museo Histórico Cornelio Saavedra",
    description:
      "Se propone reflexionar sobre la historia y la sociedad argentina",
    image: museosImg,
    icon: "MHCS",
    color: "teal.500",
  },
  {
    id: "museo-5",
    name: "Museo Casa Carlos Gardel",
    description: "Preserva y difunde el patrimonio vinculado con Carlos Gardel",
    image: museosImg,
    icon: "MCG",
    color: "orange.500",
  },
  {
    id: "museo-6",
    name: "Museo de Arte Popular José Hernández",
    description: "Colecciona, promueve e investiga el arte popular argentino",
    image: museosImg,
    icon: "MAP",
    color: "green",
  },
  {
    id: "museo-7",
    name: "Museo Fernández Blanco",
    description:
      "Dos sedes y dos períodos del desarrollo creativo hispanoamericano",
    image: museosImg,
    icon: "MFB",
    color: "yellow.400",
  },
  {
    id: "museo-8",
    name: "Museos de Esculturas Luis Perlotti",
    description:
      "Difunde la producción de la escultura nacional e internacional",
    image: museosImg,
    icon: "MELP",
    color: "blue.400",
  },
  {
    id: "museo-9",
    name: "Museo Sívori",
    description: "Preserva y difunde el arte argentino de los Siglos XX y XXI",
    image: museosImg,
    icon: "MS",
    color: "pink.600",
  },
  {
    id: "museo-10",
    name: "Museo de Arte Moderno",
    description: "Exhibe obras de arte argentino e internacional",
    image: museosImg,
    icon: "MAM",
    color: "cyan.600",
  },
  {
    id: "museo-11",
    name: "Museo de la Imaginación y el Juego",
    description: "Un espacio pensado para chicas y chicos de 0 a 12 años",
    image: museosImg,
    icon: "MIJU",
    color: "red.400",
  },
];
