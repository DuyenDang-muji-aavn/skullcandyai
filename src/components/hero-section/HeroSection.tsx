'use client';

import * as React from 'react';
import { Button } from '@/components/button';
import { HeroSectionProps } from './HeroSection.types';
import { FeaturedSection } from './FeaturedSection';

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  ctaLabel = 'Explore',
  ctaOnClick,
  featuredContent,
  background,
  className = '',
}) => {
  // Default scroll behavior if no onClick provided
  const handleClick = () => {
    if (ctaOnClick) {
      ctaOnClick();
    } else {
      // Default: scroll to products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      className={`
        relative
        flex
        justify-center
        min-h-[1025px]
        ${className}
      `}
    >
      {/* Background Elements */}
      {background && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {background}
        </div>
      )}

      {/* Container to match NFTGrid max-width */}
      <div className="w-full max-w-container flex flex-col lg:flex-row">
        {/* Main Content - Left Side */}
        <div 
          className="
            flex 
            flex-col 
            gap-[104px] 
            px-[40px] 
            pt-[176px] 
            pb-[64px]
            w-full
            lg:w-[644px]
            relative 
            z-10
          "
        >
          {/* Intro Section */}
          <div className="flex flex-col gap-[32px] text-white">
          {/* Title */}
          <h1 
            className="
              font-family-title
              font-bold
              text-[60px]
              leading-[1.374]
            "
          >
            {title}
          </h1>
          
          {/* Description */}
          <p 
            className="
              font-family-body
              font-normal
              text-[24px]
              leading-[40px]
            "
          >
            {description}
          </p>
        </div>

        {/* CTA Button - Keep as inline-flex to not stretch full width */}
        <div>
          <Button style="CTA" size="L" onClick={handleClick}>
            {ctaLabel}
          </Button>
        </div>
      </div>

        {/* Featured Section - Right Side */}
        <div className="flex-1 relative flex items-center justify-center min-h-[600px] lg:min-h-0">
          {featuredContent || <FeaturedSection />}
        </div>
      </div>
    </section>
  );
};
