import type { Metadata } from "next";
import {
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/lib/contact";
import {
  SEO_FAQ_ITEMS,
  TRAVEL_PRODUCTS,
  type TravelProduct,
} from "@/lib/travel-products";

export const SITE_URL = "https://turismodabar.cl";

export const SITE_NAME = "Turismo Dabar";

export const SEO_KEYWORDS = [
  "giras de estudio chile",
  "viajes grupales chile",
  "turismo dabar",
  "bariloche todo incluido",
  "giras de estudio bariloche",
  "gira sur de chile escolar",
  "viajes escolares todo incluido",
  "gira bariloche terrestre",
  "gira bariloche aereo",
] as const;

export const SEO_DEFAULT_TITLE =
  "Turismo Dabar | Giras de Estudio y Viajes Grupales Todo Incluido";

export const SEO_DESCRIPTION =
  "Giras de estudio todo incluido desde $529.990: Sur de Chile (Siete Lagos y Lagos y Volcanes) y Bariloche terrestre o aéreo. Rafting, pensión completa, bus exclusivo, cobertura médica y soporte 24/7.";

export const OG_TITLE =
  "Giras de Estudio Todo Incluido | Bariloche y Sur de Chile | Turismo Dabar";

export const OG_DESCRIPTION =
  "Cuatro programas para cursos: Sur de Chile desde $529.990 y Bariloche desde $1.195.990. Seguridad, logística completa y aventura inolvidable.";

export const OG_IMAGE_PATH = "/images/og-image.jpg";

export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export const OG_IMAGE_WIDTH = 1200;

export const OG_IMAGE_HEIGHT = 630;

export const OFFICE_ADDRESS = {
  streetAddress: "Av. Providencia 1234, Oficina 401",
  addressLocality: "Santiago",
  addressRegion: "Región Metropolitana",
  postalCode: "7500000",
  addressCountry: "CL",
} as const;

export const SITE_NAV_LINKS = [
  { name: "Inicio", path: "/" },
  { name: "Giras de Estudio", path: "/planes" },
  { name: "Experiencias", path: "/#experiencias" },
  { name: "Cotizar", path: "/#cotizar" },
] as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CL": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "Turismo Dabar — Rafting y giras de estudio todo incluido en Bariloche y Sur de Chile",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
  other: {
    "og:image": OG_IMAGE_URL,
    "og:image:secure_url": OG_IMAGE_URL,
    "og:image:width": String(OG_IMAGE_WIDTH),
    "og:image:height": String(OG_IMAGE_HEIGHT),
    "og:image:alt":
      "Turismo Dabar — Rafting y giras de estudio todo incluido en Bariloche y Sur de Chile",
    "twitter:image": OG_IMAGE_URL,
    "contact:phone_number": WHATSAPP_NUMBER,
    "contact:email": CONTACT_EMAIL,
    "contact:whatsapp": WHATSAPP_DISPLAY,
    "og:phone_number": WHATSAPP_NUMBER,
    "og:email": CONTACT_EMAIL,
  },
};

function buildProductSchema(product: TravelProduct) {
  const url = `${SITE_URL}/planes/${product.slug}`;

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    description: product.seoDescription,
    image: `${SITE_URL}${product.image}`,
    url,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: "Giras de estudio",
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "CLP",
      price: product.priceCLP,
      availability: "https://schema.org/InStock",
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  };
}

export function getProductPageMetadata(product: TravelProduct): Metadata {
  const title = `${product.shortTitle} — Gira Todo Incluido`;
  const description = `${product.seoDescription} ${product.priceLabel}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/planes/${product.slug}`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/planes/${product.slug}`,
      images: [
        {
          url: product.image,
          alt: product.imageAlt,
        },
      ],
    },
    twitter: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [product.image],
    },
  };
}

export function getOrganizationJsonLd() {
  const productNodes = TRAVEL_PRODUCTS.map(buildProductSchema);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo-turismo-dabar.png`,
        },
        email: CONTACT_EMAIL,
        telephone: WHATSAPP_DISPLAY,
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.facebook,
          SOCIAL_LINKS.tiktok,
        ],
      },
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#localbusiness`,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE_PATH}`,
        description: SEO_DESCRIPTION,
        telephone: WHATSAPP_DISPLAY,
        email: CONTACT_EMAIL,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          ...OFFICE_ADDRESS,
        },
        areaServed: {
          "@type": "Country",
          name: "Chile",
        },
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.facebook,
          SOCIAL_LINKS.tiktok,
        ],
        parentOrganization: {
          "@id": `${SITE_URL}/#organization`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Giras de estudio todo incluido",
          itemListElement: TRAVEL_PRODUCTS.map((product, index) => ({
            "@type": "OfferCatalog",
            position: index + 1,
            name: product.shortTitle,
            itemListElement: {
              "@id": `${SITE_URL}/planes/${product.slug}#product`,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SEO_DESCRIPTION,
        inLanguage: "es-CL",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SEO_DEFAULT_TITLE,
        description: SEO_DESCRIPTION,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#localbusiness`,
        },
        inLanguage: "es-CL",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#planes`,
        name: "Giras de estudio Turismo Dabar",
        itemListElement: TRAVEL_PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.title,
          url: `${SITE_URL}/planes/${product.slug}`,
          item: {
            "@id": `${SITE_URL}/planes/${product.slug}#product`,
          },
        })),
      },
      ...SITE_NAV_LINKS.map((link) => ({
        "@type": "SiteNavigationElement",
        name: link.name,
        url: `${SITE_URL}${link.path === "/" ? "" : link.path}`,
      })),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: SEO_FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      ...productNodes,
    ],
  };
}

export function getProductPageJsonLd(product: TravelProduct) {
  const url = `${SITE_URL}/planes/${product.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: product.title,
        description: product.seoDescription,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        inLanguage: "es-CL",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Giras de Estudio",
            item: `${SITE_URL}/planes`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.shortTitle,
            item: url,
          },
        ],
      },
      buildProductSchema(product),
      {
        "@type": "TouristTrip",
        name: product.title,
        description: product.description,
        touristType: "Estudiantes",
        itinerary: {
          "@type": "ItemList",
          itemListElement: product.destinations.map((destination, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: destination,
          })),
        },
        offers: {
          "@type": "Offer",
          price: product.priceCLP,
          priceCurrency: "CLP",
          url,
        },
      },
    ],
  };
}
