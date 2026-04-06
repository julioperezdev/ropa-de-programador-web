import type { Design } from "@/types/domain";

import { DesignCard } from "./design-card";

type DesignGridProps = {
  designs: Design[];
  selectedDesignId: string;
  onSelect: (designId: string) => void;
};

export function DesignGrid({ designs, selectedDesignId, onSelect }: DesignGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {designs.map((design) => (
        <DesignCard
          key={design.id}
          design={design}
          isSelected={design.id === selectedDesignId}
          onSelect={() => onSelect(design.id)}
        />
      ))}
    </div>
  );
}
