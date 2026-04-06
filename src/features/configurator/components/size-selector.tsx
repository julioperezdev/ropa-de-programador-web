import { Button } from "@/components/ui/button";
import { productVariants } from "@/data/storefront";
import { cn } from "@/lib/utils";
import type { ProductSize } from "@/types/domain";

type SizeSelectorProps = {
  selectedSize: ProductSize;
  onSelect: (size: ProductSize) => void;
};

export function SizeSelector({ selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
      {productVariants.map((variant) => (
        <Button
          key={variant.id}
          className={cn("min-w-0 sm:min-w-12", selectedSize === variant.size && "shadow-md")}
          onClick={() => onSelect(variant.size)}
          size="sm"
          type="button"
          variant={selectedSize === variant.size ? "default" : "outline"}
        >
          {variant.size}
        </Button>
      ))}
    </div>
  );
}
