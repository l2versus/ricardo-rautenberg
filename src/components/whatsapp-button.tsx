"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "5511999999999";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent("Ol\u00E1 Ricardo, vim pelo site e gostaria de saber mais sobre os im\u00F3veis dispon\u00EDveis.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-5 py-3 rounded-full shadow-2xl shadow-[#25D366]/20 transition-all duration-300 hover:scale-105 group"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline text-sm font-medium font-[family-name:var(--font-inter)]">
        Fale Comigo
      </span>
    </a>
  );
}
