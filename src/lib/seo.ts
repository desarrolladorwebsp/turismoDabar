import type { Metadata } from "next";
import {
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/lib/contact";

export const SITE_URL = "https://www.turismodabar.cl";

export const SITE_NAME = "Turismo Dabar";

export const SEO_KEYWORDS = [
  "giras de estudio chile",
  "viajes grupales chile",
  "turismo dabar",
  "bariloche todo incluido",
  "giras de estudio bariloche",
  "viajes adulto mayor chile",
  "viajes escolares todo incluido",
] as const;

export const SEO_DEFAULT_TITLE =
  "Turismo Dabar | Giras de Estudio y Viajes Grupales en Chile";

export const SEO_DESCRIPTION =
  "Organizas la gira de estudios de tu curso? En Turismo Dabar diseñamos programas 100 por ciento todo incluido a Bariloche y el Sur de Chile con rafting, pensión completa, buses exclusivos, cobertura médica y soporte 24/7 en ruta.";

export const OG_TITLE =
  "La Gira de Estudios que recordarán para toda la vida | Turismo Dabar";

export const OG_DESCRIPTION =
  "Programas todo incluido a Bariloche y el Sur de Chile. Diversión, seguridad y soporte 24/7 en ruta.";

export const OG_IMAGE_PATH = "/images/og-image.png";

export const OG_IMAGE_WIDTH = 1200;

export const OG_IMAGE_HEIGHT = 630;

export const OFFICE_ADDRESS = {
  streetAddress: "Av. Providencia 1234, Oficina 401",
  addressLocality: "Santiago",
  addressRegion: "Región Metropolitana",
  postalCode: "7500000",
  addressCountry: "CL",
} as const;

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
        url: OG_IMAGE_PATH,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "Turismo Dabar — Giras de estudio todo incluido a Bariloche y el Sur de Chile",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  other: {
    "contact:phone_number": WHATSAPP_NUMBER,
    "contact:email": CONTACT_EMAIL,
    "contact:whatsapp": WHATSAPP_DISPLAY,
    "og:phone_number": WHATSAPP_NUMBER,
    "og:email": CONTACT_EMAIL,
  },
};

export function getOrganizationJsonLd() {
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
    ],
  };
}
