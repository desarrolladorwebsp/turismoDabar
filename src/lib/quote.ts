export const QUOTE_DESTINATIONS = [
  "Sur de Chile: Siete Lagos (Licanray / Huilo Huilo / Coñaripe / Villarrica)",
  "Sur de Chile: Lagos y Volcanes (Puerto Varas / Valdivia / Frutillar / Osorno)",
  "Bariloche Terrestre (Bus exclusivo)",
  "Bariloche Aéreo (Avión)",
  "Aún no decidimos, queremos evaluar las opciones en la reunión de apoderados",
] as const;

export type QuoteDestination = (typeof QUOTE_DESTINATIONS)[number];

export const STUDENT_COUNT_OPTIONS = [
  "20 a 30 alumnos",
  "30 a 40 alumnos",
  "Más de 40 alumnos",
] as const;

export type StudentCountOption = (typeof STUDENT_COUNT_OPTIONS)[number];

export const TRAVEL_YEAR_OPTIONS = ["2026", "2027", "Aún no definida"] as const;

export type TravelYearOption = (typeof TRAVEL_YEAR_OPTIONS)[number];

export const PRIORITY_OPTIONS = [
  "Seguridad",
  "Actividades y aventura",
  "Todo incluido",
  "Precio",
  "Hotelería",
  "Experiencia premium",
] as const;

export type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

export const COTIZAR_SCROLL_EVENT = "turismodabar:cotizar-scroll";

export interface CotizarScrollDetail {
  destination?: QuoteDestination;
}

/** Scroll suave al formulario + pre-selección opcional de destino */
export function scrollToCotizar(destination?: QuoteDestination) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CotizarScrollDetail>(COTIZAR_SCROLL_EVENT, {
        detail: { destination },
      })
    );
  }

  document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
}
