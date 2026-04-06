import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type {
  CartItem,
  ConfiguredProduct,
  Design,
  Placement,
  ProductColorCode,
  ProductVariant,
} from "@/types/domain";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getVariantBySize(variants: ProductVariant[], size: ProductVariant["size"]) {
  return variants.find((variant) => variant.size === size && variant.status === "active");
}

export function isColorAllowed(
  variants: ProductVariant[],
  size: ProductVariant["size"],
  color: ProductColorCode,
) {
  const variant = getVariantBySize(variants, size);
  return Boolean(variant?.allowedColors.includes(color));
}

export function getPlacementMeta(placements: Placement[], code: Placement["code"]) {
  return placements.find((placement) => placement.code === code);
}

export function buildCartItemId(configuredProduct: ConfiguredProduct) {
  return [
    configuredProduct.productId,
    configuredProduct.designId,
    configuredProduct.size,
    configuredProduct.color,
    configuredProduct.placement,
  ].join("__");
}

export function createConfiguredProduct(
  design: Design,
  basePrice: number,
  input: Omit<ConfiguredProduct, "unitPrice" | "previewData">,
): ConfiguredProduct {
  return {
    ...input,
    unitPrice: basePrice,
    previewData: {
      mockupMode: "3d",
      artworkUrl: design.artworkUrl,
      colorCode: input.color,
      placement: input.placement,
    },
  };
}

export function calculateCartItemSubtotal(unitPrice: number, quantity: number) {
  return unitPrice * quantity;
}

export function calculateCartSummary(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    subtotal,
    total: subtotal,
    totalQuantity,
  };
}
