"use client";

import { create } from "zustand";

import { baseProduct, designs, placements, productVariants } from "@/data/storefront";
import { getVariantBySize } from "@/lib/utils";
import type { PlacementCode, ProductColorCode, ProductSize } from "@/types/domain";

type ConfiguratorState = {
  selectedDesignId: string;
  selectedSize: ProductSize;
  selectedColor: ProductColorCode;
  selectedPlacement: PlacementCode;
  selectedQuantity: number;
  setSelectedDesign: (designId: string) => void;
  setSelectedSize: (size: ProductSize) => void;
  setSelectedColor: (color: ProductColorCode) => void;
  setSelectedPlacement: (placement: PlacementCode) => void;
  setSelectedQuantity: (quantity: number) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
};

const initialVariant = getVariantBySize(productVariants, "M");

function getPreferredColor(colors: ProductColorCode[]) {
  return colors.includes("graphite") ? "graphite" : colors[0];
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedDesignId: designs[0]?.id ?? "",
  selectedSize: "M",
  selectedColor: initialVariant ? getPreferredColor(initialVariant.allowedColors) : "graphite",
  selectedPlacement: baseProduct.supportedPlacements[0] ?? placements[0].code,
  selectedQuantity: 1,
  setSelectedDesign: (selectedDesignId) => set({ selectedDesignId }),
  setSelectedSize: (selectedSize) =>
    set((state) => {
      const variant = getVariantBySize(productVariants, selectedSize);
      const fallbackColor = variant ? getPreferredColor(variant.allowedColors) : state.selectedColor;
      const selectedColor = variant?.allowedColors.includes(state.selectedColor)
        ? state.selectedColor
        : fallbackColor;

      return { selectedSize, selectedColor };
    }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setSelectedPlacement: (selectedPlacement) => set({ selectedPlacement }),
  setSelectedQuantity: (selectedQuantity) =>
    set({
      selectedQuantity: Math.max(1, Math.min(selectedQuantity, 10)),
    }),
  incrementQuantity: () =>
    set((state) => ({
      selectedQuantity: Math.min(state.selectedQuantity + 1, 10),
    })),
  decrementQuantity: () =>
    set((state) => ({
      selectedQuantity: Math.max(state.selectedQuantity - 1, 1),
    })),
}));
