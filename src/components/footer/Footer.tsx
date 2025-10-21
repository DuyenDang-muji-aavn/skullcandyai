import * as React from 'react';
import { Button } from '@/components/button';
import { FooterProps } from './Footer.types';

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ children, cart, className = '' }, ref) => {
    return (
      <footer
        ref={ref}
        className={`
          h-footer 
          bg-gray-950 
          border-t 
          border-gray-800 
          flex 
          items-center 
          justify-between
          px-container
          ${className}
        `}
      >
        {children || (
          <>
            <div className="flex items-center gap-8">
              <span className="text-gray-400 text-sm font-outfit">
                © 2025 SkullCandy NFT Marketplace
              </span>
            </div>

            {cart && (
              <div className="flex items-center gap-4">
                <div className="text-sm font-outfit text-gray-400">
                  {cart.itemCount && (
                    <span>
                      {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                    </span>
                  )}
                  {cart.total && <span className="ml-4 text-white font-bold">{cart.total}</span>}
                </div>
                <Button style="Neutral" size="S">
                  View Cart
                </Button>
              </div>
            )}
          </>
        )}
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
