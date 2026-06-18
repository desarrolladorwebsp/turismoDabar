import Link from "next/link";
import Image from "next/image";
import { TRAVEL_PRODUCTS, SEO_FAQ_ITEMS } from "@/lib/travel-products";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giras de Estudio Todo Incluido",
  description:
    "Cuatro programas de giras escolares todo incluido: Sur de Chile y Bariloche terrestre o aéreo. Precios desde $529.990 por persona.",
  alternates: {
    canonical: "/planes",
  },
  openGraph: {
    title: "Giras de Estudio Todo Incluido | Turismo Dabar",
    description:
      "Explora nuestros planes de giras escolares con precios, destinos y actividades incluidas.",
    url: `${SITE_URL}/planes`,
  },
};

export default function PlanesIndexPage() {
  return (
    <main className="w-full flex-1 overflow-x-hidden bg-[#fbfaf7] py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-12">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-coral-700">
            Giras de estudio
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            Planes todo incluido
          </h1>
          <p className="text-base leading-relaxed text-stone-600 md:text-lg">
            Cuatro programas diseñados para cursos que buscan seguridad,
            logística completa y experiencias inolvidables en Chile y Argentina.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {TRAVEL_PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={`/planes/${product.slug}`}
              className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-colors hover:border-brand-blue-200"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <h2 className="text-xl font-bold text-stone-900">
                  {product.title}
                </h2>
                <p className="text-sm leading-relaxed text-stone-600">
                  {product.seoDescription}
                </p>
                <p className="text-sm font-bold text-brand-blue-700">
                  {product.priceLabel}
                </p>
                <span className="text-sm font-semibold text-brand-coral-600">
                  Ver plan completo →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-stone-500">
          <Link href="/#cotizar" className="font-semibold text-brand-coral-600 underline underline-offset-2">
            Solicitar cotización personalizada
          </Link>
        </p>

        <section className="mx-auto mt-16 max-w-3xl border-t border-stone-200 pt-12">
          <h2 className="mb-6 text-2xl font-bold text-stone-900">
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-4">
            {SEO_FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="rounded-xl border border-stone-200 bg-white px-5 py-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-stone-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
