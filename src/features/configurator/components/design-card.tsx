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
  return (
    <button className="text-left" onClick={onSelect} type="button">
      <Card
        className={cn(
          "h-full overflow-hidden rounded-[26px] border transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40",
          isSelected && "border-primary bg-primary/5 ring-2 ring-primary/20",
        )}
      >
        <div className="relative flex aspect-[0.95] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_52%),linear-gradient(180deg,#ffffff_0%,#f4f7fb_100%)] p-5 lg:p-6">
          <Image
            alt={design.name}
            className="h-full w-full object-contain"
            height={260}
            src={design.thumbnailUrl}
            width={260}
          />
        </div>
        <div className="space-y-3 p-4 lg:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground lg:text-lg">{design.name}</h3>
              <p className="mt-1 line-clamp-3 text-sm leading-6 text-muted-foreground">{design.description}</p>
            </div>
            {isSelected ? <Badge>Seleccionado</Badge> : <Badge variant="outline">{design.category}</Badge>}
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
