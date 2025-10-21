"use client";

import React, { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { mapProductToCartItem, CartItemProps } from '@/components/cart/Cart.types';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { Cart } from '@/components/cart';
import { HomeClient } from './HomeClient';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    const cartItem = mapProductToCartItem(product);
    setCartItems((prevItems) => [...prevItems, cartItem]);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen relative text-white">
      {/* Background - Exact linear gradient from Figma */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          background: 'linear-gradient(119deg, #094DF7 11.35%, rgba(165, 190, 249, 0.90) 54.74%, rgba(82, 100, 250, 0.90) 101.78%)'
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        title="Discover, find, and sell Skull Candy NFT"
        description="The world's first and unlimited digital marketplace for Skull Candy tokens"
        ctaLabel="Explore"
        ctaOnClick={() => {
          document.getElementById('products')?.scrollIntoView({ 
            behavior: 'smooth' 
          });
        }}
      />

      {/* Monthly Collection Section with Live Search */}
      <HomeClient products={products} onAddToCart={handleAddToCart} />

      {/* Cart Component - Always show on the screen */}
      <Cart items={cartItems} />
    </div>
  );
}
