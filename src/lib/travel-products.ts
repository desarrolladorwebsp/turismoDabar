import type { QuoteDestination } from "@/lib/quote";
import type { DestinationRegion } from "@/components/ui/destination-flag-badge";

export interface TravelProduct {
  slug: string;
  title: string;
  shortTitle: string;
  image: string;
  imageAlt: string;
  region: DestinationRegion;
  destinations: string[];
  description: string;
  seoDescription: string;
  highlights: string[];
  priceLabel: string;
  priceCLP: number;
  formDestination: QuoteDestination;
}

export const TRAVEL_PRODUCTS: TravelProduct[] = [
  {
    slug: "sur-chile-siete-lagos",
    title: "Gira Sur de Chile: Ruta Siete Lagos",
    shortTitle: "Sur de Chile · Siete Lagos",
    image: "/images/servicios/sur-chile-premium.png",
    imageAlt:
      "Paisaje del Sur de Chile con lagos, bosques nativos y volcanes en la Ruta Siete Lagos",
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
  },
  {
    slug: "sur-chile-lagos-volcanes",
    title: "Gira Sur de Chile: Tradición y Aventura",
    shortTitle: "Sur de Chile · Lagos y Volcanes",
    image: "/images/servicios/sur-chile-experiencia.png",
    imageAlt:
      "Puerto Varas con el volcán Osorno reflejado en el lago Llanquihue al atardecer",
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
  },
  {
    slug: "bariloche-terrestre",
    title: "Gira Bariloche Terrestre: Aventura sobre Ruedas",
    shortTitle: "Bariloche Terrestre",
    image: "/images/servicios/bariloche-premium.png",
    imageAlt:
      "San Carlos de Bariloche con el lago Nahuel Huapi y la Cordillera de los Andes",
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
  },
  {
    slug: "bariloche-aereo",
    title: "Gira Bariloche Aéreo: Experiencia Premium",
    shortTitle: "Bariloche Aéreo",
    image: "/images/servicios/bariloche-premium.png",
    imageAlt:
      "Vista aérea de Bariloche con el lago Nahuel Huapi y los Andes nevados",
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
  },
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
