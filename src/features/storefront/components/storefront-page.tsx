"use client";

import { baseProduct, designs } from "@/data/storefront";
import { calculateCartSummary } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";
import { useConfiguratorStore } from "@/store/use-configurator-store";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { ShippingForm } from "@/features/checkout/components/shipping-form";
import { ConfiguratorSection } from "@/features/configurator/components/configurator-section";

import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";

export function StorefrontPage() {
  const selectedDesignId = useConfiguratorStore((state) => state.selectedDesignId);
  const selectedColor = useConfiguratorStore((state) => state.selectedColor);
  const cartItems = useCartStore((state) => state.cartItems);

  const selectedDesign = designs.find((design) => design.id === selectedDesignId) ?? designs[0];
  const cartSummary = calculateCartSummary(cartItems);

  return (
    <main className="min-h-screen pb-12">
      <Navbar cartCount={cartSummary.totalQuantity} />
      <HeroSection colorCode={selectedColor} design={selectedDesign} price={baseProduct.basePrice} />
      <ConfiguratorSection />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" id="compra">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Compra</p>
          <h2 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground">
            Carrito local y formulario preparados para integrar checkout más adelante.
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            El carrito conserva la configuración elegida y el formulario valida datos sin tocar backend ni pasarela
            de pago real.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
          <CartSummary />
          <ShippingForm />
        </div>
      </section>
    </main>
  );
}
