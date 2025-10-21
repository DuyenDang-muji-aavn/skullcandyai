import * as React from 'react';

export interface NFTGridProps {
  /** Optional header title (automatically includes search bar via SectionHeading) */
  title?: string;
  /** Optional description */
  description?: string;
  /** Search placeholder text (passed to integrated SearchBar in SectionHeading) */
  searchPlaceholder?: string;
  /** Search query change handler for filtering */
  onSearchChange?: (query: string) => void;
  /** NFT cards to display */
  children: React.ReactNode;
  /** Gap between grid items */
  gap?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}
