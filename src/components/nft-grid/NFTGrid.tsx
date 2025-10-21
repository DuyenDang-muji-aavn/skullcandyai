import * as React from 'react';
import { NFTGridProps } from './NFTGrid.types';
import { SectionHeading } from '../section-heading';

export const NFTGrid: React.FC<NFTGridProps> = ({
  title,
  description,
  searchPlaceholder = 'Search by topics or collections',
  onSearchChange,
  children,
  gap = 'md',
  className = '',
}) => {
  // Figma layout: flex-wrap with gap-[24px] horizontal, 96px vertical (custom requirement)
  // px-[32px] py-[64px]
  // Each card: basis-0 grow shrink-0 with max-w-[432px] min-w-[314px]
  // API Integration: https://devday-aavn-d5284e914439.herokuapp.com/api/products
  const gapClasses = {
    sm: 'gap-x-4 gap-y-12',  // 16px × 48px
    md: 'gap-x-6 gap-y-24',  // 24px × 96px - asymmetric for better row separation
    lg: 'gap-x-8 gap-y-32',  // 32px × 128px
  };

  const hasHeader = title || description;

  return (
    <div className={`w-full ${className}`}>
      {hasHeader && (
        <div className="mb-12">
          <SectionHeading 
            title={title || ''} 
            description={description} 
            align="center"
            searchPlaceholder={searchPlaceholder}
            onSearchChange={onSearchChange}
          />
        </div>
      )}
      {/* Figma Product List layout: flex-wrap with asymmetric gaps */}
      <div
        className={`
          flex
          flex-wrap
          content-center
          items-center
          px-[32px]
          py-[64px]
          ${gapClasses[gap]}
        `}
      >
        {children}
      </div>
    </div>
  );
};
