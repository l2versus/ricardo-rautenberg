import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { PreventZoom } from "@/components/prevent-zoom";
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
    default: "Ricardo Rautenberg | Imóveis de Alto Padrão no ABC Paulista",
    template: "%s | Ricardo Rautenberg",
  },
  description:
    "Corretor especializado em imóveis de alto padrão no ABC Paulista. Coberturas, apartamentos e casas de luxo em Santo André, São Bernardo, São Caetano e região. CRECI SP 299919.",
  keywords: [
    "imóveis de luxo ABC Paulista",
    "corretor alto padrão ABC",
    "apartamento Santo André",
    "cobertura São Bernardo",
    "imóvel luxo São Caetano",
    "Ricardo Rautenberg",
    "CRECI 299919",
  ],
  authors: [{ name: "Ricardo Rautenberg" }],
  creator: "Ricardo Rautenberg",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ricardorautenberg.com.br",
    siteName: "Ricardo Rautenberg Imóveis",
    title: "Ricardo Rautenberg | Imóveis de Alto Padrão no ABC Paulista",
    description:
      "Broker. Transformando sonhos em realidade. Corretor especializado em imóveis de alto padrão no ABC Paulista.",
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
  maximumScale: 1,
  userScalable: false,
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
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <PreventZoom />
        {children}
      </body>
    </html>
  );
}
