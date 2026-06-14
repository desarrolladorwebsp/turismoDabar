"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FirstAidKit,
  ShieldCheck,
  Bus,
  MapPin,
  ArrowRight,
} from "@phosphor-icons/react";
import { scrollToCotizar, type QuoteDestination } from "@/lib/quote";
import {
  organicSpring,
  staggerContainer,
  fadeUpItemCustom,
} from "@/lib/motion";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import {
  DestinationFlagBadge,
  type DestinationRegion,
} from "@/components/ui/destination-flag-badge";
import { TripHighlights } from "@/components/sections/servicios/trip-highlights";

interface Product {
  title: string;
  image: string;
  imageAlt: string;
  region: DestinationRegion;
  destinations: string[];
  description: string;
  highlights: string[];
  price: string;
  formDestination: QuoteDestination;
}

const PRODUCTS: Product[] = [
  {
    title: "Gira Sur de Chile: Ruta Siete Lagos",
    image: "/images/servicios/sur-chile-premium.png",
    imageAlt:
      "Paisaje del Sur de Chile con lagos, bosques nativos y volcanes en la Ruta Siete Lagos",
    region: "chile",
    destinations: ["Licanray", "Huilo Huilo", "Coñaripe", "Villarrica"],
    description:
      "Una inmersión total en la naturaleza patagónica. La combinación perfecta de termas, bosques y adrenalina, diseñada para cursos que buscan un viaje de alta categoría optimizando el presupuesto.",
    highlights: [
      "Rafting en río",
      "Parque acuático",
      "Termas de Coñaripe",
      "Cobertura Médica Completa",
      "Soporte 24/7",
    ],
    price: "Desde $529.990 por persona.",
    formDestination:
      "Sur de Chile: Siete Lagos (Licanray / Huilo Huilo / Coñaripe / Villarrica)",
  },
  {
    title: "Gira Sur de Chile: Tradición y Aventura",
    image: "/images/servicios/sur-chile-experiencia.png",
    imageAlt:
      "Puerto Varas con el volcán Osorno reflejado en el lago Llanquihue al atardecer",
    region: "chile",
    destinations: ["Puerto Varas", "Frutillar", "Osorno", "Valdivia"],
    description:
      "Recorre las postales más icónicas del sur de Chile. Desde la magia de Valdivia hasta los paisajes coloniales de Frutillar y Puerto Varas, combinando cultura con actividades extremas.",
    highlights: [
      "Rafting incluido",
      "Navegación",
      "Tours culturales",
      "Cobertura Médica Completa",
      "Soporte 24/7",
    ],
    price: "Desde $629.990 por persona.",
    formDestination:
      "Sur de Chile: Lagos y Volcanes (Puerto Varas / Valdivia / Frutillar / Osorno)",
  },
  {
    title: "Gira Bariloche Terrestre: Aventura sobre Ruedas",
    image: "/images/servicios/bariloche-premium.png",
    imageAlt:
      "San Carlos de Bariloche con el lago Nahuel Huapi y la Cordillera de los Andes",
    region: "argentina",
    destinations: ["San Carlos de Bariloche, Argentina"],
    description:
      "Cruza la Cordillera de los Andes en nuestros buses de última generación. Vivirás la mítica experiencia de Bariloche con todo resuelto desde que sales de Santiago: comidas en ruta, excursiones y las mejores discotecas.",
    highlights: [
      "Rafting",
      "Canopy en Cerro López",
      "Cabalgata",
      "Bar de hielo",
      "Fiestas nocturnas",
      "Cobertura Médica",
      "Soporte 24/7",
    ],
    price: "Desde $1.195.990 por persona.",
    formDestination: "Bariloche Terrestre (Bus exclusivo)",
  },
  {
    title: "Gira Bariloche Aéreo: Experiencia Premium",
    image: "/images/servicios/bariloche-premium.png",
    imageAlt:
      "Vista aérea de Bariloche con el lago Nahuel Huapi y los Andes nevados",
    region: "argentina",
    destinations: ["San Carlos de Bariloche, Argentina"],
    description:
      "La opción más rápida, cómoda y exclusiva para tu curso. Evita las horas de carretera y llega directo a disfrutar de Bariloche con el paquete de aventura más completo y seguro del mercado.",
    highlights: [
      "Vuelos ida y vuelta",
      "Rafting",
      "Canopy",
      "Discotecas con traslados incluidos",
      "Cobertura Médica Internacional",
      "Soporte 24/7",
    ],
    price: "Desde $1.595.990 por persona.",
    formDestination: "Bariloche Aéreo (Avión)",
  },
];

