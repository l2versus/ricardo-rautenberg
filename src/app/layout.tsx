import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ricardo Rautenberg | Im\u00F3veis de Alto Padr\u00E3o em S\u00E3o Paulo",
    template: "%s | Ricardo Rautenberg",
  },
  description:
    "Corretor especializado em im\u00F3veis de alto padr\u00E3o nos melhores bairros de S\u00E3o Paulo. Coberturas, apartamentos e casas de luxo no Itaim Bibi, Jardins, Vila Nova Concei\u00E7\u00E3o e regi\u00E3o. CRECI SP 299919.",
  keywords: [
    "im\u00F3veis de luxo S\u00E3o Paulo",
    "corretor alto padr\u00E3o SP",
    "cobertura Itaim Bibi",
    "apartamento Jardins",
    "im\u00F3vel luxo Vila Nova Concei\u00E7\u00E3o",
    "Ricardo Rautenberg",
    "CRECI 299919",
  ],
  authors: [{ name: "Ricardo Rautenberg" }],
  creator: "Ricardo Rautenberg",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ricardorautenberg.com.br",
    siteName: "Ricardo Rautenberg Im\u00F3veis",
    title: "Ricardo Rautenberg | Im\u00F3veis de Alto Padr\u00E3o em S\u00E3o Paulo",
    description:
      "Corretor especializado em im\u00F3veis de alto padr\u00E3o. Coberturas, apartamentos e casas de luxo nos melhores bairros de SP.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
