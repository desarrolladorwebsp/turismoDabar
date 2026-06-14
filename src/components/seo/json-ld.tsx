import { getOrganizationJsonLd } from "@/lib/seo";

export function JsonLd() {
  const schema = getOrganizationJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
