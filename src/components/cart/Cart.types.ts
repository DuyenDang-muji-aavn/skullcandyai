import type { Product } from '@/lib/types';

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartProps {
  items: CartItemProps[];
}

export function mapProductToCartItem(product: Product): CartItemProps {
  return {
    id: String(product.id),
    name: product.name,
    price: product.price,
    quantity: 1, // Default quantity for now
    image: product.image,
  };
}