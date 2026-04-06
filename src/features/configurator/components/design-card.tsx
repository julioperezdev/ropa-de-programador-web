import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Design } from "@/types/domain";

type DesignCardProps = {
  design: Design;
  isSelected: boolean;
  onSelect: () => void;
};

export function DesignCard({ design, isSelected, onSelect }: DesignCardProps) {
  const isPortraitThumbnail = design.thumbnailLayout === "portrait";

  return (
    <button className="h-full text-left" onClick={onSelect} type="button">
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-[26px] border transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40",
          isSelected && "border-primary bg-primary/5 ring-2 ring-primary/20",
        )}
      >
        <div className="relative flex aspect-[1.02] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_52%),linear-gradient(180deg,#ffffff_0%,#f4f7fb_100%)] p-5 lg:p-6">
          <div
            className={cn(
              "relative mx-auto my-auto",
              isPortraitThumbnail ? "h-[92%] w-[68%]" : "h-[78%] w-[78%]",
            )}
          >
            <Image
              alt={design.name}
              className="object-contain object-center"
              fill
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 38vw, 80vw"
              src={design.thumbnailUrl}
              style={{ objectPosition: design.thumbnailObjectPosition ?? "center" }}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-4 p-4 lg:p-5">
          <div className="space-y-3">
            <div className="space-y-2">
              <h3 className="line-clamp-2 font-heading text-base font-semibold leading-8 text-foreground lg:text-lg">
                {design.name}
              </h3>
              <div>
                {isSelected ? (
                  <Badge className="inline-flex">Seleccionado</Badge>
                ) : (
                  <Badge className="inline-flex" variant="outline">
                    {design.category}
                  </Badge>
                )}
              </div>
            </div>

            <div className="min-h-[4.5rem]">
              <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{design.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {design.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </button>
  );
}
