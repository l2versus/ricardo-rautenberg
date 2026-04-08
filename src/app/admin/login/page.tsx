"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao fazer login");
        return;
      }

      router.push("/admin/imoveis");
      router.refresh();
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ═══ Left — Video + FlickeringGrid Logo ═══ */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/images/admin-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-[#070707]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

        {/* FlickeringGrid overlay - subtle gold particles */}
        <div className="absolute inset-0 z-10 opacity-40">
          <FlickeringGrid
            color="rgb(201, 168, 76)"
            maxOpacity={0.15}
            flickerChance={0.08}
            squareSize={3}
            gridGap={8}
          />
        </div>

        {/* Content over video */}
        <div className="relative z-20 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Top — Logo grande */}
          <div>
            <Image
              src="/images/logo-full.png"
              alt="Ricardo Rautenberg"
              width={500}
              height={160}
              className="opacity-90"
              style={{ height: "auto", maxHeight: "140px", width: "auto", filter: "brightness(5)" }}
            />
          </div>

          {/* Bottom — Slogan */}
          <div className="max-w-md">
            <div className="w-10 h-[1px] bg-gradient-to-r from-gold to-transparent mb-6" />
            <blockquote className="text-2xl xl:text-3xl font-display font-bold text-white/90 leading-snug mb-4">
              Transformando
              <br />
              <span className="text-gradient-gold">sonhos em realidade</span>
            </blockquote>
            <p className="text-sm text-white/40 font-body leading-relaxed">
              Imóveis de alto padrão no ABC Paulista.
              Atendimento exclusivo e personalizado.
            </p>
            <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-body mt-6">
              CRECI SP — 299919
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Right — Login form ═══ */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 sm:px-12 relative">
        {/* Subtle FlickeringGrid background on form side */}
        <div className="absolute inset-0 z-0">
          <FlickeringGrid
            color="rgb(201, 168, 76)"
            maxOpacity={0.04}
            flickerChance={0.05}
            squareSize={2}
            gridGap={12}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.03)_0%,transparent_60%)]" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent hidden lg:block" />

        <div className="w-full max-w-sm relative z-10">
          {/* Mobile: video + logo */}
          <div className="mb-12 lg:hidden">
            <Image
              src="/images/logo-full.png"
              alt="Ricardo Rautenberg"
              width={360}
              height={120}
              className="opacity-85"
              style={{ height: "auto", maxHeight: "100px", width: "auto", filter: "brightness(5)" }}
            />
          </div>

          {/* Header */}
          <div className="mb-10">
            <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-3 font-body">
              Acesso restrito
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight mb-2">
              Painel Admin
            </h1>
            <p className="text-sm text-muted-foreground/50 font-body">
              Gerencie seus imóveis e conteúdo do site.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground/60 mb-2 block">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ricardorautenberg.com.br"
                required
                className="bg-card/50 border-border/50 h-12 font-body text-sm placeholder:text-muted-foreground/30 focus:border-gold/40 focus:ring-gold/20 transition-colors rounded-none"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground/60 mb-2 block">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-card/50 border-border/50 h-12 font-body text-sm placeholder:text-muted-foreground/30 focus:border-gold/40 focus:ring-gold/20 transition-colors pr-11 rounded-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-gold/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-500/5 border border-red-500/20 text-sm text-red-400 font-body">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-luxury bg-gold text-background hover:bg-gold-light h-12 text-[11px] tracking-[0.2em] uppercase font-body font-medium rounded-none"
            >
              <Lock className="w-3.5 h-3.5 mr-2" />
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-muted-foreground/25 font-body tracking-wider">
                CRECI SP — 299919
              </p>
              <div className="w-6 h-[1px] bg-gold/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
