"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { baseProduct, placements, productVariants } from "@/data/storefront";
import { createConfiguredProduct, formatCurrency, getVariantBySize, isColorAllowed } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";
import { useConfiguratorStore } from "@/store/use-configurator-store";
import type { Design } from "@/types/domain";

import { AddToCartButton } from "./add-to-cart-button";
import { ColorSelector } from "./color-selector";
import { MockupViewer } from "./mockup-viewer";
import { PlacementSelector } from "./placement-selector";
import { QuantityStepper } from "./quantity-stepper";
import { SizeSelector } from "./size-selector";

type ProductPreviewPanelProps = {
  selectedDesign: Design;
};

export function ProductPreviewPanel({ selectedDesign }: ProductPreviewPanelProps) {
  const selectedSize = useConfiguratorStore((state) => state.selectedSize);
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const selectedPlacement = useConfiguratorStore((state) => state.selectedPlacement);
  const selectedQuantity = useConfiguratorStore((state) => state.selectedQuantity);
  const setSelectedSize = useConfiguratorStore((state) => state.setSelectedSize);
  const setSelectedColor = useConfiguratorStore((state) => state.setSelectedColor);
  const setSelectedPlacement = useConfiguratorStore((state) => state.setSelectedPlacement);
  const incrementQuantity = useConfiguratorStore((state) => state.incrementQuantity);
  const decrementQuantity = useConfiguratorStore((state) => state.decrementQuantity);
  const addItem = useCartStore((state) => state.addItem);

  const [added, setAdded] = useState(false);

  const selectedVariant = getVariantBySize(productVariants, selectedSize);
  const allowedColors = selectedVariant?.allowedColors ?? [];
  const isValidConfiguration =
    Boolean(selectedDesign) &&
    Boolean(selectedVariant) &&
    isColorAllowed(productVariants, selectedSize, selectedColor) &&
    baseProduct.supportedPlacements.includes(selectedPlacement) &&
    selectedQuantity > 0;

  useEffect(() => {
    if (!added) {
      return;
    }

    const timer = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(timer);
  }, [added]);

  const handleAddToCart = () => {
    if (!isValidConfiguration) {
      return;
    }

    const configuredProduct = createConfiguredProduct(selectedDesign, baseProduct.basePrice, {
      productId: baseProduct.id,
      designId: selectedDesign.id,
      size: selectedSize,
      color: selectedColor,
      placement: selectedPlacement,
      quantity: selectedQuantity,
    });

    addItem(configuredProduct);
    setAdded(true);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4 border-b border-border/70 bg-white/70 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Paso 02</p>
            <CardTitle className="mt-2">Preview y configuración</CardTitle>
          </div>
          <Badge>{formatCurrency(baseProduct.basePrice)}</Badge>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Seleccioná talle, color y placement para preparar una configuración consistente del producto antes de
          enviarla al carrito.
        </p>
      </CardHeader>

      <CardContent className="grid gap-8 p-6 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-4">
          <MockupViewer
            colorCode={selectedColor}
            design={selectedDesign}
            placement={selectedPlacement}
            size="panel"
          />

          <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-lg font-semibold text-foreground">{selectedDesign.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{selectedDesign.description}</p>
              </div>
              <Badge variant="outline">{placements.find((item) => item.code === selectedPlacement)?.name}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <section className="space-y-3">
            <Label>Talle</Label>
            <SizeSelector selectedSize={selectedSize} onSelect={setSelectedSize} />
          </section>

          <section className="space-y-3">
            <Label>Color</Label>
            <ColorSelector
              allowedColors={allowedColors}
              onSelect={setSelectedColor}
              selectedColor={selectedColor}
            />
          </section>

          <section className="space-y-3">
            <Label>Placement</Label>
            <PlacementSelector onSelect={setSelectedPlacement} selectedPlacement={selectedPlacement} />
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Label className="mb-2 block">Cantidad</Label>
              <QuantityStepper
                onDecrement={decrementQuantity}
                onIncrement={incrementQuantity}
                quantity={selectedQuantity}
              />
            </div>

            <div className="w-full max-w-sm">
              <AddToCartButton added={added} disabled={!isValidConfiguration} onClick={handleAddToCart} />
              <p className="mt-3 text-xs text-muted-foreground">
                {added ? (
                  <span className="inline-flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    Configuración agregada correctamente.
                  </span>
                ) : (
                  "El item se fusiona en el carrito si coincide diseño, talle, color y placement."
                )}
              </p>
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
