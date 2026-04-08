"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { Building2, Home, Crown, Landmark, MapPin } from "lucide-react";

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

      {/* Options Container */}
      <div className="flex w-full max-w-[900px] h-[350px] sm:h-[400px] mx-auto items-stretch overflow-hidden px-4 sm:px-0">
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
              {/* Shadow overlay */}
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

              {/* Label */}
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
    </div>
  );
}
