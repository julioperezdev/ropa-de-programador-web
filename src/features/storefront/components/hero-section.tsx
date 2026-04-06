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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-5 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8 lg:py-20">
        <div className="relative z-10 flex flex-col justify-center">
          <Badge variant="accent" className="w-fit">
            6 diseños reales integrados
          </Badge>
          <div className="mt-5 flex items-center gap-3 sm:mt-6">
            <div className="overflow-hidden rounded-full border border-white/70 bg-white p-1 shadow-soft">
              <Image
                alt="Logo de Ropa de Programador"
                className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                height={48}
                src="/brand/logo-ropa-de-programador.png"
                width={48}
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm sm:tracking-[0.24em]">
              Colección Ropa de Programador
            </p>
          </div>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-bold tracking-tight text-foreground sm:mt-6 sm:text-5xl lg:text-7xl">
            Vestite como el programador que sos
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
            Explorá diseños como Java Mate, C# en obra, Storage, Tribute, Mapa Dev y Subte SQL. Elegí talle, color y ubicación del estampado en el momento
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">Desde</p>
              <p className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {formatCurrency(price)}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Base unisex de algodón con impresión aplicada en frente.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button asChild size="lg">
              <a href="#configurador">Empezá a elegir</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#compra">Ver carrito y envío</a>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3">
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

        <div className="relative z-10 flex items-center justify-center lg:justify-end">
          <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[20rem] sm:w-[20rem] lg:h-[22rem] lg:w-[22rem]" />
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
