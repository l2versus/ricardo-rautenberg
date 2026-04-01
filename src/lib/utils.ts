import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null, onRequest: boolean = false): string {
  if (onRequest || !price) return "Sob Consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function formatArea(area: number | null): string {
  if (!area) return "-";
  return `${area.toLocaleString("pt-BR")} m\u00B2`;
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleaned}${encoded ? `?text=${encoded}` : ""}`;
}

export const NEIGHBORHOODS = [
  "Itaim Bibi",
  "Jardim Paulista",
  "Jardim Am\u00E9rica",
  "Jardim Europa",
  "Vila Nova Concei\u00E7\u00E3o",
  "Moema",
  "Vila Ol\u00EDmpia",
  "Pinheiros",
  "Higien\u00F3polis",
  "Brooklin",
  "Campo Belo",
  "Morumbi",
  "Alto de Pinheiros",
  "Vila Madalena",
  "Perdizes",
  "Consola\u00E7\u00E3o",
  "Para\u00EDso",
  "Aclima\u00E7\u00E3o",
] as const;

export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartamento" },
  { value: "penthouse", label: "Cobertura" },
  { value: "house", label: "Casa" },
  { value: "commercial", label: "Comercial" },
  { value: "land", label: "Terreno" },
] as const;

export const PROPERTY_STATUS = [
  { value: "available", label: "Dispon\u00EDvel" },
  { value: "sold", label: "Vendido" },
  { value: "rented", label: "Alugado" },
  { value: "negotiating", label: "Em Negocia\u00E7\u00E3o" },
] as const;

export const AMENITIES = [
  "Piscina",
  "Academia",
  "Spa",
  "Sauna",
  "Churrasqueira Gourmet",
  "Rooftop",
  "Car Gallery",
  "Automa\u00E7\u00E3o Residencial",
  "Home Cinema",
  "Adega Climatizada",
  "Quadra de T\u00EAnis",
  "Playground",
  "Sal\u00E3o de Festas",
  "Coworking",
  "Pet Place",
  "Biciclet\u00E1rio",
  "Heliponto",
  "Vista Panor\u00E2mica",
  "Varanda Gourmet",
  "Lavabo",
] as const;
