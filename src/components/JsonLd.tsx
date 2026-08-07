export function JsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://belgianmalinoisspecialbreed.be";

  const organization = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "Belgian Malinois Special Breed",
    description:
      "Premium kennel specializing in health-tested working-line Belgian Malinois puppies in the United States.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BE",
      addressLocality: "United States",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "BE",
    },
    areaServed: ["BE", "EU", "Europe"],
    priceRange: "€€€",
    currenciesAccepted: "USD",
    paymentAccepted: "Bank Transfer, Cash",
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Belgian Malinois Special Breed",
    description:
      "Premium health-tested Belgian Malinois puppies from working lines in the United States.",
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
