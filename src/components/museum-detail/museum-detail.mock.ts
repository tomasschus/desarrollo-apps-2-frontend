import museosImg from "../../assets/museos2.jpg";

export type MuseumDetail = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string;
  color: string;
  address: string;
  phone: string;
  website: string;
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  ticketPrices: {
    general: number;
    students: number;
    seniors: number;
    children: number;
  };
  features: string[];
  rating: number;
  reviews: number;
};

export const museumDetailMock: MuseumDetail[] = [
  {
    id: "museo-1",
    name: "Museo del Cine Pablo C. Ducrós Hicken",
    description:
      "Preserva, difunde e investiga el patrimonio audiovisual argentino.",
    longDescription:
      "El Museo del Cine Pablo C. Ducrós Hicken es un espacio único en Argentina dedicado a preservar, investigar y difundir el patrimonio audiovisual nacional. Con una colección que abarca desde los primeros experimentos cinematográficos hasta las producciones contemporáneas, el museo ofrece un recorrido fascinante por la historia del cine argentino y mundial.",
    image: museosImg,
    icon: "MC",
    color: "red.600",
    address: "Defensa 1220, San Telmo, Buenos Aires",
    phone: "+54 11 4361-2462",
    website: "www.museodelcine.gov.ar",
    openingHours: {
      monday: "Cerrado",
      tuesday: "11:00 - 18:00",
      wednesday: "11:00 - 18:00",
      thursday: "11:00 - 18:00",
      friday: "11:00 - 18:00",
      saturday: "11:00 - 19:00",
      sunday: "11:00 - 19:00",
    },
    ticketPrices: {
      general: 500,
      students: 250,
      seniors: 250,
      children: 0,
    },
    features: [
      "Salas de exhibición permanente",
      "Proyecciones de películas clásicas",
      "Biblioteca especializada",
      "Archivo fílmico",
      "Actividades educativas",
      "Visitas guiadas",
    ],
    rating: 4.5,
    reviews: 342,
  },
  {
    id: "museo-2",
    name: "Buenos Aires Museo",
    description: "Recopila la historia y cultura de la Ciudad de Buenos Aires.",
    longDescription:
      "El Buenos Aires Museo es el espacio cultural que cuenta la historia de la ciudad desde sus orígenes hasta la actualidad. A través de exhibiciones permanentes y temporales, el museo invita a descubrir los aspectos más fascinantes de la cultura porteña, sus tradiciones y su evolución a lo largo del tiempo.",
    image: museosImg,
    icon: "MBA",
    color: "blue.800",
    address: "Defensa 219, San Telmo, Buenos Aires",
    phone: "+54 11 4331-9855",
    website: "www.buenosairesmuseo.gov.ar",
    openingHours: {
      monday: "Cerrado",
      tuesday: "10:00 - 18:00",
      wednesday: "10:00 - 18:00",
      thursday: "10:00 - 18:00",
      friday: "10:00 - 18:00",
      saturday: "10:00 - 19:00",
      sunday: "10:00 - 19:00",
    },
    ticketPrices: {
      general: 400,
      students: 200,
      seniors: 200,
      children: 0,
    },
    features: [
      "Exhibiciones permanentes",
      "Muestras temporales",
      "Actividades para toda la familia",
      "Talleres educativos",
      "Archivo histórico",
      "Tienda de souvenirs",
    ],
    rating: 4.3,
    reviews: 278,
  },
  {
    id: "museo-3",
    name: "Museo Larreta",
    description: "Arte, teatro, literatura y cultura española en un solo lugar",
    longDescription:
      "El Museo Larreta es una joya arquitectónica que alberga una importante colección de arte español de los siglos XV al XX. Ubicado en una mansión colonial del siglo XVIII, el museo ofrece un recorrido por la cultura hispánica a través de pinturas, esculturas, mobiliario y artes decorativas de gran valor histórico y artístico.",
    image: museosImg,
    icon: "ML",
    color: "purple.500",
    address: "Juramento 2291, Belgrano, Buenos Aires",
    phone: "+54 11 4784-4040",
    website: "www.museoларreta.gov.ar",
    openingHours: {
      monday: "Cerrado",
      tuesday: "12:00 - 19:00",
      wednesday: "12:00 - 19:00",
      thursday: "12:00 - 19:00",
      friday: "12:00 - 19:00",
      saturday: "10:00 - 20:00",
      sunday: "10:00 - 20:00",
    },
    ticketPrices: {
      general: 600,
      students: 300,
      seniors: 300,
      children: 0,
    },
    features: [
      "Colección de arte español",
      "Jardín andaluz",
      "Conciertos y eventos",
      "Visitas guiadas especializadas",
      "Biblioteca de arte",
      "Café museo",
    ],
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "museo-4",
    name: "Museo Histórico Cornelio Saavedra",
    description:
      "Se propone reflexionar sobre la historia y la sociedad argentina",
    longDescription:
      "El Museo Histórico Cornelio Saavedra es un espacio dedicado a la reflexión sobre la historia argentina y sus procesos sociales. A través de una amplia colección de objetos, documentos y obras de arte, el museo presenta un panorama completo de la evolución política, social y cultural del país desde la época colonial hasta el presente.",
    image: museosImg,
    icon: "MHCS",
    color: "teal.500",
    address: "Crisólogo Larralde 6309, Saavedra, Buenos Aires",
    phone: "+54 11 4572-0746",
    website: "www.museosaavedra.gov.ar",
    openingHours: {
      monday: "Cerrado",
      tuesday: "14:00 - 19:00",
      wednesday: "14:00 - 19:00",
      thursday: "14:00 - 19:00",
      friday: "14:00 - 19:00",
      saturday: "10:00 - 18:00",
      sunday: "10:00 - 18:00",
    },
    ticketPrices: {
      general: 350,
      students: 175,
      seniors: 175,
      children: 0,
    },
    features: [
      "Exhibición histórica permanente",
      "Archivo documental",
      "Actividades educativas",
      "Conferencias y charlas",
      "Investigación histórica",
      "Publicaciones especializadas",
    ],
    rating: 4.2,
    reviews: 189,
  },
  {
    id: "museo-5",
    name: "Museo Casa Carlos Gardel",
    description: "Preserva y difunde el patrimonio vinculado con Carlos Gardel",
    longDescription:
      "La Casa Museo Carlos Gardel es un homenaje al máximo exponente del tango argentino. Ubicada en la casa donde vivió el legendario cantor, el museo conserva objetos personales, fotografías, discos y documentos que narran la vida y obra de quien es considerado el 'Rey del Tango'. Un recorrido imperdible para los amantes de la música popular argentina.",
    image: museosImg,
    icon: "MCCG",
    color: "orange.500",
    address: "Jean Jaurès 735, Abasto, Buenos Aires",
    phone: "+54 11 4964-2015",
    website: "www.casacarlosgardel.gov.ar",
    openingHours: {
      monday: "11:00 - 18:00",
      tuesday: "11:00 - 18:00",
      wednesday: "11:00 - 18:00",
      thursday: "11:00 - 18:00",
      friday: "11:00 - 18:00",
      saturday: "10:00 - 19:00",
      sunday: "10:00 - 19:00",
    },
    ticketPrices: {
      general: 450,
      students: 225,
      seniors: 225,
      children: 0,
    },
    features: [
      "Casa histórica de Gardel",
      "Objetos personales originales",
      "Discografía completa",
      "Shows de tango",
      "Talleres de música",
      "Tienda especializada",
    ],
    rating: 4.6,
    reviews: 423,
  },
];
