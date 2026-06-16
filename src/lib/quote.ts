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

export const TRAVEL_YEAR_OPTIONS = [
  "2026",
  "2027",
  "2028",
  "Aún no definida",
] as const;

export type TravelYearOption = (typeof TRAVEL_YEAR_OPTIONS)[number];

export const COTIZAR_SCROLL_EVENT = "turismodabar:cotizar-scroll";
export const COTIZAR_FORM_ID = "cotizar-form";
export const COTIZAR_SECTION_ID = "cotizar";

export interface CotizarScrollDetail {
  destination?: QuoteDestination;
}

function scrollToQuoteForm() {
  const formEl = document.getElementById(COTIZAR_FORM_ID);
  const sectionEl = document.getElementById(COTIZAR_SECTION_ID);
  const target = formEl ?? sectionEl;

  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });

  window.history.replaceState(null, "", `#${COTIZAR_SECTION_ID}`);
}

/** Scroll suave al formulario centrado + pre-selección opcional de destino */
export function scrollToCotizar(destination?: QuoteDestination) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<CotizarScrollDetail>(COTIZAR_SCROLL_EVENT, {
        detail: { destination },
      }),
    );
  }

  scrollToQuoteForm();
}

/** Maneja enlaces hash #cotizar al cargar la página */
export function handleCotizarHashOnLoad() {
  if (typeof window === "undefined") return;

  if (window.location.hash === `#${COTIZAR_SECTION_ID}`) {
    window.setTimeout(() => scrollToQuoteForm(), 350);
  }
}
