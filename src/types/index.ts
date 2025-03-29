
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  stock: number;
  ingredients?: string;
  allergens?: string[];
  nutritionalInfo?: string;
  deliveryInfo?: string;
  brand?: string;
  occasion?: string[];
  type?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  featured?: boolean;
  count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export interface FilterOption {
  id: string;
  name: string;
  count: number;
}

