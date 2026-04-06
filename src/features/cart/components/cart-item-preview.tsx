import Image from "next/image";

import { colorOptions } from "@/data/storefront";
import { cn } from "@/lib/utils";
import type { Design, ProductColorCode } from "@/types/domain";

type CartItemPreviewProps = {
  design: Design;
  colorCode: ProductColorCode;
};

export function CartItemPreview({ design, colorCode }: CartItemPreviewProps) {
  const color = colorOptions.find((option) => option.code === colorCode) ?? colorOptions[0];
  const isPortraitArtwork = design.thumbnailLayout === "portrait";

  return (
    <div className="flex h-[112px] w-[112px] shrink-0 items-center justify-center rounded-[26px] border border-border/70 bg-[linear-gradient(180deg,#fbfdff_0%,#edf5fa_100%)] p-3 shadow-soft">
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] border border-black/5"
        style={{ backgroundColor: color.shirtFill }}
      >
        <div
          className={cn(
            "relative",
            isPortraitArtwork ? "h-[82%] w-[62%]" : "h-[62%] w-[62%]",
          )}
        >
          <Image
            alt={design.name}
            className="object-contain object-center"
            fill
            sizes="112px"
            src={design.artworkUrl}
          />
        </div>
      </div>
    </div>
  );
}
