"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { designs } from "@/data/storefront";
import { useConfiguratorStore } from "@/store/use-configurator-store";

import { DesignGrid } from "./design-grid";
import { ProductPreviewPanel } from "./product-preview-panel";

export function ConfiguratorSection() {
  const selectedDesignId = useConfiguratorStore((state) => state.selectedDesignId);
  const setSelectedDesign = useConfiguratorStore((state) => state.setSelectedDesign);

  const selectedDesign = designs.find((design) => design.id === selectedDesignId) ?? designs[0];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" id="configurador">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Configurador</p>
        <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground">
          Elegí uno de los seis diseños reales y construí una configuración lista para comprar.
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          La composición mantiene la estructura validada del baseline: grid de diseños a la izquierda y mockup
          con controles a la derecha.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.92fr]" id="coleccion">
        <Card>
          <CardHeader className="border-b border-border/70 bg-white/70 pb-5">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Paso 01</p>
            <CardTitle className="mt-2">Diseños disponibles</CardTitle>
          </CardHeader>
          <CardContent className="p-5 lg:p-6">
            <DesignGrid designs={designs} onSelect={setSelectedDesign} selectedDesignId={selectedDesign.id} />
          </CardContent>
        </Card>

        <ProductPreviewPanel selectedDesign={selectedDesign} />
      </div>
    </section>
  );
}
