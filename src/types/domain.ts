export type ProductStatus = "active" | "inactive" | "archived";
export type DesignStatus = "active" | "inactive" | "archived";
export type PlacementCode = "front-center" | "chest-left" | "back-center";
export type ProductSize = "S" | "M" | "L" | "XL" | "XXL";
export type ProductColorCode = "white" | "graphite" | "navy" | "ash";

export type PreviewData = {
  mockupMode: "2d";
  artworkUrl: string;
  colorCode: ProductColorCode;
  placement: PlacementCode;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  basePrice: number;
  supportedPlacements: PlacementCode[];
  status: ProductStatus;
  thumbnailUrl: string;
};

export type Design = {
  id: string;
  slug: string;
  name: string;
  description: string;
  artworkUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  status: DesignStatus;
};

export type Placement = {
  code: PlacementCode;
  name: string;
  description: string;
  active: boolean;
};

export type ProductVariant = {
  id: string;
  productId: string;
  size: ProductSize;
  allowedColors: ProductColorCode[];
  stock: number;
  status: ProductStatus;
};

export type ConfiguredProduct = {
  productId: string;
  designId: string;
  size: ProductSize;
  color: ProductColorCode;
  placement: PlacementCode;
  quantity: number;
  unitPrice: number;
  previewData: PreviewData;
};

export type CartItem = {
  id: string;
  configuredProduct: ConfiguredProduct;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type ShippingFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  streetNumber: string;
  floorApartment?: string;
  reference?: string;
  postalCode: string;
  city: string;
};

export type ColorOption = {
  code: ProductColorCode;
  name: string;
  hex: string;
  shirtFill: string;
  shirtShadow: string;
  shirtStroke: string;
};
