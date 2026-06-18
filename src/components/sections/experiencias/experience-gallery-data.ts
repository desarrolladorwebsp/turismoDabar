import { mediaVideoUrl } from "@/lib/media";

export type ExperienceMediaType = "photo" | "video";

export interface ExperienceGridPlacement {
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
}

export interface ExperienceGalleryItem {
  id: string;
  type: ExperienceMediaType;
  title: string;
  description: string;
  caption: string;
  src: string;
  poster?: string;
  alt: string;
  objectPosition: string;
  grid: ExperienceGridPlacement;
  mobileOrder: number;
}

export const EXPERIENCE_GALLERY: ExperienceGalleryItem[] = [
  {
    id: "rafting-rapidos",
    type: "photo",
    title: "Rafting en Río",
    description:
      "Adrenalina pura en los rápidos del sur. Nuestros guías certificados acompañan cada bajada con equipamiento de seguridad de primer nivel.",
    caption: "Sur de Chile · Diciembre 2024",
    src: "/images/experiencias/rafting-rapidos.jpg",
    alt: "Grupo de estudiantes haciendo rafting con cascadas y equipo de seguridad",
    objectPosition: "68% center",
    grid: { colStart: 1, colSpan: 2, rowStart: 1, rowSpan: 1 },
    mobileOrder: 1,
  },
  {
    id: "video-rafting-sur",
    type: "video",
    title: "Rafting en el Sur de Chile",
    description:
      "Así se vive la preparación y la energía de una jornada de rafting con Turismo Dabar.",
    caption: "Video · Sur de Chile",
    src: mediaVideoUrl("video-rafting-sur.mp4"),
    poster: "/images/experiencias/posters/video-rafting-sur.jpg",
    alt: "Video de rafting en el Sur de Chile con Turismo Dabar",
    objectPosition: "center center",
    grid: { colStart: 3, colSpan: 1, rowStart: 1, rowSpan: 2 },
    mobileOrder: 2,
  },
  {
    id: "grupo-rafting",
    type: "photo",
    title: "Listos para la Aventura",
    description:
      "El momento previo al rafting: equipo puesto, sonrisas y el entusiasmo de todo un curso reunido en plena naturaleza.",
    caption: "Previa al rafting · 2024",
    src: "/images/experiencias/grupo-rafting.jpg",
    alt: "Grupo de estudiantes con cascos y chalecos de rafting posando en un prado",
    objectPosition: "center 35%",
    grid: { colStart: 1, colSpan: 1, rowStart: 2, rowSpan: 1 },
    mobileOrder: 3,
  },
  {
    id: "gira-estudio-montana",
    type: "photo",
    title: "Gira de Estudio",
    description:
      "Cursos completos viviendo la Patagonia: paisajes imponentes, integración grupal y recuerdos que marcan para siempre.",
    caption: "Cordillera de los Andes",
    src: "/images/experiencias/gira-estudio-montana.jpg",
    alt: "Grupo de gira de estudio con banner de Turismo Dabar en la montaña",
    objectPosition: "center 30%",
    grid: { colStart: 1, colSpan: 1, rowStart: 3, rowSpan: 1 },
    mobileOrder: 4,
  },
  {
    id: "video-lago-volcan",
    type: "video",
    title: "Sur de Chile en Vivo",
    description:
      "Lagos, volcanes y el equipo Dabar acompañando cada experiencia en ruta.",
    caption: "Video · Lagos del Sur",
    src: mediaVideoUrl("video-lago-volcan.mp4"),
    poster: "/images/experiencias/posters/video-lago-volcan.jpg",
    alt: "Video con vista al lago y volcán en el Sur de Chile",
    objectPosition: "center center",
    grid: { colStart: 2, colSpan: 1, rowStart: 2, rowSpan: 2 },
    mobileOrder: 5,
  },
  {
    id: "cabalgata",
    type: "photo",
    title: "Cabalgata Patagónica",
    description:
      "Recorridos a caballo entre valles y bosques nativos. Una experiencia única que conecta al grupo con el paisaje.",
    caption: "Bariloche · Cabalgata",
    src: "/images/experiencias/cabalgata.jpg",
    alt: "Cabalgata en valle patagónico con montañas de fondo",
    objectPosition: "72% center",
    grid: { colStart: 3, colSpan: 1, rowStart: 3, rowSpan: 1 },
    mobileOrder: 6,
  },
  {
    id: "bus-grupal",
    type: "photo",
    title: "Logística Todo Resuelto",
    description:
      "Buses exclusivos, coordinación en terreno y la tranquilidad de un viaje 100% organizado desde la salida del colegio.",
    caption: "Salida grupal · Bus Dabar",
    src: "/images/experiencias/bus-grupal.jpg",
    alt: "Curso completo posando frente al bus de Turismo Dabar",
    objectPosition: "center 40%",
    grid: { colStart: 1, colSpan: 2, rowStart: 4, rowSpan: 1 },
    mobileOrder: 7,
  },
  {
    id: "video-noche-grupo",
    type: "video",
    title: "La Diversión Continúa",
    description:
      "Más allá de las excursiones: momentos de integración, risas y la magia de compartir en grupo.",
    caption: "Video · Momentos del viaje",
    src: mediaVideoUrl("video-noche-grupo.mp4"),
    poster: "/images/experiencias/posters/video-noche-grupo.jpg",
    alt: "Video de integración y diversión nocturna del grupo",
    objectPosition: "center center",
    grid: { colStart: 3, colSpan: 1, rowStart: 4, rowSpan: 1 },
    mobileOrder: 8,
  },
  {
    id: "parque-acuatico",
    type: "photo",
    title: "Parque Acuático",
    description:
      "Tarde de adrenalina en el lago con estructuras inflables. Diversión acuática supervisada para todo el curso.",
    caption: "Parque acuático · Sur de Chile",
    src: "/images/experiencias/parque-acuatico.jpg",
    alt: "Estudiantes disfrutando un parque acuático inflable en el lago",
    objectPosition: "38% center",
    grid: { colStart: 1, colSpan: 2, rowStart: 5, rowSpan: 1 },
    mobileOrder: 9,
  },
  {
    id: "bariloche-centro",
    type: "photo",
    title: "Bariloche",
    description:
      "Centro cívico, cultura y la magia de San Carlos de Bariloche como parte del programa de gira.",
    caption: "San Carlos de Bariloche · Argentina",
    src: "/images/experiencias/bariloche-centro.jpg",
    alt: "Centro cívico de Bariloche con la delegación en gira de estudio",
    objectPosition: "center 25%",
    grid: { colStart: 3, colSpan: 1, rowStart: 5, rowSpan: 1 },
    mobileOrder: 10,
  },
];

export const EXPERIENCE_GRID_ROWS = 5;
