/**
 * Type definitions for the SkullCandy NFT Marketplace
 */

export interface NFT {
  id: string;
  title: string;
  creator: string;
  image: string;
  priceEth: number;
  priceUsd: number;
  timeRemaining: number; // milliseconds
  verified: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface CartItem {
  nft: NFT;
  quantity: number;
}

export interface FeaturedNFT extends NFT {
  featured: boolean;
  description?: string;
}

/**
 * API Product Response Types
 */
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  tags: string[];
  rating: number;
  background: string;
  backgroundImg: string;
  stockQuantity: number;
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK' | 'PRE_ORDER';
  isAvailable: boolean;
  isLowStock: boolean;
  isOutOfStock: boolean;
}

export interface ProductsAPIResponse {
  success: boolean;
  data: {
    products: Product[];
  };
}
