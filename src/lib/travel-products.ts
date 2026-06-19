import type { QuoteDestination } from "@/lib/quote";
import type { DestinationRegion } from "@/components/ui/destination-flag-badge";

export interface TravelProductImage {
  src: string;
  alt: string;
}

export interface TravelProduct {
  slug: string;
  title: string;
  shortTitle: string;
  image: string;
  imageAlt: string;
  gallery: TravelProductImage[];
  region: DestinationRegion;
  destinations: string[];
  description: string;
  seoDescription: string;
  highlights: string[];
  priceLabel: string;
  priceCLP: number;
  formDestination: QuoteDestination;
}

function defineProduct(
  product: Omit<TravelProduct, "image" | "imageAlt"> & {
    gallery: TravelProductImage[];
  },
): TravelProduct {
  return {
    ...product,
    image: product.gallery[0].src,
    imageAlt: product.gallery[0].alt,
  };
}

export const TRAVEL_PRODUCTS: TravelProduct[] = [
  defineProduct({
    slug: "sur-chile-siete-lagos",
    title: "Gira Sur de Chile: Ruta Siete Lagos",
    shortTitle: "Sur de Chile · Siete Lagos",
    gallery: [
      {
        src: "/images/servicios/sur-chile-villarrica-volcan.jpg",
        alt: "Volcán Villarrica nevado reflejado en el lago con muelle y bosque nativo en el Sur de Chile",
      },
      {
        src: "/images/destinos/sur-chile/pucon-kayak-villarrica.jpg",
        alt: "Kayak en el lago Villarrica con el volcán nevado al fondo en Pucón",
      },
      {
        src: "/images/destinos/sur-chile/ruta-siete-lagos-carretera.png",
        alt: "Carretera panorámica junto a un lago en la Ruta de los Siete Lagos del sur de Chile",
      },
    ],
    region: "chile",
    destinations: ["Licanray", "Huilo Huilo", "Coñaripe", "Villarrica"],
    description:
      "Una inmersión total en la naturaleza patagónica. La combinación perfecta de termas, bosques y adrenalina, diseñada para cursos que buscan un viaje de alta categoría optimizando el presupuesto.",
    seoDescription:
      "Gira de estudio todo incluido por la Ruta Siete Lagos: Licanray, Huilo Huilo, Coñaripe y Villarrica. Rafting, parque acuático, termas y cobertura médica.",
    highlights: [
      "Rafting en río",
      "Parque acuático",
      "Termas de Coñaripe",
      "Cobertura Médica Completa",
      "Soporte 24/7",
    ],
    priceLabel: "Desde $529.990 por persona.",
    priceCLP: 529990,
    formDestination:
      "Sur de Chile: Siete Lagos (Licanray / Huilo Huilo / Coñaripe / Villarrica)",
  }),
  defineProduct({
    slug: "sur-chile-lagos-volcanes",
    title: "Gira Sur de Chile: Tradición y Aventura",
    shortTitle: "Sur de Chile · Lagos y Volcanes",
    gallery: [
      {
        src: "/images/servicios/sur-chile-puerto-varas-osorno.webp",
        alt: "Iglesia del Sagrado Corazón en Puerto Varas con el volcán Osorno y el lago Llanquihue al fondo",
      },
      {
        src: "/images/destinos/sur-chile/frutillar-iglesia-costanera.webp",
        alt: "Iglesia blanca y casas coloniales a orillas del lago en Frutillar",
      },
      {
        src: "/images/destinos/sur-chile/frutillar-muelle-osorno.webp",
        alt: "Muelle de Frutillar sobre el lago Llanquihue con el volcán Osorno al fondo",
      },
    ],
    region: "chile",
    destinations: ["Puerto Varas", "Frutillar", "Osorno", "Valdivia"],
    description:
      "Recorre las postales más icónicas del sur de Chile. Desde la magia de Valdivia hasta los paisajes coloniales de Frutillar y Puerto Varas, combinando cultura con actividades extremas.",
    seoDescription:
      "Gira escolar todo incluido por Puerto Varas, Frutillar, Osorno y Valdivia. Rafting, navegación, tours culturales y soporte 24/7 en ruta.",
    highlights: [
      "Rafting incluido",
      "Navegación",
      "Tours culturales",
      "Cobertura Médica Completa",
      "Soporte 24/7",
    ],
    priceLabel: "Desde $629.990 por persona.",
    priceCLP: 629990,
    formDestination:
      "Sur de Chile: Lagos y Volcanes (Puerto Varas / Valdivia / Frutillar / Osorno)",
  }),
  defineProduct({
    slug: "bariloche-terrestre",
    title: "Gira Bariloche Terrestre: Aventura sobre Ruedas",
    shortTitle: "Bariloche Terrestre",
    gallery: [
      {
        src: "/images/servicios/bariloche-letras-nahuel-huapi.jpg",
        alt: "Letrero de Bariloche frente al lago Nahuel Huapi con la cordillera de los Andes al fondo",
      },
      {
        src: "/images/destinos/bariloche/centro-civico.jpg",
        alt: "Plaza del Centro Cívico de Bariloche con arquitectura de piedra y torre del reloj",
      },
      {
        src: "/images/destinos/bariloche/lago-nahuel-huapi.png",
        alt: "Lago Nahuel Huapi con bosques nativos y montañas nevadas en Bariloche",
      },
    ],
    region: "argentina",
    destinations: ["San Carlos de Bariloche, Argentina"],
    description:
      "Cruza la Cordillera de los Andes en nuestros buses de última generación. Vivirás la mítica experiencia de Bariloche con todo resuelto desde que sales de Santiago: comidas en ruta, excursiones y las mejores discotecas.",
    seoDescription:
      "Gira de estudio a Bariloche en bus exclusivo todo incluido. Rafting, canopy, cabalgata, bar de hielo y cobertura médica internacional.",
    highlights: [
      "Rafting",
      "Canopy en Cerro López",
      "Cabalgata",
      "Bar de hielo",
      "Fiestas nocturnas",
      "Cobertura Médica",
      "Soporte 24/7",
    ],
    priceLabel: "Desde $1.195.990 por persona.",
    priceCLP: 1195990,
    formDestination: "Bariloche Terrestre (Bus exclusivo)",
  }),
  defineProduct({
    slug: "bariloche-aereo",
    title: "Gira Bariloche Aéreo: Experiencia Premium",
    shortTitle: "Bariloche Aéreo",
    gallery: [
      {
        src: "/images/servicios/bariloche-panorama-catedral.jpg",
        alt: "Vista panorámica de la catedral de Bariloche, el lago Nahuel Huapi y la ciudad patagónica",
      },
      {
        src: "/images/destinos/bariloche/lago-nahuel-huapi.png",
        alt: "Lago Nahuel Huapi con bosques nativos y montañas nevadas en Bariloche",
      },
      {
        src: "/images/servicios/bariloche-letras-nahuel-huapi.jpg",
        alt: "Letrero icónico de Bariloche en la costanera del lago Nahuel Huapi",
      },
    ],
    region: "argentina",
    destinations: ["San Carlos de Bariloche, Argentina"],
    description:
      "La opción más rápida, cómoda y exclusiva para tu curso. Evita las horas de carretera y llega directo a disfrutar de Bariloche con el paquete de aventura más completo y seguro del mercado.",
    seoDescription:
      "Gira de estudio premium a Bariloche con vuelos ida y vuelta. Rafting, canopy, discotecas con traslados y cobertura médica internacional.",
    highlights: [
      "Vuelos ida y vuelta",
      "Rafting",
      "Canopy",
      "Discotecas con traslados incluidos",
      "Cobertura Médica Internacional",
      "Soporte 24/7",
    ],
    priceLabel: "Desde $1.595.990 por persona.",
    priceCLP: 1595990,
    formDestination: "Bariloche Aéreo (Avión)",
  }),
];

