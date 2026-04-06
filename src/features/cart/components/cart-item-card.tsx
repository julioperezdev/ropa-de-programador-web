import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { designs, placements } from "@/data/storefront";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/domain";
import { MockupViewer } from "@/features/configurator/components/mockup-viewer";

type CartItemCardProps = {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItemCard({ item, onIncrease, onDecrease, onRemove }: CartItemCardProps) {
  const design = designs.find((designItem) => designItem.id === item.configuredProduct.designId) ?? designs[0];
  const placement = placements.find((placementItem) => placementItem.code === item.configuredProduct.placement);

  return (
    <div className="rounded-2xl border border-border/70 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <MockupViewer
          colorCode={item.configuredProduct.color}
          design={design}
          placement={item.configuredProduct.placement}
          size="thumb"
        />

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">{design.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{design.description}</p>
            </div>
            <Badge variant="outline">{formatCurrency(item.unitPrice)}</Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Talle {item.configuredProduct.size}</Badge>
            <Badge variant="secondary">Color {item.configuredProduct.color}</Badge>
            <Badge variant="secondary">{placement?.name ?? item.configuredProduct.placement}</Badge>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button onClick={onDecrease} size="sm" type="button" variant="outline">
                -
              </Button>
              <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
              <Button onClick={onIncrease} size="sm" type="button" variant="outline">
                +
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="font-heading text-lg font-semibold">{formatCurrency(item.subtotal)}</p>
              <Button onClick={onRemove} size="icon" type="button" variant="ghost">
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
