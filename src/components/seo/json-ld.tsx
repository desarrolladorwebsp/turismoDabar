import { getOrganizationJsonLd } from "@/lib/seo";

interface JsonLdProps {
  data?: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  const schema = data ?? getOrganizationJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
