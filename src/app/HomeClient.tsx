'use client';

import { useState, useMemo } from 'react';
import { NFTGrid } from '@/components/nft-grid';
import { NFTCardClient } from '@/components/nft-card-client';
import { Cart } from '@/components/cart';
import { generateRandomCountdown, generateCreatorName, isVerified } from '@/lib/utils';
import { mapProductToCartItem, CartItemProps } from '@/components/cart/Cart.types';
import type { Product } from '@/lib/types';

// Helper to convert countdown string to object
const parseCountdown = (countdownStr: string) => {
  const [hours, minutes, seconds] = countdownStr.split(' : ').map(part => parseInt(part));
  return { hours, minutes, seconds };
};

interface HomeClientProps {
  products: Product[];
}

export function HomeClient({ products }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  const handleAddToCart = (product: Product) => {
    const cartItem = mapProductToCartItem(product);
    setCartItems((prevItems) => [...prevItems, cartItem]);
  };

  // Filter products based on search query (case-insensitive, searches in name)
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    
    const query = searchQuery.toLowerCase();
    return products.filter((product) => 
      product.name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <>
      <section id="products" className="px-container py-20">
        {/* NFT Grid with integrated header (SectionHeading + SearchBar) */}
        <div className="max-w-container mx-auto">
          <NFTGrid
            title="MONTHLY SKULL CANDIES"
            description="Discover one of the most cutest NFT creations created for you. Place your bid and be the first to have these treasures. All of the artworks are limited selections."
            searchPlaceholder="Search NFTs by name..."
            gap="md"
            onSearchChange={setSearchQuery}
          >
            {filteredProducts.length === 0 && searchQuery && (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-family-body">
                  No NFTs found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-sm font-family-body opacity-70 mt-2">
                  Try a different search term
                </p>
              </div>
            )}
            
            {filteredProducts.length === 0 && !searchQuery && (
              <div className="col-span-full text-center py-12">
                <p className="text-xl font-family-body">No products available</p>
              </div>
            )}
            
            {filteredProducts.map((product) => {
              const countdown = parseCountdown(generateRandomCountdown());
              return (
                <NFTCardClient
                  key={product.id}
                  image={product.image}
                  imageAlt={`${product.name} NFT artwork`}
                  title={product.name}
                  author={generateCreatorName(product.tags)}
                  verified={isVerified(product.rating)}
                  countdown={countdown}
                  price={product.price.toFixed(2)}
                  currency="ETH"
                  currencyIcon="/ethereum-icon.svg"
                  buttonText="Bid now"
                  onButtonClick={() => handleAddToCart(product)}
                />
              );
            })}
          </NFTGrid>
        </div>
      </section>

      {/* Cart Component - Always show on the screen */}
      <Cart items={cartItems} />
    </>
  );
}
