"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { buildCartItemId, calculateCartItemSubtotal } from "@/lib/utils";
import type { CartItem, ConfiguredProduct } from "@/types/domain";

type CartState = {
  cartItems: CartItem[];
  hasHydrated: boolean;
  addItem: (configuredProduct: ConfiguredProduct) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      hasHydrated: false,
      addItem: (configuredProduct) =>
        set((state) => {
          const itemId = buildCartItemId(configuredProduct);
          const existingItem = state.cartItems.find((item) => item.id === itemId);

          if (existingItem) {
            const nextQuantity = existingItem.quantity + configuredProduct.quantity;

            return {
              cartItems: state.cartItems.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      quantity: nextQuantity,
                      subtotal: calculateCartItemSubtotal(item.unitPrice, nextQuantity),
                      configuredProduct: {
                        ...item.configuredProduct,
                        quantity: nextQuantity,
                      },
                    }
                  : item,
              ),
            };
          }

          const newItem: CartItem = {
            id: itemId,
            configuredProduct,
            quantity: configuredProduct.quantity,
            unitPrice: configuredProduct.unitPrice,
            subtotal: calculateCartItemSubtotal(
              configuredProduct.unitPrice,
              configuredProduct.quantity,
            ),
          };

          return {
            cartItems: [...state.cartItems, newItem],
          };
        }),
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity: Math.max(1, quantity),
                  subtotal: calculateCartItemSubtotal(item.unitPrice, Math.max(1, quantity)),
                  configuredProduct: {
                    ...item.configuredProduct,
                    quantity: Math.max(1, quantity),
                  },
                }
              : item,
          ),
        })),
      removeItem: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "rdp-storefront-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);
