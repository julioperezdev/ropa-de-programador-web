"use client";

import { ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateCartSummary, formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";

import { CartItemCard } from "./cart-item-card";

export function CartSummary() {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const summary = calculateCartSummary(cartItems);

  return (
    <Card className="h-full">
      <CardHeader className="border-b border-border/70 bg-white/70 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Carrito local</p>
            <CardTitle className="mt-2">Resumen visual de compra</CardTitle>
          </div>
          <Badge>{summary.totalQuantity} items</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {cartItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-soft">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">Todavía no agregaste productos</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Elegí un diseño, configurá talle, color y placement, y el carrito se actualizará acá mismo.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>
        )}

        <div className="rounded-3xl bg-slate-950 p-5 text-white">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span>{formatCurrency(summary.subtotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
            <span>Envío</span>
            <span>A confirmar</span>
          </div>
          <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
            <span className="font-heading text-lg font-semibold">Total estimado</span>
            <span className="font-heading text-3xl font-semibold">{formatCurrency(summary.total)}</span>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <Button className="w-full" onClick={clearCart} type="button" variant="outline">
            Vaciar carrito
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
