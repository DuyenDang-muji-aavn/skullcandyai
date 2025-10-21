'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NavbarProps } from './Navbar.types';

const logoIcon = "http://localhost:3845/assets/6ad9cb58d31a676bc7d5f5fbc051e93c41e2e5b4.svg";

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ sticky = true, className = '' }, ref) => {
    
    const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const productsSection = document.querySelector('section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    return (
      <header
        ref={ref}
        className={`
          backdrop-blur-[100px]
          backdrop-filter
          flex flex-col gap-[8px] items-start
          px-[40px] py-[24px]
          relative w-full
          ${sticky ? 'sticky top-0 z-50' : ''}
          ${className}
        `}
        data-name="Header Container"
      >
        <div className="flex items-center justify-between w-full" data-name="Header">
          {/* Logo Section */}
          <div className="flex gap-[8px] items-start shrink-0" data-name="Logo">
            <div className="h-6 w-6 relative shrink-0">
              <Image
                src={logoIcon}
                alt="SkullCandy Logo"
                width={24}
                height={24}
                className="block"
              />
            </div>
            <p className="font-orbitron font-bold leading-normal text-[18px] text-white whitespace-nowrap">
              SKULLCANDY
            </p>
          </div>

          {/* Navigation */}
          <nav 
            className="flex font-orbitron font-bold gap-[16px] items-start leading-normal px-[16px] py-[10px] shrink-0 text-[18px] text-center text-white w-[552px]"
            data-name="Navigation"
          >
            <a
              href="#market"
              onClick={scrollToProducts}
              className="flex-1 min-w-0 hover:opacity-80 transition-opacity cursor-pointer"
            >
              Market
            </a>
            <Link
              href="/features"
              className="flex-1 min-w-0 hover:opacity-80 transition-opacity"
            >
              Features
            </Link>
            <Link
              href="/community"
              className="flex-1 min-w-0 hover:opacity-80 transition-opacity"
            >
              Community
            </Link>
          </nav>
        </div>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
