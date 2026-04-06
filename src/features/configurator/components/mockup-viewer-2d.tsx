import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { colorOptions } from "@/data/storefront";
import { cn } from "@/lib/utils";
import type { Design, PlacementCode, ProductColorCode } from "@/types/domain";

type MockupViewer2DProps = {
  design: Design;
  colorCode: ProductColorCode;
  placement: PlacementCode;
  size?: "hero" | "panel" | "thumb";
  highlightLabel?: string;
};

const placementStyles: Record<PlacementCode, string> = {
  "front-center": "left-1/2 top-[45%] w-[36%] -translate-x-1/2 -translate-y-1/2",
  "chest-left": "left-[42%] top-[34%] w-[18%] -translate-x-1/2 -translate-y-1/2",
  "back-center": "left-1/2 top-[44%] w-[32%] -translate-x-1/2 -translate-y-1/2",
};

const frameSizes = {
  hero: "w-full max-w-[420px]",
  panel: "w-full max-w-[470px]",
  thumb: "w-[110px]",
};

export function MockupViewer2D({
  design,
  colorCode,
  placement,
  size = "panel",
  highlightLabel,
}: MockupViewer2DProps) {
  const selectedColor = colorOptions.find((option) => option.code === colorCode) ?? colorOptions[1];

  return (
    <div className={cn("relative", frameSizes[size])}>
      <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-[linear-gradient(180deg,#f8fbff_0%,#ecf3f8_100%)] p-5 shadow-soft">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%)]" />
        <div className="relative mx-auto aspect-[4/5] w-full">
          {highlightLabel ? (
            <Badge className="absolute left-4 top-4 z-20" variant="outline">
              {highlightLabel}
            </Badge>
          ) : null}

          {placement === "back-center" ? (
            <Badge className="absolute right-4 top-4 z-20" variant="secondary">
              Vista espalda
            </Badge>
          ) : null}

          <svg className="h-full w-full drop-shadow-[0_24px_30px_rgba(15,23,42,0.2)]" fill="none" viewBox="0 0 340 410">
            <path
              d="M121.41 36.264c11.888-8.352 28.292-8.352 40.18 0l24.69 17.35 53.72-17.91 40.52 67.16-40.72 26.03-15.12 228.3H97.32l-15.1-228.3L41.5 102.864l40.52-67.16 53.71 17.91 25.68-17.35Z"
              fill={selectedColor.shirtFill}
              stroke={selectedColor.shirtStroke}
              strokeWidth="5"
            />
            <path
              d="M137 48.5c6.24-5.4 15.76-5.4 22 0l20 17.5h-62l20-17.5Z"
              fill={selectedColor.shirtShadow}
              opacity="0.28"
            />
            <path
              d="M88 128.5h163"
              opacity="0.1"
              stroke={selectedColor.shirtShadow}
              strokeWidth="6"
            />
            <path
              d="M127 64h87"
              stroke={selectedColor.shirtShadow}
              strokeLinecap="round"
              strokeWidth="8"
            />
            <ellipse cx="170" cy="366" fill="rgba(15,23,42,0.08)" rx="88" ry="14" />
          </svg>

          <div className={cn("absolute", placementStyles[placement])}>
            <Image
              alt={design.name}
              className="h-auto w-full object-contain"
              height={200}
              src={design.artworkUrl}
              width={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
