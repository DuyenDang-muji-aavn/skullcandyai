import React from 'react';
import type { Product } from '@/lib/types';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { HomeClient } from './HomeClient';

// Fetch products on the server side to avoid CORS issues
async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch('https://devday-aavn-d5284e914439.herokuapp.com/api/products', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch products: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data.data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

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
      />

      {/* Monthly Collection Section with Live Search */}
      <HomeClient products={products} />
    </div>
  );
}
