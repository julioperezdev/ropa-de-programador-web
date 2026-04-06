import Image from "next/image";
import { CreditCard, ShieldCheck, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Design, ProductColorCode } from "@/types/domain";
import { MockupViewer } from "@/features/configurator/components/mockup-viewer";

type HeroSectionProps = {
  design: Design;
  price: number;
  colorCode: ProductColorCode;
};

const benefits = [
  {
    icon: Truck,
    title: "Envíos a todo el país",
    description: "Despachos simples y seguimiento posterior a la compra.",
  },
  {
    icon: ShieldCheck,
    title: "Estampado durable",
    description: "Base premium y arte pensado para uso diario.",
  },
  {
    icon: CreditCard,
    title: "Compra segura",
    description: "Flujo claro para validar productos y preparar checkout.",
  },
];

export function HeroSection({ design, price, colorCode }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade bg-[size:36px_36px] opacity-30" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="relative z-10 flex flex-col justify-center">
          <Badge variant="accent" className="w-fit">
            6 diseños reales integrados
          </Badge>
          <div className="mt-6 flex items-center gap-3">
            <div className="overflow-hidden rounded-full border border-white/70 bg-white p-1 shadow-soft">
              <Image
                alt="Logo de Ropa de Programador"
                className="h-12 w-12 object-contain"
                height={48}
                src="/brand/logo-ropa-de-programador.png"
                width={48}
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Colección Ropa de Programador
            </p>
          </div>
          <h1 className="mt-6 max-w-3xl font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Vestite como el programador que sos en 3 clicks.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Explorá piezas como Java Mate, C# en obra, Storage, Tribute, Mapa Dev y Subte SQL. Elegí talle,
            color y placement sin salir de la misma landing.
          </p>

          <div className="mt-8 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Desde</p>
              <p className="font-heading text-4xl font-semibold tracking-tight text-foreground">
                {formatCurrency(price)}
              </p>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Base unisex de algodón con impresión aplicada en frente.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href="#configurador">Configurar remera</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#compra">Ver carrito y envío</a>
            </Button>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-soft backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <h2 className="mt-3 text-sm font-semibold text-foreground">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
          <MockupViewer
            design={design}
            colorCode={colorCode}
            placement="front-center"
            size="hero"
            highlightLabel="Vista destacada"
          />
        </div>
      </div>
    </section>
  );
}
