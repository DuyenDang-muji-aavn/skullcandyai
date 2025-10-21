import React from 'react';
import { CartItemProps } from './Cart.types';

export const CartItem: React.FC<CartItemProps> = ({ name, price, quantity }) => {
  return (
    <div className="flex justify-between items-center border-b border-neutral-700 py-2">
      <span>{name}</span>
      <span>
        {quantity} × ${price.toFixed(2)}
      </span>
    </div>
  );
};