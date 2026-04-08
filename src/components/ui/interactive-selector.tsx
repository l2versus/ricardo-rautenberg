"use client";

import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { Building2, Home, Crown, Landmark, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface SelectorOption {
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
}

interface InteractiveSelectorProps {
  options?: SelectorOption[];
  heading?: string;
  subheading?: string;
}

const DEFAULT_OPTIONS: SelectorOption[] = [
  {
    title: "Apartamentos",
    description: "Alto padrão com vista e lazer completo",
    image: "/images/cap4.jpg",
    icon: <Building2 size={22} className="text-white" />,
  },
  {
    title: "Coberturas",
    description: "Terraço privativo e piscina",
    image: "/images/cap2.jpg",
    icon: <Crown size={22} className="text-white" />,
  },
  {
    title: "Casas",
    description: "Condomínio fechado com segurança",
    image: "/images/cap3.jpg",
    icon: <Home size={22} className="text-white" />,
  },
  {
    title: "Espaços Gourmet",
    description: "Cozinhas planejadas premium",
    image: "/images/cap1.jpg",
    icon: <Landmark size={22} className="text-white" />,
  },
  {
    title: "ABC Paulista",
    description: "Santo André, São Bernardo, São Caetano",
    image: "/images/cap5.jpg",
    icon: <MapPin size={22} className="text-white" />,
  },
];

export default function InteractiveSelector({
  options = DEFAULT_OPTIONS,
  heading = "Imóveis de Alto Padrão",
  subheading = "Explore as melhores opções do ABC Paulista com curadoria exclusiva.",
}: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [options]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < options.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  const goNext = () => {
    if (activeIndex < options.length - 1) setActiveIndex(activeIndex + 1);
  };

  const goPrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-16 sm:py-24 font-body text-white">
      {/* Header */}
      <div className="w-full max-w-2xl px-6 mb-2 text-center">
        <p className="text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3 font-body">
          Categorias
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-3 tracking-tight">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          {subheading}
        </p>
      </div>

      <div className="h-10" />

      {/* ═══ MOBILE: Swipeable Cards ═══ */}
      {isMobile ? (
        <div className="w-full px-4">
          {/* Card */}
          <div
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: activeIndex === index ? 1 : 0,
                  transform: activeIndex === index
                    ? "scale(1)"
                    : index > activeIndex
                      ? "scale(1.05) translateX(20px)"
                      : "scale(1.05) translateX(-20px)",
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gold/20 backdrop-blur-md border border-gold/30">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display">{option.title}</h3>
                      <p className="text-sm text-white/60">{option.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-opacity ${activeIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={goNext}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-opacity ${activeIndex === options.length - 1 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {options.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? "w-8 h-2 bg-gold"
                    : "w-2 h-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 mt-5 overflow-x-auto pb-2 scrollbar-hide">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-body transition-all duration-300 border ${
                  activeIndex === index
                    ? "bg-gold/20 border-gold/40 text-gold"
                    : "bg-white/5 border-white/10 text-white/40"
                }`}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ═══ DESKTOP: Original Accordion ═══ */
        <div className="flex w-full max-w-[900px] h-[350px] sm:h-[400px] mx-auto items-stretch overflow-hidden">
          {options.map((option, index) => {
            const isActive = activeIndex === index;
            const isAnimated = animatedOptions.includes(index);

            return (
              <div
                key={index}
                className="relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: isActive ? "auto 100%" : "auto 120%",
                  backgroundPosition: "center",
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? "translateX(0)" : "translateX(-60px)",
                  minWidth: "48px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: isActive ? "rgba(201, 168, 76, 0.6)" : "rgba(30, 30, 30, 0.8)",
                  boxShadow: isActive
                    ? "0 20px 60px rgba(0,0,0,0.50)"
                    : "0 10px 30px rgba(0,0,0,0.30)",
                  flex: isActive ? "7 1 0%" : "1 1 0%",
                  zIndex: isActive ? 10 : 1,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className="absolute left-0 right-0 pointer-events-none transition-all duration-700"
                  style={{
                    bottom: isActive ? "0" : "-40px",
                    height: "120px",
                    boxShadow: isActive
                      ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                      : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                  }}
                />

                <div className="absolute left-0 right-0 bottom-4 flex items-center px-4 gap-3 z-10 pointer-events-none">
                  <div className="min-w-[40px] max-w-[40px] h-[40px] flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-gold/20 shrink-0">
                    {option.icon}
                  </div>
                  <div className="text-white whitespace-pre">
                    <div
                      className="font-bold text-base font-display transition-all duration-700"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(25px)",
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      className="text-sm text-white/60 transition-all duration-700"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(25px)",
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