export function getTravelProductBySlug(slug: string) {
  return TRAVEL_PRODUCTS.find((product) => product.slug === slug);
}

export const TRAVEL_PRODUCT_SLUGS = TRAVEL_PRODUCTS.map((product) => product.slug);

export const SEO_FAQ_ITEMS = [
  {
    question: "¿Qué incluyen las giras de estudio de Turismo Dabar?",
    answer:
      "Nuestros programas son 100% todo incluido: transporte en bus exclusivo o vuelos (según el plan), pensión completa, excursiones, actividades de aventura, cobertura médica en ruta, enfermera y coordinación 24/7.",
  },
  {
    question: "¿Cuánto cuesta una gira de estudio con Turismo Dabar?",
    answer:
      "Los valores parten desde $529.990 por persona en el Sur de Chile (Ruta Siete Lagos) y desde $1.195.990 para Bariloche terrestre. El precio final depende del curso, cantidad de alumnos y fecha del viaje.",
  },
  {
    question: "¿Organizan giras a Bariloche y al Sur de Chile?",
    answer:
      "Sí. Ofrecemos cuatro programas: Sur de Chile Siete Lagos, Sur de Chile Lagos y Volcanes, Bariloche Terrestre en bus exclusivo y Bariloche Aéreo con vuelos incluidos.",
  },
  {
    question: "¿Cómo cotizo una gira para mi curso?",
    answer:
      "Completa el formulario de cotización en turismodabar.cl o escríbenos por WhatsApp al +56 9 8889 8388. Un coordinador te contactará con una propuesta a medida.",
  },
] as const;
