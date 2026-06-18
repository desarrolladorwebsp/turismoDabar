import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getProductPageJsonLd,
  getProductPageMetadata,
} from "@/lib/seo";
import {
  getTravelProductBySlug,
  TRAVEL_PRODUCT_SLUGS,
} from "@/lib/travel-products";
import { JsonLd } from "@/components/seo/json-ld";
import { PlanPageCta } from "@/components/seo/plan-page-cta";

interface PlanPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return TRAVEL_PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PlanPageProps) {
  const { slug } = await params;
  const product = getTravelProductBySlug(slug);

  if (!product) {
    return {};
  }

  return getProductPageMetadata(product);
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { slug } = await params;
  const product = getTravelProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd data={getProductPageJsonLd(product)} />
      <main className="w-full flex-1 overflow-x-hidden bg-[#fbfaf7]">
        <section className="border-b border-stone-200/60 py-16 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 md:px-12 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="flex flex-col gap-5">
              <nav
                aria-label="Breadcrumb"
                className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500"
              >
                <Link href="/" className="hover:text-brand-blue-700">
                  Inicio
                </Link>
                <span className="mx-2">/</span>
                <Link href="/planes" className="hover:text-brand-blue-700">
                  Giras
                </Link>
                <span className="mx-2">/</span>
                <span className="text-stone-700">{product.shortTitle}</span>
              </nav>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
                {product.title}
              </h1>

              <p className="max-w-prose text-base leading-relaxed text-stone-600 md:text-lg">
                {product.description}
              </p>

              <p className="text-lg font-bold text-brand-blue-700">
                {product.priceLabel}
              </p>

              <ul className="grid gap-2 sm:grid-cols-2">
                {product.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <PlanPageCta destination={product.formDestination} />
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-12">
            <h2 className="mb-6 text-2xl font-bold text-stone-900">
              Destinos incluidos
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.destinations.map((destination) => (
                <span
                  key={destination}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-700 ring-1 ring-stone-200"
                >
                  {destination}
                </span>
              ))}
            </div>
            <p className="mt-8 text-sm text-stone-500">
              Programa todo incluido operado por Turismo Dabar.{" "}
              <Link
                href="/"
                className="font-semibold text-brand-coral-600 underline underline-offset-2"
              >
                Ver todos los planes
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
