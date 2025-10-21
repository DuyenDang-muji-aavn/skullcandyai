import * as React from 'react';

export interface FooterProps {
  /** Custom footer content */
  children?: React.ReactNode;
  /** Shopping cart information */
  cart?: {
    /** Number of items in cart */
    itemCount?: number;
    /** Total cart value */
    total?: string;
  };
  /** Additional CSS classes */
  className?: string;
}
