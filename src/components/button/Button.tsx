import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles - all buttons share these
  'inline-flex items-center justify-center font-family-button font-bold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      style: {
        CTA: 'backdrop-blur-glass [background:var(--button-gradient,linear-gradient(273deg,rgba(1,166,255,0.70)_2.08%,rgba(132,235,127,0.70)_46.22%,rgba(140,226,59,0.70)_89.23%,rgba(64,106,255,0.70)_108.56%))]',
        Neutral:
          'backdrop-blur-glass bg-glass-light button-gradient-border',
        Stroke: 'bg-transparent border border-solid border-[rgba(255,255,255,0.9)]',
      },
      size: {
        L: 'text-[24px] px-[80px] py-[18px] gap-[10px] rounded-[9999px]',
        M: 'text-[18px] px-[32px] py-[12px] gap-[8px] rounded-[9999px]',
        S: 'text-[14px] px-[16px] py-[12px] gap-[8px] rounded-[9999px]',
      },
    },
    compoundVariants: [
      // Large Stroke has thicker border
      {
        style: 'Stroke',
        size: 'L',
        className: 'border-2',
      },
    ],
    defaultVariants: {
      style: 'CTA',
      size: 'M',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, style, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={buttonVariants({ style, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
