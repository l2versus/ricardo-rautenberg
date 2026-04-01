"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      setError("Erro de conex\u00E3o");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl font-bold tracking-[0.15em] text-gold font-[family-name:var(--font-playfair)]">
            RR
          </span>
          <p className="text-sm text-muted-foreground mt-2 font-[family-name:var(--font-inter)]">
            Painel Administrativo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-[family-name:var(--font-inter)]">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ricardorautenberg.com.br"
              required
              className="mt-1 bg-card border-border"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-[family-name:var(--font-inter)]">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              required
              className="mt-1 bg-card border-border"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 font-[family-name:var(--font-inter)]">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-background hover:bg-gold-light"
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
