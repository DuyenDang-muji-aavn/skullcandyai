import React from 'react';
import { CartProps } from './Cart.types';

export const Cart: React.FC<CartProps> = ({ items }) => {
  // Calculate total price
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed bottom-0 left-0 w-full px-8 py-4 z-50">
      <div 
        className="backdrop-blur-glass bg-glass-dark glass-border-gradient rounded-[24px] px-4 py-2"
        data-name="Cart"
      >
        <div className="flex items-center justify-between">
          {/* User Info Section */}
          <div className="flex items-center gap-2" data-name="User Info">
            <div className="relative w-12 h-12" data-name="Avatar">
              <div className="absolute inset-0 border-[3px] border-solid border-white rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                </svg>
              </div>
            </div>
            <p className="font-orbitron font-semibold text-base leading-8 text-white whitespace-nowrap">
              MUJI
            </p>
          </div>

          {/* Bid Info Section */}
          <div className="flex items-center gap-6 py-2" data-name="Bid Info">
            {/* Product Images */}
            <div className="flex items-center gap-2" data-name="Images">
              {items.slice(0, 3).map((item, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-glass glass-border-gradient rounded-[16px] px-3 py-2.5"
                  data-name="Item"
                >
                  <div className="w-9 h-10 relative overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-12 flex items-center justify-center">
              <div className="w-px h-full bg-white" />
            </div>

            {/* Total Price */}
            <p className="font-orbitron font-semibold text-base leading-8 text-white whitespace-nowrap">
              {totalPrice.toFixed(2)} ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};