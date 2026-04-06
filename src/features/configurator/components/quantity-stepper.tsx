import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type QuantityStepperProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export function QuantityStepper({ quantity, onIncrement, onDecrement }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-white p-1.5">
      <Button onClick={onDecrement} size="icon" type="button" variant="ghost">
        <Minus className="h-4 w-4" />
      </Button>
      <span className="min-w-10 text-center text-sm font-semibold text-foreground">{quantity}</span>
      <Button onClick={onIncrement} size="icon" type="button" variant="ghost">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
