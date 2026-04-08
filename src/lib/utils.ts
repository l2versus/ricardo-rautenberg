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
  return `${area.toLocaleString("pt-BR")} m²`;
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${cleaned}${encoded ? `?text=${encoded}` : ""}`;
}

export const NEIGHBORHOODS = [
  "Jardim",
  "Bairro Jardim",
  "Centro",
  "Vila Bastos",
  "Campestre",
  "Bairro Santa Paula",
  "Vila Assunção",
  "Barceloneta",
  "Vila Gilda",
  "Rudge Ramos",
  "Nova Petrópolis",
  "Olímpico",
  "Santo André",
  "São Bernardo do Campo",
  "São Caetano do Sul",
  "Diadema",
] as const;

export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartamento" },
  { value: "penthouse", label: "Cobertura" },
  { value: "house", label: "Casa" },
  { value: "commercial", label: "Comercial" },
  { value: "land", label: "Terreno" },
] as const;

export const PROPERTY_STATUS = [
  { value: "available", label: "Disponível" },
  { value: "sold", label: "Vendido" },
  { value: "rented", label: "Alugado" },
  { value: "negotiating", label: "Em Negociação" },
] as const;

export const AMENITIES = [
  "Piscina",
  "Academia",
  "Spa",
  "Sauna",
  "Churrasqueira Gourmet",
  "Rooftop",
  "Car Gallery",
  "Automação Residencial",
  "Home Cinema",
  "Adega Climatizada",
  "Quadra de Tênis",
  "Playground",
  "Salão de Festas",
  "Coworking",
  "Pet Place",
  "Bicicletário",
  "Heliponto",
  "Vista Panorâmica",
  "Varanda Gourmet",
  "Lavabo",
] as const;
