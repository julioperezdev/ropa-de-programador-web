import { placements } from "@/data/storefront";
import { cn } from "@/lib/utils";
import type { PlacementCode } from "@/types/domain";

type PlacementSelectorProps = {
  selectedPlacement: PlacementCode;
  onSelect: (placement: PlacementCode) => void;
};

export function PlacementSelector({ selectedPlacement, onSelect }: PlacementSelectorProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {placements.map((placement) => {
        const isSelected = placement.code === selectedPlacement;

        return (
          <button
            key={placement.code}
            className={cn(
              "rounded-2xl border bg-white p-4 text-left transition-all",
              isSelected ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/30",
            )}
            onClick={() => onSelect(placement.code)}
            type="button"
          >
            <div className="mb-3 flex h-14 items-center justify-center rounded-xl bg-muted">
              <div className="relative h-10 w-8 rounded-b-xl rounded-t-md border border-slate-300 bg-slate-100">
                <span
                  className={cn(
                    "absolute h-2.5 w-2.5 rounded-full bg-primary",
                    placement.code === "front-center" && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                    placement.code === "chest-left" && "left-[35%] top-[38%] -translate-x-1/2 -translate-y-1/2",
                    placement.code === "back-center" && "left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2",
                  )}
                />
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">{placement.name}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{placement.description}</p>
          </button>
        );
      })}
    </div>
  );
}
