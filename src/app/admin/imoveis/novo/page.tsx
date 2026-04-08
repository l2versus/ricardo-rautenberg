"use client";

import { PropertyForm } from "../form";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export default function NovoImovelPage() {
  return (
    <div>
      <HeroGeometric
        badge="Novo Cadastro"
        title1="Novo"
        title2="Imóvel"
        description="Cadastre um novo imóvel no portfólio. Preencha as informações abaixo."
        showLogo={false}
        compact
        className="!min-h-[35vh]"
      />
      <div className="relative -mt-16 z-10">
        <PropertyForm />
      </div>
    </div>
  );
}
