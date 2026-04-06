import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
  disabled: boolean;
  added: boolean;
  onClick: () => void;
};

export function AddToCartButton({ disabled, added, onClick }: AddToCartButtonProps) {
  return (
    <Button className="w-full gap-2" disabled={disabled} onClick={onClick} size="lg" type="button">
      <ShoppingCart className="h-4 w-4" />
      {added ? "Agregado al carrito" : "Agregar al carrito"}
    </Button>
  );
}
