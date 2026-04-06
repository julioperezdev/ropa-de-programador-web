import { colorOptions } from "@/data/storefront";
import { cn } from "@/lib/utils";
import type { ProductColorCode } from "@/types/domain";

type ColorSelectorProps = {
  selectedColor: ProductColorCode;
  allowedColors: ProductColorCode[];
  onSelect: (color: ProductColorCode) => void;
};

export function ColorSelector({ selectedColor, allowedColors, onSelect }: ColorSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {colorOptions.map((color) => {
        const isAvailable = allowedColors.includes(color.code);
        const isSelected = selectedColor === color.code;

        return (
          <button
            key={color.code}
            className={cn(
              "flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-all",
              isSelected && "border-primary ring-2 ring-primary/20",
              !isSelected && "border-border hover:border-primary/30",
              !isAvailable && "cursor-not-allowed opacity-45",
            )}
            disabled={!isAvailable}
            onClick={() => onSelect(color.code)}
            type="button"
          >
            <span
              className="h-9 w-9 rounded-full border border-black/5"
              style={{ backgroundColor: color.hex }}
            />
            <span>
              <span className="block text-sm font-semibold text-foreground">{color.name}</span>
              <span className="block text-xs text-muted-foreground">
                {isAvailable ? "Disponible" : "No disponible en este talle"}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
