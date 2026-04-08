"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

function FloatingLogo({
  className,
  delay = 0,
  size = 120,
  rotate = 0,
  opacity = 0.06,
}: {
  className?: string;
  delay?: number;
  size?: number;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, rotate: rotate - 10 }}
      animate={{ opacity, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.5 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <Image
          src="/images/logo-full.png"
          alt=""
          width={size}
          height={size}
          className="select-none"
          style={{ filter: "brightness(5)", height: "auto", width: size }}
          aria-hidden
        />
      </motion.div>
    </motion.div>
  );
}

interface HeroGeometricProps {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  showLogo?: boolean;
  className?: string;
  compact?: boolean;
}

function HeroGeometric({
  badge = "Ricardo Rautenberg",
  title1 = "Imóveis de",
  title2 = "Alto Padrão",
  description = "ABC Paulista — Atendimento exclusivo e personalizado para quem busca excelência.",
  showLogo = true,
  className,
  compact = false,
}: HeroGeometricProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className={cn(
      "relative w-full flex items-center justify-center overflow-hidden bg-[#030303]",
      compact ? "min-h-[50vh]" : "min-h-screen",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] via-transparent to-gold/[0.02] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        {/* Large logos */}
        <FloatingLogo
          delay={0.3}
          size={280}
          rotate={8}
          opacity={0.18}
          className="left-[-5%] md:left-[1%] top-[5%] md:top-[10%]"
        />
        <FloatingLogo
          delay={0.5}
          size={240}
          rotate={-12}
          opacity={0.15}
          className="right-[-5%] md:right-[2%] top-[55%] md:top-[60%]"
        />
        <FloatingLogo
          delay={0.8}
          size={200}
          rotate={-18}
          opacity={0.14}
          className="left-[40%] md:left-[45%] top-[70%] md:top-[75%]"
        />
        {/* Medium logos */}
        <FloatingLogo
          delay={0.4}
          size={140}
          rotate={-5}
          opacity={0.12}
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <FloatingLogo
          delay={0.6}
          size={120}
          rotate={15}
          opacity={0.13}
          className="right-[10%] md:right-[15%] top-[2%] md:top-[5%]"
        />
        <FloatingLogo
          delay={0.7}
          size={130}
          rotate={-22}
          opacity={0.11}
          className="left-[55%] md:left-[60%] top-[25%] md:top-[30%]"
        />
        <FloatingLogo
          delay={0.9}
          size={110}
          rotate={10}
          opacity={0.12}
          className="right-[30%] md:right-[35%] bottom-[0%] md:bottom-[5%]"
        />
        {/* Small logos */}
        <FloatingLogo
          delay={0.5}
          size={70}
          rotate={-20}
          opacity={0.10}
          className="left-[22%] md:left-[28%] top-[0%] md:top-[5%]"
        />
        <FloatingLogo
          delay={0.8}
          size={60}
          rotate={25}
          opacity={0.09}
          className="right-[5%] md:right-[8%] top-[35%] md:top-[40%]"
        />
        <FloatingLogo
          delay={1.0}
          size={55}
          rotate={-8}
          opacity={0.10}
          className="left-[70%] md:left-[75%] bottom-[15%] md:bottom-[20%]"
        />
        <FloatingLogo
          delay={0.6}
          size={50}
          rotate={18}
          opacity={0.08}
          className="left-[35%] md:left-[40%] top-[8%] md:top-[12%]"
        />
        <FloatingLogo
          delay={0.9}
          size={45}
          rotate={-30}
          opacity={0.09}
          className="right-[45%] md:right-[50%] top-[50%] md:top-[55%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo */}
          {showLogo && (
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <Image
                src="/images/logo-full.png"
                alt="Ricardo Rautenberg"
                width={300}
                height={100}
                className="mx-auto opacity-80"
                style={{ height: "auto", maxHeight: "100px", width: "auto", filter: "brightness(5)" }}
              />
            </motion.div>
          )}

          {/* Badge */}
          <motion.div
            custom={0.5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/[0.06] border border-gold/[0.15] mb-8 md:mb-12"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-gold/80" />
            <span className="text-[11px] text-white/50 tracking-[0.2em] uppercase font-body">
              {badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={cn(
              "font-bold mb-6 md:mb-8 tracking-tight font-display",
              compact ? "text-3xl sm:text-5xl md:text-6xl" : "text-4xl sm:text-6xl md:text-8xl"
            )}>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold/90 via-white/80 to-gold/70">
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/30 mb-8 leading-relaxed font-body tracking-wide max-w-xl mx-auto px-4">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
