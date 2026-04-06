"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";

type NavbarProps = {
  cartCount: number;
};

export function Navbar({ cartCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="overflow-hidden rounded-full border border-border bg-white p-1 shadow-sm">
            <Image
              alt="Logo Ropa de Programador"
              className="h-10 w-10 object-contain"
              height={40}
              src="/brand/logo-ropa-de-programador.png"
              width={40}
            />
          </div>
          <div>
            <p className="font-heading text-lg font-semibold tracking-tight text-foreground">
              Ropa de Programador
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">por Julioperez.dev</p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#coleccion" className="transition-colors hover:text-foreground">
            Diseños
          </a>
          <a href="#configurador" className="transition-colors hover:text-foreground">
            Configurador
          </a>
          <a href="#compra" className="transition-colors hover:text-foreground">
            Compra
          </a>
        </nav>

        <Button asChild variant="outline" size="sm">
          <a href="#compra" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Carrito
            <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] text-primary-foreground">
              {cartCount}
            </span>
          </a>
        </Button>
      </div>
    </header>
  );
}
