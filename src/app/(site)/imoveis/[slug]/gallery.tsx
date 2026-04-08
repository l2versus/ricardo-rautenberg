"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryProps {
  images: { id: string; url: string; alt: string | null }[];
  title: string;
}

export function PropertyGallery({ images, title }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="aspect-[21/9] bg-card rounded-lg flex items-center justify-center border border-border">
        <p className="text-muted-foreground">{"Sem imagens disponíveis"}</p>
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-lg overflow-hidden">
        {/* Main image */}
        <div
          className="md:col-span-2 md:row-span-2 relative aspect-[4/3] cursor-pointer img-zoom"
          onClick={() => setLightboxIndex(0)}
        >
          <img
            src={images[0].url}
            alt={images[0].alt || title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Secondary images */}
        {images.slice(1, 5).map((img, i) => (
          <div
            key={img.id}
            className="relative aspect-[4/3] cursor-pointer img-zoom hidden md:block"
            onClick={() => setLightboxIndex(i + 1)}
          >
            <img
              src={img.url}
              alt={img.alt || `${title} - Foto ${i + 2}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  +{images.length - 5} fotos
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: show count */}
      {images.length > 1 && (
        <button
          onClick={() => setLightboxIndex(0)}
          className="md:hidden mt-2 text-sm text-gold font-[family-name:var(--font-inter)]"
        >
          Ver todas as {images.length} fotos
        </button>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev - 1 + images.length) % images.length : 0
              )
            }
            className="absolute left-4 text-white/70 hover:text-white z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % images.length : 0
              )
            }
            className="absolute right-4 text-white/70 hover:text-white z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/10] mx-4">
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || `${title} - Foto ${lightboxIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

          <p className="absolute bottom-4 text-white/50 text-sm font-[family-name:var(--font-inter)]">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
