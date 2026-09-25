export function JsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://belgian-malinoi.vercel.app";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Belgian Malinois Special Breed",
    description:
      "Belgian Malinois puppies from working lines in the United States, with documented information about breeding standards, screening, and placement.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    areaServed: ["US", "United States"],
    priceRange: "$$",
    currenciesAccepted: "USD",
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Belgian Malinois Special Breed",
    description:
      "Belgian Malinois puppies from working lines in the United States, with documented information about health, screening, temperament, and placement.",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
