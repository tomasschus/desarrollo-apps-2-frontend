import ccSanMartinImg from "../../assets/cc-san-martin.jpg";
import ccrecoletaImg from "../../assets/ccrecoleta.jpg";
import estudioUrbanoImg from "../../assets/estudio-urbano.jpg";
import museosImg from "../../assets/museos.jpg";
import teatroColonImg from "../../assets/teatro-colon.jpg";
import usinaImg from "../../assets/usina.jpg";

export const CulturalSpaceId = {
  MUSEOS: "museos",
  CENTRO_CULTURAL_RECOLETA: "centro-cultural-recoleta",
  EL_CULTURAL_SAN_MARTIN: "el-cultural-san-martin",
  USINA_DEL_ARTE: "usina-del-arte",
  TEATRO_COLON: "teatro-colon",
  ESTUDIO_URBANO: "estudio-urbano",
} as const;

export type CulturalSpaceId =
  (typeof CulturalSpaceId)[keyof typeof CulturalSpaceId];

export const culturalSpacesMock = [
  {
    id: CulturalSpaceId.MUSEOS,
    name: "Museos",
    description: "Conocé los once museos que la Ciudad tiene para vos.",
    image: museosImg,
  },
  {
    id: CulturalSpaceId.CENTRO_CULTURAL_RECOLETA,
    name: "Centro Cultural Recoleta",
    description:
      "Conocé los espacios para exhibiciones, obras, conciertos, conferencias y más.",
    image: ccrecoletaImg,
  },
  {
    id: CulturalSpaceId.EL_CULTURAL_SAN_MARTIN,
    name: "El Cultural San Martín",
    description:
      "Conocé toda la programación y participá de cursos y talleres.",
    image: ccSanMartinImg,
  },
  {
    id: CulturalSpaceId.USINA_DEL_ARTE,
    name: "Usina del Arte",
    description:
      "Visitá el centro cultural multidisciplinario, declarado Patrimonio histórico de la Ciudad.",
    image: usinaImg,
  },
  {
    id: CulturalSpaceId.TEATRO_COLON,
    name: "Teatro Colón",
    description: "Visitá uno de los teatros más importantes del mundo.",
    image: teatroColonImg,
  },
  {
    id: CulturalSpaceId.ESTUDIO_URBANO,
    name: "Estudio Urbano",
    description:
      "Capacitate en oficios vinculados con la música y herramientas de gestión para proyectos artísticos.",
    image: estudioUrbanoImg,
  },
];