const TRUST_BADGES = [
  {
    icon: FirstAidKit,
    title: "Profesional de la Salud en Ruta",
    description:
      "Enfermera titulada acompañando a la delegación durante todo el viaje.",
  },
  {
    icon: ShieldCheck,
    title: "Cobertura Médica Total",
    description:
      "Seguro de asistencia en viaje para cada integrante del grupo.",
  },
  {
    icon: Bus,
    title: "Logística Todo Incluido",
    description:
      "Coordinación completa de traslados, hotel, comidas y actividades.",
  },
];

const badgeFade = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...organicSpring, delay: i * 0.08 },
  }),
};

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.article
      custom={index}
      variants={fadeUpItemCustom}
      whileHover={{ y: -4 }}
      transition={organicSpring}
      className="group relative flex flex-col overflow-visible rounded-2xl border border-stone-200 bg-white transition-colors duration-300 hover:border-brand-blue-200/60"
    >
      <div className="relative shrink-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue-950/60 via-transparent to-transparent" />
        </div>

        <DestinationFlagBadge
          region={product.region}
          className="absolute bottom-0 right-4 z-20 translate-y-1/2 sm:right-5"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-6 sm:pt-7">
        <h3 className="pr-16 text-lg font-bold leading-snug tracking-tight text-stone-900 sm:pr-20">
          {product.title}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          {product.destinations.map((dest) => (
            <span
              key={dest}
              className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-[11px] font-medium text-stone-700 ring-1 ring-stone-200/80"
            >
              <MapPin size={11} weight="fill" className="text-brand-coral-400" />
              {dest}
            </span>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-stone-600">
          {product.description}
        </p>

        <TripHighlights items={product.highlights} />

        <p className="text-sm font-bold tracking-tight text-brand-blue-700">
          {product.price}
        </p>

        <div className="flex-1" />

        <motion.button
          type="button"
          onClick={() => scrollToCotizar(product.formDestination)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={organicSpring}
          className="group/btn relative flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-brand-coral-500 py-3.5 text-sm font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-brand-coral-600"
        >
          Cotizar Este Destino
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </motion.button>
      </div>
    </motion.article>
  );
}

export function Servicios() {
  return (
    <section
      id="servicios"
      className="relative w-full overflow-hidden border-b border-stone-200/50 bg-[#fbfaf7] py-20 md:py-28 lg:py-32"
    >
      <SectionBackdrop variant="servicios" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={organicSpring}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-sun-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sun-700 ring-1 ring-brand-sun-200">
            <MapPin size={13} weight="fill" />
            Nuestros Destinos
          </span>

          <h2 className="mb-4 text-3xl font-bold leading-[1.1] tracking-tight text-stone-900 sm:text-4xl md:text-[2.75rem]">
            Viajes Escolares{" "}
            <span className="text-brand-blue-600">Todo Incluido</span>
          </h2>

          <p className="mx-auto max-w-[50ch] text-base leading-relaxed text-stone-500 md:text-lg">
            Cuatro programas diseñados con seguridad, logística completa y
            experiencias que sus alumnos recordarán para siempre.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mb-20 md:gap-5"
        >
          {TRUST_BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                custom={i}
                variants={badgeFade}
                whileHover={{ y: -3 }}
                transition={organicSpring}
                className="relative flex items-start gap-4 rounded-2xl border border-stone-200 bg-white/80 p-5 backdrop-blur-sm md:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-sun-200 bg-brand-sun-50">
                  <Icon
                    size={22}
                    weight="duotone"
                    className="text-brand-sun-600"
                  />
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold leading-snug tracking-tight text-stone-900">
                    {badge.title}
                  </span>
                  <span className="text-xs leading-relaxed text-stone-500">
                    {badge.description}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...organicSpring, delay: 0.2 }}
          className="mt-10 text-center text-sm text-stone-400 md:mt-14"
        >
          ¿Aún no han definido el destino?{" "}
          <button
            type="button"
            onClick={() =>
              scrollToCotizar(
                "Aún no decidimos, queremos evaluar las opciones en la reunión de apoderados"
              )
            }
            className="cursor-pointer font-semibold text-brand-coral-500 underline underline-offset-2 transition-colors hover:text-brand-coral-600"
          >
            Solicita una reunión de apoderados
          </button>
        </motion.p>
      </div>
    </section>
  );
}
