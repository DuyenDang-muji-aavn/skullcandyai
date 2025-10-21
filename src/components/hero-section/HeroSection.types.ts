import * as React from 'react';

export interface HeroSectionProps {
  /** Hero title text */
  title: string;
  /** Hero description text */
  description: string;
  /** Label for primary CTA button */
  ctaLabel?: string;
  /** Click handler for primary CTA */
  ctaOnClick?: () => void;
  /** Custom content for the featured area (right side) */
  featuredContent?: React.ReactNode;
  /** Background decorative elements */
  background?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}
