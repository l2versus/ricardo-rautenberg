interface PropertyJsonLdProps {
  property: {
    title: string;
    description: string;
    price: number | null;
    priceOnRequest: boolean;
    neighborhood: string;
    city: string;
    state: string;
    area: number | null;
    bedrooms: number | null;
    images: { url: string }[];
    slug: string;
  };
}

export function PropertyJsonLd({ property }: PropertyJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ricardorautenberg.com.br";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${baseUrl}/imoveis/${property.slug}`,
    image: property.images.map((img) =>
      img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`
    ),
    offers: {
      "@type": "Offer",
      ...(property.price && !property.priceOnRequest
        ? { price: property.price, priceCurrency: "BRL" }
        : {}),
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressRegion: property.state,
      addressCountry: "BR",
      neighborhood: property.neighborhood,
    },
    ...(property.area
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: property.area,
            unitCode: "MTK",
          },
        }
      : {}),
    ...(property.bedrooms
      ? { numberOfRooms: property.bedrooms }
      : {}),
  };

  // JSON.stringify produces safe output for script tags - no user HTML is injected
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function AgentJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Ricardo Rautenberg",
    description:
      "Corretor especializado em im\u00F3veis de alto padr\u00E3o em S\u00E3o Paulo. CRECI SP 299919.",
    url: "https://ricardorautenberg.com.br",
    telephone: "+5511939117173",
    address: {
      "@type": "PostalAddress",
      addressLocality: "S\u00E3o Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "City",
      name: "S\u00E3o Paulo",
    },
    sameAs: ["https://instagram.com/ricardo_rautenberg"],
  };

  // JSON.stringify produces safe output for script tags - no user HTML is injected
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
