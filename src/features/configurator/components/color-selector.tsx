import { useMemo, useState } from "react";

import { colorOptions } from "@/data/storefront";
import { cn } from "@/lib/utils";
import type { ProductColorCode } from "@/types/domain";

type ColorSelectorProps = {
  selectedColor: ProductColorCode;
  allowedColors: ProductColorCode[];
  onSelect: (color: ProductColorCode) => void;
};

const featuredColorCodes: ProductColorCode[] = ["white", "black", "gray-melange", "burgundy"];

export function ColorSelector({ selectedColor, allowedColors, onSelect }: ColorSelectorProps) {
  const [showAllColors, setShowAllColors] = useState(false);

  const featuredColors = useMemo(
    () => colorOptions.filter((color) => featuredColorCodes.includes(color.code)),
    [],
  );

  const extraColors = useMemo(
    () => colorOptions.filter((color) => !featuredColorCodes.includes(color.code)),
    [],
  );

  const renderColorButton = (color: (typeof colorOptions)[number]) => {
    const isAvailable = allowedColors.includes(color.code);
    const isSelected = selectedColor === color.code;

    return (
      <button
        key={color.code}
        className={cn(
          "flex flex-col items-center gap-2 rounded-2xl border bg-white px-3 py-3 text-center transition-all",
          isSelected && "border-primary ring-2 ring-primary/20",
          !isSelected && "border-border hover:border-primary/30",
          !isAvailable && "cursor-not-allowed opacity-45",
        )}
        disabled={!isAvailable}
        onClick={() => onSelect(color.code)}
        type="button"
      >
        <span
          className="h-12 w-12 rounded-full border border-black/10 shadow-sm"
          style={{ backgroundColor: color.hex }}
        />
        <span className="min-h-[2.5rem] text-xs font-semibold leading-5 text-foreground">
          {color.name}
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {featuredColors.map(renderColorButton)}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Se muestran primero los colores más usados.
        </p>
        <button
          className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          onClick={() => setShowAllColors((current) => !current)}
          type="button"
        >
          {showAllColors ? "Ver menos colores" : "Ver más colores"}
        </button>
      </div>

      {showAllColors ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {extraColors.map(renderColorButton)}
        </div>
      ) : null}
    </div>
  );
}
